import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// Handle ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from project root
const envPath = resolve(__dirname, '../../.env');
dotenv.config({ path: envPath });

const prisma = new PrismaClient();

async function seedAdmin() {
  try {
    console.log('🔄 Connecting to database...');

    // Check if admin exists
    const adminExists = await prisma.user.findUnique({
      where: { email: process.env.ADMIN_USER },
    });
    
    if (adminExists) {
      console.log('⚠️  Admin user already exists:', process.env.ADMIN_USER);
      if (adminExists.role !== 'admin') {
        await prisma.user.update({
          where: { id: adminExists.id },
          data: { role: 'admin' },
        });
        console.log('✅ Updated role to admin');
      }
      await prisma.$disconnect();
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASS, 10);

    // Create admin user
    const admin = await prisma.user.create({
      data: {
        email: process.env.ADMIN_USER,
        password_hash: hashedPassword,
        name: 'Admin User',
        role: 'admin',
        is_active: true,
        is_verified: true,
      },
    });

    console.log('✅ Admin user created successfully!');
    console.log('📧 Email:', admin.email);
    console.log('🔐 Password:', process.env.ADMIN_PASS);
    console.log('\n🔗 Login at: http://localhost:3000/auth/login');

    await prisma.$disconnect();
    console.log('✅ Database connection closed');
  } catch (error) {
    console.error('❌ Error:', error.message);
    await prisma.$disconnect();
    process.exit(1);
  }
}

seedAdmin();
