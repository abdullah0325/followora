"use client";

import { useProduct } from "@/hooks/ProductContext";
import FilterSection from "./FilterSection";

export default function SidebarFilters() {
  const { filters, setFilters, facets } = useProduct();

  // Toggle single-value filter (if already selected, clear it)
  const setSingleFilter = (key, value) => {
    setFilters((prev) => {
      const newValue = prev[key] === value ? "" : value;
      return {
        ...prev,
        [key]: newValue,
        page: 1 // reset page on filter change
      };
    });
  };

  const hasActiveFilters =
    !!filters.category ||
    !!filters.occasion ||
    !!filters.color ||
    !!filters.size;

  return (
    <aside className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-bold text-lg">Filters</h2>
        {hasActiveFilters && (
          <button
            onClick={() => {
              setFilters({
                category: "",
                occasion: "",
                color: "",
                size: "",
                search: "",
                page: 1
              });
            }}
            className="text-sm text-pink-600 hover:underline"
          >
            Reset
          </button>
        )}
      </div>

      {/* Categories */}
      {facets?.categories && Object.keys(facets.categories).length > 0 && (
        <FilterSection title="Collection">
          {Object.entries(facets.categories).map(([name, count]) => (
            <RadioItem
              key={name}
              label={name}
              count={count}
              active={filters.category === name}
              onClick={() => setSingleFilter("category", name)}
            />
          ))}
        </FilterSection>
      )}

      {/* Occasions */}
      {facets?.occasions && Object.keys(facets.occasions).length > 0 && (
        <FilterSection title="Occasion">
          {Object.entries(facets.occasions).map(([name, count]) => (
            <RadioItem
              key={name}
              label={name}
              count={count}
              active={filters.occasion === name}
              onClick={() => setSingleFilter("occasion", name)}
            />
          ))}
        </FilterSection>
      )}

      {/* Colors */}
      {facets?.colors && Object.keys(facets.colors).length > 0 && (
        <FilterSection title="Color">
          {Object.entries(facets.colors).map(([name, count]) => (
            <RadioItem
              key={name}
              label={name}
              count={count}
              active={filters.color === name}
              onClick={() => setSingleFilter("color", name)}
            />
          ))}
        </FilterSection>
      )}

      {/* Sizes */}
      {facets?.sizes && Object.keys(facets.sizes).length > 0 && (
        <FilterSection title="Size">
          {Object.entries(facets.sizes).map(([name, count]) => (
            <RadioItem
              key={name}
              label={name}
              count={count}
              active={filters.size === name}
              onClick={() => setSingleFilter("size", name)}
            />
          ))}
        </FilterSection>
      )}
    </aside>
  );
}

function RadioItem({ label, count, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex justify-between items-center py-2 text-sm rounded-lg transition ${
        active
          ? "bg-pink-100 text-pink-600 font-semibold"
          : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
      }`}
    >
      <span className="capitalize">{label}</span>
      <span className="text-xs text-gray-400">({count})</span>
    </button>
  );
}
