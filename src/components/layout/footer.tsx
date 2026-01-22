import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white text-black py-16 px-6 sm:px-12 lg:px-20">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-8 pb-10">
        <div className="flex flex-col gap-4">
          <h4 className="font-semibold text-base">Eddjoys.ke</h4>
          <nav className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-800">
            <Link href="/" className="hover:underline">Home</Link>
            <Link href="/women" className="hover:underline">Women</Link>
            <Link href="/men" className="hover:underline">Men</Link>
            <Link href="/unisex" className="hover:underline">Unisex</Link>
            <Link href="/contact" className="hover:underline">Contact</Link>
          </nav>
        </div>
        <div className="w-full max-w-sm md:w-auto">
          <label className="text-sm font-medium">Subscribe</label>
          <div className="flex mt-2">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="w-full text-sm border border-r-0 border-gray-300 px-3 py-2 focus:ring-black focus:border-black outline-none"
            />
            <button className="bg-black text-white text-sm font-semibold px-4 py-2 border border-black hover:bg-gray-800 transition-colors">
              Subscribe
            </button>
          </div>
          <small className="text-xs text-gray-500 mt-2 block">
            By subscribing you agree to our Privacy Policy.
          </small>
        </div>
      </div>

      {/* Centerpiece & Map */}
      <div className="relative my-20 lg:my-24">
        <h1 className="text-7xl sm:text-8xl md:text-9xl lg:text-[120px] font-extrabold tracking-tighter text-black break-words">
          EDDJOYS
        </h1>
        <div className="absolute top-1/2 -translate-y-1/2 right-0 lg:right-[10%] w-64 h-44 rounded-2xl overflow-hidden shadow-2xl hidden md:block">
          <iframe
            src="https://www.google.com/maps?q=Runda%20Mall,Nairobi&output=embed"
            loading="lazy"
            className="w-full h-full border-0"
          ></iframe>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-6 pt-5 border-t border-gray-200">
        <p className="text-xs text-gray-500">© 2026 Eddjoys.ke. All rights reserved.</p>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-gray-800">
          <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
          <Link href="/terms" className="hover:underline">Terms of Service</Link>
          <Link href="/cookies" className="hover:underline">Cookies</Link>
        </div>
      </div>
    </footer>
  );
}
