# MongoDB to Prisma + Neon PostgreSQL Migration Guide

## ✅ Migration Complete

This project has been successfully migrated from MongoDB (Mongoose) to Prisma ORM with Neon PostgreSQL.

## 📋 What Was Changed

### 1. Database Schema
- Created `prisma/schema.prisma` with all models:
  - User (with authentication fields)
  - Product (with category, occasions, images)
  - Category
  - Occasion
  - Order (with OrderItem)
  - CartItem
  - WishlistItem
  - Blog

### 2. Database Connection
- **Removed**: `src/lib/connectDB.js` (MongoDB connection)
- **Added**: `src/lib/db.ts` (Prisma client singleton)

### 3. Authentication
- Updated `src/lib/auth.js` to use Prisma
- Updated `src/lib/middleware/auth.js` to use Prisma
- All auth routes migrated:
  - `/api/auth/login`
  - `/api/auth/signup`
  - `/api/auth/verify-otp`
  - `/api/auth/resend-otp`
  - `/api/auth/me`

### 4. API Routes Migrated
All API routes have been migrated to use Prisma:
- ✅ Products (`/api/products`, `/api/products/[id]`)
- ✅ Categories (`/api/categories`)
- ✅ Occasions (`/api/occasions`)
- ✅ Orders (`/api/orders`, `/api/orders/my-order`)
- ✅ Cart (`/api/cart`, `/api/cart/add`, `/api/cart/update`, `/api/cart/clear`)
- ✅ Wishlist (`/api/wishlist`)
- ✅ Blogs (`/api/blogs`, `/api/blogs/[id]`)
- ✅ Checkout (`/api/checkout`)

### 5. Middleware
- Updated `src/app/middleware.js` to use async `verifyAdmin`
- Added proper route protection for admin routes

### 6. Seed Script
- Updated `src/scripts/seedAdmin.js` to use Prisma

### 7. Package Dependencies
- **Removed**: `mongoose`
- **Added**: `@prisma/client`, `prisma` (dev)

## 🚀 Setup Instructions

### Step 1: Install Dependencies

```bash
npm install
# or
pnpm install
# or
yarn install
```

### Step 2: Set Up Environment Variables

Create or update your `.env` file in the project root:

```env
# Database (Neon PostgreSQL)
DATABASE_URL="postgresql://neondb_owner:npg_r3zjFtAsxOy4@ep-autumn-night-ahzy4tn5-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"

# JWT Secret (keep your existing value)
JWT_SECRET="your-jwt-secret-key"

# Admin Credentials (for seed script)
ADMIN_USER="admin@example.com"
ADMIN_PASS="your-admin-password"

# Other existing environment variables...
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
STRIPE_SECRET_KEY="your-stripe-secret-key"
# ... etc
```

### Step 3: Generate Prisma Client

```bash
npm run db:generate
# or
npx prisma generate
```

### Step 4: Push Schema to Database

```bash
npm run db:push
# or
npx prisma db push
```

This will create all tables in your Neon PostgreSQL database.

### Step 5: Seed Admin User (Optional)

```bash
npm run seed:admin
```

### Step 6: Run Development Server

```bash
npm run dev
```

## 🔍 Verification Steps

1. **Check Database Connection**: Visit `/api/debug` (if exists) or check server logs
2. **Test Admin Login**: Go to `/auth/login` and login with admin credentials
3. **Test Public Pages**: Verify home, products, and checkout pages load
4. **Test Admin Dashboard**: Verify admin can access `/admin` routes

## 🗑️ Files to Remove (Optional Cleanup)

After verifying everything works, you can remove these MongoDB-related files:

- `src/models/` (entire directory)
- `src/lib/connectDB.js`

**Note**: Keep these files until you've fully verified the migration works in production.

## 📝 Important Notes

1. **Data Migration**: This migration only changes the code. If you have existing MongoDB data, you'll need to:
   - Export data from MongoDB
   - Transform it to match Prisma schema
   - Import into PostgreSQL

2. **Enum Values**: Prisma uses snake_case for enum values (e.g., `same_day` instead of `same-day`). The API routes handle conversion.

3. **ID Format**: Prisma uses CUID strings instead of MongoDB ObjectIds. All API responses now return string IDs.

4. **Relations**: Many-to-many relationships (Product-Occasion) are handled via Prisma's relation syntax.

## 🐛 Troubleshooting

### "Prisma Client not generated"
```bash
npm run db:generate
```

### "Database connection error"
- Verify `DATABASE_URL` in `.env` is correct
- Check Neon dashboard for connection status
- Ensure SSL mode is set correctly

### "Table does not exist"
```bash
npm run db:push
```

### "Admin login not working"
```bash
npm run seed:admin
```

## ✨ What's Preserved

- ✅ All UI components and styles (unchanged)
- ✅ All public routes and URLs (unchanged)
- ✅ SEO metadata and sitemap (unchanged)
- ✅ Authentication flow (same behavior)
- ✅ Shopping cart functionality
- ✅ Order processing
- ✅ Admin dashboard features

## 🔄 Next Steps

1. Test all functionality thoroughly
2. Run database migrations in production
3. Update any deployment configurations
4. Monitor for any issues
5. Remove MongoDB dependencies once stable

---

**Migration completed successfully!** 🎉




