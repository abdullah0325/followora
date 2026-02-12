"use client";

import Link from "next/link";

export default function Breadcrumb({ paths }) {
  return (
    <div className="flex items-center gap-2 text-sm font-medium bg-gradient-to-r from-pink-400 to-pink-600 text-white px-4 py-2 rounded">
      {paths.map((p, i) => (
        <span key={i} className="flex items-center gap-2">
          {p.href ? (
            <Link href={p.href} className="hover:underline">
              {p.name}
            </Link>
          ) : (
            <span>{p.name}</span>
          )}
          {i < paths.length - 1 && <span>/</span>}
        </span>
      ))}
    </div>
  );
}
