import type { MetadataRoute } from "next";
import { church } from "@/lib/church";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${church.name} Nashville`,
    short_name: church.shortName,
    description: church.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0a1a33",
    theme_color: "#0a1a33",
    icons: [{ src: "/logo.png", sizes: "250x250", type: "image/png" }],
  };
}
