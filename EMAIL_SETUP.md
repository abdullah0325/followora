# Email Service Setup Guide

This project uses Nodemailer for sending emails (verification, welcome, and order confirmation).

## Installation

The `nodemailer` package is already installed. If you need to reinstall:

```bash
npm install nodemailer
```

## Environment Variables

Add to `.env.local`:

```env
# Email Service Configuration (Nodemailer)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM_NAME=UAE Followers

# App URL (for email links)
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Email Configuration Details

- **EMAIL_HOST**: SMTP server hostname (e.g., `smtp.gmail.com`, `smtp.outlook.com`, `smtp.mailgun.org`)
- **EMAIL_PORT**: SMTP server port (usually `587` for TLS or `465` for SSL)
- **EMAIL_USER**: Your email address
- **EMAIL_PASS**: Your email password or app-specific password
- **EMAIL_FROM_NAME**: Display name for sent emails (optional, defaults to "UAE Followers")
- **NEXT_PUBLIC_APP_URL**: Base URL of your application (used for email links)

## Gmail Setup (Recommended for Development)

1. Go to your Google Account settings
2. Enable 2-Step Verification
3. Go to App Passwords: https://myaccount.google.com/apppasswords
4. Generate an app password for "Mail"
5. Use this app password as `EMAIL_PASS` (not your regular Gmail password)

## Other Email Providers

### Outlook/Hotmail
```env
EMAIL_HOST=smtp-mail.outlook.com
EMAIL_PORT=587
EMAIL_USER=your-email@outlook.com
EMAIL_PASS=your-password
```

### Mailgun
```env
EMAIL_HOST=smtp.mailgun.org
EMAIL_PORT=587
EMAIL_USER=postmaster@your-domain.mailgun.org
EMAIL_PASS=your-mailgun-smtp-password
```

### SendGrid
```env
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_USER=apikey
EMAIL_PASS=your-sendgrid-api-key
```

### Custom SMTP Server
```env
EMAIL_HOST=your-smtp-server.com
EMAIL_PORT=587
EMAIL_USER=your-username
EMAIL_PASS=your-password
```

## Usage

The email service is automatically integrated into:

1. **Signup Route** (`/api/auth/signup`):
   - Sends verification email with verification link
   - Sends welcome email

2. **Orders Route** (`/api/orders`):
   - Sends order confirmation email when an order is created

### Manual Usage

You can also use the email functions directly:

```javascript
import { 
  sendVerificationEmail, 
  sendWelcomeEmail, 
  sendOrderConfirmationEmail 
} from '@/lib/email';

// Send verification email
await sendVerificationEmail({
  email: 'user@example.com',
  firstName: 'John',
  verificationToken: 'token-here'
});

// Send welcome email
await sendWelcomeEmail({
  email: 'user@example.com',
  firstName: 'John'
});

// Send order confirmation email
await sendOrderConfirmationEmail({
  email: 'user@example.com',
  firstName: 'John',
  order: {
    id: 'order-id',
    items: [...],
    total_amount: 100,
    order_status: 'pending',
    payment_status: 'paid',
    shipping_address: {...},
    created_at: new Date()
  }
});
```

## Email Features

- ✅ Email verification with secure tokens
- ✅ Welcome emails for new users
- ✅ Order confirmation emails with order details
- ✅ HTML email templates
- ✅ Console logging for debugging
- ✅ Error handling (emails fail gracefully without breaking the app)

## Troubleshooting

### Emails Not Sending

1. **Check environment variables**: Make sure all email variables are set in `.env.local`
2. **Verify SMTP credentials**: Test your email/password or app password
3. **Check console logs**: The email service logs detailed information for debugging
4. **Firewall/Security**: Some email providers block SMTP from certain IPs
5. **Port**: Try port `465` (SSL) instead of `587` (TLS) if you get connection errors

### Gmail Specific Issues

- Use an **App Password**, not your regular Gmail password
- Make sure 2-Step Verification is enabled
- Check if "Less secure app access" is enabled (if available)

### Development Mode

If email credentials are not set, emails will fail gracefully with warnings in the console. The application will continue to work normally.

## Production Considerations

1. Use a production email service (Mailgun, SendGrid, AWS SES, etc.)
2. Set `NEXT_PUBLIC_APP_URL` to your production domain
3. Use environment variables from your hosting provider (Vercel, AWS, etc.)
4. Monitor email delivery rates
5. Consider implementing email queues for high volume



