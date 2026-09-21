import type { MetadataRoute } from "next";
import { site } from "@/data/site";

// si se agrega una pagina nueva, va aqui para que Google la encuentre
const routes = [
    { path: "", priority: 1 },
    { path: "/casa-sinai", priority: 0.9 },
    { path: "/descubre", priority: 0.8 },
    { path: "/casa-armonia", priority: 0.6 },
    { path: "/casa-aurora", priority: 0.6 },
    { path: "/casa-plenitude", priority: 0.6 },
    { path: "/aviso-de-privacidad", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
    return routes.map(({ path, priority }) => ({
        url: `${site.url}${path}`,
        lastModified: new Date(),
        priority,
    }));
}
