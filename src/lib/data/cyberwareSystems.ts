import type { CyberwareSystem } from '$lib/types/cyberware';

/**
 * Cyberware systems data for the my-life page
 */
export const cyberwareSystems: CyberwareSystem[] = [
  {
    id: 'memory-booster',
    title: "Memory Booster",
    icon: "🧠",
    color: "#49c5b6",
    position: { top: '7%', left: '50%', transform: 'translateX(-50%)' }, // Top middle center of container
    items: [
      { name: "Limbic System Enhancement", level: 92, description: "Emotional intelligence and empathy in team environments" },
      { name: "Memory Boost", level: 87, description: "Rapid recall of programming concepts and patterns" },
      { name: "Neural Processor", level: 90, description: "Accelerated problem-solving and algorithm optimization" }
    ]
  },
  {
    id: 'operating-system',
    title: "Operating System",
    icon: "💻",
    color: "#49c5b6",
    position: { top: '48%', right: '24%' }, // Right shoulder area - adjusted for larger image
    items: [
      { name: "Cyberdeck", level: 95, description: "Advanced development environment configuration" },
      { name: "Breach Protocol", level: 89, description: "System security analysis and vulnerability detection" },
      { name: "Buffer Memory", level: 91, description: "Efficient handling of large datasets and memory management" }
    ]
  },
  {
    id: 'nervous-system',
    title: "Nervous System",
    icon: "⚡",
    color: "#49c5b6",
    position: { top: '22%', left: '58%' }, // Left shoulder area - adjusted for larger image
    items: [
      { name: "Kerenzikov", level: 88, description: "Rapid reaction time for debugging and problem-solving" },
      { name: "Reflexes", level: 85, description: "Quick adaptation to changing project requirements" },
      { name: "Synaptic Accelerator", level: 83, description: "Faster learning of new technologies and frameworks" }
    ]
  },
  {
    id: 'circulatory-system',
    title: "Circulatory System",
    icon: "❤️",
    color: "#49c5b6",
    position: { top: '34%', left: '50%', transform: 'translateX(-50%)' }, // Heart/chest area - adjusted for larger image
    items: [
      { name: "Biomonitor", level: 86, description: "Stress management during challenging projects" },
      { name: "Blood Pump", level: 82, description: "Maintained performance during high-pressure deadlines" },
      { name: "Adrenaline", level: 80, description: "Heightened focus for critical problem-solving" }
    ]
  },
  {
    id: 'integumentary-system',
    title: "Integumentary System",
    icon: "🛡️",
    color: "#49c5b6",
    position: { top: '55%', left: '45%' }, // Skin/surface area - left side - adjusted for larger image
    items: [
      { name: "Heat Converter", level: 79, description: "Comfortable work under varying environmental conditions" },
      { name: "Pain Editor", level: 76, description: "Reduced fatigue during extended work sessions" },
      { name: "Subdermal Socket", level: 85, description: "Enhanced tactile feedback with development tools" }
    ]
  },
  {
    id: 'legs',
    title: "Legs",
    icon: "🦿",
    color: "#49c5b6",
    position: { bottom: '25%', right: '38%', transform: 'translateX(-50%)' }, // Bottom of body - adjusted for larger image
    items: [
      { name: "Reinforced Joints", level: 75, description: "Stability and endurance during long work sessions" },
      { name: "Lynx Paws", level: 72, description: "Silent and efficient movement throughout work environments" }
    ]
  }
];
