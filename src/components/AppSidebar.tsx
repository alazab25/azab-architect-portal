
import {
  Home,
  Building,
  Settings,
  Phone,
  Users,
  FileText,
  ChevronRight,
  Heart,
  Menu
} from "lucide-react";
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function AppSidebar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const menuItems = [
    {
      title: "الرئيسية",
      path: "/",
      icon: Home
    },
    {
      title: "من نحن",
      path: "/about",
      icon: Users
    },
    {
      title: "خدماتنا",
      path: "/services",
      icon: Settings
    },
    {
      title: "المشاريع",
      path: "/projects",
      icon: Building
    },
    {
      title: "إدارة المشاريع",
      path: "/project-management", 
      icon: FileText
    },
    {
      title: "طلب صيانة",
      path: "/maintenance-request",
      icon: Heart
    },
    {
      title: "تواصل معنا",
      path: "/contact",
      icon: Phone
    }
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild className="fixed top-4 left-4 z-50 md:top-6 md:left-6 bg-primary text-white rounded-full p-2 shadow-lg">
        <button aria-label="فتح القائمة" className="hover:bg-primary-light transition-colors">
          <Menu size={24} />
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="bg-white border-l border-gray-200 shadow-xl w-[300px] p-0 overflow-y-auto">
        <SheetHeader className="bg-primary text-white p-6 border-b border-gray-200">
          <SheetTitle className="text-2xl font-bold">العزب للمقاولات</SheetTitle>
        </SheetHeader>
        
        <div className="py-4">
          <div className="px-4 mb-4">
            <h3 className="text-lg font-semibold text-primary mb-2">القائمة الرئيسية</h3>
          </div>
          
          <nav className="flex flex-col" dir="rtl">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-6 py-3.5 hover:bg-gray-100 transition-colors ${
                  isActive(item.path) 
                    ? "bg-primary/10 border-r-4 border-primary text-primary font-medium" 
                    : "text-gray-700"
                }`}
                onClick={() => setOpen(false)}
              >
                <item.icon className="h-5 w-5" />
                <span className="text-base">{item.title}</span>
                {isActive(item.path) && (
                  <ChevronRight className="ml-auto h-4 w-4" />
                )}
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="mt-auto p-6 border-t border-gray-200 text-center">
          <div className="text-sm text-gray-500">
            <p>© 2025 شركة العزب للمقاولات</p>
            <p>جميع الحقوق محفوظة</p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
