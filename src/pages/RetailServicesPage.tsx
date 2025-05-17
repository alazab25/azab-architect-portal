
import { useEffect } from 'react';
import Layout from '../components/Layout';
import { Button } from "@/components/ui/button";
import { Store, Building, Package, Truck, Wrench, CheckCircle } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from 'react-router-dom';

const RetailServicesPage = () => {
  useEffect(() => {
    document.title = 'خدمات المحلات التجارية | شركة العزب للإنشاءات';
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative bg-primary pt-28 pb-16 px-4">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1604044923071-5210adda0efd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            alt="خدمات المحلات التجارية"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="container mx-auto relative z-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">خدمات المحلات التجارية</h1>
          <p className="text-white/80 max-w-2xl mx-auto">
            نقدم خدمات متكاملة لإنشاء وتجهيز المحلات التجارية والمولات بأعلى مستويات الجودة والدقة
          </p>
        </div>
      </div>

      {/* Services Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-primary mb-4">خدماتنا المتخصصة للمحلات التجارية</h2>
            <p className="text-secondary max-w-3xl mx-auto">
              نقدم خدمات شاملة للمحلات التجارية من التصميم والإنشاء وحتى الصيانة الدورية، مع التركيز على جودة التنفيذ والالتزام بالمواعيد
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: Store,
                title: "تصميم وإنشاء المحلات التجارية",
                description: "تصميم وتنفيذ المحلات التجارية بمختلف أنواعها وأشكالها وفقاً لمتطلبات العميل والعلامة التجارية"
              },
              {
                icon: Building,
                title: "تجهيز المولات التجارية",
                description: "خدمات متكاملة لتجهيز المولات التجارية من الديكورات الداخلية والخارجية والأنظمة الكهربائية والميكانيكية"
              },
              {
                icon: Package,
                title: "تصميم وتركيب الرفوف والديكورات",
                description: "تصميم وتصنيع وتركيب الرفوف والديكورات الداخلية للمحلات بما يتناسب مع طبيعة المنتجات"
              },
              {
                icon: Wrench,
                title: "أعمال الصيانة الدورية",
                description: "برامج صيانة دورية للمحلات والمولات التجارية لضمان استمرارية العمل وتجنب المشاكل الفنية"
              },
              {
                icon: Truck,
                title: "سلسلة الإمداد والتوريد",
                description: "خدمات متكاملة لسلسلة الإمداد والتوريد للمحلات التجارية بما يضمن كفاءة العمليات اللوجستية"
              },
              {
                icon: CheckCircle,
                title: "إدارة المشاريع التجارية",
                description: "إدارة شاملة للمشاريع التجارية من البداية وحتى التسليم مع متابعة مستمرة لضمان جودة التنفيذ"
              },
            ].map((service, index) => (
              <Card key={index} className="border-t-4 border-t-accent overflow-hidden hover:shadow-md transition-all">
                <CardContent className="pt-6">
                  <div className="bg-accent/20 text-accent w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <service.icon size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-primary mb-2">{service.title}</h3>
                  <p className="text-secondary text-sm">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Abu Ouf Projects Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="bg-accent/90 text-primary px-4 py-1 rounded-full text-sm font-medium">مشاريع مميزة</span>
            <h2 className="text-2xl font-bold text-primary mt-4 mb-4">مشاريع محلات أبو عوف</h2>
            <p className="text-secondary max-w-3xl mx-auto">
              قمنا بإنشاء وتجهيز 87 فرعاً لشركة أبو عوف للمكسرات والبن في مختلف المولات والنوادي في جميع أنحاء مصر، كما نتولى صيانة وتجديد أكثر من 350 فرعاً
            </p>
          </div>

          <Tabs defaultValue="locations" className="w-full">
            <TabsList className="flex justify-center mb-8">
              <TabsTrigger value="locations">مواقع الفروع</TabsTrigger>
              <TabsTrigger value="gallery">معرض الصور</TabsTrigger>
              <TabsTrigger value="3d">النماذج ثلاثية الأبعاد</TabsTrigger>
            </TabsList>

            <TabsContent value="locations">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-primary mb-4">فروع أبو عوف التي تم إنشاؤها وتجهيزها</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-bold">الموقع</TableHead>
                      <TableHead className="font-bold">المدينة</TableHead>
                      <TableHead className="font-bold">المساحة</TableHead>
                      <TableHead className="font-bold">تاريخ الافتتاح</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { location: "مول أركان", city: "القاهرة", area: "85 م²", date: "2023" },
                      { location: "نادي وادي دجلة", city: "المعادي", area: "65 م²", date: "2022" },
                      { location: "نادي وادي دجلة", city: "الشيخ زايد", area: "70 م²", date: "2023" },
                      { location: "نادي وادي دجلة", city: "المقطم", area: "60 م²", date: "2022" },
                      { location: "سيتي ستارز", city: "مدينة نصر", area: "90 م²", date: "2023" },
                      { location: "مول مصر", city: "6 أكتوبر", area: "100 م²", date: "2022" },
                      { location: "داون تاون", city: "القاهرة الجديدة", area: "80 م²", date: "2023" },
                      { location: "بورتو القاهرة", city: "القاهرة الجديدة", area: "75 م²", date: "2022" },
                    ].map((branch, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{branch.location}</TableCell>
                        <TableCell>{branch.city}</TableCell>
                        <TableCell>{branch.area}</TableCell>
                        <TableCell>{branch.date}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="text-center mt-6">
                  <p className="text-secondary">هذه قائمة جزئية. تم إنشاء وتجهيز 87 فرع في مختلف أنحاء مصر</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="gallery">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => {
                  // Since we can't use the uploaded images directly as their paths depend on the server,
                  // we'll use URLs that should be replaced with the actual uploaded images later
                  const imageUrl = `https://images.unsplash.com/photo-${1550989460 + index}-${12345678910 + index}?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80`;
                  return (
                    <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm">
                      <div className="h-64 overflow-hidden">
                        <img 
                          src={imageUrl} 
                          alt={`محلات أبو عوف ${index + 1}`} 
                          className="w-full h-full object-cover transition-transform hover:scale-105"
                        />
                      </div>
                      <div className="p-4">
                        <h4 className="font-bold text-primary">فرع أبو عوف - {index % 2 === 0 ? "مول أركان" : "نادي وادي دجلة"}</h4>
                        <p className="text-sm text-gray-600">تم التنفيذ في {2022 + (index % 2)}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="text-center mt-8">
                <Button className="bg-primary hover:bg-primary-light">عرض المزيد من الصور</Button>
              </div>
            </TabsContent>

            <TabsContent value="3d">
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <h3 className="text-xl font-bold text-primary mb-4">النماذج ثلاثية الأبعاد</h3>
                <p className="text-secondary mb-6">
                  يمكنك استعراض نماذج ثلاثية الأبعاد لمشاريعنا من منصة ماجيك بلان
                </p>
                <div className="aspect-w-16 aspect-h-9 max-w-4xl mx-auto bg-gray-200 rounded-lg mb-6">
                  <div className="flex items-center justify-center h-full">
                    <p className="text-gray-500">نموذج ثلاثي الأبعاد لمحل أبو عوف - مول أركان</p>
                    {/* هنا سيتم إضافة النموذج ثلاثي الأبعاد لاحقاً */}
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                  {[...Array(4)].map((_, index) => (
                    <Button 
                      key={index}
                      variant="outline" 
                      className="text-primary border-primary hover:bg-primary hover:text-white"
                    >
                      نموذج {index + 1}
                    </Button>
                  ))}
                </div>
                <div className="mt-8">
                  <Button className="bg-accent text-primary hover:bg-accent/90">
                    زيارة منصة ماجيك بلان
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">هل تحتاج إلى خدماتنا لمشروعك التجاري؟</h2>
          <p className="max-w-xl mx-auto mb-8">
            نحن جاهزون لتقديم خدماتنا المتميزة لإنشاء وتجهيز وصيانة المحلات التجارية والمولات بأعلى مستويات الجودة
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button className="bg-white text-primary hover:bg-white/90">تواصل معنا</Button>
            </Link>
            <Link to="/projects">
              <Button variant="outline" className="text-white border-white hover:bg-white/20">عرض المشاريع</Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default RetailServicesPage;
