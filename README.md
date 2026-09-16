# Casas Abrek

Sitio de Casas Abrek, diseño y construcción en Chihuahua.

Next.js (App Router) · Tailwind CSS v4 · motion · TypeScript

## Desarrollo

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Estructura

```
src/
  app/          rutas: / (landing), /casa-sinai, /descubre
  components/   Navbar y Footer
  sections/     secciones de la landing; sinai/ y quiz/ para las otras rutas
  data/         contenido editable (site, projects, quiz)
  lib/          utilidades (links de WhatsApp)
```

Los colores de marca y las tipografías viven en `src/app/globals.css`:
`primary` (café #380C03), `secondary` (oro #C1A164), `accent` (crema #F4F1EA),
`font-display` (Anton) y `font-body` (Montserrat).
