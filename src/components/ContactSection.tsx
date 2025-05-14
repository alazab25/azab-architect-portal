
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from '@/components/ui/use-toast';
import { MapPin, Mail, Phone, Clock } from 'lucide-react';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
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
    <section className="section-padding" id="contact">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 reveal">
          <div className="mb-2 inline-block">
            <span className="bg-accent/20 text-accent px-4 py-1 rounded-full text-sm font-medium">تواصل معنا</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">نحن هنا لمساعدتك</h2>
          <p className="text-secondary max-w-2xl mx-auto">
            تواصل معنا لمناقشة مشروعك أو للاستفسار عن خدماتنا. فريقنا جاهز للرد على استفساراتك وتقديم المشورة المناسبة لك.
          </p>
        </div>

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
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 reveal">
            <div className="bg-white p-8 rounded-lg shadow-md h-full">
              <h3 className="text-2xl font-bold text-primary mb-6">أرسل رسالة</h3>
              
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
  );
};

export default ContactSection;
