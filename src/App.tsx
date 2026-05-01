import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import InteriorExecution from './components/InteriorExecution'
import { StackedCardsSection } from './components/StackedCardsSection'
import WhyChooseUs from './components/WhyChooseUs'
import { ProjectsGallery } from './components/ProjectsGallery'
import DMFurnitures from './components/DMFurnitures'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import Chatbot from './components/Chatbot'
import WhatsAppButton from './components/WhatsAppButton'

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Services />
      <InteriorExecution />
      <StackedCardsSection />
      <ProjectsGallery />
      <WhyChooseUs />
      <DMFurnitures />
      <ContactSection />
      <Footer />
      <Chatbot />
      <WhatsAppButton />
    </div>
  )
}

export default App
