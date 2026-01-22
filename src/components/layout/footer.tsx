import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white text-black py-12 px-6 sm:px-12 lg:px-20 border-t border-gray-200">
      <div className="flex flex-col md:flex-row justify-between items-center gap-12">
        {/* Left side */}
        <div className="flex flex-col gap-8 text-center md:text-left">
          <div>
            <h4 className="font-semibold text-lg mb-3">Eddjoys.ke</h4>
            <nav className="flex flex-wrap justify-center md:justify-start gap-x-5 gap-y-2 text-sm text-gray-800">
              <Link href="/" className="hover:underline">Home</Link>
              <Link href="/women" className="hover:underline">Women</Link>
              <Link href="/men" className="hover:underline">Men</Link>
              <Link href="/children" className="hover:underline">Unisex</Link>
              <Link href="/bags" className="hover:underline">Bags</Link>
            </nav>
            <p className="text-sm text-gray-600 mt-4 max-w-md">
              Discover curated fashion that blends timeless elegance with modern simplicity.
              Each piece is thoughtfully designed to empower your personal style.
              Experience quality craftsmanship and sustainable materials in every collection.
              Join us in celebrating the art of everyday dressing.
            </p>
          </div>
          <div>
            <div className="flex flex-wrap justify-center md:justify-start gap-x-5 gap-y-2 text-xs text-gray-800">
                <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
                <Link href="/terms" className="hover:underline">Terms of Service</Link>
                <Link href="/cookies" className="hover:underline">Cookies</Link>
            </div>
            <p className="text-xs text-gray-500 mt-4">© 2026 Eddjoys.ke. All rights reserved.</p>
          </div>
        </div>

        {/* Right side: Map */}
        <div className="w-[31rem] h-[22rem] rounded-2xl overflow-hidden shadow-lg flex-shrink-0">
          <iframe
            src="https://www.google.com/maps?q=Runda%20Mall,Nairobi&output=embed"
            loading="lazy"
            className="w-full h-full border-0"
          ></iframe>
        </div>
      </div>
    </footer>
  );
}
