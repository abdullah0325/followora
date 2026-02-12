'use client';

import Link from 'next/link';
import { FiFacebook, FiInstagram, FiTwitter, FiYoutube } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="bg-pink-100 text-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-col-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-gray-900 text-lg font-semibold mb-4">Aroma Flowers</h3>
            <p className="text-sm mb-4">
              Best online flower shop in Dubai & UAE. Fresh flowers, same-day delivery, and midnight delivery available.
            </p>
            <div className="space-y-2 text-sm">
              <p>Phone: +971 XX XXX XXXX</p>
              <p>Email: info@aromaflowers.com</p>
            </div>
            <div className="flex gap-4 mt-4">
<Link 
  href="#" 
  className=" p-2 rounded-full text-white bg-pink-400 hover:bg-pink-500 transition-colors duration-300 group"
>
  <FiFacebook 
    size={20} 
    className="transition-transform duration-700 ease-in-out group-hover:rotate-[360deg]" 
  />
</Link>

              <Link href="#"   className=" p-2 rounded-full text-white bg-pink-400 hover:bg-pink-500 transition-colors duration-300 group"
><FiInstagram size={20}  
                  className="transition-transform duration-700 ease-in-out group-hover:rotate-[360deg]" 
/></Link>
              <Link href="#"   className=" p-2 rounded-full text-white bg-pink-400 hover:bg-pink-500 transition-colors duration-300 group"
><FiTwitter size={20}  
                  className="transition-transform duration-700 ease-in-out group-hover:rotate-[360deg]" 
/></Link>
              <Link href="#"   className=" p-2 rounded-full text-white bg-pink-400 hover:bg-pink-500 transition-colors duration-300 group"
><FiYoutube size={20}  
                  className="transition-transform duration-700 ease-in-out group-hover:rotate-[360deg]" 
/></Link>
            </div>
          </div>

          {/* Information */}
          <div>
            <h3 className="text-gray-900 text-lg font-semibold mb-4">Information</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-pink-500">About Us</Link></li>
              <li><Link href="/delivery" className="hover:text-pink-500">Delivery Information</Link></li>
              <li><Link href="/privacy" className="hover:text-pink-500">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-pink-500">Terms & Conditions</Link></li>
              <li><Link href="/refund" className="hover:text-pink-500">Refund and Return Policy</Link></li>
            </ul>
          </div>

          {/* My Account + Extra Links + Newsletter */}
          <div>
            <h3 className="text-gray-900 text-lg font-semibold mb-4">My Account</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/account" className="hover:text-pink-500">My Account</Link></li>
              <li><Link href="/orders" className="hover:text-pink-500">My Order</Link></li>
              <li><Link href="/wishlist" className="hover:text-pink-500">My Wishlist</Link></li>
              <li><Link href="/cart" className="hover:text-pink-500">My Cart</Link></li>
              <li><Link href="/support" className="hover:text-pink-500">Support</Link></li>
              <li><Link href="/faq" className="hover:text-pink-500">FAQ</Link></li>
            </ul>

          </div>
            {/* Newsletter Signup */}
            <div className="mt-4">
              <h4 className="text-gray-900 font-semibold mb-2">Subscribe to our newsletter</h4>
              <form className="flex flex-col sm:flex-row gap-2">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="p-2 rounded border border-gray-300 flex-1"
                />
                <button className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600">
                  Subscribe
                </button>
              </form>
            </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-pink-200 pt-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Aroma Flowers. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
