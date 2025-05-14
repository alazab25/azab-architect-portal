
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

const heroBackgrounds = [
  {
    url: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    title: "الإبداع في التصميم",
    subtitle: "نبتكر حلولاً معمارية فريدة تلبي احتياجاتكم وتعكس رؤيتكم"
  },
  {
    url: "https://images.unsplash.com/photo-1486718448742-163732cd1544?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    title: "الجودة في التنفيذ",
    subtitle: "نلتزم بأعلى معايير الجودة في جميع مراحل المشروع"
  },
  {
    url: "https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    title: "الاحترافية في الخدمة",
    subtitle: "فريق متكامل من المهندسين والخبراء لتقديم أفضل الخدمات"
  }
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % heroBackgrounds.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Hero Backgrounds */}
      {heroBackgrounds.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            currentSlide === index ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="absolute inset-0 bg-primary/60" />
          <img
            src={slide.url}
            alt={`Hero background ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {/* Content */}
      <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center text-center relative z-10">
        <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
          {heroBackgrounds[currentSlide].title}
        </h1>
        <p className="text-white/90 text-xl md:text-2xl max-w-3xl mx-auto mb-8 animate-fade-in">
          {heroBackgrounds[currentSlide].subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 animate-fade-in">
          <Button 
            className="bg-accent hover:bg-accent/90 text-primary font-bold py-3 px-8 rounded-md text-lg"
            onClick={() => handleNavigate('/projects')}
          >
            مشاريعنا
          </Button>
          <Button 
            className="bg-transparent hover:bg-white/10 border-2 border-white text-white font-bold py-3 px-8 rounded-md text-lg"
            onClick={() => handleNavigate('/contact')}
          >
            تواصل معنا
          </Button>
        </div>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2">
        {heroBackgrounds.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentSlide === index ? 'bg-accent w-6' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
