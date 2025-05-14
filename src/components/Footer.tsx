
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-primary text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">شركة العزب للإنشاءات</h3>
            <p className="text-gray-300 mb-4">
              شركة رائدة في مجال البناء والتشييد والخدمات المعمارية، نقدم حلولًا متكاملة وخدمات احترافية بأعلى معايير الجودة.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:text-accent transition-colors">من نحن</Link></li>
              <li><Link to="/services" className="hover:text-accent transition-colors">خدماتنا</Link></li>
              <li><Link to="/projects" className="hover:text-accent transition-colors">مشاريعنا</Link></li>
              <li><Link to="/contact" className="hover:text-accent transition-colors">تواصل معنا</Link></li>
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-4">خدماتنا</h3>
            <ul className="space-y-2">
              <li><Link to="/services#design" className="hover:text-accent transition-colors">التصميم المعماري</Link></li>
              <li><Link to="/services#construction" className="hover:text-accent transition-colors">الإنشاءات والبناء</Link></li>
              <li><Link to="/services#interior" className="hover:text-accent transition-colors">التصميم الداخلي</Link></li>
              <li><Link to="/services#consultation" className="hover:text-accent transition-colors">الاستشارات الهندسية</Link></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">معلومات الاتصال</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <MapPin size={18} className="text-accent" />
                <span>المملكة العربية السعودية، الرياض</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={18} className="text-accent" />
                <a href="tel:+966500000000" className="hover:text-accent transition-colors">+966 50 000 0000</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={18} className="text-accent" />
                <a href="mailto:info@al-azab.co" className="hover:text-accent transition-colors">info@al-azab.co</a>
              </li>
            </ul>
          </div>
        </div>
        
        <hr className="border-gray-700 my-6" />
        
        <div className="text-center text-gray-400 text-sm">
          <p>© {currentYear} شركة العزب للإنشاءات والخدمات المعمارية. جميع الحقوق محفوظة</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
