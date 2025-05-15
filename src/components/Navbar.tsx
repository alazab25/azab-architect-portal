
import { useState, useEffect } from 'react';
import { Menu, X, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { name: 'الرئيسية', path: '/' },
    { name: 'من نحن', path: '/about' },
    { name: 'خدماتنا', path: '/services' },
    { name: 'المشاريع', path: '/projects' },
    { name: 'إدارة المشاريع', path: '/project-management' },
    { name: 'تواصل معنا', path: '/contact' },
    { name: 'طلب صيانة', path: '/maintenance-request' },
  ];

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <h1 className={`font-heading font-bold text-xl md:text-2xl ${scrolled ? 'text-primary' : 'text-white'}`}>
            العزب للمقاولات
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`hover:text-accent font-medium transition-colors ${
                scrolled ? 'text-primary' : 'text-white'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Sidebar Trigger for Desktop */}
        <div className="hidden md:block">
          <SidebarTrigger
            className={`btn-primary transition-colors ${scrolled ? 'text-primary' : 'text-white'}`}
          />
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2"
          onClick={toggleMenu}
          aria-label={isOpen ? "Close Menu" : "Open Menu"}
        >
          {isOpen ? (
            <X size={24} className={`${scrolled ? 'text-primary' : 'text-white'}`} />
          ) : (
            <Menu size={24} className={`${scrolled ? 'text-primary' : 'text-white'}`} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white absolute w-full shadow-lg animate-fade-in">
          <div className="container mx-auto py-4 px-4">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-primary hover:text-accent py-2 border-b border-gray-100"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Drawer>
                <DrawerTrigger asChild>
                  <Button className="btn-primary mt-4 w-full" onClick={() => setIsOpen(false)}>
                    القائمة الرئيسية
                  </Button>
                </DrawerTrigger>
                <DrawerContent className="rtl">
                  <DrawerHeader className="text-right">
                    <DrawerTitle className="text-2xl font-bold text-primary">العزب للمقاولات</DrawerTitle>
                    <DrawerDescription className="text-muted-foreground">
                      تصفح جميع صفحات الموقع
                    </DrawerDescription>
                  </DrawerHeader>
                  
                  <div className="p-4">
                    <div className="grid grid-cols-1 gap-4">
                      {navLinks.map((link) => (
                        <DrawerClose key={link.path} asChild>
                          <Link 
                            to={link.path}
                            className="flex items-center justify-between p-4 rounded-lg bg-muted hover:bg-primary/10 transition-colors group"
                          >
                            <span className="text-lg font-medium">{link.name}</span>
                            <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                          </Link>
                        </DrawerClose>
                      ))}
                    </div>
                  </div>
                  
                  <DrawerFooter className="border-t pt-6">
                    <DrawerClose asChild>
                      <Button className="w-full">إغلاق</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            </nav>
          </div>
        </div>
      )}

      {/* Render the sidebar */}
      <AppSidebar />
    </header>
  );
};

export default Navbar;
