// 'use client';

// import Link from 'next/link';
// import { FiFacebook, FiInstagram, FiTwitter, FiYoutube } from 'react-icons/fi';

// export default function Footer() {
//   return (
//     <footer className="bg-pink-100 text-gray-800">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         {/* Main Footer Content */}
//         <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-col-4 gap-8 mb-8">
//           {/* Company Info */}
//           <div>
//             <h3 className="text-gray-900 text-lg font-semibold mb-4">Flowora Shop</h3>
//             <p className="text-sm mb-4">
//               Best online flower shop in Dubai & UAE. Fresh flowers, same-day delivery, and midnight delivery available.
//             </p>
//             <div className="space-y-2 text-sm">
//               <p>Phone: +923251851838</p>
//               <p>Email: abdullah032518@gmail.com</p>
//             </div>
//             <div className="flex gap-4 mt-4">
// <Link 
//   href="#" 
//   className=" p-2 rounded-full text-white bg-pink-400 hover:bg-pink-500 transition-colors duration-300 group"
// >
//   <FiFacebook 
//     size={20} 
//     className="transition-transform duration-700 ease-in-out group-hover:rotate-[360deg]" 
//   />
// </Link>

//               <Link href="#"   className=" p-2 rounded-full text-white bg-pink-400 hover:bg-pink-500 transition-colors duration-300 group"
// ><FiInstagram size={20}  
//                   className="transition-transform duration-700 ease-in-out group-hover:rotate-[360deg]" 
// /></Link>
//               <Link href="#"   className=" p-2 rounded-full text-white bg-pink-400 hover:bg-pink-500 transition-colors duration-300 group"
// ><FiTwitter size={20}  
//                   className="transition-transform duration-700 ease-in-out group-hover:rotate-[360deg]" 
// /></Link>
//               <Link href="#"   className=" p-2 rounded-full text-white bg-pink-400 hover:bg-pink-500 transition-colors duration-300 group"
// ><FiYoutube size={20}  
//                   className="transition-transform duration-700 ease-in-out group-hover:rotate-[360deg]" 
// /></Link>
//             </div>
//           </div>

//           {/* Information */}
//           <div>
//             <h3 className="text-gray-900 text-lg font-semibold mb-4">Information</h3>
//             <ul className="space-y-2 text-sm">
//               <li><Link href="/about" className="hover:text-pink-500">About Us</Link></li>
//               <li><Link href="/delivery" className="hover:text-pink-500">Delivery Information</Link></li>
//               <li><Link href="/privacy" className="hover:text-pink-500">Privacy Policy</Link></li>
//               <li><Link href="/terms" className="hover:text-pink-500">Terms & Conditions</Link></li>
//               <li><Link href="/refund" className="hover:text-pink-500">Refund and Return Policy</Link></li>
//             </ul>
//           </div>

//           {/* My Account + Extra Links + Newsletter */}
//           <div>
//             <h3 className="text-gray-900 text-lg font-semibold mb-4">My Account</h3>
//             <ul className="space-y-2 text-sm">
//               <li><Link href="/account" className="hover:text-pink-500">My Account</Link></li>
//               <li><Link href="/orders" className="hover:text-pink-500">My Order</Link></li>
//               <li><Link href="/wishlist" className="hover:text-pink-500">My Wishlist</Link></li>
//               <li><Link href="/cart" className="hover:text-pink-500">My Cart</Link></li>
//               <li><Link href="/support" className="hover:text-pink-500">Support</Link></li>
//               <li><Link href="/faq" className="hover:text-pink-500">FAQ</Link></li>
//             </ul>

//           </div>
//             {/* Newsletter Signup */}
//             <div className="mt-4">
//               <h4 className="text-gray-900 font-semibold mb-2">Subscribe to our newsletter</h4>
//               <form className="flex flex-col sm:flex-row gap-2">
//                 <input 
//                   type="email" 
//                   placeholder="Enter your email" 
//                   className="p-2 rounded border border-gray-300 flex-1"
//                 />
//                 <button className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600">
//                   Subscribe
//                 </button>
//               </form>
//             </div>
//         </div>

//         {/* Bottom Bar */}
//         <div className="border-t border-pink-200 pt-6 text-center text-sm">
//           <p>&copy; {new Date().getFullYear()} Flowora Shop. All rights reserved.</p>
//         </div>
//       </div>
//     </footer>
//   );
// }



'use client';

