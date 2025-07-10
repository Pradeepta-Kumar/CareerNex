import Accelarate from "@/components/Home/Accelarate";
import FAQ from "@/components/Home/FAQ";
import Features from "@/components/Home/Features";
import Hero from "@/components/Home/Hero";
import HowItWorks from "@/components/Home/HowItWorks";
import Stats from "@/components/Home/Stats";
import Testimonial from "@/components/Home/Testimonial";


export default function Home() {
  return (
    <div className="bg-black text-white">
      <Hero />
      <Features />
      <Stats />
      <HowItWorks />
      <Testimonial />
      <FAQ />
      <Accelarate />
    </div>
  );
}
