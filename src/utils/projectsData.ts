
// Define the Project type
export interface Project {
  id: number;
  title: string;
  category: string;
  location: string;
  year: string;
  description: string;
  image: string;
  gallery: string[];
}

// Get all projects function
export const getAllProjects = (): Project[] => {
  return projects;
};

// Projects data
const projects = [
  {
    id: 1,
    title: 'برج السلام التجاري',
    category: 'مباني تجارية',
    location: 'الرياض، المملكة العربية السعودية',
    year: '2023',
    description: 'برج مكتبي حديث يتألف من 25 طابقاً، صمم وفقاً لأحدث معايير الاستدامة والكفاءة الطاقية.',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1486325212027-8081e485255e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      'https://images.unsplash.com/photo-1481253127861-534498168948?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      'https://images.unsplash.com/photo-1492455417212-e162ed4446e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    ],
  },
  {
    id: 2,
    title: 'مجمع الواحة السكني',
    category: 'مباني سكنية',
    location: 'جدة، المملكة العربية السعودية',
    year: '2022',
    description: 'مجمع سكني فاخر يضم 120 وحدة سكنية متنوعة، مع خدمات ومرافق متكاملة تلبي احتياجات السكان.',
    image: 'https://images.unsplash.com/photo-1519999482648-25049ddd37b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1519999482648-25049ddd37b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      'https://images.unsplash.com/photo-1507149833265-60c372daea22?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    ],
  },
  {
    id: 3,
    title: 'مستشفى الرحمة',
    category: 'مباني صحية',
    location: 'الدمام، المملكة العربية السعودية',
    year: '2022',
    description: 'مستشفى حديث يضم 250 سريراً، مجهز بأحدث التقنيات الطبية والتصميم الذي يراعي راحة المرضى والكادر الطبي.',
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      'https://images.unsplash.com/photo-1512678080530-7760d81faba6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    ],
  },
  {
    id: 4,
    title: 'مول الأندلس',
    category: 'مباني تجارية',
    location: 'الرياض، المملكة العربية السعودية',
    year: '2021',
    description: 'مركز تسوق عصري يمتد على مساحة 85,000 متر مربع، يضم أكثر من 200 متجر ومطعم ومرافق ترفيهية متنوعة.',
    image: 'https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      'https://images.unsplash.com/photo-1604014237800-1c9102c219da?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    ],
  },
  {
    id: 5,
    title: 'فندق القمة',
    category: 'مباني سياحية',
    location: 'مكة المكرمة، المملكة العربية السعودية',
    year: '2021',
    description: 'فندق فخم يضم 350 غرفة وجناحاً، مع مرافق متعددة ومطاعم عالمية وقاعات مؤتمرات مجهزة بأحدث التقنيات.',
    image: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      'https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      'https://images.unsplash.com/photo-1551632436-cbf726cbfb8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    ],
  },
  {
    id: 6,
    title: 'مدرسة المستقبل الدولية',
    category: 'مباني تعليمية',
    location: 'جدة، المملكة العربية السعودية',
    year: '2020',
    description: 'مجمع تعليمي متكامل يضم مراحل تعليمية مختلفة، مع مرافق رياضية وترفيهية ومختبرات علمية متطورة.',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    ],
  },
  {
    id: 7,
    title: 'مصنع النور',
    category: 'مباني صناعية',
    location: 'الدمام، المملكة العربية السعودية',
    year: '2020',
    description: 'منشأة صناعية حديثة تمتد على مساحة 12,000 متر مربع، مصممة وفق أحدث معايير السلامة والكفاءة الإنتاجية.',
    image: 'https://images.unsplash.com/photo-1518866958548-51a748102f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1518866958548-51a748102f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      'https://images.unsplash.com/photo-1565861748877-7194b889b660?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      'https://images.unsplash.com/photo-1516937941344-00b4e0337589?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    ],
  },
  {
    id: 8,
    title: 'حديقة الأمير محمد',
    category: 'مساحات عامة',
    location: 'الرياض، المملكة العربية السعودية',
    year: '2019',
    description: 'حديقة عامة تمتد على مساحة 25 هكتاراً، تضم مسطحات خضراء ومناطق ترفيهية ومسارات للمشي وبحيرة اصطناعية.',
    image: 'https://images.unsplash.com/photo-1476231682828-37e571bc172f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1476231682828-37e571bc172f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      'https://images.unsplash.com/photo-1497035111255-8294324af5bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      'https://images.unsplash.com/photo-1527561010307-3d8a5d024b4f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    ],
  },
];
