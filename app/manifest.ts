import type { MetadataRoute } from "next";
import { company, getSite } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: getSite("lt").nameFull,
    short_name: company.nameShort,
    description: getSite("lt").descShort,
    start_url: "/",
    display: "browser",
    background_color: "#f3f4f6",
    theme_color: "#14233a",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
