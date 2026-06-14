export interface Topper {
  id: string;
  name: string;
  achievement: string;
  institution: string;
  exam: string;
  year: number;
  photo: string;
}

export const toppers: Topper[] = [
  {
    id: "t1",
    name: "Aman Sharma",
    achievement: "AIR 847",
    institution: "IIT Bombay",
    exam: "JEE Advanced 2024",
    year: 2024,
    photo: "/images/toppers/topper-1.jpg",
  },
  {
    id: "t2",
    name: "Priya Joshi",
    achievement: "NEET Score 680/720",
    institution: "AIIMS Delhi",
    exam: "NEET UG 2024",
    year: 2024,
    photo: "/images/toppers/topper-2.jpg",
  },
  {
    id: "t3",
    name: "Rohit Meena",
    achievement: "95.6%",
    institution: "CBSE Class 12",
    exam: "CBSE Board 2024",
    year: 2024,
    photo: "/images/toppers/topper-3.jpg",
  },
  {
    id: "t4",
    name: "Sneha Verma",
    achievement: "AIR 1203",
    institution: "IIT Kharagpur",
    exam: "JEE Advanced 2024",
    year: 2024,
    photo: "/images/toppers/topper-4.jpg",
  },
  {
    id: "t5",
    name: "Karan Patel",
    achievement: "NEET Score 655/720",
    institution: "MAMC Delhi",
    exam: "NEET UG 2024",
    year: 2024,
    photo: "/images/toppers/topper-5.jpg",
  },
  {
    id: "t6",
    name: "Ananya Singh",
    achievement: "97.2%",
    institution: "CBSE Class 12",
    exam: "CBSE Board 2024",
    year: 2024,
    photo: "/images/toppers/topper-6.jpg",
  },
  {
    id: "t7",
    name: "Rahul Choudhary",
    achievement: "AIR 2450",
    institution: "NIT Jaipur",
    exam: "JEE Main 2023",
    year: 2023,
    photo: "/images/toppers/topper-7.jpg",
  },
  {
    id: "t8",
    name: "Divya Kapoor",
    achievement: "NEET Score 640/720",
    institution: "SMS Medical College",
    exam: "NEET UG 2023",
    year: 2023,
    photo: "/images/toppers/topper-8.jpg",
  },
];

export interface AchievementStat {
  label: string;
  value: string;
  icon: string;
}

export const achievementStats: AchievementStat[] = [
  { label: "IIT Selections", value: "120+", icon: "🏆" },
  { label: "Medical Seats", value: "85+", icon: "⚕️" },
  { label: "Board Toppers (90%+)", value: "350+", icon: "🎓" },
  { label: "NIT / IIIT Selections", value: "200+", icon: "🏅" },
];
