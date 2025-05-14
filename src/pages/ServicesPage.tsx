
import Layout from '../components/Layout';
import { useEffect } from 'react';
import { Building, PenTool, Home, FileCheck, Ruler, Hammer, Paintbrush, Wrench, Users, Shield, Truck, LineChart } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ServicesPage = () => {
  useEffect(() => {
    document.title = 'خدماتنا | شركة العزب للإنشاءات';
    
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

  const mainServices = [
    {
      icon: <PenTool size={28} />,
      title: 'التصميم المعماري',
      description: 'نقدم تصاميم معمارية مبتكرة ومستدامة تجمع بين الجمال والوظيفة، مع مراعاة احتياجات العملاء والبيئة المحيطة.',
      details: [
        'تصميم المباني السكنية والتجارية',
        'التصميم الحضري وتخطيط المساحات',
        'الاستدامة والتصميم الأخضر',
        'النمذجة ثلاثية الأبعاد والمحاكاة البصرية'
      ]
    },
    {
      icon: <Building size={28} />,
      title: 'الإنشاءات والبناء',
      description: 'نتولى تنفيذ مشاريع البناء بكافة أنواعها من الأساسات وحتى التشطيبات النهائية، مع الالتزام بأعلى معايير الجودة.',
      details: [
        'بناء المباني السكنية والفلل',
        'إنشاء المجمعات التجارية والإدارية',
        'تشييد المنشآت الصناعية',
        'البناء بتقنيات حديثة وصديقة للبيئة'
      ]
    },
    {
      icon: <Home size={28} />,
      title: 'التصميم الداخلي',
      description: 'نصمم المساحات الداخلية بأسلوب يعكس شخصية العميل ويلبي احتياجاته العملية، مع التركيز على الراحة والجمالية.',
      details: [
        'تصميم المساحات السكنية والتجارية',
        'اختيار الألوان والمواد والأثاث',
        'تصميم الإضاءة والديكور',
        'تنسيق المساحات وتحسين الوظائف'
      ]
    },
    {
      icon: <FileCheck size={28} />,
      title: 'الاستشارات الهندسية',
      description: 'نقدم استشارات هندسية متكاملة للمشاريع من دراسات الجدوى وحتى الإشراف الهندسي، بما يضمن نجاح المشروع.',
      details: [
        'دراسات الجدوى والتحليل الفني',
        'استشارات التصميم والتنفيذ',
        'مراجعة المخططات والتصاميم',
        'الإشراف على المشاريع وإدارتها'
      ]
    }
  ];

  const additionalServices = [
    {
      icon: <Ruler size={24} />,
      title: 'إدارة المشاريع',
      description: 'إدارة احترافية لمشاريع البناء من البداية حتى التسليم، مع ضمان الالتزام بالميزانية والجدول الزمني.',
    },
    {
      icon: <Hammer size={24} />,
      title: 'الترميم وإعادة التأهيل',
      description: 'ترميم المباني القديمة وإعادة تأهيلها مع الحفاظ على طابعها الأصلي وتحسين كفاءتها.',
    },
    {
      icon: <Paintbrush size={24} />,
      title: 'أعمال التشطيبات',
      description: 'تنفيذ أعمال التشطيبات الداخلية والخارجية بأعلى جودة وباستخدام أفضل الخامات.',
    },
    {
      icon: <Wrench size={24} />,
      title: 'خدمات الصيانة',
      description: 'برامج صيانة دورية وطارئة للمباني والمنشآت لضمان استمرارية عملها بكفاءة.',
    },
    {
      icon: <Users size={24} />,
      title: 'التطوير العقاري',
      description: 'تطوير مشاريع سكنية وتجارية متكاملة من مرحلة التخطيط حتى التسويق والبيع.',
    },
    {
      icon: <Shield size={24} />,
      title: 'السلامة والجودة',
      description: 'تطبيق أنظمة السلامة والجودة في مواقع العمل وضمان الالتزام بالمعايير العالمية.',
    },
    {
      icon: <Truck size={24} />,
      title: 'توريد مواد البناء',
      description: 'توفير مواد البناء عالية الجودة من مصادر موثوقة وبأسعار تنافسية.',
    },
    {
      icon: <LineChart size={24} />,
      title: 'دراسات التكلفة',
      description: 'إعداد دراسات تفصيلية للتكلفة وتحليل البدائل لتوفير أفضل قيمة للعميل.',
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative bg-primary py-24 px-4">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            alt="خدماتنا"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="container mx-auto relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">خدماتنا</h1>
          <p className="text-white/80 max-w-2xl mx-auto">
            نقدم مجموعة متكاملة من الخدمات المعمارية والإنشائية لتلبية احتياجاتكم بأعلى معايير الجودة
          </p>
        </div>
      </div>

      {/* Main Services */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 reveal">
            <div className="mb-2 inline-block">
              <span className="bg-accent/20 text-accent px-4 py-1 rounded-full text-sm font-medium">خدماتنا الرئيسية</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">خدمات متكاملة بمعايير عالمية</h2>
            <p className="text-secondary max-w-2xl mx-auto">
              نقدم لعملائنا باقة متميزة من الخدمات المتكاملة التي تغطي جميع مراحل المشروع من الفكرة الأولى حتى التسليم النهائي
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {mainServices.map((service, index) => (
              <div 
                key={index} 
                className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-all border border-gray-100 reveal"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-4">
                  <div className="bg-primary-light/10 p-4 rounded-lg text-primary">
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-3 text-primary">{service.title}</h3>
                    <p className="text-secondary mb-4">{service.description}</p>
                    
                    <ul className="mt-4 space-y-2">
                      {service.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-accent rounded-full"></span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 reveal">
            <div className="mb-2 inline-block">
              <span className="bg-accent/20 text-accent px-4 py-1 rounded-full text-sm font-medium">خدمات متنوعة</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">خدمات إضافية</h2>
            <p className="text-secondary max-w-2xl mx-auto">
              نقدم مجموعة واسعة من الخدمات الإضافية المتخصصة لتلبية كافة احتياجات مشروعك
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalServices.map((service, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all border border-gray-100 reveal"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-primary-light/10 p-3 rounded-lg inline-block mb-4 text-primary">
                  {service.icon}
                </div>
                <h3 className="font-bold text-lg mb-3 text-primary">{service.title}</h3>
                <p className="text-secondary">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 reveal">
            <div className="mb-2 inline-block">
              <span className="bg-accent/20 text-accent px-4 py-1 rounded-full text-sm font-medium">منهجية العمل</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">كيف نعمل</h2>
            <p className="text-secondary max-w-2xl mx-auto">
              نتبع منهجية عمل احترافية ومنظمة لضمان تنفيذ المشاريع بأعلى جودة وفي الوقت المحدد
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto reveal">
            {/* Process Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-primary/20 transform -translate-x-1/2 hidden md:block"></div>
            
            {/* Process Steps */}
            {[
              {
                title: "التخطيط والتصميم",
                description: "نبدأ بجلسات استشارية لفهم احتياجاتك ورؤيتك، ثم نقوم بإعداد المخططات والتصاميم الأولية."
              },
              {
                title: "تطوير التصميم",
                description: "بعد موافقتك على التصميم الأولي، نقوم بتطويره وإضافة التفاصيل الدقيقة وإعداد المخططات التنفيذية."
              },
              {
                title: "الموافقات والتراخيص",
                description: "نتولى استخراج جميع التراخيص والموافقات اللازمة من الجهات المختصة لبدء العمل."
              },
              {
                title: "التنفيذ والإنشاء",
                description: "نبدأ في تنفيذ المشروع وفقًا للخطة المعتمدة، مع مراقبة مستمرة للجودة والالتزام بالجدول الزمني."
              },
              {
                title: "التشطيبات والتجهيز",
                description: "بعد الانتهاء من الهيكل الإنشائي، نبدأ في أعمال التشطيبات الداخلية والخارجية وفقًا للمواصفات المتفق عليها."
              },
              {
                title: "التسليم والضمان",
                description: "نقوم بالتسليم النهائي للمشروع بعد التأكد من مطابقته للمواصفات، مع تقديم الضمانات اللازمة."
              }
            ].map((step, index) => (
              <div 
                key={index}
                className={`flex flex-col md:flex-row items-center gap-6 mb-12 md:mb-24 reveal ${
                  index % 2 === 1 ? 'md:flex-row-reverse' : ''
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Number */}
                <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold z-10">
                  {index + 1}
                </div>
                
                {/* Content */}
                <div className={`bg-white p-6 rounded-lg shadow-md border border-gray-100 md:w-[calc(50%-1.5rem)] ${
                  index % 2 === 0 ? 'md:text-right' : 'md:text-left'
                }`}>
                  <h3 className="font-bold text-xl mb-2 text-primary">{step.title}</h3>
                  <p className="text-secondary">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center reveal">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">هل أنت مستعد لبدء مشروعك؟</h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            تواصل معنا اليوم للحصول على استشارة مجانية واكتشف كيف يمكننا مساعدتك في تحقيق رؤيتك
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-accent hover:bg-accent/90 text-primary font-bold py-3 px-8 rounded-md text-lg">
              <Link to="/contact">تواصل معنا</Link>
            </Button>
            <Button asChild className="bg-transparent hover:bg-white/10 border-2 border-white text-white font-bold py-3 px-8 rounded-md text-lg">
              <Link to="/maintenance-request">طلب خدمة صيانة</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ServicesPage;
