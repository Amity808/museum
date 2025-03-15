// import Image from "next/image";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import ContentLayout from "@/components/ui/ContentLayout";
import Footer from "@/components/Footer";
import { LayoutGridLayer } from "@/components/CardLayout";

export default function Home() {
  return (
   <div>
    <Navbar />
     <Hero />
    <ContentLayout />
    <LayoutGridLayer />
    <Footer />
   </div>
  );
}
