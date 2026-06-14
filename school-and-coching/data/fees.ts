export interface FeeRow {
  class: string;
  tuitionFee: string;
  admissionFee: string;
  totalPerYear: string;
  category: "school" | "coaching";
}

export const feeTable: FeeRow[] = [
  { class: "Nursery - KG", tuitionFee: "₹24,000", admissionFee: "₹5,000", totalPerYear: "₹29,000", category: "school" },
  { class: "Class 1 - 5", tuitionFee: "₹30,000", admissionFee: "₹5,000", totalPerYear: "₹35,000", category: "school" },
  { class: "Class 6 - 8", tuitionFee: "₹36,000", admissionFee: "₹5,000", totalPerYear: "₹41,000", category: "school" },
  { class: "Class 9 - 10", tuitionFee: "₹42,000", admissionFee: "₹5,000", totalPerYear: "₹47,000", category: "school" },
  { class: "Class 11 - 12 (Science)", tuitionFee: "₹48,000", admissionFee: "₹6,000", totalPerYear: "₹54,000", category: "school" },
  { class: "Class 11 - 12 (Commerce)", tuitionFee: "₹42,000", admissionFee: "₹5,000", totalPerYear: "₹47,000", category: "school" },
  { class: "JEE Main + Advanced (2-Year)", tuitionFee: "₹1,20,000", admissionFee: "₹5,000", totalPerYear: "₹1,25,000", category: "coaching" },
  { class: "JEE Main + Advanced (1-Year)", tuitionFee: "₹75,000", admissionFee: "₹5,000", totalPerYear: "₹80,000", category: "coaching" },
  { class: "NEET UG (2-Year)", tuitionFee: "₹1,10,000", admissionFee: "₹5,000", totalPerYear: "₹1,15,000", category: "coaching" },
  { class: "NEET UG (1-Year Crash)", tuitionFee: "₹70,000", admissionFee: "₹5,000", totalPerYear: "₹75,000", category: "coaching" },
  { class: "Board Prep (Class 10)", tuitionFee: "₹35,000", admissionFee: "₹3,000", totalPerYear: "₹38,000", category: "coaching" },
  { class: "Board Prep (Class 12)", tuitionFee: "₹40,000", admissionFee: "₹3,000", totalPerYear: "₹43,000", category: "coaching" },
];
