import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";
import EmergencyButton from "@/components/EmergencyButton";
import ParticlesBackground from "@/components/ParticlesBackground";

export const metadata: Metadata = {
  title: "Indian Black Panther Security Services | Elite Security Solutions",
  description:
    "India's premier security agency providing elite security guards, professional bouncers, armed gunmen, personal security officers, and event security management. 24/7 protection for corporates, events, and VIPs.",
  keywords:
    "security services, security guards, bouncers, armed security, personal security officer, event security, VIP protection, Jodhpur security",
  openGraph: {
    title: "Indian Black Panther Security Services",
    description: "Elite Security Solutions With Military-Grade Protection",
    type: "website",
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
        <LoadingScreen />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <EmergencyButton />
      </body>
    </html>
  );
}
