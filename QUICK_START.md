# ⚡ QUICK START GUIDE

## 🎯 Run These Commands (Copy & Paste)

```bash
# 1. Install all dependencies
npm install

# 2. Generate Prisma Client
npm run db:generate

# 3. Create database tables
npm run db:push

# 4. Create admin user
npm run seed:admin

# 5. Start the app
npm run dev
```

---

## 📝 Environment Variables Setup

**IMPORTANT:** Create a `.env` file in the project root with these variables:

```env
# Database (Neon PostgreSQL) - ALREADY SET
DATABASE_URL="postgresql://neondb_owner:npg_r3zjFtAsxOy4@ep-autumn-night-ahzy4tn5-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"

# JWT Secret (CHANGE THIS!)
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production-min-32-chars"

# Admin Credentials
ADMIN_USER="admin@example.com"
ADMIN_PASS="admin123456"

# Cloudinary (for image uploads)
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Email (SMTP)
SMTP_USER="your-smtp-user"
SMTP_PASS="your-smtp-pass"
SENDER_EMAIL="noreply@yourapp.com"

# Stripe (for payments)
STRIPE_SECRET_KEY="sk_test_your-key"

# App URL
NEXT_PUBLIC_BASE_URL="http://localhost:3000"

# Environment
NODE_ENV="development"
```

---

## ✅ What Each Command Does

1. **`npm install`** - Installs all packages (Prisma, Next.js, etc.)
2. **`npm run db:generate`** - Generates Prisma Client from schema
3. **`npm run db:push`** - Creates tables in PostgreSQL database
4. **`npm run seed:admin`** - Creates admin user for login
5. **`npm run dev`** - Starts Next.js development server

---

## 🚨 Common Issues & Fixes

### "Cannot find module '@prisma/client'"
```bash
npm install
npm run db:generate
```

### "Table already exists"
This is OK! It means tables are already created. Continue to next step.

### "Database connection error"
- Check `.env` file exists and has `DATABASE_URL`
- Verify Neon database is active
- Make sure SSL is enabled in connection string

### "Admin user already exists"
This is OK! Admin user is already created. Continue to next step.

---

## 🎉 Success!

After running all commands, you should see:
- ✅ Server running on http://localhost:3000
- ✅ Can login at http://localhost:3000/auth/login
- ✅ Admin dashboard accessible

---

**Need help?** Check `SETUP_COMMANDS.md` for detailed instructions.




