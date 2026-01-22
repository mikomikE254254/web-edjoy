import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-secondary/50">
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-12 py-12">
        <div className="space-y-6">
          <h3 className="text-xl font-bold tracking-wide">eddjoys.ke</h3>
          <p className="max-w-sm text-muted-foreground">
            A premium Kenyan clothing & lifestyle fashion brand. Discover curated collections that blend modern sophistication with timeless elegance.
          </p>
          <nav className="flex space-x-6 text-sm font-medium">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <Link href="/women" className="hover:text-primary transition-colors">Women</Link>
            <Link href="/men" className="hover:text-primary transition-colors">Men</Link>
            <Link href="/unisex" className="hover:text-primary transition-colors">Unisex</Link>
          </nav>
          <div className="flex space-x-4">
            <a href="#" aria-label="Facebook" className="text-muted-foreground hover:text-primary transition-colors"><Facebook size={20} /></a>
            <a href="#" aria-label="Instagram" className="text-muted-foreground hover:text-primary transition-colors"><Instagram size={20} /></a>
            <a href="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary transition-colors"><Twitter size={20} /></a>
          </div>
          <p className="text-sm text-muted-foreground">Contact us on WhatsApp: +254 123 456789</p>
        </div>
        
        <div className="flex items-center justify-center md:justify-end">
          <div className="w-full max-w-md h-64 overflow-hidden rounded-xl bg-background/50 p-2 backdrop-blur-sm border border-border/50 shadow-lg">
             <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.868124233152!2d36.7997943152382!3d-1.248385635959918!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f171094382189%3A0x13d66397554f762!2sRunda%20Mall!5e0!3m2!1sen!2ske!4v1678886000000!5m2!1sen!2ske"
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: '0.75rem' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Runda Mall Location"
              ></iframe>
          </div>
        </div>
      </div>
      <div className="container border-t py-6 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} eddjoys.ke. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
