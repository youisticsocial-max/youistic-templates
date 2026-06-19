// Central data store for white-label Gym & Fitness template
// All data is initialized in localStorage so that edits in the Admin Panel persist and show up immediately.

const INITIAL_PROGRAMS = [
  {
    id: 'prog-1',
    title: 'Strength Training',
    desc: 'Build raw muscle, increase power output, and improve bone density under professional supervision.',
    img: '/assets/weight-training.jpg',
    category: 'Strength'
  },
  {
    id: 'prog-2',
    title: 'CrossFit & Functional',
    desc: 'Improve stamina, agility, and explosive athletic performance through high-intensity circuits.',
    img: '/assets/crossfit-training.jpg',
    category: 'Conditioning'
  },
  {
    id: 'prog-3',
    title: 'Personal Training',
    desc: 'One-to-one coaching tailored strictly to your goals, biometrics, and physical capabilities.',
    img: '/assets/personal-trainer.jpg',
    category: 'Coaching'
  },
  {
    id: 'prog-4',
    title: 'Cardio Zone',
    desc: 'Enhance cardiovascular endurance, torch fat, and improve recovery times on premium equipment.',
    img: '/assets/cardio-zone.jpg',
    category: 'Cardio'
  },
  {
    id: 'prog-5',
    title: 'Yoga & Mindfulness',
    desc: 'Deepen mobility, correct posture, reduce stress, and improve recovery with flow sequences.',
    img: '/assets/yoga-class.jpg',
    category: 'Wellness'
  },
  {
    id: 'prog-6',
    title: 'Zumba & Group Dance',
    desc: 'High-energy, music-driven dance sessions that burn calories in an active, fun social circle.',
    img: '/assets/group-fitness.jpg',
    category: 'Group'
  },
  {
    id: 'prog-7',
    title: 'Boxing & MMA',
    desc: 'Master striking, defensive movements, endurance, and core strength with championship-grade gear.',
    img: '/assets/mma-training.jpg',
    category: 'Combat'
  },
  {
    id: 'prog-8',
    title: 'Strength & Conditioning',
    desc: 'Scientific, metric-based athletic training routines designed for amateur and pro competitors.',
    img: '/assets/fitness-equipment.jpg',
    category: 'Strength'
  }
];

const INITIAL_TRAINERS = [
  {
    id: 'train-1',
    name: 'Marcus Vance',
    role: 'Elite Strength Coach',
    certs: 'CSCS, NASM-PES, 10+ Yrs Experience',
    img: '/assets/personal-trainer.jpg',
    social: { instagram: '#', facebook: '#', twitter: '#' }
  },
  {
    id: 'train-2',
    name: 'Elena Rostova',
    role: 'CrossFit Head Trainer',
    certs: 'CrossFit L3 Coach, Olympic Weightlifting Cert',
    img: '/assets/weight-training.jpg',
    social: { instagram: '#', facebook: '#', twitter: '#' }
  },
  {
    id: 'train-3',
    name: 'Ryan Kaelen',
    role: 'MMA & Conditioning Coach',
    certs: 'Former Pro Fighter, Certified MMA Coach',
    img: '/assets/mma-training.jpg',
    social: { instagram: '#', facebook: '#', twitter: '#' }
  },
  {
    id: 'train-4',
    name: 'Sienna Winters',
    role: 'Yoga & Pilates Therapist',
    certs: 'RYT-500, Certified Mobility Specialist',
    img: '/assets/yoga-class.jpg',
    social: { instagram: '#', facebook: '#', twitter: '#' }
  }
];

