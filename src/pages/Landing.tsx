import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import Categories from "@/components/sections/Categories";
import FeaturedCollection from "@/components/sections/FeaturedCollection";
import Showroom from "@/components/sections/Showroom";
import WhyChoose from "@/components/sections/WhyChoose";
import About from "@/components/sections/About";
import CustomFurniture from "@/components/sections/CustomFurniture";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <Navbar />
      <main>
        <Hero />
        <Categories />
        <FeaturedCollection />
        <Showroom />
        <WhyChoose />
        <About />
        <CustomFurniture />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
