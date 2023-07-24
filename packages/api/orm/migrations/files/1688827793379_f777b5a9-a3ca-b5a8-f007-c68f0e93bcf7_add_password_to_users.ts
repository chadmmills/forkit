export function up(): string {
  return `
ALTER TABLE users
ADD COLUMN password TEXT NOT NULL;
`;
}

export function down(): string | void {
  return `
ALTER TABLE users
DROP COLUMN password;
`;
}
