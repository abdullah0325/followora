import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // Available filter options (extracted from products)
  availableFilters: {
    categories: [],
    occasions: [],
    deliveryTimes: [],
    genders: [],
    colors: [],
    sizes: [],
    priceRange: { min: 0, max: 0 },
  },
  // Selected filters
  selectedFilters: {
    categories: [],
    occasions: [],
    deliveryTimes: [],
    genders: [],
    colors: [],
    sizes: [],
    priceRange: { min: 0, max: 0 },
  },
  search: '',
  sortBy: 'recommended',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    // Extract filters from products
    extractFiltersFromProducts: (state, action) => {
      const products = action.payload;
      
      // Extract unique categories with counts
      const categoryMap = new Map();
      products.forEach((product) => {
        if (product.category) {
          categoryMap.set(product.category, (categoryMap.get(product.category) || 0) + 1);
        }
      });
      state.availableFilters.categories = Array.from(categoryMap.entries()).map(([name, count]) => ({
        name,
        count,
      }));

      // Extract unique occasions with counts
      const occasionMap = new Map();
      products.forEach((product) => {
        if (product.occasion) {
          occasionMap.set(product.occasion, (occasionMap.get(product.occasion) || 0) + 1);
        }
      });
      state.availableFilters.occasions = Array.from(occasionMap.entries()).map(([name, count]) => ({
        name,
        count,
      }));

      // Extract unique delivery times with counts
      const deliveryTimeMap = new Map();
      products.forEach((product) => {
        if (product.deliveryTime) {
          deliveryTimeMap.set(product.deliveryTime, (deliveryTimeMap.get(product.deliveryTime) || 0) + 1);
        }
      });
      state.availableFilters.deliveryTimes = Array.from(deliveryTimeMap.entries()).map(([name, count]) => ({
        name,
        count,
      }));

      // Extract unique genders with counts
      const genderMap = new Map();
      products.forEach((product) => {
        if (product.gender) {
          genderMap.set(product.gender, (genderMap.get(product.gender) || 0) + 1);
        }
      });
      state.availableFilters.genders = Array.from(genderMap.entries()).map(([name, count]) => ({
        name,
        count,
      }));

      // Extract unique colors with counts
      const colorMap = new Map();
      products.forEach((product) => {
        if (product.color) {
          colorMap.set(product.color, (colorMap.get(product.color) || 0) + 1);
        }
      });
      state.availableFilters.colors = Array.from(colorMap.entries()).map(([name, count]) => ({
        name,
        count,
      }));

      // Extract unique sizes with counts
      const sizeMap = new Map();
      products.forEach((product) => {
        if (product.size) {
          sizeMap.set(product.size, (sizeMap.get(product.size) || 0) + 1);
        }
      });
      state.availableFilters.sizes = Array.from(sizeMap.entries()).map(([name, count]) => ({
        name,
        count,
      }));

      // Extract price range
      if (products.length > 0) {
        const prices = products.map((p) => p.price);
        state.availableFilters.priceRange = {
          min: Math.min(...prices),
          max: Math.max(...prices),
        };
        // Initialize selected price range
        state.selectedFilters.priceRange = {
          min: Math.min(...prices),
          max: Math.max(...prices),
        };
      }
    },
    // Toggle category filter
    toggleCategory: (state, action) => {
      const category = action.payload;
      if (state.selectedFilters.categories.includes(category)) {
        state.selectedFilters.categories = state.selectedFilters.categories.filter((c) => c !== category);
      } else {
        state.selectedFilters.categories.push(category);
      }
    },
    // Toggle occasion filter
    toggleOccasion: (state, action) => {
      const occasion = action.payload;
      if (state.selectedFilters.occasions.includes(occasion)) {
        state.selectedFilters.occasions = state.selectedFilters.occasions.filter((o) => o !== occasion);
      } else {
        state.selectedFilters.occasions.push(occasion);
      }
    },
    // Toggle delivery time filter
    toggleDeliveryTime: (state, action) => {
      const deliveryTime = action.payload;
      if (state.selectedFilters.deliveryTimes.includes(deliveryTime)) {
        state.selectedFilters.deliveryTimes = state.selectedFilters.deliveryTimes.filter((d) => d !== deliveryTime);
      } else {
        state.selectedFilters.deliveryTimes.push(deliveryTime);
      }
    },
    // Toggle gender filter
    toggleGender: (state, action) => {
      const gender = action.payload;
      if (state.selectedFilters.genders.includes(gender)) {
        state.selectedFilters.genders = state.selectedFilters.genders.filter((g) => g !== gender);
      } else {
        state.selectedFilters.genders.push(gender);
      }
    },
    // Toggle color filter
    toggleColor: (state, action) => {
      const color = action.payload;
      if (state.selectedFilters.colors.includes(color)) {
        state.selectedFilters.colors = state.selectedFilters.colors.filter((c) => c !== color);
      } else {
        state.selectedFilters.colors.push(color);
      }
    },
    // Toggle size filter
    toggleSize: (state, action) => {
      const size = action.payload;
      if (state.selectedFilters.sizes.includes(size)) {
        state.selectedFilters.sizes = state.selectedFilters.sizes.filter((s) => s !== size);
      } else {
        state.selectedFilters.sizes.push(size);
      }
    },
    // Set price range
    setPriceRange: (state, action) => {
      state.selectedFilters.priceRange = action.payload;
    },
    // Set search
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    // Set sort by
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    // Clear all selected filters
    clearFilters: (state) => {
      state.selectedFilters = {
        categories: [],
        occasions: [],
        deliveryTimes: [],
        genders: [],
        colors: [],
        sizes: [],
        priceRange: state.availableFilters.priceRange,
      };
      state.search = '';
      state.sortBy = 'recommended';
    },
  },
});

export const {
  extractFiltersFromProducts,
  toggleCategory,
  toggleOccasion,
  toggleDeliveryTime,
  toggleGender,
  toggleColor,
  toggleSize,
  setPriceRange,
  setSearch,
  setSortBy,
  clearFilters,
} = filtersSlice.actions;
export default filtersSlice.reducer;
