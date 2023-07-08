export function up(): string {
  // add password field to users table
  return `
ALTER TABLE users
ADD COLUMN password TEXT NOT NULL;
`;
}

export function down(): string | void {
  // remove password field from users table
  return `
ALTER TABLE users
DROP COLUMN password;
`;
}
