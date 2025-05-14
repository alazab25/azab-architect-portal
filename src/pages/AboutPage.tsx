
import Layout from '../components/Layout';
import { useEffect } from 'react';
import { CheckCircle } from 'lucide-react';

const AboutPage = () => {
  useEffect(() => {
    document.title = 'من نحن | شركة العزب للإنشاءات';
    
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
    <Layout>
      {/* Page Header */}
      <div className="relative bg-primary py-24 px-4">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1493397212122-2b85dda8106b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            alt="About Header"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="container mx-auto relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">من نحن</h1>
          <p className="text-white/80 max-w-2xl mx-auto">
            تعرف على قصتنا، قيمنا، ورؤيتنا في شركة العزب للإنشاءات والخدمات المعمارية
          </p>
        </div>
      </div>

      {/* Our Story */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="reveal">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">قصتنا</h2>
              <p className="text-secondary mb-6">
                تأسست شركة العزب للإنشاءات والخدمات المعمارية في عام 2008 على يد المهندس عبد العزيز العزب، بهدف تقديم خدمات إنشائية ومعمارية متكاملة بأعلى معايير الجودة. بدأت الشركة بفريق صغير من المهندسين المتخصصين، وتوسعت على مر السنين لتصبح واحدة من الشركات الرائدة في مجال البناء والتشييد في المملكة العربية السعودية.
              </p>
              <p className="text-secondary">
                على مدار 15 عامًا، قمنا بتنفيذ العديد من المشاريع المتميزة التي تنوعت بين المباني السكنية، والمجمعات التجارية، والمنشآت الصناعية. ومع كل مشروع جديد، نحرص على إضافة لمساتنا الإبداعية التي تميزنا عن غيرنا، مع الالتزام التام بتوقعات العملاء وتجاوزها.
              </p>
            </div>
            <div className="reveal">
              <img
                src="https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                alt="Our Story"
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 reveal">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">قيمنا</h2>
            <p className="text-secondary max-w-2xl mx-auto">
              تقوم فلسفتنا على مجموعة من القيم والمبادئ التي تحكم أسلوب عملنا وتعاملاتنا مع عملائنا وشركائنا
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'الجودة',
                description: 'نلتزم بأعلى معايير الجودة في جميع مراحل العمل، من التصميم وحتى التنفيذ النهائي.'
              },
              {
                title: 'النزاهة',
                description: 'نعمل بشفافية ومصداقية تامة في جميع تعاملاتنا مع العملاء والشركاء والموردين.'
              },
              {
                title: 'الابتكار',
                description: 'نسعى دائمًا لتقديم حلول مبتكرة وإبداعية تلبي احتياجات عملائنا وتتجاوز توقعاتهم.'
              },
              {
                title: 'الالتزام',
                description: 'نفي بوعودنا ونحترم المواعيد وننفذ التزاماتنا بدقة تامة لضمان رضا العملاء.'
              }
            ].map((value, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all border border-gray-100 reveal"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h3 className="font-bold text-xl mb-3 text-primary">{value.title}</h3>
                <p className="text-secondary">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 reveal">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">فريقنا</h2>
            <p className="text-secondary max-w-2xl mx-auto">
              يضم فريقنا نخبة من المهندسين والفنيين والخبراء ذوي الكفاءة العالية والخبرة الواسعة
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: 'م. عبد العزيز العزب',
                position: 'المؤسس والرئيس التنفيذي',
                image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
              },
              {
                name: 'م. سارة الأحمد',
                position: 'مدير التصميم المعماري',
                image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
              },
              {
                name: 'م. خالد المهندس',
                position: 'مدير المشاريع',
                image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
              }
            ].map((member, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg shadow-md overflow-hidden reveal"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover object-center"
                />
                <div className="p-6 text-center">
                  <h3 className="font-bold text-xl text-primary">{member.name}</h3>
                  <p className="text-secondary">{member.position}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 reveal">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">لماذا تختارنا</h2>
            <p className="text-white/80 max-w-2xl mx-auto">
              نحن نسعى جاهدين لتقديم أفضل الخدمات والحلول المعمارية والإنشائية التي تلبي تطلعات عملائنا
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "خبرة أكثر من 15 عامًا في مجال الإنشاءات والخدمات المعمارية",
              "فريق متكامل من المهندسين والمتخصصين ذوي الكفاءة العالية",
              "استخدام أحدث التقنيات والأساليب في التصميم والتنفيذ",
              "الالتزام بالجودة والمواعيد المحددة لتسليم المشاريع",
              "توفير حلول مبتكرة وفعالة من حيث التكلفة",
              "علاقات وثيقة مع الموردين وشبكة واسعة من الشركاء",
              "تطبيق أعلى معايير السلامة في جميع مشاريعنا",
              "خدمة عملاء متميزة وسرعة الاستجابة"
            ].map((item, index) => (
              <div 
                key={index} 
                className="flex items-start gap-3 reveal"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CheckCircle className="text-accent shrink-0 mt-1" size={20} />
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;