const INITIAL_CLASSES = [
  { id: 'class-1', day: 'Monday', time: '07:00 AM', name: 'Strength Training', level: 'Intermediate', trainer: 'Marcus Vance' },
  { id: 'class-2', day: 'Monday', time: '09:00 AM', name: 'Yoga Flow', level: 'Beginner', trainer: 'Sienna Winters' },
  { id: 'class-3', day: 'Tuesday', time: '08:00 AM', name: 'CrossFit WOD', level: 'Advanced', trainer: 'Elena Rostova' },
  { id: 'class-4', day: 'Tuesday', time: '05:00 PM', name: 'Boxing Basics', level: 'Beginner', trainer: 'Ryan Kaelen' },
  { id: 'class-5', day: 'Wednesday', time: '07:00 AM', name: 'HIIT Circuit', level: 'Advanced', trainer: 'Elena Rostova' },
  { id: 'class-6', day: 'Wednesday', time: '06:00 PM', name: 'Zumba Cardio', level: 'Beginner', trainer: 'Sienna Winters' },
  { id: 'class-7', day: 'Thursday', time: '08:00 AM', name: 'Strength Training', level: 'Intermediate', trainer: 'Marcus Vance' },
  { id: 'class-8', day: 'Thursday', time: '05:00 PM', name: 'MMA Striking', level: 'Advanced', trainer: 'Ryan Kaelen' },
  { id: 'class-9', day: 'Friday', time: '09:00 AM', name: 'Power Yoga', level: 'Intermediate', trainer: 'Sienna Winters' },
  { id: 'class-10', day: 'Friday', time: '06:00 PM', name: 'CrossFit WOD', level: 'Advanced', trainer: 'Elena Rostova' },
  { id: 'class-11', day: 'Saturday', time: '10:00 AM', name: 'Athletic Conditioning', level: 'Intermediate', trainer: 'Marcus Vance' },
  { id: 'class-12', day: 'Sunday', time: '11:00 AM', name: 'Yoga Recovery', level: 'Beginner', trainer: 'Sienna Winters' }
];

const INITIAL_MEMBERSHIPS = [
  {
    id: 'plan-1',
    name: 'Basic Membership',
    priceMonthly: 49,
    priceYearly: 470,
    popular: false,
    perks: [
      'Access to Gym Floor & Standard Equipment',
      'Free Locker & Shower Access',
      '1 Complimentary Fitness Orientation Session',
      'Standard Operating Hours Access'
    ]
  },
  {
    id: 'plan-2',
    name: 'Premium Membership',
    priceMonthly: 89,
    priceYearly: 850,
    popular: true,
    perks: [
      '24/7 Club Access to All Gym Facilities',
      'Unlimited Group Fitness & Zumba Classes',
      'Monthly Bio-impedance Body Assessments',
      '1 Private Training Session / Month',
      'Access to Sauna & Recovery Lounges'
    ]
  },
  {
    id: 'plan-3',
    name: 'Elite Membership',
    priceMonthly: 189,
    priceYearly: 1800,
    popular: false,
    perks: [
      'All Premium Membership Privileges',
      '8 Private Personal Training Sessions / Month',
      'Customized Nutritional & Workout Blueprints',
      'Priority Booking for Classes & Events',
      'Complimentary Guest Pass per Visit'
    ]
  }
];

const INITIAL_TRANSFORMATIONS = [
  {
    id: 'trans-1',
    name: 'Dave K.',
    story: 'Lost 28kg and rebuilt complete postural stability. Marcus helped me redesign my nutrition from scratch.',
    duration: '6 Months',
    beforeImg: '/assets/transformation.jpg',
    afterImg: '/assets/weight-training.jpg'
  },
  {
    id: 'trans-2',
    name: 'Sarah M.',
    story: 'Increased squat capacity by 80kg and unlocked athletic power I never knew I possessed.',
    duration: '8 Months',
    beforeImg: '/assets/yoga-class.jpg',
    afterImg: '/assets/crossfit-training.jpg'
  }
];

