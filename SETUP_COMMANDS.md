# 🚀 Complete Setup Commands - Step by Step

Follow these commands **IN ORDER** to get your app running:

## Step 1: Install Dependencies

```bash
npm install
```

This will install all packages including Prisma.

---

## Step 2: Generate Prisma Client

```bash
npm run db:generate
```

**OR**

```bash
npx prisma generate
```

This creates the Prisma Client based on your schema.

---

## Step 3: Push Schema to Database (Create Tables)

```bash
npm run db:push
```

**OR**

```bash
npx prisma db push
```

This will create all tables in your Neon PostgreSQL database.

**Expected Output:**
```
✔ Generated Prisma Client
✔ Pushed database schema
```

---

## Step 4: Seed Admin User (Optional but Recommended)

```bash
npm run seed:admin
```

**OR**

```bash
node --import tsx src/scripts/seedAdmin.js
```

This creates the admin user with credentials from `.env`:
- Email: `ADMIN_USER` (default: admin@example.com)
- Password: `ADMIN_PASS` (default: admin123456)

**Expected Output:**
```
🔄 Connecting to database...
✅ Admin user created successfully!
📧 Email: admin@example.com
🔐 Password: admin123456
🔗 Login at: http://localhost:3000/auth/login
✅ Database connection closed
```

---

## Step 5: Start Development Server

```bash
npm run dev
```

**OR**

```bash
next dev
```

Your app will be available at: **http://localhost:3000**

---

## 🎯 Quick Setup (All Commands at Once)

Copy and paste this entire block:

```bash
# Install dependencies
npm install

# Generate Prisma Client
npm run db:generate

# Push schema to database
npm run db:push

# Seed admin user
npm run seed:admin

# Start development server
npm run dev
```

---

## 🔍 Verify Everything Works

1. **Check Database Connection:**
   - Look for "✅ Database connection successful" in console
   - Or visit: http://localhost:3000/api/debug (if route exists)

2. **Test Admin Login:**
   - Go to: http://localhost:3000/auth/login
   - Use credentials from `.env` (ADMIN_USER / ADMIN_PASS)

3. **Test Public Pages:**
   - Home: http://localhost:3000
   - Products: http://localhost:3000/products

---

## 🛠️ Troubleshooting

### Error: "Prisma Client not generated"
```bash
npm run db:generate
```

### Error: "Table does not exist"
```bash
npm run db:push
```

### Error: "Database connection failed"
- Check `.env` file has correct `DATABASE_URL`
- Verify Neon database is active
- Check SSL mode is set correctly

### Error: "Cannot find module '@prisma/client'"
```bash
npm install
npm run db:generate
```

### Error: "Admin user creation failed"
- Make sure `ADMIN_USER` and `ADMIN_PASS` are set in `.env`
- Check database connection is working
- Run `npm run db:push` first

---

## 📋 Additional Useful Commands

### Open Prisma Studio (Database GUI)
```bash
npm run db:studio
```
Opens a visual database browser at http://localhost:5555

### Create Migration (for production)
```bash
npm run db:migrate
```
Creates a migration file (use `db:push` for development)

### Check Prisma Version
```bash
npx prisma --version
```

---

## ✅ Success Checklist

- [ ] Dependencies installed (`npm install`)
- [ ] Prisma Client generated (`npm run db:generate`)
- [ ] Database schema pushed (`npm run db:push`)
- [ ] Admin user seeded (`npm run seed:admin`)
- [ ] Development server running (`npm run dev`)
- [ ] Can access http://localhost:3000
- [ ] Can login as admin

---

**You're all set! 🎉**




