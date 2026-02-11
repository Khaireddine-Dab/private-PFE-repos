# Phantom Marketplace

A modern marketplace application featuring an immersive 3D background with **dynamic photo wall** inspired by phantom.land, built with Next.js 14 and Three.js.

## Features

- ✨ **Dynamic Photo Wall**: 3D grid of animated project cards that move in perspective (inspired by phantom.land)
- 🌊 **Particle Systems**: 5000+ animated particles with wave effects
- 🎨 **Modern UI**: Clean, responsive design with Tailwind CSS
- 🚀 **Smooth Animations**: GSAP-powered transitions and scroll animations
- 💡 **Interactive Lighting**: Mouse-following spotlight effect
- 📱 **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- ⚡ **Performance Optimized**: Efficient rendering with React Three Fiber

## Key Background Effects

### 1. Dynamic Photo Wall (Main Feature)
The centerpiece of the background - a 3D grid of 48 colorful cards that:
- Move and rotate in 3D space
- React to mouse movement with parallax effect
- Float independently with unique timing
- Create depth through perspective distortion
- Simulate a portfolio/project showcase

### 2. Supporting Elements
- Particle grid with wave animations
- Animated grid floor with shader effects
- Light beams orbiting the scene
- Mouse-interactive spotlight
- Fog and depth effects

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **UI Framework**: React 18
- **Styling**: Tailwind CSS + Custom CSS Variables
- **3D Graphics**: Three.js with @react-three/fiber and @react-three/drei
- **Animations**: GSAP with ScrollTrigger
- **Rendering**: WebGL Canvas

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

2. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
phantom-marketplace/
├── app/
│   ├── globals.css          # Global styles and CSS variables
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Main page
├── components/
│   ├── BackgroundScene.tsx   # 3D background with particles & effects
│   ├── Navbar.tsx            # Navigation bar
│   ├── Hero.tsx              # Hero section
│   ├── FeaturedCollections.tsx
│   ├── TrendingArtists.tsx
│   └── Footer.tsx
├── public/                   # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## 3D Background Components

The background scene includes:

- **DynamicPhotoWall**: Grid of 48 animated 3D cards (8x6 grid)
  - Individual card rotation and floating
  - Parallax effect following mouse movement
  - Colorful gradient cards with borders
  - Depth-based positioning
  
- **ParticleGrid**: 5000 animated particles with wave effects
- **GridFloor**: Shader-based animated floor with wave distortion
- **LightBeams**: 6 rotating cylindrical light beams
- **MouseFollower**: Interactive spotlight that follows cursor
- **CameraController**: GSAP-animated camera positioning

## Customization

### Modify Colors

Edit CSS variables in `app/globals.css`:

```css
:root {
  --background: #0a0a0a;
  --foreground: #ededed;
  --accent: #3b82f6;
  --accent-hover: #2563eb;
  /* ... */
}
```

### Adjust 3D Effects

Edit parameters in `components/BackgroundScene.tsx`:

```typescript
// Photo wall grid size
const cols = 8;  // Number of columns
const rows = 6;  // Number of rows
const spacing = 4;  // Space between cards

// Particle count
const particleCount = 5000;

// Animation speed
autoRotateSpeed={0.2}

// Card colors
const colors = [
  '#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', 
  '#10b981', '#06b6d4', '#6366f1', '#f43f5e'
];
```

### Performance Optimization

For mobile devices, the background gracefully degrades:
- Reduced particle count
- Simplified shaders
- Lower animation complexity

## Build for Production

```bash
npm run build
npm start
```

## Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support (iOS 15+)
- Mobile: Optimized with graceful degradation

## Performance Tips

1. **WebGL Fallback**: The app checks for WebGL support and provides a fallback
2. **Dynamic Imports**: 3D components are loaded client-side only
3. **Optimized Rendering**: Uses frustum culling and efficient update loops
4. **Mobile Detection**: Reduces effects on lower-powered devices

## License

MIT License - feel free to use this project for your own marketplace!

## Credits

Inspired by the amazing work at [phantom.land](https://www.phantom.land/)
