import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { uploadImage } from '@/components/cloudinary/ImageUploader';
import { generateSlug } from '@/lib/generateSlug';
import { verifyAdmin } from '@/lib/auth';

/**
 * POST /api/products
 * Create a single product with multiple images and auto-generated slug
 */
export async function POST(request) {
  try {
    const { error } = await verifyAdmin(request);
    if (error) return error;
    
    const body = await request.formData();

    const name = body.get('name');
    const price = parseFloat(body.get('price'));
    const category = body.get('category');
    const slug = body.get('slug');
    const description = body.get('description');
    const colour = body.get('colour');
    const size = body.get('size');
    let delivery = body.get('delivery');
    const premium = body.get('premium') === 'true';
    const seo_title = body.get('seo_title');
    const seo_description = body.get('seo_description');
    const gender = body.get('gender');
    const badge = body.get('badge');
    const occasionId = body.get('occasions');
    const rating = body.get('rating');

    // Normalize delivery option values to match Prisma enum
    const deliveryMap = {
      'same day': 'same_day',
      'same-day': 'same_day',
      'on-demand': 'on_delivery',
      'on-delivery': 'on_delivery',
      'night-time': 'night_time',
      'night_time': 'night_time',
      'express': 'express',
    };
    if (delivery) {
      delivery = deliveryMap[delivery] || delivery;
    }

    console.log('Creating product:', { name, price, category, delivery });

    // Validate required fields
    if (!name || isNaN(price)) {
      return NextResponse.json({ success: false, message: 'Name and price are required' }, { status: 400 });
    }

    if (price < 0) {
      return NextResponse.json({ success: false, message: 'Price must be valid' }, { status: 400 });
    }

    // Resolve category by id
    let categoryId = null;
    if (category) {
      const categoryDoc = await prisma.category.findFirst({
        where: {
          OR: [
            { id: category },
            { slug: category },
            { name: category.trim() },
          ],
        },
      });
      if (categoryDoc) {
        categoryId = categoryDoc.id;
      }
    }

    // Auto-generate slug if not provided
    const productSlug = slug || generateSlug(name);

    const exists = await prisma.product.findFirst({ where: { slug: productSlug } });
    if (exists) {
      return NextResponse.json({ success: false, message: 'Product with this slug already exists' }, { status: 409 });
    }

    // Handle multiple image uploads
    const files = body.getAll('images') || [];
    const uploadedImages = [];
    for (const file of files) {
      if (file && typeof file === 'object' && file.size > 0) {
        try {
          const buffer = Buffer.from(await file.arrayBuffer());
          const res = await uploadImage(`data:${file.type};base64,${buffer.toString('base64')}`, 'products');
          if (res?.url) {
            uploadedImages.push(res.url);
          }
        } catch (err) {
          console.error('Image upload failed:', err);
        }
      }
    }

    // Prepare occasion connection
    let occasionConnect = undefined;
    if (occasionId) {
      occasionConnect = { id: occasionId };
    }

    // Create product
    const product = await prisma.product.create({
      data: {
        name,
        price,
        category_id: categoryId,
        slug: productSlug,
        description: description || null,
        images: uploadedImages,
        image: uploadedImages.length > 0 ? uploadedImages[0] : null,
        colour: colour || null,
        size: size || null,
        delivery: delivery || 'on_delivery',
        premium,
        seo_title: seo_title || null,
        seo_description: seo_description || null,
        gender: gender || null,
        badge: badge || null,
        ratings: rating ? parseFloat(rating) : null,
        stock: 0,
        tags: [],
        occasions: occasionConnect ? { connect: occasionConnect } : undefined,
      },
      include: {
        category: true,
        occasions: true,
      },
    });

    console.log('Product created:', product.id);
    return NextResponse.json({ success: true, data: { id: product.id, ...product } }, { status: 201 });

  } catch (error) {
    console.error('Product create error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/products
 * Get all products with optional simple filters
 */
export async function GET(request) {
  try {
    const url = new URL(request.url);

    const category = url.searchParams.get('category');
    const color = url.searchParams.get('color');
    const size = url.searchParams.get('size');
    const search = url.searchParams.get('search');
    const minPrice = url.searchParams.get('minPrice');
    const maxPrice = url.searchParams.get('maxPrice');
    const sort = url.searchParams.get('sort') || 'newest';

    const page = Math.max(1, parseInt(url.searchParams.get('page') || '1', 10));
    const limit = Math.min(100, parseInt(url.searchParams.get('limit') || '50', 10));
    const skip = (page - 1) * limit;

    // Build simple where clause
    const where = {};

    // Category filter - resolve slug to id if needed
    if (category) {
      // First try to find category by id, then by slug
      let categoryDoc = await prisma.category.findUnique({
        where: { id: category },
      });
      
      if (!categoryDoc) {
        categoryDoc = await prisma.category.findUnique({
          where: { slug: category },
        });
      }
      
      if (categoryDoc) {
        where.category_id = categoryDoc.id;
      } else {
        // If no matching category, return empty results
        return NextResponse.json({
          success: true,
          data: [],
          facets: { categories: {}, colors: {}, sizes: {} },
          pagination: { page, limit, total: 0, totalPages: 0 },
        });
      }
    }

    // Color filter
    if (color) {
      where.colour = color;
    }

    // Size filter
    if (size) {
      where.size = size;
    }

    // Search filter
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Price range
    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = parseFloat(minPrice);
      if (maxPrice) where.price.lte = parseFloat(maxPrice);
    }

    // Sorting
    let orderBy = {};
    switch (sort) {
      case 'price-low':
        orderBy = { price: 'asc' };
        break;
      case 'price-high':
        orderBy = { price: 'desc' };
        break;
      case 'name-asc':
        orderBy = { name: 'asc' };
        break;
      case 'name-desc':
        orderBy = { name: 'desc' };
        break;
      default:
        orderBy = { created_at: 'desc' };
    }

    // Get total count
    const total = await prisma.product.count({ where });

    // Get products
    const products = await prisma.product.findMany({
      where,
      orderBy,
      skip,
      take: limit,
      include: {
        category: true,
        occasions: true,
      },
    });

    // Get facets (all products without pagination)
    const allProducts = await prisma.product.findMany({
      where: {},
      include: { category: true, occasions: true },
    });

    // Calculate facets
    const facets = {
      categories: {},
      colors: {},
      sizes: {},
    };

    allProducts.forEach(product => {
      // Categories
      if (product.category_id && product.category) {
        const catName = product.category.name;
        facets.categories[catName] = (facets.categories[catName] || 0) + 1;
      }

      // Colors
      if (product.colour) {
        facets.colors[product.colour] = (facets.colors[product.colour] || 0) + 1;
      }

      // Sizes
      if (product.size) {
        facets.sizes[product.size] = (facets.sizes[product.size] || 0) + 1;
      }
    });

    return NextResponse.json({
      success: true,
      data: products,
      facets,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });

  } catch (error) {
    console.error('GET /api/products Error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Server error' },
      { status: 500 }
    );
  }
}