const INITIAL_BLOGS = [
  {
    id: 'blog-1',
    title: 'The Blueprint to Progressive Overload',
    excerpt: 'Understand the primary mechanism behind muscle hypertrophy and strength gains.',
    content: 'Progressive overload is the gradual increase of stress placed upon the body during exercise training. It is the cornerstone of muscle building. To trigger hypertrophy, you must consistently force your muscles to work harder than they are accustomed to. This can be achieved by increasing the resistance (weight), increasing reps, increasing set counts, or decreasing rest times. Keep a detailed training journal to log your workouts and ensure you are progressing over weeks, not just random training sessions.',
    date: 'June 12, 2026',
    author: 'Marcus Vance',
    readTime: '5 Min Read',
    tag: 'Training'
  },
  {
    id: 'blog-2',
    title: 'Nutrition Rules for Sustainable Fat Loss',
    excerpt: 'Ditch the crash dieting and implement macro-based guidelines that work long term.',
    content: 'Sustainable weight loss is about maintaining a caloric deficit while preserving lean muscle tissue. To achieve this, maintain a moderate deficit of 300-500 calories below your TDEE (Total Daily Energy Expenditure). Consume sufficient protein (around 1.6 to 2.2 grams per kilogram of body weight) to protect muscle fibers. Focus on high-volume, nutrient-dense whole foods like leafy greens, lean meats, and complex carbs to keep hunger hormones stable.',
    date: 'May 28, 2026',
    author: 'Elena Rostova',
    readTime: '7 Min Read',
    tag: 'Nutrition'
  },
  {
    id: 'blog-3',
    title: 'Optimal Muscle Recovery Techniques',
    excerpt: 'Why sleep and active decompression are key to unlocking peak gym performance.',
    content: 'Your muscles do not grow inside the gym; they grow while you sleep and recover. Training creates micro-tears in muscle fibers. Sleep releases human growth hormone (HGH) which facilitates cellular repair. Aim for 7.5 to 9 hours of quality sleep nightly. Integrate active recovery days containing light mobility work, low-intensity walks, and structural massage to stimulate blood circulation and flush out metabolic waste.',
    date: 'April 15, 2026',
    author: 'Sienna Winters',
    readTime: '4 Min Read',
    tag: 'Recovery'
  }
];

const INITIAL_CONTENT = {
  seoTitle: '{{CLINIC_NAME}} | Premium International Fitness & Wellness Club',
  seoDesc: 'Unlock your physical potential with {{CLINIC_NAME}}. Advanced coaching, premium equipment, and customized bodybuilding/conditioning programs.',
  heroHeadline: 'Transform Your Body. Transform Your Life.',
  heroSubheading: 'Professional coaching, advanced imported equipment, and customized fitness programs designed to unlock your true athletic potential.',
  aboutStory: 'Founded with the mission to build an elite training community, {{CLINIC_NAME}} has evolved into a premier luxury wellness center. We provide high-contrast energetic environments, state-of-the-art imported equipment, and certified coaches who are practitioners of strength.',
  mission: 'To empower individuals to transcend their physical limitations and build disciplined, high-performance lifestyles.',
  vision: 'To establish a global standard for luxury athletic performance centers that integrate science, coaching, and premium spaces.',
  address: '{{ADDRESS}}',
  phone: '{{PHONE}}',
  email: 'info@gymtemplate.com'
};

const getStored = (key, initial) => {
  const data = localStorage.getItem(key);
  if (!data) {
    localStorage.setItem(key, JSON.stringify(initial));
    return initial;
  }
  return JSON.parse(data);
};

export const dataStore = {
  getPrograms: () => getStored('gym_programs', INITIAL_PROGRAMS),
  savePrograms: (data) => localStorage.setItem('gym_programs', JSON.stringify(data)),
  
  getTrainers: () => getStored('gym_trainers', INITIAL_TRAINERS),
  saveTrainers: (data) => localStorage.setItem('gym_trainers', JSON.stringify(data)),
  
  getClasses: () => getStored('gym_classes', INITIAL_CLASSES),
  saveClasses: (data) => localStorage.setItem('gym_classes', JSON.stringify(data)),
  
  getMemberships: () => getStored('gym_memberships', INITIAL_MEMBERSHIPS),
  saveMemberships: (data) => localStorage.setItem('gym_memberships', JSON.stringify(data)),
  
  getTransformations: () => getStored('gym_transformations', INITIAL_TRANSFORMATIONS),
  saveTransformations: (data) => localStorage.setItem('gym_transformations', JSON.stringify(data)),
  
  getBlogs: () => getStored('gym_blogs', INITIAL_BLOGS),
  saveBlogs: (data) => localStorage.setItem('gym_blogs', JSON.stringify(data)),
  
  getContent: () => getStored('gym_content', INITIAL_CONTENT),
  saveContent: (data) => localStorage.setItem('gym_content', JSON.stringify(data)),
  
  // Reset all stores
  resetAll: () => {
    localStorage.removeItem('gym_programs');
    localStorage.removeItem('gym_trainers');
    localStorage.removeItem('gym_classes');
    localStorage.removeItem('gym_memberships');
    localStorage.removeItem('gym_transformations');
    localStorage.removeItem('gym_blogs');
    localStorage.removeItem('gym_content');
    window.location.reload();
  }
};
