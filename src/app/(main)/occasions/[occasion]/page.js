import { notFound } from 'next/navigation';
import CategoryProducts from '@/components/products/CategoryProducts';

// Valid occasions
const validOccasions = [
  'birthday',
  'anniversary',
  'love-romance',
  'wedding',
  'valentine',
  'new-year',
  'mothers-day',
  'fathers-day',
  'eid',
  'ramadan',
  'christmas',
  'graduation',
  'congratulations',
  'sorry',
  'thank-you',
  'get-well-soon',
];

export async function generateMetadata({ params }) {
  const { occasion } = await params;
  const occasionName = occasion
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    title: `${occasionName} Gifts - Aroma Flowers | ${occasionName} Flowers & Gifts in Dubai & UAE`,
    description: `Find perfect ${occasionName} gifts and flowers in Dubai & UAE. Same-day delivery and midnight delivery available for ${occasionName}.`,
    keywords: [occasionName.toLowerCase(), 'gifts', 'flowers', 'Dubai', 'UAE', occasionName],
    openGraph: {
      title: `${occasionName} Gifts - Aroma Flowers`,
      description: `Perfect ${occasionName} gifts and flowers in Dubai & UAE`,
      type: 'website',
    },
  };
}

export default async function OccasionPage({ params }) {
  const { occasion } = await params;

  // Check if valid occasion
  if (!validOccasions.includes(occasion.toLowerCase())) {
    notFound();
  }

  return <CategoryProducts type="occasion" />;
}


