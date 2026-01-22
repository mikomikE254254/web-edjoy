import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-secondary mt-16">
      <div className="container grid grid-cols-1 gap-12 py-16 md:grid-cols-2 max-w-6xl mx-auto">
        <div className="space-y-6">
          <h3 className="font-display text-2xl font-bold tracking-wide">Nextgen</h3>
          <p className="max-w-sm text-muted-foreground">
            Discover quality fashion that reflects your style and makes everyday enjoyable.
          </p>
          <nav className="flex space-x-6 text-sm font-medium">
            <Link href="/" className="text-foreground/80 hover:text-primary transition-colors">Home</Link>
            <Link href="/women" className="text-foreground/80 hover:text-primary transition-colors">Women</Link>
            <Link href="/men" className="text-foreground/80 hover:text-primary transition-colors">Men</Link>
            <Link href="/children" className="text-foreground/80 hover:text-primary transition-colors">Children</Link>
          </nav>
          <div className="flex space-x-4">
            <a href="#" aria-label="Facebook" className="text-muted-foreground hover:text-primary transition-colors"><Facebook size={20} /></a>
            <a href="#" aria-label="Instagram" className="text-muted-foreground hover:text-primary transition-colors"><Instagram size={20} /></a>
            <a href="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary transition-colors"><Twitter size={20} /></a>
          </div>
        </div>
        
        <div className="flex items-center justify-center md:justify-end">
          <div className="w-full max-w-md h-64 overflow-hidden rounded-xl bg-white/50 p-1 border shadow-lg">
             <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.868124233152!2d36.7997943152382!3d-1.248385635959918!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f171094382189%3A0x13d66397554f762!2sRunda%20Mall!5e0!3m2!1sen!2ske!4v1678886000000!5m2!1sen!2ske"
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: '0.70rem' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Runda Mall Location"
              ></iframe>
          </div>
        </div>
      </div>
      <div className="container border-t py-6 text-center text-sm text-muted-foreground  max-w-6xl mx-auto">
        <p>&copy; {new Date().getFullYear()} Nextgen. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
