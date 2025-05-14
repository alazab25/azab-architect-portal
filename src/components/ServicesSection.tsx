
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Building, PenTool, Home, FileCheck } from 'lucide-react';

const services = [
  {
    id: 'design',
    icon: <PenTool size={28} />,
    title: 'التصميم المعماري',
    description: 'نقدم تصاميم معمارية مبتكرة ومستدامة تجمع بين الجمال والوظيفة، مع مراعاة احتياجات العملاء والبيئة المحيطة.',
  },
  {
    id: 'construction',
    icon: <Building size={28} />,
    title: 'الإنشاءات والبناء',
    description: 'نتولى تنفيذ مشاريع البناء بكافة أنواعها من الأساسات وحتى التشطيبات النهائية، مع الالتزام بأعلى معايير الجودة.',
  },
  {
    id: 'interior',
    icon: <Home size={28} />,
    title: 'التصميم الداخلي',
    description: 'نصمم المساحات الداخلية بأسلوب يعكس شخصية العميل ويلبي احتياجاته العملية، مع التركيز على الراحة والجمالية.',
  },
  {
    id: 'consultation',
    icon: <FileCheck size={28} />,
    title: 'الاستشارات الهندسية',
    description: 'نقدم استشارات هندسية متكاملة للمشاريع من دراسات الجدوى وحتى الإشراف الهندسي، بما يضمن نجاح المشروع.',
  },
];

const ServicesSection = () => {
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
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="section-padding" id="services">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 reveal">
          <div className="mb-2 inline-block">
            <span className="bg-accent/20 text-accent px-4 py-1 rounded-full text-sm font-medium">خدماتنا</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">نقدم خدمات متكاملة</h2>
          <p className="text-secondary max-w-2xl mx-auto">
            نوفر لعملائنا مجموعة متكاملة من الخدمات المعمارية والإنشائية التي تغطي كافة مراحل المشروع، من الفكرة الأولية إلى التنفيذ النهائي.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div 
              key={service.id} 
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all border border-gray-100 reveal"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="bg-primary-light/10 p-3 rounded-lg inline-block mb-4 text-primary">
                {service.icon}
              </div>
              <h3 className="font-bold text-xl mb-3 text-primary">{service.title}</h3>
              <p className="text-secondary mb-4">{service.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 reveal">
          <Button 
            className="btn-primary"
            onClick={() => navigate('/services')}
          >
            استكشف جميع الخدمات
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
