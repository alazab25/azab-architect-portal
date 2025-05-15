
import {
  Home,
  Building,
  Settings,
  Phone,
  Users,
  FileText,
  ChevronRight,
  Heart
} from "lucide-react";
import { Link, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";

export function AppSidebar() {
  const location = useLocation();
  
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
    <Sidebar side="right" className="rtl hidden md:block">
      <SidebarHeader className="flex items-center justify-between p-4 border-b border-muted">
        <div className="flex items-center">
          <span className="text-xl font-bold text-primary">العزب للمقاولات</span>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>القائمة الرئيسية</SidebarGroupLabel>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.path}>
                <SidebarMenuButton 
                  isActive={isActive(item.path)} 
                  tooltip={item.title}
                  asChild
                >
                  <Link to={item.path} className="flex items-center">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center">
                        <item.icon className="ltr:mr-2 rtl:ml-2 h-5 w-5" />
                        <span>{item.title}</span>
                      </div>
                      <ChevronRight className="h-4 w-4 opacity-50" />
                    </div>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-4 border-t border-muted">
        <div className="text-center text-sm text-muted-foreground">
          <p>© 2025 شركة العزب للمقاولات</p>
          <p>جميع الحقوق محفوظة</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
