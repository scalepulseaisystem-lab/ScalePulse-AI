import ContactForm from "@/components/ContactForm";
import CursorGlow from "@/components/CursorGlow";
import Expertise from "@/components/Expertise";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Packages from "@/components/Packages";
import Roadmap from "@/components/Roadmap";
import Services from "@/components/Services";

export default function Home() {
  return (
    <>
      <CursorGlow />
      <Navbar />
      <main>
        <Hero />
        <Expertise />
        <Services />
        <Packages />
        <Roadmap />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
