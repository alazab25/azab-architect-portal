
import Layout from '../components/Layout';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ServicesSection from '../components/ServicesSection';
import ProjectsSection from '../components/ProjectsSection';
import ContactSection from '../components/ContactSection';
import { useEffect } from 'react';

const Index = () => {
  // Set page title
  useEffect(() => {
    document.title = 'شركة العزب للإنشاءات والخدمات المعمارية';
  }, []);

  return (
    <Layout>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <ContactSection />
    </Layout>
  );
};

export default Index;
