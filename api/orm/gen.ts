export type Migration = {
  id: string | null;
  applied_at: number;
};

export type User = {
  id: string;
  email: string;
  password: string;
};
