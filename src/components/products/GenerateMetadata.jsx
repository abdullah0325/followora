import { store } from '@/lib/store';

export async function generateMetadata({ params }) {
  const { productSlug } = params;

  const state = store.getState();
  const product = state.products.products.find(
    (p) => p.slug === productSlug
  );

  if (!product) {
    return {
      title: 'Product Not Found | Aroma Follower',
      description: 'The product you are looking for does not exist.',
    };
  }

  return {
    title: product.seo_title || `${product.name} | Aroma Follower`,
    description:
      product.seo_description ||
      `Buy ${product.name} online from Aroma Follower. Same-day delivery available.`,

    openGraph: {
      title: product.seo_title || product.name,
      description:
        product.seo_description ||
        `Order ${product.name} from Aroma Follower.`,
      images: product.images?.length
        ? [product.images[0]]
        : ['/images/og-default.jpg'],
      type: 'product',
    },

    twitter: {
      card: 'summary_large_image',
      title: product.seo_title || product.name,
      description:
        product.seo_description ||
        `Buy ${product.name} online from Aroma Follower.`,
      images: product.images?.length
        ? [product.images[0]]
        : ['/images/og-default.jpg'],
    },
  };
}
