import { randomUUID } from "node:crypto";

import { DB } from "./db.ts";

const db = new DB(process.env.NODE_ENV).instance();

type ToOptional<T> = {
  [K in keyof T]-?: T[K] extends null | undefined ? T[K] | undefined : T[K];
};

export type Migration = {
  id: string | null;
  applied_at: number;
};

export type MigrationInput = ToOptional<Omit<Migration, "id">>;

export type User = {
  id: string;
  email: string;
  password: string;
};

export type UserInput = ToOptional<Omit<User, "id">>;

export const orm = {
  migrations: {
    all() {
      return db.query<Migration, any>("SELECT * FROM migrations").all();
    },
    create(data: MigrationInput) {
      const id = randomUUID();
      const dataWithId: MigrationInput & { id: string } = { ...data, id };
      const columns = Object.keys(dataWithId).join(", ");
      const preparedValues = Object.keys(dataWithId)
        .map((k) => "$" + k)
        .join(", ");

      return db
        .query<Migration, any>(
          `INSERT INTO migrations (${columns}) VALUES (${preparedValues})`,
        )
        .run(dataWithId);
    },
  },

  users: {
    all() {
      return db.query<User, any>("SELECT * FROM users").all();
    },
    create(data: UserInput) {
      const id = randomUUID();
      const dataWithId: UserInput & { id: string } = { ...data, id };
      const columns = Object.keys(dataWithId).join(", ");
      const preparedValues = Object.keys(dataWithId)
        .map((k) => "$" + k)
        .join(", ");

      return db
        .query<User, any>(
          `INSERT INTO users (${columns}) VALUES (${preparedValues})`,
        )
        .run(dataWithId);
    },
  },
};

export type ORM = typeof orm;
