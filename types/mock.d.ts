import AbstractRepo from "../src/abstract/repo.abstract";

declare type MockData<T> = { data: T[]; repo: AbstractRepo<T> };
