declare type FindCriteria<T, K extends keyof T> = [K, string];
declare type FsRepoStorage<T> = { lastIndex: number; data: Record<number, Model<T>> };
declare type Model<T> = T & {
    id: number;
    creatorId?: number;
    createdAt: number;
    updatedAt?: number;
};
declare type ModelUpdate<T> = Partial<T> & { id: number };
