export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  images: string[];
  tags: string[];
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  challenge: string;
  solution: string;
  outcome: string;
  demoVideo?: string;
}

export const projects: Project[] = [
  {
    id: 'gargeon',
    title: 'Gargeon',
    description: 'A waste and recycling management platform connecting users with recycling services and facilities.',
    longDescription: 'Developed Gargeon, a comprehensive waste and recycling management platform designed to promote environmental sustainability. The platform connects users with local recycling centers, waste collection services, and provides educational resources about proper waste disposal and recycling practices.',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=600&fit=crop',
    ],
    tags: ['Web Development', 'Environmental Tech'],
    technologies: ['Angular', 'TypeScript', 'PHP', 'CodeIgniter', 'MySQL', 'Bootstrap'],
    featured: true,
    challenge: 'Creating an intuitive platform that could handle complex scheduling for waste collection services while educating users about recycling practices. The system needed to manage multiple user types (residents, collectors, recycling centers) with different needs and workflows.',
    solution: 'Built a role-based system using Angular for the frontend and CodeIgniter for the backend. Implemented a smart scheduling algorithm for waste collection, integrated mapping services for locating nearby recycling centers, and created an educational content management system with guides and tips.',
    outcome: 'Successfully launched platform connecting communities with recycling services, improving waste management efficiency and promoting sustainable practices across the region.',
  },
  {
    id: 'shtj',
    title: 'SHTJ - Land Tax Calculation System',
    description: 'A web-based land tax calculation system for 14 districts in Johor, Malaysia.',
    longDescription: 'Developed SHTJ (Sistem Hitung Taksiran Johor), a comprehensive land tax calculation system for the state of Johor. The application automates tax calculations across 14 districts, streamlining the process for government officials and providing accurate assessments based on property details, location, and current tax regulations.',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    ],
    tags: ['Web Development', 'Government Tech'],
    technologies: ['PHP', 'CodeIgniter', 'MySQL', 'JavaScript', 'Bootstrap', 'jQuery'],
    featured: true,
    challenge: 'Managing complex tax calculation formulas that varied across 14 different districts, each with unique regulations and rates. The system needed to be accurate, secure, and handle large volumes of data while remaining user-friendly for government officials with varying technical skills.',
    solution: 'Built a modular calculation engine with district-specific configuration modules. Implemented comprehensive validation and audit trails for all calculations. Created an intuitive interface with step-by-step wizards for data entry and automatic report generation. Ensured data security with role-based access control.',
    outcome: 'Successfully deployed across all 14 districts in Johor, significantly reducing manual calculation errors and processing time. The system improved tax assessment accuracy and streamlined government operations.',
  },
  {
    id: 'kiasu',
    title: 'Kiasu - Discount Coupon App',
    description: 'A mobile application for discovering and managing discount coupons and promotional deals.',
    longDescription: 'Created Kiasu, a mobile application designed to help users discover, save, and manage discount coupons and promotional deals from various merchants. The app features location-based deal discovery, personalized recommendations, QR code scanning for easy redemption, and push notifications for new deals and expiring coupons.',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?w=800&h=600&fit=crop',
    ],
    tags: ['Mobile Development', 'E-Commerce'],
    technologies: ['Ionic', 'Angular', 'TypeScript', 'PHP', 'CodeIgniter', 'MySQL'],
    featured: true,
    challenge: 'Creating a seamless cross-platform mobile experience that could handle real-time coupon availability, prevent duplicate redemptions, and work offline. The app needed to be fast and intuitive while managing a large database of constantly changing deals and merchant information.',
    solution: 'Built using Ionic framework for cross-platform compatibility. Implemented local storage with background sync for offline functionality, integrated geolocation services for nearby deals, and created a merchant dashboard for managing coupons. Added QR code generation and scanning for secure redemption tracking.',
    outcome: 'Successfully launched on both iOS and Android platforms, helping users save money through easily accessible deals. The app improved merchant engagement and provided valuable analytics on coupon usage patterns.',
  },
  {
    id: 'cloud-microservices',
    title: 'Enterprise Cloud Microservices Platform',
    description: 'Scalable microservices architecture built with Azure Functions, C#, and Kubernetes for enterprise applications.',
    longDescription: 'Developed a modern enterprise-grade microservices platform leveraging Azure cloud infrastructure. The system uses serverless Azure Functions for compute, Kubernetes for container orchestration, MongoDB for flexible data storage, and Next.js for the frontend dashboard. Designed to handle high-volume transactions with automatic scaling and fault tolerance.',
    image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop',
    ],
    tags: ['Cloud Computing', 'Enterprise Architecture'],
    technologies: ['C#', 'Azure', 'Azure Functions', 'Kubernetes', 'MongoDB', 'Next.js', 'TypeScript'],
    featured: true,
    challenge: 'Building a highly scalable system capable of handling variable loads while maintaining cost efficiency. The architecture needed to support multiple microservices with independent scaling, ensure data consistency across distributed systems, and provide real-time monitoring and observability.',
    solution: 'Implemented event-driven architecture using Azure Functions for serverless compute with automatic scaling. Deployed services in Kubernetes clusters for container orchestration and management. Used MongoDB for flexible schema design and horizontal scaling. Built monitoring dashboards with Next.js connected to Azure Application Insights for real-time system health tracking.',
    outcome: 'Successfully deployed platform handling millions of requests per month with 99.9% uptime. Reduced infrastructure costs by 40% through serverless architecture while improving response times. System automatically scales to handle traffic spikes without manual intervention.',
  },
  {
    id: 'portfolio-website',
    title: 'Custom Portfolio Websites',
    description: 'Professional portfolio and business websites built with modern web technologies.',
    longDescription: 'Designed and developed custom portfolio and business websites for clients across various industries. Each project features responsive design, modern aesthetics, SEO optimization, and content management capabilities tailored to the client\'s specific needs and brand identity.',
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    ],
    tags: ['Web Development', 'Design'],
    technologies: ['React', 'Angular', 'TypeScript', 'PHP', 'Bootstrap', 'Tailwind CSS'],
    featured: false,
    challenge: 'Creating unique designs that match each client\'s brand while maintaining performance, accessibility, and SEO best practices. Balancing creative design with technical requirements and ensuring easy content updates for non-technical clients.',
    solution: 'Developed reusable component libraries while customizing designs per client needs. Implemented headless CMS solutions for easy content management. Optimized images and assets for fast loading times. Created comprehensive style guides and documentation for each project.',
    outcome: 'Successfully delivered websites that improved client online presence, with measurable increases in user engagement and conversion rates. Clients appreciated the balance of aesthetic appeal and functionality.',
  },
  {
    id: 'business-applications',
    title: 'Custom Business Applications',
    description: 'Tailored web applications for streamlining business processes and operations.',
    longDescription: 'Developed custom business applications designed to automate workflows, improve efficiency, and solve specific operational challenges. Projects include inventory management systems, employee portals, customer relationship management tools, and reporting dashboards.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=600&fit=crop',
    ],
    tags: ['Web Development', 'Business Solutions'],
    technologies: ['Angular', 'React', 'PHP', 'CodeIgniter', 'MySQL', 'Node.js'],
    featured: false,
    challenge: 'Understanding diverse business requirements across different industries and translating them into functional, user-friendly applications. Ensuring data security, scalability, and integration with existing systems while meeting tight deadlines.',
    solution: 'Conducted thorough requirement analysis sessions with stakeholders. Built modular architectures allowing for future expansion. Implemented robust authentication and authorization systems. Created comprehensive testing procedures and provided training for end users.',
    outcome: 'Delivered applications that significantly improved operational efficiency for clients, reducing manual work and processing times. Received positive feedback for intuitive interfaces and reliable performance.',
  },
  {
    id: 'mobile-applications',
    title: 'Mobile Application Development',
    description: 'Cross-platform mobile applications built with Ionic framework.',
    longDescription: 'Created cross-platform mobile applications using Ionic framework, providing native-like experiences for both iOS and Android from a single codebase. Projects include business apps, utility tools, and consumer-facing applications with features like offline functionality, push notifications, and device integration.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop',
    ],
    tags: ['Mobile Development', 'Cross-Platform'],
    technologies: ['Ionic', 'Angular', 'TypeScript', 'Capacitor', 'Firebase'],
    featured: false,
    challenge: 'Delivering native-like performance and user experience while maintaining a single codebase for multiple platforms. Handling device-specific features and ensuring smooth offline functionality while keeping app size optimized.',
    solution: 'Leveraged Ionic\'s component library and Capacitor plugins for native functionality. Implemented progressive loading and caching strategies for offline support. Optimized bundle sizes and used lazy loading for better performance. Conducted thorough testing on various devices and OS versions.',
    outcome: 'Successfully launched multiple apps on both App Store and Google Play with positive user ratings. Reduced development time and costs compared to native development while maintaining quality standards.',
  },
];

export const technologies = [
  'React',
  'Next.js',
  'Angular',
  'TypeScript',
  'JavaScript',
  'Ionic',
  'PHP',
  'C#',
  'CodeIgniter',
  'Node.js',
  'Express',
  'MySQL',
  'PostgreSQL',
  'MongoDB',
  'Azure',
  'Azure Functions',
  'Kubernetes',
  'Bootstrap',
  'Tailwind CSS',
  'HTML5',
  'CSS3',
  'jQuery',
  'Firebase',
  'Git',
];
