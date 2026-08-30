import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import WhatWeDo from "@/components/sections/WhatWeDo";
import WhyDomus from "@/components/sections/WhyDomus";
import Debates from "@/components/sections/Debates";
import Events from "@/components/sections/Events";
import Ranking from "@/components/sections/Ranking";
import Debaters from "@/components/sections/Debaters";
import Articles from "@/components/sections/Articles";
import History from "@/components/sections/History";
import JoinUs from "@/components/sections/JoinUs";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <WhatWeDo />
        <WhyDomus />
        <Debates />
        <Events />
        <Ranking />
        <Debaters />
        <Articles />
        <History />
        <JoinUs />
      </main>
      <Footer />
    </>
  );
}
