
import Layout from '../components/Layout';
import { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from '@/components/ui/use-toast';
import { MapPin, Mail, Phone, Clock } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    document.title = 'تواصل معنا | شركة العزب للإنشاءات';
    
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    
    // Show success message
    toast({
      title: "تم إرسال رسالتك بنجاح",
      description: "سنقوم بالرد عليك في أقرب وقت ممكن",
      duration: 5000,
    });
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  const contactInfo = [
    {
      icon: <MapPin size={24} />,
      title: 'العنوان',
      details: 'المملكة العربية السعودية، الرياض'
    },
    {
      icon: <Mail size={24} />,
      title: 'البريد الإلكتروني',
      details: 'info@al-azab.co'
    },
    {
      icon: <Phone size={24} />,
      title: 'الهاتف',
      details: '+966 50 000 0000'
    },
    {
      icon: <Clock size={24} />,
      title: 'ساعات العمل',
      details: 'الأحد - الخميس: 8 صباحًا - 5 مساءً'
    }
  ];

  return (
    <Layout>
      {/* Page Header */}
      <div className="relative bg-primary py-24 px-4">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1486672578061-9ea86bfdd566?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            alt="Contact Header"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="container mx-auto relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">تواصل معنا</h1>
          <p className="text-white/80 max-w-2xl mx-auto">
            نحن هنا للإجابة على استفساراتك ومساعدتك في تحقيق مشروعك
          </p>
        </div>
      </div>

      {/* Contact Section */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="lg:col-span-1 reveal">
              <div className="bg-primary text-white p-8 rounded-lg h-full">
                <h3 className="text-2xl font-bold mb-6">معلومات الاتصال</h3>
                
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start">
                      <div className="bg-white/10 p-3 rounded-lg text-accent mr-4">
                        {info.icon}
                      </div>
                      <div>
                        <h4 className="font-bold">{info.title}</h4>
                        <p className="text-white/80">{info.details}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-white/20">
                  <h4 className="font-bold mb-4">تابعنا على</h4>
                  <div className="flex gap-4">
                    {['twitter', 'facebook', 'instagram', 'linkedin'].map((social) => (
                      <a 
                        key={social}
                        href={`https://${social}.com`} 
                        target="_blank" 
                        rel="noreferrer"
                        className="bg-white/10 hover:bg-white/20 transition-colors p-2 rounded-full"
                        aria-label={`Visit our ${social} page`}
                      >
                        <div className="w-5 h-5"></div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2 reveal">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold text-primary mb-6">أرسل لنا رسالة</h3>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">الاسم</label>
                      <Input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="أدخل اسمك"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني</label>
                      <Input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="أدخل بريدك الإلكتروني"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">رقم الهاتف</label>
                      <Input
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder="أدخل رقم هاتفك"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">الموضوع</label>
                      <Input
                        type="text"
                        id="subject"
                        name="subject"
                        placeholder="موضوع الرسالة"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">الرسالة</label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="أدخل رسالتك هنا..."
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="resize-none"
                    />
                  </div>

                  <Button type="submit" className="w-full btn-primary">
                    إرسال الرسالة
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg overflow-hidden shadow-md reveal">
            <div className="aspect-w-16 aspect-h-9">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d463880.68035988!2d46.703659862501026!3d24.7249303771!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f03890d489399%3A0xba974d1c98e79fd5!2sRiyadh%20Saudi%20Arabia!5e0!3m2!1sen!2sus!4v1618498711515!5m2!1sen!2sus" 
                width="100%" 
                height="450" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy"
                title="Company Location Map"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 reveal">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">الأسئلة الشائعة</h2>
            <p className="text-secondary max-w-2xl mx-auto">
              إجابات على بعض الأسئلة الشائعة التي قد تكون لديك
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {[
              {
                question: 'كيف يمكنني الحصول على عرض سعر لمشروعي؟',
                answer: 'يمكنك التواصل معنا عبر البريد الإلكتروني أو الهاتف أو من خلال نموذج الاتصال في الموقع، وسيقوم فريقنا بالتواصل معك لفهم متطلبات مشروعك وتقديم عرض سعر مناسب.'
              },
              {
                question: 'كم من الوقت يستغرق تنفيذ المشروع؟',
                answer: 'تختلف مدة تنفيذ المشروع حسب حجمه وتعقيده، ولكننا نلتزم دائمًا بالجدول الزمني المتفق عليه مع العميل، ونعمل بكفاءة لإنجاز المشروع في الوقت المحدد.'
              },
              {
                question: 'هل تقدمون خدمات التصميم الداخلي أيضًا؟',
                answer: 'نعم، نقدم خدمات شاملة تتضمن التصميم المعماري والإنشائي والتصميم الداخلي، مما يوفر حلاً متكاملاً لعملائنا ويضمن تناسق جميع عناصر المشروع.'
              },
              {
                question: 'هل تعملون في جميع مناطق المملكة؟',
                answer: 'نعم، نقدم خدماتنا في جميع مناطق المملكة العربية السعودية، ولدينا فروع في عدة مدن رئيسية لضمان تغطية شاملة.'
              }
            ].map((item, index) => (
              <div 
                key={index} 
                className="mb-6 bg-white p-6 rounded-lg shadow-sm reveal"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h3 className="font-bold text-lg mb-2 text-primary">{item.question}</h3>
                <p className="text-secondary">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage;
