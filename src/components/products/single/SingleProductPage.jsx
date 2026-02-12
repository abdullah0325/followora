"use client";

import Breadcrumb from "./BreadcrumbComponent";
import Carousel from "./CarouselComponent";
import ProductDetails from "./ProductDetailsComponent";
import ProductDescription from "./ProductDescriptionComponent";

export default function SingleProductPage({ product }) {
  // Combine main image + additional images for carousel
  const images = [product.image, ...(product.images || [])].filter(Boolean);

  return (
    <div className="p-4">
      <Breadcrumb paths={[{ name: "Home", href: "/" }, { name: product.name }]} />

      <div className="flex flex-col lg:flex-row mt-4 gap-6">
        {/* Left: Carousel */}
        <div className="lg:w-1/2">
          <Carousel images={images} />
        </div>

        {/* Right: Details */}
        <div className="lg:w-1/2">
          <ProductDetails product={product} />
        </div>
      </div>

      {/* Description */}
      <ProductDescription description={product.description} />
    </div>
  );
}
