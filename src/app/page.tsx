import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      
      {/* Placeholder for recap preview sections (future) */}
      {/* 
      <section id="preview" className="min-h-screen">
        <RecapPreview />
      </section>
      */}
    </main>
  );
}
