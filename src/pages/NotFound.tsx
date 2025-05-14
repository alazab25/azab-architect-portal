
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Layout from '../components/Layout';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    document.title = 'الصفحة غير موجودة | شركة العزب للإنشاءات';
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-[70vh] flex items-center justify-center bg-gray-50">
        <div className="text-center px-4">
          <h1 className="text-6xl font-bold text-primary mb-6">404</h1>
          <p className="text-2xl text-gray-600 mb-8">عذراً، الصفحة التي تبحث عنها غير موجودة</p>
          <Button asChild className="btn-primary">
            <Link to="/">العودة إلى الصفحة الرئيسية</Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
