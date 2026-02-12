import { createSelector } from '@reduxjs/toolkit';

// Select available filters
export const selectAvailableFilters = (state) => state.filters.availableFilters;

// Select selected filters
export const selectSelectedFilters = (state) => state.filters.selectedFilters;

// Select search and sort
export const selectSearch = (state) => state.filters.search;
export const selectSortBy = (state) => state.filters.sortBy;

// Select categories with counts
export const selectCategories = createSelector(
  [selectAvailableFilters],
  (filters) => filters.categories || []
);

// Select occasions with counts
export const selectOccasions = createSelector(
  [selectAvailableFilters],
  (filters) => filters.occasions || []
);

// Select delivery times with counts
export const selectDeliveryTimes = createSelector(
  [selectAvailableFilters],
  (filters) => filters.deliveryTimes || []
);

// Select genders with counts
export const selectGenders = createSelector(
  [selectAvailableFilters],
  (filters) => filters.genders || []
);

// Select colors with counts
export const selectColors = createSelector(
  [selectAvailableFilters],
  (filters) => filters.colors || []
);

// Select sizes with counts
export const selectSizes = createSelector(
  [selectAvailableFilters],
  (filters) => filters.sizes || []
);

// Select price range
export const selectPriceRange = createSelector(
  [selectAvailableFilters],
  (filters) => filters.priceRange || { min: 0, max: 0 }
);