import Link from 'next/link';
import { FiFacebook, FiInstagram, FiTwitter, FiYoutube } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-pink-100 text-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Main Footer Content - Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 mb-8">
          
          {/* Company Info */}
          <div className="text-center sm:text-left">
            <h3 className="text-gray-900 text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Flowora Shop</h3>
            <p className="text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed">
              Best online flower shop in Dubai & UAE. Fresh flowers, same-day delivery, and midnight delivery available.
            </p>
            
            {/* Contact Info with WhatsApp */}
            <div className="space-y-2 text-xs sm:text-sm">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <FaWhatsapp className="text-green-600 w-4 h-4 sm:w-5 sm:h-5" />
                <Link 
                  href="https://wa.me/923251851838" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-green-600 transition-colors"
                >
                  +92 325 1851838
                </Link>
              </div>
              <p>Email: abdullah032518@gmail.com</p>
            </div>
            
            {/* Social Icons */}
            <div className="flex gap-2 sm:gap-3 mt-4 justify-center sm:justify-start">
              <Link 
                href="#" 
                className="p-1.5 sm:p-2 rounded-full text-white bg-pink-400 hover:bg-pink-500 transition-colors duration-300 group"
              >
                <FiFacebook 
                  size={16} 
                  className="sm:w-5 sm:h-5 transition-transform duration-700 ease-in-out group-hover:rotate-[360deg]" 
                />
              </Link>
              <Link 
                href="#" 
                className="p-1.5 sm:p-2 rounded-full text-white bg-pink-400 hover:bg-pink-500 transition-colors duration-300 group"
              >
                <FiInstagram 
                  size={16} 
                  className="sm:w-5 sm:h-5 transition-transform duration-700 ease-in-out group-hover:rotate-[360deg]" 
                />
              </Link>
              <Link 
                href="#" 
                className="p-1.5 sm:p-2 rounded-full text-white bg-pink-400 hover:bg-pink-500 transition-colors duration-300 group"
              >
                <FiTwitter 
                  size={16} 
                  className="sm:w-5 sm:h-5 transition-transform duration-700 ease-in-out group-hover:rotate-[360deg]" 
                />
              </Link>
              <Link 
                href="#" 
                className="p-1.5 sm:p-2 rounded-full text-white bg-pink-400 hover:bg-pink-500 transition-colors duration-300 group"
              >
                <FiYoutube 
                  size={16} 
                  className="sm:w-5 sm:h-5 transition-transform duration-700 ease-in-out group-hover:rotate-[360deg]" 
                />
              </Link>
              {/* WhatsApp Social Icon */}
              <Link 
                href="https://wa.me/923251851838"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 sm:p-2 rounded-full text-white bg-green-500 hover:bg-green-600 transition-colors duration-300 group"
              >
                <FaWhatsapp 
                  size={16} 
                  className="sm:w-5 sm:h-5 transition-transform duration-700 ease-in-out group-hover:rotate-[360deg]" 
                />
              </Link>
            </div>
          </div>

          {/* Information */}
          <div className="text-center sm:text-left">
            <h3 className="text-gray-900 text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Information</h3>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
              <li><Link href="/about" className="hover:text-pink-500 transition-colors">About Us</Link></li>
              <li><Link href="/delivery" className="hover:text-pink-500 transition-colors">Delivery Information</Link></li>
              <li><Link href="/privacy" className="hover:text-pink-500 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-pink-500 transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/refund" className="hover:text-pink-500 transition-colors">Refund and Return Policy</Link></li>
            </ul>
          </div>

          {/* My Account */}
          <div className="text-center sm:text-left">
            <h3 className="text-gray-900 text-lg sm:text-xl font-semibold mb-3 sm:mb-4">My Account</h3>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
              <li><Link href="/account" className="hover:text-pink-500 transition-colors">My Account</Link></li>
              <li><Link href="/orders" className="hover:text-pink-500 transition-colors">My Order</Link></li>
              <li><Link href="/wishlist" className="hover:text-pink-500 transition-colors">My Wishlist</Link></li>
              <li><Link href="/cart" className="hover:text-pink-500 transition-colors">My Cart</Link></li>
              <li><Link href="/support" className="hover:text-pink-500 transition-colors">Support</Link></li>
              <li><Link href="/faq" className="hover:text-pink-500 transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Quick Help - Replaced Newsletter */}
          <div className="text-center sm:text-left">
            <h3 className="text-gray-900 text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Quick Help</h3>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
              <li className="flex items-center justify-center sm:justify-start gap-2">
                <span className="text-pink-500">•</span>
                <span>24/7 Customer Support</span>
              </li>
              <li className="flex items-center justify-center sm:justify-start gap-2">
                <span className="text-pink-500">•</span>
                <span>Same Day Delivery</span>
              </li>
              <li className="flex items-center justify-center sm:justify-start gap-2">
                <span className="text-pink-500">•</span>
                <span>Midnight Delivery</span>
              </li>
              <li className="flex items-center justify-center sm:justify-start gap-2">
                <span className="text-pink-500">•</span>
                <span>Fresh Flowers Guarantee</span>
              </li>
              <li className="flex items-center justify-center sm:justify-start gap-2">
                <span className="text-pink-500">•</span>
                <span>Secure Payment</span>
              </li>
            </ul>
            
            {/* Floating WhatsApp Button for Mobile */}
            <Link
              href="https://wa.me/923251851838"
              target="_blank"
              rel="noopener noreferrer"
              className="lg:hidden fixed bottom-4 right-4 bg-green-500 text-white p-3 sm:p-4 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 z-50 flex items-center justify-center"
              aria-label="Chat on WhatsApp"
            >
              <FaWhatsapp size={20} className="sm:w-6 sm:h-6" />
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-pink-200 pt-6 text-center text-xs sm:text-sm">
          <p>&copy; {new Date().getFullYear()} Flowora Shop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}