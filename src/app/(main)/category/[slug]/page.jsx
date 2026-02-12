import CategoryClient from "./CategoryClient";

function capitalizeWords(text) {
  return text
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const formattedSlug = capitalizeWords(slug.replace(/-/g, " "));

  return {
    title: `${formattedSlug} | Followora`,
    description: `Shop best ${formattedSlug} products at best price`,
  };
}

export default async function CategoryPage({ params }) {
  const resolvedParams = await params;
  return <CategoryClient slug={resolvedParams.slug} />;
}
