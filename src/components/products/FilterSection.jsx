"use client";

export default function FilterSection({ title, children }) {
  return (
    <div className="border-b border-gray-200 dark:border-gray-800 pb-4 last:border-b-0">
      <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
        {title}
      </h3>
      <div className="space-y-2">
        {children}
      </div>
    </div>
  );
}
