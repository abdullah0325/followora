export const metadata = {
  title: 'About Us | Followora',
  description: 'Learn more about Followora - your trusted destination for premium products',
};

export default function AboutPage() {
  return (
    <>
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-8 dark:text-white">About Us</h1>
        
        <div className="prose dark:prose-invert mx-auto">
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            Welcome to Followora, your one-stop destination for premium products. We're dedicated to providing the best quality products with exceptional customer service.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 dark:text-white">Our Story</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Founded with a vision to make quality products accessible to everyone, Followora has grown to become a trusted name in e-commerce. We believe in offering products that combine style, quality, and affordability.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 dark:text-white">Our Mission</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Our mission is to provide an exceptional shopping experience by offering carefully curated products, seamless navigation, and outstanding customer support.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 dark:text-white">Why Choose Us?</h2>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 mb-6">
            <li>Premium quality products</li>
            <li>Secure payment processing</li>
            <li>Fast and reliable delivery</li>
            <li>Excellent customer support</li>
            <li>Easy returns and exchanges</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4 dark:text-white">Contact Us</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Have questions? We'd love to hear from you. Visit our <a href="/contact" className="text-pink-600 hover:underline">Contact page</a> to get in touch with our team.
          </p>
        </div>
      </div>
    </>
  );
}
