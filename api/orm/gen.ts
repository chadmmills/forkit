import { DB } from "./db.ts";

const db = new DB(process.env.NODE_ENV).instance();

type ToOptional<T> = {
  [K in keyof T]-?: T[K] extends null | undefined ? T[K] | undefined : T[K];
};

export type Migration = {
  id: string | null;
  applied_at: number;
};

export type User = {
  id: string;
  email: string;
  password: string;
};

export const orm = {
  migrations: {
    all() {
      return db.query<Migration, any>("SELECT * FROM migrations").all();
    },
    create(data: ToOptional<Migration>) {
      return db
        .query<Migration, any>(
          `INSERT INTO migrations (${Object.keys(data).join(
            ", ",
          )}) VALUES (${Object.keys(data)
            .map((k) => "$" + k)
            .join(", ")})`,
        )
        .run(data);
    },
  },

  users: {
    all() {
      return db.query<User, any>("SELECT * FROM users").all();
    },
    create(data: ToOptional<User>) {
      return db
        .query<User, any>(
          `INSERT INTO users (${Object.keys(data).join(
            ", ",
          )}) VALUES (${Object.keys(data)
            .map((k) => "$" + k)
            .join(", ")})`,
        )
        .run(data);
    },
  },
};

export type ORM = typeof orm;
