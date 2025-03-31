import type { PortfolioData } from '$lib/types/portfolio'; // Import the type

// Portfolio data store - Replace with your own information

export const portfolioData: PortfolioData = { // Apply the type
  about: {
    name: "TYREE PEARSON",
    title: "NETRUNNER / FULL-STACK VIBE CODER",
    specialty: "Technical Consulting • Solutions Engineering • Full Stack Dev",
    location: "Night City",
    status: "AVAILABLE FOR HIRE",
    bio: "Software developer specializing in web frameworks like Svelte, React, and Three.js. I use modern AI-powered code editors for efficient development and collaboration. Also experienced with low-code platforms for rapid prototyping. My focus is creating immersive digital experiences with cutting-edge technologies, combining different tools to build unique and engaging user interfaces."
  },
  
  projects: [
    {
      "title": "PENHOLE",
      "description": "A mobile and web platform that connects citizens with their elected representatives. Provides factual information on voting records to encourage informed dialogue between voters and politicians. Built using React Native with Firebase and MongoDB backend.",
      "technologies": ["React Native", "Firebase", "MongoDB", "Python", "Data Analytics"],
      "link": "https://penhole.com/",
      "github": "https://github.com/yourusername/penhole",
      "preview": {
        "type": "image",
        "src": "/images/portfolio/Penhole.png"
      }
    },
    {
      "title": "DATA & AUTOMATION HUB",
      "description": "A collection of Python-based data science projects featuring predictive analytics, automation tools, and data pipelines. Includes interactive dashboards for data visualization, demonstrations of machine learning models, and automated data processing with performance tracking tools.",
      "technologies": ["Python", "Pandas", "Scikit-learn", "Streamlit", "Prefect", "Matplotlib", "AWS/Azure/GCP", "Docker"],
      "link": "https://tyreepearson.streamlit.app/",
      "github": "https://github.com/tyreepearson/data-science-portfolio",
      "preview": {
        "type": "image",
        "src": "/images/portfolio/Streamlit.png"
      },
    },
    {
      "title": "POLIGRAPH",
      "description": "An open political data platform that gives citizens access to voting records and legislative information. Uses modern web technologies to ensure data accuracy and provides direct connections between voters and representatives without third-party filtering.",
      "technologies": ["React", "Bluesky/ATProtocol", "Neo4j", "Python", "LangChain", "Hugging Face Transformers"],
      "link": "https://tyreepearson.replit.app/projects/poligraph",
      "github": "https://github.com/tyreepearson/poligraph",
      "preview": { // Update to use the SVG icon
        "type": "svg",
        "src": "/images/portfolio/poligraph-icon.svg"
      }
    },
    {
      "title": "RESELLR",
      "description": "A comprehensive management tool for e-commerce sellers working across multiple platforms. Helps track inventory, manage pricing, and analyze sales data in one place. Features automated tools to synchronize listings across different marketplaces and optimize pricing strategies.",
      "technologies": ["Loveable", "Bolt.new", "Webflow", "Framer", "21st.dev"],
      "link": "https://tyreepearson.replit.app/projects/resellr",
      "github": "https://github.com/tyreepearson/resellr",
      "preview": { // Add preview for RESELLR
        "type": "svg",
        "src": "/images/portfolio/resellr-icon.svg"
      }
    }
  ],
  
  experience: [
    {
      "title": "CHIEF TECHNOLOGY OFFICER",
      "company": "Penhole",
      "duration": "JUNE 2019 - PRESENT",
      "description": "Founded and lead technology strategy for a social benefit platform connecting users to political representatives. Built and scaled engineering teams while securing acceptance into Capital Factory accelerator program.",
      "skills": ["React Native", "Firebase", "MongoDB", "Product Strategy", "Team Leadership"]
    },
    {
      "title": "SOLUTIONS ENGINEER/ SOLUTIONS ARCHITECT",
      "company": "Prefect",
      "duration": "JUNE 2024 - PRESENT",
      "description": "Lead technical pre-sales activities, delivering demonstrations of data workflow automation solutions using custom Python applications. Create and maintain cloud architecture diagrams spanning Kubernetes and Serverless environments for Fortune 500 clients.",
      "skills": ["Python", "Streamlit", "Kubernetes", "Cloud Architecture", "Data Engineering"]
    },
    {
      "title": "SOLUTIONS ARCHITECT / PROFESSIONAL SERVICES",
      "company": "Akeyless",
      "duration": "APRIL 2023 - JUNE 2024",
      "description": "Led enterprise security implementations and technical enablement programs. Deployed DevSecOps solutions in Azure Kubernetes environments and managed cross-team discovery processes. Reduced demo environment costs by 50% through automation.",
      "skills": ["DevSecOps", "Kubernetes", "Terraform", "Azure", "Security Architecture"]
    },
    {
      "title": "SOLUTIONS ENGINEER",
      "company": "HashiCorp",
      "duration": "JULY 2021 - APRIL 2023",
      "description": "Conducted technical discovery and delivered POCs for enterprise clients exploring Terraform Cloud and Vault. Delivered workshops to Fortune 500 companies and prestigious institutions while exceeding sales quotas through effective technical pre-sales.",
      "skills": ["Terraform", "Vault", "GitOps", "Infrastructure as Code", "Cloud Architecture"]
    },
    {
      "title": "ENTERPRISE CLOUD ARCHITECT",
      "company": "Oracle",
      "duration": "JULY 2019 - JULY 2021",
      "description": "Provided technical expertise throughout the sales cycle for Oracle Cloud Infrastructure. Developed Python scripts for enterprise clients that reduced environment management time from one week to two hours.",
      "skills": ["Python", "Oracle Cloud", "API Integration", "Cloud Migration", "Enterprise Architecture"]
    },

  ],
  
  skills: {
    "FRONTEND TECH": [
      { name: "Svelte/SvelteKit", level: 95 },
      { name: "JavaScript/TypeScript", level: 90 },
      { name: "GSAP Animations", level: 92 },
      { name: "Three.js/WebGL", level: 85 },
      { name: "Next.js", level: 80 },
      { name: "React", level: 60 },
      { name: "CSS/SASS", level: 50 },
      { name: "Loveable", level: 80 },
      { name: "Bolt.new", level: 75 },
      { name: "Webflow", level: 82 },
      { name: "Framer", level: 85 },
    ],
    "LLM TOOLS": [
      { name: "Cursor", level: 78 },
      { name: "Replit", level: 75 },
      { name: "Winsurf", level: 70 },
      { name: "ChatGPT", level: 65 },
      { name: "Claude", level: 60 },
      { name: "DeepSeek", level: 50 },
    ],

    "AGENTIC TECH": [
      { name: "Hugging Face", level: 50 },
      { name: "Langchain", level: 50 },
      { name: "CrewAI", level: 50 },
      { name: "N8N Automation", level: 83 },

    ],
    "AI TOOL AUGMENTATIONS": [
      { name: "UI/UX Design", level: 88 },
      { name: "MCP Servers", level: 88 },
      { name: "Notion AI", level: 90 },
      { name: "Obsidian", level: 90 },
      { name: "Midjourney", level: 55 },
      { name: "Runaway AI", level: 50 },
      { name: "Google AI Studio", level: 50 },
      { name: "Hugging Face", level: 50 },
      { name: "NotebookLM", level: 50 },
      { name: "Performance Optimization", level: 87 },
      { name: "Security Implementation", level: 80 }
    ]
  },
  
  contact: {
    email: "tyreepearson88@gmail.com",
    linkedin: "https://www.linkedin.com/in/tyreepearson/",
    github: "https://github.com/tyree88"
  }
};
