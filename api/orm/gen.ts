import { DB } from "./db.ts";

const db = new DB(process.env.NODE_ENV).instance();

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
  Migration: {
    all: async () => {
      return db.query<Migration, any>(`SELECT * FROM migrations`).all();
    },
  },
  User: {
    all: async () => {
      return db.query<User, any>(`SELECT * FROM users`).all();
    },
  },
};

export type ORM = typeof orm;
