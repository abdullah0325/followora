import Link from "next/link";

export default function CategoryLinks({ categories, onClick }) {
  return (
    <>
      {categories.map((cat) => (
        <Link
          key={cat.id}
          href={`/category/${cat.slug}`}
          onClick={onClick}
          className="text-xs xl:text-sm text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition-colors font-medium"
        >
          {cat.name}
        </Link>
      ))}
    </>
  );
}
