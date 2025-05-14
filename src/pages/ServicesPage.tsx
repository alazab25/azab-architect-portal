
import Layout from '../components/Layout';
import { useEffect } from 'react';
import { Building, PenTool, Home, FileCheck, Check, Users, Edit, Ruler } from 'lucide-react';

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

  const services = [
    {
      id: 'design',
      icon: <PenTool size={36} />,
      title: 'التصميم المعماري',
      description: 'نقدم تصاميم معمارية مبتكرة ومستدامة تجمع بين الجمال والوظيفة، مع مراعاة احتياجات العملاء والبيئة المحيطة.',
      details: [
        'دراسات المواقع والجدوى المعمارية',
        'مخططات المباني السكنية والتجارية والصناعية',
        'التصاميم المستدامة والصديقة للبيئة',
        'الواجهات المعمارية المبتكرة',
        'تصاميم المشاريع متعددة الاستخدامات'
      ],
      image: 'https://images.unsplash.com/photo-1524230572899-a752b3835840?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
    },
    {
      id: 'construction',
      icon: <Building size={36} />,
      title: 'الإنشاءات والبناء',
      description: 'نتولى تنفيذ مشاريع البناء بكافة أنواعها من الأساسات وحتى التشطيبات النهائية، مع الالتزام بأعلى معايير الجودة.',
      details: [
        'بناء الفلل والقصور السكنية',
        'إنشاء المباني التجارية والإدارية',
        'تشييد المجمعات السكنية والتجارية',
        'بناء المنشآت الصناعية والمستودعات',
        'أعمال الترميم وإعادة التأهيل'
      ],
      image: 'https://images.unsplash.com/photo-1486718448742-163732cd1544?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
    },
    {
      id: 'interior',
      icon: <Home size={36} />,
      title: 'التصميم الداخلي',
      description: 'نصمم المساحات الداخلية بأسلوب يعكس شخصية العميل ويلبي احتياجاته العملية، مع التركيز على الراحة والجمالية.',
      details: [
        'تصميم وتنفيذ الديكورات الداخلية',
        'اختيار الألوان والخامات والأثاث',
        'تخطيط المساحات وتوزيع الإضاءة',
        'التصميم الداخلي للمكاتب والمحلات التجارية',
        'تنسيق المساحات الداخلية للفنادق والمطاعم'
      ],
      image: 'https://images.unsplash.com/photo-1493037645262-9bb224e41c1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
    },
    {
      id: 'consultation',
      icon: <FileCheck size={36} />,
      title: 'الاستشارات الهندسية',
      description: 'نقدم استشارات هندسية متكاملة للمشاريع من دراسات الجدوى وحتى الإشراف الهندسي، بما يضمن نجاح المشروع.',
      details: [
        'تقييم المشاريع وإعداد دراسات الجدوى',
        'الإشراف الهندسي على التنفيذ',
        'مراجعة المخططات والتصاميم',
        'إدارة المشاريع الإنشائية',
        'تقديم الحلول الهندسية للمشكلات'
      ],
      image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
    }
  ];

  const additionalServices = [
    {
      icon: <Ruler />,
      title: 'المساحة وتخطيط المواقع',
      description: 'خدمات مسح الأراضي وتحديد المواقع وإعداد الخرائط التفصيلية للمشاريع.'
    },
    {
      icon: <Edit />,
      title: 'تصميم المناظر الطبيعية',
      description: 'تصميم وتنسيق الحدائق والمساحات الخارجية بما يتناسب مع المباني والبيئة المحيطة.'
    },
    {
      icon: <Users />,
      title: 'إدارة المرافق',
      description: 'خدمات متكاملة لإدارة وصيانة المباني والمرافق بعد الانتهاء من التنفيذ.'
    },
    {
      icon: <Check />,
      title: 'ضمان الجودة',
      description: 'تطبيق معايير صارمة لضمان جودة التنفيذ وفق المواصفات العالمية والمحلية.'
    }
  ];

  return (
    <Layout>
      {/* Page Header */}
      <div className="relative bg-primary py-24 px-4">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1466442929976-97f336a657be?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            alt="Services Header"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="container mx-auto relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">خدماتنا</h1>
          <p className="text-white/80 max-w-2xl mx-auto">
            نقدم مجموعة متكاملة من الخدمات المعمارية والإنشائية لتلبية احتياجات عملائنا
          </p>
        </div>
      </div>

      {/* Main Services */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 reveal">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">خدماتنا الرئيسية</h2>
            <p className="text-secondary max-w-2xl mx-auto">
              نوفر لعملائنا مجموعة متنوعة من الخدمات المعمارية والإنشائية عالية الجودة لتلبية جميع احتياجاتهم
            </p>
          </div>
          
          <div className="space-y-20">
            {services.map((service, index) => (
              <div 
                key={service.id} 
                id={service.id}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center reveal ${
                  index % 2 === 1 ? 'lg:grid-flow-dense' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="bg-primary-light/10 p-4 rounded-lg inline-block mb-4 text-primary">
                    {service.icon}
                  </div>
                  <h2 className="text-3xl font-bold text-primary mb-4">{service.title}</h2>
                  <p className="text-secondary mb-6">{service.description}</p>
                  
                  <ul className="space-y-3">
                    {service.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Check className="text-accent shrink-0" size={20} />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-auto rounded-lg shadow-lg"
                  />
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
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">خدمات إضافية</h2>
            <p className="text-secondary max-w-2xl mx-auto">
              نقدم أيضًا مجموعة من الخدمات المتخصصة التي تكمل خدماتنا الرئيسية وتضمن تنفيذ مشروعك بشكل متكامل
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {additionalServices.map((service, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all border border-gray-100 reveal"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-primary-light/10 p-3 rounded-lg inline-block mb-4 text-primary">
                  {service.icon}
                </div>
                <h3 className="font-bold text-xl mb-3 text-primary">{service.title}</h3>
                <p className="text-secondary">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Process */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 reveal">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">آلية العمل</h2>
            <p className="text-secondary max-w-2xl mx-auto">
              نتبع منهجية عمل واضحة ومنظمة لضمان تنفيذ المشاريع بكفاءة وجودة عالية
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: '01',
                title: 'الاستشارة والتخطيط',
                description: 'نبدأ بفهم احتياجات العميل وتوقعاته، ثم نقوم بدراسة المشروع ووضع التصورات الأولية.'
              },
              {
                step: '02',
                title: 'التصميم والتطوير',
                description: 'نعمل على إعداد التصاميم المعمارية والإنشائية المفصلة، مع مراعاة جميع المتطلبات الفنية والجمالية.'
              },
              {
                step: '03',
                title: 'التنفيذ والإشراف',
                description: 'نبدأ في تنفيذ المشروع وفق الخطة الموضوعة، مع الإشراف المستمر لضمان الالتزام بالجودة والمواعيد.'
              }
            ].map((phase, index) => (
              <div 
                key={index} 
                className="reveal"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 h-full">
                  <div className="text-5xl font-bold text-accent/20 mb-4">{phase.step}</div>
                  <h3 className="font-bold text-xl mb-3 text-primary">{phase.title}</h3>
                  <p className="text-secondary">{phase.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 reveal">هل أنت جاهز لبدء مشروعك؟</h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8 reveal">
            تواصل معنا اليوم لمناقشة مشروعك واحتياجاتك، ودع فريقنا المتخصص يساعدك في تحويل أفكارك إلى واقع.
          </p>
          <a 
            href="/contact" 
            className="bg-white text-primary hover:bg-accent hover:text-white transition-colors px-8 py-3 rounded-md font-bold inline-block reveal"
          >
            تواصل معنا
          </a>
        </div>
      </section>
    </Layout>
  );
};

export default ServicesPage;
