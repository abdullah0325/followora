import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const envPath = resolve(__dirname, '../../.env');
dotenv.config({ path: envPath });

const prisma = new PrismaClient();

async function seed() {
  try {
    console.log('🔄 Starting database seed...');

    // Seed Admin User
    console.log('📝 Seeding admin user...');
    const adminExists = await prisma.user.findUnique({
      where: { email: process.env.ADMIN_USER || 'admin@example.com' },
    });

    if (!adminExists) {
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASS || 'admin123', 10);
      await prisma.user.create({
        data: {
          email: process.env.ADMIN_USER || 'admin@example.com',
          password_hash: hashedPassword,
          name: 'Admin User',
          role: 'admin',
          is_active: true,
          is_verified: true,
        },
      });
      console.log('✅ Admin user created');
    } else {
      console.log('⚠️  Admin user already exists');
    }

    // Seed Categories
    console.log('📝 Seeding categories...');
    const categories = [
      { name: 'Electronics', slug: 'electronics' },
      { name: 'Fashion', slug: 'fashion' },
      { name: 'Home & Garden', slug: 'home-garden' },
      { name: 'Sports & Outdoors', slug: 'sports-outdoors' },
      { name: 'Health & Beauty', slug: 'health-beauty' },
      { name: 'Books & Media', slug: 'books-media' },
    ];

    for (const cat of categories) {
      const exists = await prisma.category.findUnique({
        where: { slug: cat.slug },
      });
      if (!exists) {
        await prisma.category.create({
          data: cat,
        });
      }
    }
    console.log('✅ Categories seeded');

    // Seed Occasions
    console.log('📝 Seeding occasions...');
    const occasions = [
      { name: 'Birthday', slug: 'birthday' },
      { name: 'Anniversary', slug: 'anniversary' },
      { name: 'Wedding', slug: 'wedding' },
      { name: 'Graduation', slug: 'graduation' },
      { name: 'Christmas', slug: 'christmas' },
      { name: 'New Year', slug: 'new-year' },
      { name: 'Valentine', slug: 'valentine' },
      { name: 'Ramadan', slug: 'ramadan' },
    ];

    for (const occ of occasions) {
      const exists = await prisma.occasion.findUnique({
        where: { slug: occ.slug },
      });
      if (!exists) {
        await prisma.occasion.create({
          data: occ,
        });
      }
    }
    console.log('✅ Occasions seeded');

    // Seed Products
    console.log('📝 Seeding products...');
    const electronicsCategory = await prisma.category.findUnique({ where: { slug: 'electronics' } });
    const fashionCategory = await prisma.category.findUnique({ where: { slug: 'fashion' } });
    const homeGardenCategory = await prisma.category.findUnique({ where: { slug: 'home-garden' } });
    const sportsCategory = await prisma.category.findUnique({ where: { slug: 'sports-outdoors' } });
    const beautyCategory = await prisma.category.findUnique({ where: { slug: 'health-beauty' } });
    const booksCategory = await prisma.category.findUnique({ where: { slug: 'books-media' } });

    const productsData = [
      {
        name: 'Premium Wireless Headphones',
        slug: 'premium-wireless-headphones',
        description: 'High-quality wireless headphones with noise cancellation',
        price: 299.99,
        categoryId: electronicsCategory?.id,
        image: 'https://res.cloudinary.com/demo/image/fetch/https://example.com/headphones.jpg',
        stock: 50,
        is_active: true,
      },
      {
        name: 'Classic White T-Shirt',
        slug: 'classic-white-tshirt',
        description: 'Comfortable and stylish white t-shirt for all occasions',
        price: 29.99,
        categoryId: fashionCategory?.id,
        image: 'https://res.cloudinary.com/demo/image/fetch/https://example.com/tshirt.jpg',
        stock: 100,
        is_active: true,
      },
      {
        name: 'Indoor Plant Pot Set',
        slug: 'indoor-plant-pot-set',
        description: 'Beautiful ceramic pot set for indoor plants',
        price: 49.99,
        categoryId: homeGardenCategory?.id,
        image: 'https://res.cloudinary.com/demo/image/fetch/https://example.com/pots.jpg',
        stock: 30,
        is_active: true,
      },
      {
        name: 'Yoga Mat Premium',
        slug: 'yoga-mat-premium',
        description: 'Non-slip premium yoga mat with carrying strap',
        price: 39.99,
        categoryId: sportsCategory?.id,
        image: 'https://res.cloudinary.com/demo/image/fetch/https://example.com/yogamat.jpg',
        stock: 45,
        is_active: true,
      },
      {
        name: 'Organic Face Cream',
        slug: 'organic-face-cream',
        description: 'Natural organic face cream for all skin types',
        price: 34.99,
        categoryId: beautyCategory?.id,
        image: 'https://res.cloudinary.com/demo/image/fetch/https://example.com/cream.jpg',
        stock: 60,
        is_active: true,
      },
      {
        name: 'Fiction Bestseller Book',
        slug: 'fiction-bestseller-book',
        description: 'Bestselling fiction novel that captivates readers',
        price: 19.99,
        categoryId: booksCategory?.id,
        image: 'https://res.cloudinary.com/demo/image/fetch/https://example.com/book.jpg',
        stock: 75,
        is_active: true,
      },
    ];

    for (const product of productsData) {
      if (product.categoryId) {
        const exists = await prisma.product.findFirst({
          where: { slug: product.slug },
        });
        if (!exists) {
          await prisma.product.create({
            data: {
              name: product.name,
              slug: product.slug,
              description: product.description,
              price: product.price,
              image: product.image,
              stock: product.stock,
              category_id: product.categoryId,
            },
          });
        }
      }
    }
    console.log('✅ Products seeded');

    // Seed Blogs
    console.log('📝 Seeding blogs...');
    const blogsData = [
      {
        title: 'Getting Started with Our Products',
        slug: 'getting-started-products',
        content: 'Learn how to make the most of our amazing product collection. From setup to advanced usage, we cover everything you need to know.',
        image: 'https://res.cloudinary.com/demo/image/fetch/https://example.com/blog1.jpg',
        status: 'published',
      },
      {
        title: 'Top 5 Fashion Trends This Season',
        slug: 'top-5-fashion-trends',
        content: 'Discover the hottest fashion trends this season and how to incorporate them into your wardrobe. We share expert tips and styling advice.',
        image: 'https://res.cloudinary.com/demo/image/fetch/https://example.com/blog2.jpg',
        status: 'published',
      },
      {
        title: 'Wellness Tips for a Healthy Lifestyle',
        slug: 'wellness-tips-healthy-lifestyle',
        content: 'Explore our collection of wellness products and learn tips for maintaining a healthy lifestyle. From fitness to skincare, we have everything.',
        image: 'https://res.cloudinary.com/demo/image/fetch/https://example.com/blog3.jpg',
        status: 'published',
      },
      {
        title: 'Home Decor Ideas for Every Room',
        slug: 'home-decor-ideas-every-room',
        content: 'Transform your home with our curated collection of home decor items. Get inspired by our interior design tips and ideas.',
        image: 'https://res.cloudinary.com/demo/image/fetch/https://example.com/blog4.jpg',
        status: 'published',
      },
    ];

    for (const blog of blogsData) {
      const exists = await prisma.blog.findFirst({
        where: { slug: blog.slug },
      });
      if (!exists) {
        await prisma.blog.create({
          data: blog,
        });
      }
    }
    console.log('✅ Blogs seeded');

    console.log('\n✨ Database seeding completed successfully!');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
