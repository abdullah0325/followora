# 🚀 START HERE - Complete Setup Guide

## ✅ Step-by-Step Commands

Run these commands **IN ORDER**:

### 1️⃣ Install Dependencies
```bash
npm install
```

### 2️⃣ Generate Prisma Client
```bash
npm run db:generate
```

### 3️⃣ Create Database Tables
```bash
npm run db:push
```

### 4️⃣ Create Admin User
```bash
npm run seed:admin
```

### 5️⃣ Start Development Server
```bash
npm run dev
```

---

## 📋 What Each Command Does

| Command | What It Does |
|---------|-------------|
| `npm install` | Installs all packages (Prisma, Next.js, React, etc.) |
| `npm run db:generate` | Generates Prisma Client from schema |
| `npm run db:push` | Creates all tables in PostgreSQL database |
| `npm run seed:admin` | Creates admin user (email: admin@example.com, password: admin123456) |
| `npm run dev` | Starts Next.js server at http://localhost:3000 |

---

## 🎯 Quick Copy-Paste (All at Once)

```bash
npm install
npm run db:generate
npm run db:push
npm run seed:admin
npm run dev
```

---

## ✅ .env File Status

✅ **.env file has been created** with your Neon PostgreSQL database URL!

**Location:** `.env` in project root

**Database URL:** Already configured with your Neon PostgreSQL connection string.

**⚠️ Important:** Update these values in `.env`:
- `JWT_SECRET` - Change to a secure random string (min 32 characters)
- `CLOUDINARY_*` - Add your Cloudinary credentials for image uploads
- `SMTP_*` - Add your email credentials for sending emails
- `STRIPE_SECRET_KEY` - Add your Stripe key for payments

---

## 🔍 Verify Everything Works

After running all commands:

1. **Check Server:** Should see "Ready" at http://localhost:3000
2. **Test Login:** Go to http://localhost:3000/auth/login
   - Email: `admin@example.com`
   - Password: `admin123456`
3. **Test Public Pages:** Visit http://localhost:3000

---

## 🐛 Troubleshooting

### Error: "Cannot find module '@prisma/client'"
**Fix:**
```bash
npm install
npm run db:generate
```

### Error: "Table already exists"
**Status:** ✅ This is OK! Tables are already created. Continue to next step.

### Error: "Admin user already exists"
**Status:** ✅ This is OK! Admin user exists. Continue to next step.

### Error: "Database connection failed"
**Fix:**
1. Check `.env` file exists
2. Verify `DATABASE_URL` is correct
3. Check Neon dashboard - database should be active

### Error: "Prisma Client not generated"
**Fix:**
```bash
npm run db:generate
```

---

## 📚 Additional Commands

### Open Database GUI (Prisma Studio)
```bash
npm run db:studio
```
Opens visual database browser at http://localhost:5555

### Check Prisma Version
```bash
npx prisma --version
```

### View Database Schema
```bash
npx prisma format
```

---

## 🎉 Success Checklist

- [ ] ✅ `.env` file created
- [ ] ✅ Dependencies installed (`npm install`)
- [ ] ✅ Prisma Client generated (`npm run db:generate`)
- [ ] ✅ Database tables created (`npm run db:push`)
- [ ] ✅ Admin user created (`npm run seed:admin`)
- [ ] ✅ Server running (`npm run dev`)
- [ ] ✅ Can access http://localhost:3000
- [ ] ✅ Can login as admin

---

## 📖 More Help

- **Detailed Setup:** See `SETUP_COMMANDS.md`
- **Quick Reference:** See `QUICK_START.md`
- **Migration Info:** See `MIGRATION_GUIDE.md`

---

**🎯 You're ready to go! Run the commands above and your app will be running!**




