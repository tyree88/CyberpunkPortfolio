/**
 * skills.ts
 * Defines the structure for skill data used in the visualization.
 */

export interface Skill {
  id: string;          // Unique identifier
  name: string;        // Name of the skill (e.g., "TypeScript", "GSAP Animation")
  level?: number;       // Optional proficiency level (e.g., 1-5)
  icon?: string;        // Optional path or identifier for an icon
  description?: string; // Optional short description
  category?: string;    // Optional category (e.g., "Frontend", "Backend", "Animation")
}

// Example usage:
// const skills: Skill[] = [
//   { id: 'ts', name: 'TypeScript', level: 5, category: 'Language' },
//   { id: 'svelte', name: 'SvelteKit', level: 4, category: 'Framework' },
//   { id: 'gsap', name: 'GSAP', level: 4, category: 'Animation' },
// ];