# Admin Credentials

## Default Admin Account

**Email:** `admin@example.com`  
**Password:** `admin123`

## How to Use

1. Go to the login page: `http://localhost:3000/auth/login`
2. Enter the email and password above
3. You will be logged in as an admin
4. Access the admin dashboard at `http://localhost:3000/admin`

## Security Notes

- ⚠️ **IMPORTANT:** Change these credentials in production
- The admin account can only be accessed after login
- Protected routes will automatically redirect unauthenticated users to login
- All API endpoints require valid authentication tokens
- Tokens are stored in localStorage and sent via Bearer Authorization header

## Environment Variables

You can customize the default admin credentials by setting these environment variables in `.env`:

```env
ADMIN_USER=your-admin-email@example.com
ADMIN_PASS=your-secure-password
```

Then run:
```bash
npm run seed:admin
```

## Token Management

- Tokens are valid for 7 days
- Tokens are stored in localStorage on the client side
- Tokens are also set as httpOnly cookies on the server side
- On logout, tokens are cleared from both localStorage and cookies

## Admin Features

Once logged in as admin, you can:
- Access the admin dashboard at `/admin`
- Manage categories, occasions, products, and blogs
- View sales orders
- Access other admin-restricted pages

## Need to Reset?

To reset the admin account:

```bash
npm run seed:admin
```

This will create/update the admin account with the credentials from your `.env` file.
