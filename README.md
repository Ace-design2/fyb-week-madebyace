# FYB Week '26 Photo Gallery

A high-performance, immersive photo gallery application developed to document the FUNAAB Final Year Brethren (FYB) Week 2026 ("Segun's Official Recap"). Built with Next.js (Pages Router), TypeScript, and Tailwind CSS, the architecture leverages a hybrid approach to image performance by integrating Vercel Blob Storage with dynamic local metadata for rapid asset rendering.

## Core Architecture and Features

### Image Optimization and Data Delivery
- **Vercel Blob SDK**: Leverages server-side blob listing (`@vercel/blob`) combined with custom in-memory server caching during Build-Time (`getStaticProps`).
- **Hybrid Metadata Optimization**: Dynamically matches remote asset URLs to pre-compiled dimension and Base64 blur-up placeholders stored in `image-metadata.json`, eliminating heavy runtime processing.
- **Modern Responsive Optimization**: Direct utilization of the `next/image` API provides optimized modern format payloads (AVIF/WebP) alongside CSS-driven responsive layout transitions.

### Interactions and Navigation
- **High-Fidelity Animations**: Incorporates Framer Motion to coordinate stagger entrances, smooth UI item translation, and spring-damped transitions within active interfaces.
- **Responsive Media Modals**: A custom overlay that maintains spatial browser state across routing transitions via dynamic modal segments and Next.js shallow routing (`/p/[photoId]`).
- **Gesture and Key-Driven Interactivity**: Native integration of standard keyboard listeners and capacitive touch event tracking (`react-swipeable`) for swift carousel navigation.
- **Active Navigation Timeline**: A synchronous, scrolling image filmstrip within the active modal layer allowing targeted traversal of nearby gallery assets.

### Aesthetics and Visual Systems
- **Theming Architecture**: Implementation of `next-themes` utilizing system preference priority configured with fallback strategies for system-light/dark defaults.
- **UI Composition**: A responsive masonry layout leveraging standard CSS column properties coupled with robust backdrop filtering, high-pass shadow overlays, and precise layout structures.

## Project Structure

```text
├── components/
│   ├── Carousel.tsx       # Sub-interface for photo sequence traversal
│   ├── Modal.tsx          # Wrapper coordinating client modal state and routing
│   ├── SharedModal.tsx    # Core logic for navigation, downloads, and gestures
│   └── ThemeToggle.tsx    # Dynamic system/manual dark-mode activation button
├── pages/
│   ├── index.tsx          # Entry point fetching static image payloads
│   └── p/[photoId].tsx    # Direct link dynamic pages
├── public/                # Static image assets
├── styles/                # Global CSS tokens and base styles
├── utils/
│   ├── cachedImages.ts    # In-memory SSR cache matching Vercel Blobs to metadata
│   ├── downloadPhoto.ts   # Dynamic asset stream retrieval logic
│   └── types.ts           # Central TypeScript definitions
└── image-metadata.json    # Static build metadata catalog for responsive placeholders
```

## Environment Configuration

Required configuration parameters must reside in `.env.local`:

```env
BLOB_READ_WRITE_TOKEN=your_vercel_blob_token
```

## Developer Operations

Ensure Node.js dependencies are satisfied:

```bash
npm install
```

### Operational Commands

| Command | Purpose |
| :--- | :--- |
| `npm run dev` | Runs local development environment |
| `npm run build` | Builds highly-optimized static site outputs |
| `npm run start` | Boots production target build |
| `npm run lint` | Executes TypeScript ESLint code quality checks |

## Deployment Integration

Production deployment is built strictly around the **Vercel Platform** architecture to support native image optimization engines and global `@vercel/blob` content delivery infrastructure. Ensure `BLOB_READ_WRITE_TOKEN` is populated in the Vercel environment dashboard.
