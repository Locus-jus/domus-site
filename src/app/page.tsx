import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Debates from "@/components/sections/Debates";
import WhatWeDo from "@/components/sections/WhatWeDo";
import WhyDomus from "@/components/sections/WhyDomus";
import Events from "@/components/sections/Events";
import Articles from "@/components/sections/Articles";
import History from "@/components/sections/History";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <Debates />
        <WhatWeDo />
        <WhyDomus />
        <Articles />
        <History />
      </main>
      <Footer />
    </>
  );
}
