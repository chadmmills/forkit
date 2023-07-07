export function up(): string {
  return `
    CREATE TABLE users (
      id text PRIMARY KEY,
      email text NOT NULL UNIQUE
    );
    `;
}

export function down(): string | void {
  return `DROP TABLE users;`;
}
