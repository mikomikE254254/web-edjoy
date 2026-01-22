export default function Footer() {
  return (
    <footer className="border-t">
      <div className="container py-8 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Runway Retail. All Rights Reserved.</p>
        <p className="mt-1">
          A demonstration of immersive e-commerce built with Next.js and Three.js.
        </p>
      </div>
    </footer>
  );
}
