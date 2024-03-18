class FAuth {
    constructor() {
        this.storageKey = "_auth_";
        this.authData = null;
        this.updateAuthPromise = null;
        this.getAuthPromise = null;
    }

    gotoLogin() {
        const loginPath = "/login";

        if (window.location.pathname !== loginPath) {
            window.location.pathname = loginPath;
        }
    }

    login = async (username, password, errorEl) => {
        const result = await createRequest("/api/auth/login", { username, password }, "POST").catch((err) => {
            if (err.error) return err;

            return { error: err };
        });

        if (result.error) {
            if (errorEl) {
                errorEl.innerText = result.error;
                errorEl.removeAttribute("hidden");
            }

            console.error(result);
            return false;
        }

        this.setAuth(result);

        return true;
    };

    updateAuth = (token) => {
        if (this.updateAuthPromise) return this.updateAuthPromise;

        const fail = () => {
            this.resetAuth();
            this.updateAuthPromise = null;
            return false;
        };

        this.updateAuthPromise = createRequest("/api/auth/refresh", { token })
            .then((result) => {
                if (result) {
                    this.setAuth(result);
                    return true;
                }

                return fail();
            })
            .catch((err) => {
                console.error(err);

                return fail();
            });
    };

    getFileToken() {
        if (!this.authData) return "_";

        return this.authData.fileToken;
    }

    async getAuthHeaders() {
        const auth = await this.getAuth();

        return { token: auth.token };
    }

    checkAuth() {
        const now = Date.now();
        const { expireAt, token } = this.authData;
        // before 30 minutes
        const updateTokenAt = expireAt - 30 * 60e3;

        if (now >= expireAt) {
            console.warn("session expired");
            this.gotoLogin();

            return false;
        }

        if (now >= updateTokenAt) {
            console.warn("session refresh");
            return this.updateAuth(token);
        }

        return true;
    }

    /** @private */
    async createGetAuthPromise() {
        if (!this.authData) {
            const data = localStorage.getItem(this.storageKey);
            let json;

            if (data && (json = JSON.parse(data))) {
                this.authData = json;
            } else {
                return this.resetAuth();
            }
        }

        const isValid = await this.checkAuth();
        if (isValid) return this.authData;

        return this.authData;
    }

    getAuth() {
        if (!this.getAuthPromise) {
            this.getAuthPromise = this.createGetAuthPromise();
        }

        return this.getAuthPromise;
    }

    setAuth(data) {
        this.authData = data;

        return localStorage.setItem(this.storageKey, JSON.stringify(data));
    }

    /**
     *
     */
    resetAuth() {
        localStorage.removeItem(this.storageKey);
        this.gotoLogin();
    }
}

const fauth = new FAuth();
