import Navbar from '../Components/Site/Navbar';
import Hero from '../Components/Site/Hero';
import Stats from '../Components/Site/Stats';
import Services from '../Components/Site/Services';
import Works from '../Components/Site/Works';
import Experience from '../Components/Site/Experience';
import Skills from '../Components/Site/Skills';
import Testimonials from '../Components/Site/testemonials';
import Blogs from '../Components/Site/Blogs';
import Contact from '../Components/Site/Contact';
import Footer from '../Components/Site/Footer';
// import AppScripts from '../Components/AppScripts';

export default function Site() {
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
      {/* <AppScripts/> */}
    </div>
  );
}
