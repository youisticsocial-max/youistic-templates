export interface Facility {
  id: string;
  name: string;
  description: string;
  icon: string;
  photo: string;
}

export const facilities: Facility[] = [
  {
    id: "inf1",
    name: "Smart Classrooms",
    description: "40+ digitally-enabled classrooms equipped with interactive whiteboards, projectors, and audio-visual learning aids for immersive education.",
    icon: "🖥️",
    photo: "/images/infrastructure/classroom.jpg",
  },
  {
    id: "inf2",
    name: "Science Laboratories",
    description: "State-of-the-art Physics, Chemistry, and Biology labs with modern equipment, enabling hands-on experimentation and practical learning.",
    icon: "🔬",
    photo: "/images/infrastructure/lab.jpg",
  },
  {
    id: "inf3",
    name: "Library & Reading Room",
    description: "A vast collection of 15,000+ books, journals, and digital resources. Air-conditioned reading room with seating for 100+ students.",
    icon: "📚",
    photo: "/images/infrastructure/library.jpg",
  },
  {
    id: "inf4",
    name: "Computer Lab",
    description: "50+ workstations with high-speed internet, latest software, and dedicated coding lab for computer science students.",
    icon: "💻",
    photo: "/images/infrastructure/computer-lab.jpg",
  },
  {
    id: "inf5",
    name: "Sports Complex",
    description: "Multi-sport facility with cricket ground, basketball court, badminton courts, and indoor games room for holistic development.",
    icon: "🏏",
    photo: "/images/infrastructure/sports.jpg",
  },
  {
    id: "inf6",
    name: "Transport Fleet",
    description: "GPS-enabled school buses covering 5 major routes across the city. Safe, punctual, and comfortable travel for all students.",
    icon: "🚌",
    photo: "/images/infrastructure/transport.jpg",
  },
  {
    id: "inf7",
    name: "Auditorium",
    description: "500-seat air-conditioned auditorium with professional sound and lighting for seminars, cultural events, and annual functions.",
    icon: "🎭",
    photo: "/images/infrastructure/auditorium.jpg",
  },
  {
    id: "inf8",
    name: "Cafeteria",
    description: "Hygienic and spacious cafeteria serving nutritious meals and snacks. FSSAI certified with a focus on balanced diet for students.",
    icon: "🍽️",
    photo: "/images/infrastructure/cafeteria.jpg",
  },
];
