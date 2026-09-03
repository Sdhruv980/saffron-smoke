import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Menu from './components/Menu';
import Features from './components/Features';
import Offers from './components/Offers';
import Reviews from './components/Reviews';
import MissionVision from './components/MissionVision';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Gallery from "./components/Gallery";
import './App.css';


function App() {

  return (
    <>
      <Navbar />

      <main>

        <Hero />

        <About />

        <Menu />

        <Features />

        <Offers />

        <Gallery />

        <Reviews />

        <MissionVision />

        <Contact />

      </main>

      <Footer />

    </>
  );

}


export default App;
