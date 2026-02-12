# PowerShell script to create .env file
$envContent = @"
# ============================================
# DATABASE CONFIGURATION (Neon PostgreSQL)
# ============================================
DATABASE_URL="postgresql://neondb_owner:npg_r3zjFtAsxOy4@ep-autumn-night-ahzy4tn5-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"

# ============================================
# JWT AUTHENTICATION
# ============================================
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production-min-32-chars"

# ============================================
# ADMIN USER CREDENTIALS (for seed script)
# ============================================
ADMIN_USER="admin@example.com"
ADMIN_PASS="admin123456"

# ============================================
# CLOUDINARY (Image Upload)
# ============================================
CLOUDINARY_CLOUD_NAME="your-cloudinary-cloud-name"
CLOUDINARY_API_KEY="your-cloudinary-api-key"
CLOUDINARY_API_SECRET="your-cloudinary-api-secret"

# ============================================
# EMAIL CONFIGURATION (SMTP)
# ============================================
SMTP_USER="your-smtp-username"
SMTP_PASS="your-smtp-password"
SENDER_EMAIL="noreply@yourapp.com"

# ============================================
# STRIPE PAYMENT
# ============================================
STRIPE_SECRET_KEY="sk_test_your-stripe-secret-key"

# ============================================
# APPLICATION URL
# ============================================
NEXT_PUBLIC_BASE_URL="http://localhost:3000"

# ============================================
# NODE ENVIRONMENT
# ============================================
NODE_ENV="development"
"@

$envContent | Out-File -FilePath ".env" -Encoding utf8
Write-Host "✅ .env file created successfully!" -ForegroundColor Green




