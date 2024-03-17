const crypto = require("crypto");
const { randomString } = require("../lib/helpers");
const { sessionTtlMinutes } = require("../../config");
const sessionRepo = require("./repo/sessions.repo");
const userRepo = require("./repo/user.repo");

class AuthService {
    createHash(password, salt) {
        return crypto.createHash("sha256").update(password).update(salt).digest("hex");
    }

    createToken() {
        return { token: crypto.randomUUID(), expireAt: Date.now() + sessionTtlMinutes * 60e3 };
    }

    /**
     *
     * @param {{ username: string; password: string; }} dto
     */
    async registerUser(dto) {
        const [oldUser] = await userRepo.findByColumn([["username", dto.username]], true);

        if (oldUser) {
            throw new Error("ALREADY_EXISTS");
        }

        const salt = randomString(12);
        const hash = this.createHash(dto.password, salt);

        const [user] = await userRepo.create([{ hash, salt, username: dto.username }]);

        return user;
    }

    /**
     *
     * @param {{ username: string; password: string; }} dto
     * @param {string} ip
     */
    async loginUser(dto, ip) {
        const [user] = await userRepo.findByColumn([["username", dto.username]], true);
        if (!user) return;

        const hash = this.createHash(dto.password, user.salt);
        if (hash !== user.hash) return;

        const now = Date.now();

        const oldSessions = await sessionRepo.findByColumn([["creatorId", user.id + ""]], true);
        const oldIds = oldSessions.filter((item) => item.expireAt >= now).map((item) => item.id);

        await sessionRepo.delete(oldIds);

        const { expireAt, token } = this.createToken();
        const [newSession] = await sessionRepo.create([{ expireAt, ip, token }], user.id);

        return newSession;
    }

    /**
     *
     * @param {string} refreshToken
     * @param {string} ip
     * @returns
     */
    async refreshToken(refreshToken, ip) {
        const [session] = await sessionRepo.findByColumn([
            ["token", refreshToken],
            ["ip", ip],
        ]);
        if (!session) return;

        await sessionRepo.delete([session.id]);

        const { expireAt, token } = this.createToken();
        const [newSession] = await sessionRepo.create([{ expireAt, ip, token }], session.creatorId);

        return newSession;
    }

    async logout(token) {
        const [session] = await sessionRepo.findByColumn([["token", token]]);

        if (session) {
            return sessionRepo.delete([session.id]);
        }
    }

    async getUserDataByToken(token, ip) {
        const [session] = await sessionRepo.findByColumn([
            ["token", token],
            ["ip", ip],
        ]);

        if (!session) return;

        const now = Date.now();
        if (now >= session.expireAt || !session.creatorId) {
            await sessionRepo.delete([session.id]);
            return false;
        }

        const user = await userRepo.findById(session.creatorId);
        if (!user) return;

        return { id: user.id, username: user.username, sessionId: session.id };
    }
}

const authService = new AuthService();

module.exports = authService;
