# Cyberpunk Portfolio | Netrunner Resume

![Cyberpunk Portfolio](./static/favicon.ico)

An interactive cyberpunk-themed developer portfolio inspired by Cyberpunk 2077's quickhack interface. This immersive digital experience showcases developer skills and projects through a futuristic, neon-lit interface with dynamic animations and cyberpunk aesthetics.

## 🔧 Technologies Used

### Frontend Framework
- **SvelteKit** - A powerful framework for building web applications with Svelte
- **Svelte 5** - The reactive UI framework that compiles at build time
- **TypeScript** - For type-safe code and enhanced developer experience

### Animation & Visual Effects
- **GSAP (GreenSock Animation Platform)** - For advanced animations and transitions
- **Custom CSS Animations** - For cyberpunk-inspired visual effects
- **Dynamic Particle Systems** - For interactive background elements
- **Glitch Effects** - For authentic cyberpunk aesthetic

### Styling
- **Custom CSS** - Hand-crafted styling with cyberpunk aesthetics
- **CSS Variables** - For consistent theming and color management
- **Responsive Design** - Fully responsive across all device sizes

### Build Tools
- **Vite** - Next-generation frontend tooling for fast development
- **TypeScript** - For type checking and improved developer experience

## ✨ Features

- **Interactive UI** - Responsive and interactive cyberpunk-themed interface
- **Animated Transitions** - Smooth transitions between sections with glitch effects
- **Typewriter Text** - Dynamic text animations for immersive experience
- **Quickhack-style Navigation** - Navigation inspired by Cyberpunk 2077's quickhack interface
- **Particle Effects** - Dynamic background elements for visual interest
- **Contact Form** - Interactive form with cyberpunk styling
- **Responsive Design** - Fully responsive across all device sizes
- **Loading Sequence** - Immersive loading animation with terminal-style text
- **Cursor Trail Effects** - Custom cursor effects for enhanced interactivity

## 🚀 Project Structure

```
/
├── src/
│   ├── app.html          # Main HTML template
│   ├── routes/           # SvelteKit routes
│   │   ├── +layout.svelte
│   │   └── +page.svelte  # Main page component
│   └── lib/              # Library code
│       ├── animations/   # Animation utilities
│       ├── components/   # UI components
│       │   ├── ContactForm.svelte
│       │   ├── ContentPanel.svelte
│       │   ├── CursorTrail.svelte
│       │   ├── CyberdeckHeader.svelte
│       │   ├── GlitchText.svelte
│       │   ├── HeroSection.svelte
│       │   ├── ProjectCard.svelte
│       │   ├── QuickhackList.svelte
│       │   ├── RamBar.svelte
│       │   ├── ScanLines.svelte
│       │   └── TypewriterText.svelte
│       ├── data/         # Portfolio data
│       │   └── portfolioData.ts
│       ├── stores/       # Svelte stores
│       └── styles/       # Global styles
├── static/               # Static assets
├── package.json          # Project dependencies
└── vite.config.js        # Vite configuration
```

## 💻 Skills Demonstrated

### Frontend Development
- **Component Architecture** - Modular component design for maintainability
- **State Management** - Using Svelte stores for application state
- **Reactive Programming** - Leveraging Svelte's reactive programming model
- **Animation Sequencing** - Complex animation sequences with GSAP
- **Custom UI Components** - Building custom interactive UI components

### Design & UX
- **Cyberpunk Aesthetics** - Authentic cyberpunk visual design
- **Motion Design** - Purposeful animations that enhance user experience
- **Visual Hierarchy** - Clear information architecture despite complex visuals
- **Micro-interactions** - Small animations that respond to user actions
- **Consistent Theming** - Cohesive color scheme and design language

### Technical Skills
- **TypeScript** - Type-safe code with interfaces and type definitions
- **Modern JavaScript** - ES6+ features and patterns
- **CSS Techniques** - Advanced CSS including variables, animations, and effects
- **Responsive Design** - Adapting to different screen sizes and devices
- **Performance Optimization** - Efficient animations and rendering

## 🏃‍♂️ Running the Project

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎨 Design Inspiration
This portfolio is inspired by the cyberpunk aesthetic and specifically the interface design from Cyberpunk 2077's quickhack system. It combines futuristic elements with a digital, glitchy feel to create an immersive experience that showcases both technical and creative skills.

## 📱 Responsive Design
The portfolio is fully responsive and works across desktop, tablet, and mobile devices, with optimized layouts for each screen size.

---

Designed and developed with 💻 and ☕ in Night City
