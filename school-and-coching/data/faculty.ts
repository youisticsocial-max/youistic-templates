export interface FacultyMember {
  id: string;
  name: string;
  subject: string;
  qualification: string;
  experience: number;
  photo: string;
  specialization?: string;
}

export const faculty: FacultyMember[] = [
  {
    id: "f1",
    name: "Dr. Anil Mathur",
    subject: "Physics",
    qualification: "M.Sc., Ph.D. (Physics), IIT Delhi",
    experience: 18,
    photo: "/images/faculty/faculty-1.jpg",
    specialization: "JEE Advanced Physics",
  },
  {
    id: "f2",
    name: "Prof. Sunita Agarwal",
    subject: "Chemistry",
    qualification: "M.Sc. (Chemistry), NET Qualified",
    experience: 15,
    photo: "/images/faculty/faculty-2.jpg",
    specialization: "Organic & Inorganic Chemistry",
  },
  {
    id: "f3",
    name: "Mr. Vikram Singh Rathore",
    subject: "Mathematics",
    qualification: "M.Sc. (Mathematics), B.Ed.",
    experience: 12,
    photo: "/images/faculty/faculty-3.jpg",
    specialization: "Calculus & Algebra",
  },
  {
    id: "f4",
    name: "Dr. Meena Sharma",
    subject: "Biology",
    qualification: "M.Sc., Ph.D. (Zoology)",
    experience: 14,
    photo: "/images/faculty/faculty-4.jpg",
    specialization: "NEET Biology Expert",
  },
  {
    id: "f5",
    name: "Mrs. Priyanka Joshi",
    subject: "English",
    qualification: "M.A. (English Literature), B.Ed.",
    experience: 10,
    photo: "/images/faculty/faculty-5.jpg",
    specialization: "Communication & Creative Writing",
  },
  {
    id: "f6",
    name: "Mr. Rajesh Gupta",
    subject: "Computer Science",
    qualification: "M.Tech (CSE), MCA",
    experience: 8,
    photo: "/images/faculty/faculty-6.jpg",
    specialization: "Python, Java & Web Development",
  },
  {
    id: "f7",
    name: "Mrs. Kavita Pareek",
    subject: "Hindi",
    qualification: "M.A. (Hindi), Ph.D.",
    experience: 16,
    photo: "/images/faculty/faculty-7.jpg",
    specialization: "Hindi Literature & Grammar",
  },
  {
    id: "f8",
    name: "Mr. Deepak Choudhary",
    subject: "Social Science",
    qualification: "M.A. (History), B.Ed.",
    experience: 11,
    photo: "/images/faculty/faculty-8.jpg",
    specialization: "History & Political Science",
  },
];
