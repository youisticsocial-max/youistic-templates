import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: `Welcome to ${siteConfig.name}, a premier ${siteConfig.type} located in ${siteConfig.contact.city}, ${siteConfig.contact.state}. Affiliated with ${siteConfig.affiliatedBoard}, offering high-quality education and coaching.`,
  keywords: ["school", "coaching", "IIT JEE preparation", "NEET coaching", "CBSE school", "education center"],
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />

        {/* Flashing Admission Badge */}
        <a href="/admissions" className="admission-badge" id="floating-admission-badge">
          Admission Open {siteConfig.admissionYear}
        </a>

        {/* Floating WhatsApp Chat */}
        <a
          href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/\s+/g, "")}`}
          className="whatsapp-float"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contact on WhatsApp"
          id="floating-whatsapp-btn"
        >
          <svg viewBox="0 0 24 24">
            <path d="M12.012 2c-5.506 0-9.988 4.482-9.988 9.988 0 1.76.46 3.48 1.332 5l-1.354 4.954 5.073-1.33c1.474.804 3.128 1.226 4.814 1.228h.004c5.506 0 9.988-4.482 9.988-9.988 0-2.67-1.038-5.18-2.924-7.066-1.886-1.88-4.396-2.918-7.067-2.918zm5.727 14.072c-.25.707-1.254 1.303-1.732 1.378-.478.073-.952.124-2.992-.686-2.607-1.035-4.288-3.69-4.42-3.864-.13-.174-1.076-1.432-1.076-2.73 0-1.298.68-1.936.924-2.2.244-.264.532-.33.71-.33h.505c.16 0 .375-.06.587.452.22.532.75 1.83.815 1.963.065.132.11.286.02.463-.09.178-.137.29-.27.447-.134.157-.283.35-.403.47-.135.133-.276.28-.12.55.157.27.7 1.15 1.503 1.865.65.578 1.196.757 1.48.9.284.143.45.12.618-.07.168-.192.716-.832.907-1.116.192-.284.382-.24.646-.142.263.1.1.862 1.325 1.472s1.42.71.696 1.42c-.724.71-.25 1.42-.25 1.42z" />
          </svg>
        </a>
      </body>
    </html>
  );
}
