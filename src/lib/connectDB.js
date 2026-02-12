// PostgreSQL + Prisma connection
// This file is kept for backwards compatibility
// Use @/lib/db instead for direct Prisma client access

export function connectDB() {
  // Prisma automatically manages connections
  // No explicit connection needed
  return Promise.resolve();
}
