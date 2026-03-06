import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../Components/Site/Navbar";
import Hero from "../Components/Site/Hero";
import Stats from "../Components/Site/Stats";
import Services from "../Components/Site/Services";
import Works from "../Components/Site/Works";
import Experience from "../Components/Site/Experience";
import Skills from "../Components/Site/Skills";
import Testimonials from "../Components/Site/testemonials";
import Blogs from "../Components/Site/Blogs";
import Contact from "../Components/Site/Contact";
import Footer from "../Components/Site/Footer";

export default function Site() {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const section = document.querySelector(location.state.scrollTo);
      if (section) section.scrollIntoView({ behavior: "smooth" });
    }
  }, [location.state]);

  return (
    <div className="bg-gray-950 min-h-screen w-full text-white">
      <Navbar />
      <Hero />
      <Stats />
      <Services />
      <Works />
      <Experience />
      <Skills />
      <Testimonials />
      <Blogs />
      <Contact />
      <Footer />
    </div>
  );
}
