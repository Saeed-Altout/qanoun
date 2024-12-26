import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Testimonials } from "@/components/sections/testimonials";
import { CTA } from "@/components/sections/cta";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Hero />
      <Services />
      <Testimonials />
      <CTA />
      <Contact />
      <Footer />
    </main>
  );
}
