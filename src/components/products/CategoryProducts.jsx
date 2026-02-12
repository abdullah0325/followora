'use client';

import { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'next/navigation';
import { extractFiltersFromProducts } from '@/lib/slices/filtersSlice';
import { slugToCategory, slugToOccasion, normalizeName } from '@/lib/utils/categoryMapper';
import ProductGrid from './ProductGrid';
import SidebarFilters from './SidebarFilters';
import ProductHeader from './ProductHeader';

export default function CategoryProducts({ type = 'category' }) {
  const dispatch = useDispatch();
  const params = useParams();
  const categoryOrOccasion = params?.category || params?.occasion || '';
  
  const products = useSelector((state) => state.products.products);
  const availableFilters = useSelector((state) => state.filters.availableFilters);

  // Map URL slug to product category/occasion value
  const filterValue = useMemo(() => {
    if (!categoryOrOccasion) return null;
    
    if (type === 'category') {
      return slugToCategory(categoryOrOccasion);
    } else {
      return slugToOccasion(categoryOrOccasion);
    }
  }, [categoryOrOccasion, type]);

  // Extract filters from products on mount
  useEffect(() => {
    if (products.length > 0 && availableFilters.categories.length === 0) {
      dispatch(extractFiltersFromProducts(products));
    }
  }, [products, dispatch, availableFilters.categories.length]);

  // Filter products based on URL and selected filters
  const filteredProducts = useSelector((state) => {
    const { products } = state.products;
    const { selectedFilters, search, sortBy } = state.filters;

    let filtered = [...products];

    // Apply URL-based filter (category or occasion) - PRIMARY FILTER
    if (filterValue) {
      if (type === 'category') {
        filtered = filtered.filter(
          (product) => normalizeName(product.category) === normalizeName(filterValue)
        );
      } else if (type === 'occasion') {
        filtered = filtered.filter(
          (product) => normalizeName(product.occasion) === normalizeName(filterValue)
        );
      }
    }

    // Apply other selected filters (secondary filters)
    if (selectedFilters.deliveryTimes.length > 0) {
      filtered = filtered.filter((product) =>
        selectedFilters.deliveryTimes.includes(product.deliveryTime)
      );
    }

    if (selectedFilters.genders.length > 0) {
      filtered = filtered.filter((product) =>
        selectedFilters.genders.includes(product.gender)
      );
    }

    if (selectedFilters.colors.length > 0) {
      filtered = filtered.filter((product) =>
        selectedFilters.colors.includes(product.color)
      );
    }

    if (selectedFilters.sizes.length > 0) {
      filtered = filtered.filter((product) =>
        selectedFilters.sizes.includes(product.size)
      );
    }

    // Additional category/occasion filters (if not the primary filter)
    if (type !== 'category' && selectedFilters.categories.length > 0) {
      filtered = filtered.filter((product) =>
        selectedFilters.categories.some((cat) =>
          normalizeName(product.category) === normalizeName(cat)
        )
      );
    }

    if (type !== 'occasion' && selectedFilters.occasions.length > 0) {
      filtered = filtered.filter((product) =>
        selectedFilters.occasions.some((occ) =>
          normalizeName(product.occasion) === normalizeName(occ)
        )
      );
    }

    // Search filter
    if (search) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Price range filter
    filtered = filtered.filter(
      (product) =>
        product.price >= selectedFilters.priceRange.min &&
        product.price <= selectedFilters.priceRange.max
    );

    // Sort
    if (sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  });

  // Get category/occasion name for display
  const displayName = useMemo(() => {
    if (!categoryOrOccasion) return '';
    return categoryOrOccasion
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }, [categoryOrOccasion]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            {displayName}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
          </p>
        </div>

        <ProductHeader totalProducts={filteredProducts.length} />
        
        <div className="flex gap-8">
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <SidebarFilters />
          </aside>
          <main className="flex-1">
            <ProductGrid products={filteredProducts} />
          </main>
        </div>
      </div>
    </div>
  );
}

