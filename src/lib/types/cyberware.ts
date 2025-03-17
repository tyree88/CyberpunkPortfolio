/**
 * Interface for cyberware system position
 */
export interface SystemPosition {
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  transform?: string;
}

/**
 * Interface for cyberware item
 */
export interface CyberwareItem {
  name: string;
  level: number;
  description: string;
}

/**
 * Interface for cyberware system
 */
export interface CyberwareSystem {
  id: string;
  title: string;
  icon: string;
  color: string;
  position: SystemPosition;
  items: CyberwareItem[];
}

/**
 * Interface for memory archive (experience)
 */
export interface MemoryArchive {
  title: string;
  company: string;
  duration: string;
  description: string;
  skills: string[];
}

/**
 * Interface for breach protocol (project)
 */
export interface BreachProtocol {
  title: string;
  description: string;
  technologies: string[];
  link: string;
  github: string;
}

/**
 * Interface for portfolio data
 */
export interface PortfolioData {
  about: {
    name: string;
    title: string;
    location: string;
    status: string;
    bio: string;
  };
  experience: MemoryArchive[];
  projects: {
    title: string;
    description: string;
    technologies: string[];
    link: string;
    github: string;
  }[];
}
