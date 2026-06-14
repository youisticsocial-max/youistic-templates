export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
  photo: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "rev1",
    name: "Mrs. Sunita Sharma",
    role: "Parent of Aman Sharma (IIT Bombay)",
    text: "EduVision Academy has been a life-changing experience for my son. The faculty's dedication and the structured approach to JEE preparation helped Aman achieve his dream of getting into IIT Bombay. The regular parent-teacher meetings kept us informed about his progress.",
    rating: 5,
    photo: "/images/testimonials/parent-1.jpg",
  },
  {
    id: "rev2",
    name: "Priya Joshi",
    role: "Student — AIIMS Delhi (NEET 2024)",
    text: "The NEET coaching at EduVision is exceptional. The biology faculty made complex topics so simple. The test series was exactly like the actual NEET exam. I scored 680/720 and got into AIIMS Delhi. Thank you EduVision!",
    rating: 5,
    photo: "/images/testimonials/student-1.jpg",
  },
  {
    id: "rev3",
    name: "Mr. Rajesh Verma",
    role: "Parent of Sneha Verma (IIT Kharagpur)",
    text: "We chose EduVision for the small batch size and personal attention. The doubt clearing sessions after regular classes were a game-changer. Sneha's transformation from an average student to an IIT qualifier is all thanks to the amazing teachers here.",
    rating: 5,
    photo: "/images/testimonials/parent-2.jpg",
  },
  {
    id: "rev4",
    name: "Rohit Meena",
    role: "Student — CBSE Topper 95.6% (2024)",
    text: "The school section of EduVision provided me with the perfect balance of academics and extracurricular activities. The teachers are supportive and the infrastructure is excellent. I'm proud to be an EduVision alumnus.",
    rating: 5,
    photo: "/images/testimonials/student-2.jpg",
  },
  {
    id: "rev5",
    name: "Mrs. Kavita Patel",
    role: "Parent of Karan Patel (MAMC Delhi)",
    text: "The NEET preparation at EduVision is top-notch. The weekly tests and performance analysis helped us track Karan's progress. The faculty is highly experienced and always available for doubt clearing. Highly recommend!",
    rating: 4,
    photo: "/images/testimonials/parent-3.jpg",
  },
  {
    id: "rev6",
    name: "Ananya Singh",
    role: "Student — CBSE Board 97.2% (2024)",
    text: "EduVision's school program is brilliant. The smart classrooms, regular assessments, and the supportive environment helped me score 97.2% in boards. The teachers go above and beyond to ensure every student succeeds.",
    rating: 5,
    photo: "/images/testimonials/student-3.jpg",
  },
];
