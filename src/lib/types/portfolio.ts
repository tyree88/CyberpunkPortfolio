// Define the structure for a project preview
export interface ProjectPreview {
  type: 'image' | 'svg'; // Explicitly define allowed types
  src: string;
}

// Define the structure for a project
export interface Project {
  title: string;
  description: string;
  technologies: string[];
  link: string;
  github?: string;
  preview?: ProjectPreview; // Use the ProjectPreview interface
}

// You can also define types for other sections if needed
export interface AboutInfo {
  name: string;
  title: string;
  specialty: string;
  location: string;
  status: string;
  bio: string;
}

export interface ExperienceItem {
    title: string;
    company: string;
    duration: string;
    description: string;
    skills: string[];
}

export interface SkillItem {
    name: string;
    level: number;
}

export interface SkillsByCategory {
    [category: string]: SkillItem[];
}

export interface ContactInfo {
    email: string;
    linkedin: string;
    github: string;
}

// Define the overall portfolio data structure
export interface PortfolioData {
  about: AboutInfo;
  projects: Project[]; // Use the Project interface
  experience: ExperienceItem[];
  skills: SkillsByCategory;
  contact: ContactInfo;
}