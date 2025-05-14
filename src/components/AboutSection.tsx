
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { CheckCircle } from 'lucide-react';

const AboutSection = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const reveals = document.querySelectorAll('.reveal');
      
      reveals.forEach((element) => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
          element.classList.add('active');
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    // Trigger once to check elements already in view
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="section-padding bg-gray-50" id="about">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <div className="reveal">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1524230572899-a752b3835840?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                alt="شركة العزب للإنشاءات"
                className="w-full h-auto rounded-lg shadow-lg"
              />
              <div className="absolute -bottom-10 -right-10 bg-white p-6 rounded-lg shadow-xl hidden lg:block">
                <div className="text-primary font-heading">
                  <div className="text-5xl font-bold">15+</div>
                  <div className="text-lg">سنوات الخبرة</div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className="reveal">
            <div className="mb-2 inline-block">
              <span className="bg-accent/20 text-accent px-4 py-1 rounded-full text-sm font-medium">من نحن</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              شركة العزب للإنشاءات والخدمات المعمارية
            </h2>
            <p className="text-secondary mb-6 text-lg">
              تأسست شركة العزب للإنشاءات والخدمات المعمارية منذ أكثر من 15 عامًا، ومنذ ذلك الحين ونحن نقدم خدمات متميزة في مجال البناء والتشييد والتصميم المعماري. نحن نؤمن بأن النجاح يأتي من خلال الالتزام بالجودة والاهتمام بأدق التفاصيل.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {[
                "تصاميم معمارية مبتكرة",
                "فريق هندسي متخصص",
                "التزام بالمواعيد",
                "استخدام أحدث التقنيات",
                "مواد بناء عالية الجودة",
                "خدمة عملاء متميزة"
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="text-accent" size={20} />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <Button 
              className="btn-primary"
              onClick={() => navigate('/about')}
            >
              تعرف علينا أكثر
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
