export function up(): string {
  return `
  CREATE TABLE auth_sessions (
    id text PRIMARY KEY NOT NULL,
    user_id text NOT NULL,
    expires_at timestamp NOT NULL,
    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
  );`
}

export function down(): string | void {
  return 'DROP TABLE auth_sessions'
}
