import type { PortfolioData } from '$lib/types/portfolio'; // Import the type

// Portfolio data store - Replace with your own information

export const portfolioData: PortfolioData = { // Apply the type
  about: {
    name: "TYREE PEARSON",
    title: "NETRUNNER / FULL-STACK VIBE CODER",
    specialty: "Web Development & UI/UX Design",
    location: "Night City",
    status: "AVAILABLE FOR HIRE",
    bio: "Vibe developer building software with web frameworks like Svelte, React, and Three.js. Using AI code editors like Cursor, Winsurf and Replit to cross collaborate and develop. Also using low code no code web development sites like Loveable, Bolt.new, Webflow, and Framer. Expert in creating immersive digital experiences with cutting-edge technologies. Proficient in combining technologies to create unique and engaging user experiences."
  },
  
  projects: [
    {
      "title": "PENHOLE",
      "description": "Social platform connecting citizens with political representatives, providing unbiased information on voting records to foster common ground dialogue. Built with React Native on Firebase Cloud with MongoDB.",
      "technologies": ["React Native", "Firebase", "MongoDB", "Python", "Data Analytics"],
      "link": "https://penhole.com/",
      "github": "https://github.com/yourusername/penhole",
      "preview": {
        "type": "image",
        "src": "/images/portfolio/Penhole.png"
      }
    },
    {
      "title": "DATA SCIENCE & AUTOMATION HUB",
      "description": "Interactive data science portfolio showcasing a collection of Python-powered projects spanning predictive analytics, workflow automation, and cloud-based ETL pipelines. Features include real-time data visualization dashboards, machine learning model demonstrations, and automated data processing workflows with comprehensive metrics tracking.",
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
      "description": "Decentralized political data platform empowering citizens through transparent access to voting records and legislative information. Built on decentralized protocols to ensure data integrity while connecting users directly with their representatives without bias or intermediaries.",
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
      "description": "All-in-one management platform for e-commerce resellers that consolidates inventory, pricing, and analytics across multiple marketplaces. Optimizes listing strategies and automates cross-platform synchronization to maximize profit margins and streamline operations.",
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
      "title": "STAFF SALES ENGINEER",
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
