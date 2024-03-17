declare namespace Express {
    interface Request {
        realIp: string;
        user: {
            id: number;
            username: string;
            sessionId: number;
        };
    }
}
