import { prisma } from "@/lib/db";
import GalleryClient from "./GalleryClient";

export const metadata = {
  title: "Media Gallery | Indian Black Panther Security Services",
  description: "View photos and videos of our elite security personnel on duty, VIP escorts, event protection, and tactical drills.",
};

async function getGalleryData() {
  return await prisma.galleryItem.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export default async function GalleryPage() {
  const items = await getGalleryData();

  return (
    <GalleryClient initialItems={items} />
  );
}
