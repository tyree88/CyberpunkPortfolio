import "clsx";
import { k as fallback, u as ensure_array_like, v as attr, w as attr_style, q as escape_html, x as stringify, l as bind_props, h as pop, p as push } from "../../../chunks/index.js";
import { T as TypewriterText, G as GlitchText } from "../../../chunks/TypewriterText.js";
import { S as ScanLines } from "../../../chunks/ScanLines.js";
const portfolioData = {
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
      title: "NEURAL INTERFACE",
      description: "An immersive, neurally-controlled web application that responds to user thought patterns. Created using advanced BCI protocols and reactive design principles.",
      technologies: ["Svelte", "WebGL", "Brain.js", "WebXR", "TensorFlow"],
      link: "https://example.com/neural-interface",
      github: "https://github.com/example/neural-interface"
    },
    {
      title: "CYBERSPACE NAVIGATOR",
      description: "3D visualization tool for complex data structures. Navigate through information as if you're jacked into cyberspace.",
      technologies: ["Three.js", "SvelteKit", "GraphQL", "D3.js"],
      link: "https://example.com/cyberspace",
      github: "https://github.com/example/cyberspace"
    },
    {
      title: "RIPPERDOC SCHEDULER",
      description: "Appointment scheduling system for cybernetic enhancement clinics with virtual try-on capabilities.",
      technologies: ["Vue", "Firebase", "AR.js", "PWA"],
      link: "https://example.com/ripperdoc",
      github: "https://github.com/example/ripperdoc"
    },
    {
      title: "DATAFORT SECURITY",
      description: "End-to-end encrypted communication platform with biometric authentication and breach detection.",
      technologies: ["React", "WebRTC", "IndexedDB", "WebAuthentication"],
      link: "https://example.com/datafort",
      github: "https://github.com/example/datafort"
    }
  ],
  experience: [
    {
      title: "SENIOR FRONTEND NETRUNNER",
      company: "Arasaka Digital",
      duration: "2021 - PRESENT",
      description: "Led development of next-gen neural interfaces for corporate clients. Implemented secure, high-performance web applications with cutting-edge animation and interaction patterns.",
      skills: ["Svelte", "WebGL", "GSAP", "Three.js", "TypeScript"]
    },
    {
      title: "UI/UX ENGINEER",
      company: "Militech Solutions",
      duration: "2018 - 2021",
      description: "Designed and implemented combat-ready interfaces for tactical applications. Created motion design systems and interaction patterns for mission-critical software.",
      skills: ["React", "Framer Motion", "Figma", "SASS", "Redux"]
    },
    {
      title: "FULL-STACK DEVELOPER",
      company: "Trauma Team International",
      duration: "2016 - 2018",
      description: "Built responsive emergency dispatch systems capable of handling high-traffic crisis situations. Implemented real-time monitoring dashboards for field operations.",
      skills: ["Angular", "Node.js", "MongoDB", "Socket.io", "Express"]
    }
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
      { name: "Framer", level: 85 }
    ],
    "LLM TOOLS": [
      { name: "Cursor", level: 78 },
      { name: "Replit", level: 75 },
      { name: "Winsurf", level: 70 },
      { name: "ChatGPT", level: 65 },
      { name: "Claude", level: 60 },
      { name: "DeepSeek", level: 50 }
    ],
    "AGENTIC TECH": [
      { name: "Hugging Face", level: 50 },
      { name: "Langchain", level: 50 },
      { name: "CrewAI", level: 50 },
      { name: "N8N Automation", level: 83 }
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
const cyberwareSystems = [
  {
    id: "memory-booster",
    title: "Memory Booster",
    icon: "🧠",
    color: "#49c5b6",
    position: { top: "25%", left: "50%", transform: "translateX(-50%)" },
    // Head area
    items: [
      { name: "Limbic System Enhancement", level: 92, description: "Emotional intelligence and empathy in team environments" },
      { name: "Memory Boost", level: 87, description: "Rapid recall of programming concepts and patterns" },
      { name: "Neural Processor", level: 90, description: "Accelerated problem-solving and algorithm optimization" }
    ]
  },
  {
    id: "operating-system",
    title: "Operating System",
    icon: "💻",
    color: "#49c5b6",
    position: { top: "30%", right: "20%" },
    // Right shoulder area
    items: [
      { name: "Cyberdeck", level: 95, description: "Advanced development environment configuration" },
      { name: "Breach Protocol", level: 89, description: "System security analysis and vulnerability detection" },
      { name: "Buffer Memory", level: 91, description: "Efficient handling of large datasets and memory management" }
    ]
  },
  {
    id: "nervous-system",
    title: "Nervous System",
    icon: "⚡",
    color: "#49c5b6",
    position: { top: "30%", left: "20%" },
    // Left shoulder area
    items: [
      { name: "Kerenzikov", level: 88, description: "Rapid reaction time for debugging and problem-solving" },
      { name: "Reflexes", level: 85, description: "Quick adaptation to changing project requirements" },
      { name: "Synaptic Accelerator", level: 83, description: "Faster learning of new technologies and frameworks" }
    ]
  },
  {
    id: "circulatory-system",
    title: "Circulatory System",
    icon: "❤️",
    color: "#49c5b6",
    position: { top: "45%", left: "50%", transform: "translateX(-50%)" },
    // Heart/chest area
    items: [
      { name: "Biomonitor", level: 86, description: "Stress management during challenging projects" },
      { name: "Blood Pump", level: 82, description: "Maintained performance during high-pressure deadlines" },
      { name: "Adrenaline", level: 80, description: "Heightened focus for critical problem-solving" }
    ]
  },
  {
    id: "integumentary-system",
    title: "Integumentary System",
    icon: "🛡️",
    color: "#49c5b6",
    position: { top: "60%", left: "20%" },
    // Skin/surface area - left side
    items: [
      { name: "Heat Converter", level: 79, description: "Comfortable work under varying environmental conditions" },
      { name: "Pain Editor", level: 76, description: "Reduced fatigue during extended work sessions" },
      { name: "Subdermal Socket", level: 85, description: "Enhanced tactile feedback with development tools" }
    ]
  },
  {
    id: "legs",
    title: "Legs",
    icon: "🦿",
    color: "#49c5b6",
    position: { bottom: "20%", left: "50%", transform: "translateX(-50%)" },
    // Bottom of body
    items: [
      { name: "Reinforced Joints", level: 75, description: "Stability and endurance during long work sessions" },
      { name: "Lynx Paws", level: 72, description: "Silent and efficient movement throughout work environments" }
    ]
  }
];
function CyberwareSystem($$payload, $$props) {
  push();
  let cyberwareSystems2 = fallback($$props["cyberwareSystems"], () => [], true);
  let memoryArchives = fallback($$props["memoryArchives"], () => [], true);
  let breachProtocols = fallback($$props["breachProtocols"], () => [], true);
  let portfolioData2 = fallback($$props["portfolioData"], () => ({}), true);
  let currentSystem = "frontal-cortex";
  const each_array = ensure_array_like(cyberwareSystems2);
  $$payload.out += `<div class="cyberware-system svelte-130pqxa"><div class="body-display-container svelte-130pqxa"><div class="body-display svelte-130pqxa"><div class="scan-effect svelte-130pqxa"></div> <div class="scan-line svelte-130pqxa"></div> <div class="body-fallback svelte-130pqxa" style="display: none;"></div></div> <div class="system-nodes-container svelte-130pqxa"><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let system = each_array[$$index];
    $$payload.out += `<div class="system-node svelte-130pqxa"${attr("data-system", system.id)}${attr_style(`top: ${stringify(system.position.top || "auto")}; left: ${stringify(system.position.left || "auto")}; right: ${stringify(system.position.right || "auto")}; bottom: ${stringify(system.position.bottom || "auto")}; transform: ${stringify(system.position.transform || "none")}; border-color: ${stringify(system.color)};`)} tabindex="0" role="button"${attr("aria-pressed", currentSystem === system.id)}><div class="node-content svelte-130pqxa"><span class="node-title svelte-130pqxa" style="font-size: 0.9rem; color: #ECD06F; font-weight: bold;">${escape_html(system.title)}</span></div></div>`;
  }
  $$payload.out += `<!--]--></div></div> <div class="system-details-panel svelte-130pqxa">`;
  {
    $$payload.out += "<!--[-->";
    const system = cyberwareSystems2.find((sys) => sys.id === currentSystem);
    if (system) {
      $$payload.out += "<!--[-->";
      const each_array_1 = ensure_array_like(system.items);
      $$payload.out += `<div class="system-details svelte-130pqxa"><div class="system-header svelte-130pqxa"><h2 class="system-title svelte-130pqxa">${escape_html(system.title)}</h2> <p class="system-description svelte-130pqxa">Improved information retention and recall abilities</p></div> <div class="system-items svelte-130pqxa"><!--[-->`;
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let item = each_array_1[$$index_1];
        $$payload.out += `<div class="system-item svelte-130pqxa"><div class="item-header svelte-130pqxa"><h3 class="item-name svelte-130pqxa">${escape_html(item.name)}</h3> <div class="item-level svelte-130pqxa"><div class="level-bar svelte-130pqxa"><div class="level-fill svelte-130pqxa"${attr_style(`width: ${stringify(item.level)}%; background-color: ${stringify(system.color)}`)}></div></div> <div class="level-value svelte-130pqxa">${escape_html(item.level)}</div></div></div> <div class="item-description svelte-130pqxa">`;
        TypewriterText($$payload, { text: item.description, speed: 20 });
        $$payload.out += `<!----></div></div>`;
      }
      $$payload.out += `<!--]--> <div class="system-memory svelte-130pqxa"><div class="memory-header svelte-130pqxa"><h3 class="memory-title svelte-130pqxa">SYSTEM MEMORY</h3></div> <div class="memory-archives svelte-130pqxa">`;
      if (system.id === "memory-booster") {
        $$payload.out += "<!--[-->";
        $$payload.out += `<div class="memory-item profile-data svelte-130pqxa"><div class="profile-header svelte-130pqxa"><h4 class="svelte-130pqxa">IDENTITY: ${escape_html(portfolioData2.about.name)}</h4></div> <div class="profile-data-row svelte-130pqxa"><span class="data-label svelte-130pqxa">CLASS:</span> <span class="data-value svelte-130pqxa">${escape_html(portfolioData2.about.title)}</span></div> <div class="profile-data-row svelte-130pqxa"><span class="data-label svelte-130pqxa">LOCATION:</span> <span class="data-value svelte-130pqxa">${escape_html(portfolioData2.about.location)}</span></div> <div class="profile-data-row svelte-130pqxa"><span class="data-label svelte-130pqxa">STATUS:</span> <span class="data-value status-active svelte-130pqxa">${escape_html(portfolioData2.about.status)}</span></div></div> <div class="memory-item profile-bio svelte-130pqxa"><div class="bio-content svelte-130pqxa">`;
        TypewriterText($$payload, { text: portfolioData2.about.bio, speed: 15 });
        $$payload.out += `<!----></div></div>`;
      } else if (system.id === "operating-system") {
        $$payload.out += "<!--[1-->";
        const each_array_2 = ensure_array_like(breachProtocols.slice(0, 2));
        $$payload.out += `<!--[-->`;
        for (let $$index_3 = 0, $$length = each_array_2.length; $$index_3 < $$length; $$index_3++) {
          let protocol = each_array_2[$$index_3];
          const each_array_3 = ensure_array_like(protocol.technologies.slice(0, 3));
          $$payload.out += `<div class="memory-item breach-protocol svelte-130pqxa"><h4 class="protocol-name svelte-130pqxa">${escape_html(protocol.title)}</h4> <div class="protocol-description svelte-130pqxa">`;
          TypewriterText($$payload, { text: protocol.description, speed: 15 });
          $$payload.out += `<!----></div> <div class="protocol-tech svelte-130pqxa"><!--[-->`;
          for (let $$index_2 = 0, $$length2 = each_array_3.length; $$index_2 < $$length2; $$index_2++) {
            let tech = each_array_3[$$index_2];
            $$payload.out += `<span class="tech-tag svelte-130pqxa">${escape_html(tech)}</span>`;
          }
          $$payload.out += `<!--]--></div></div>`;
        }
        $$payload.out += `<!--]-->`;
      } else {
        $$payload.out += "<!--[!-->";
        if (memoryArchives.length > 0) {
          $$payload.out += "<!--[-->";
          $$payload.out += `<div class="memory-item experience-data svelte-130pqxa"><h4 class="experience-title svelte-130pqxa">${escape_html(memoryArchives[0].title)}</h4> <div class="experience-company svelte-130pqxa">${escape_html(memoryArchives[0].company)}</div> <div class="experience-duration svelte-130pqxa">${escape_html(memoryArchives[0].duration)}</div> <div class="experience-description svelte-130pqxa">`;
          TypewriterText($$payload, {
            text: memoryArchives[0].description,
            speed: 15
          });
          $$payload.out += `<!----></div></div>`;
        } else {
          $$payload.out += "<!--[!-->";
        }
        $$payload.out += `<!--]-->`;
      }
      $$payload.out += `<!--]--></div></div></div></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]-->`;
  }
  $$payload.out += `<!--]--></div></div>`;
  bind_props($$props, {
    cyberwareSystems: cyberwareSystems2,
    memoryArchives,
    breachProtocols,
    portfolioData: portfolioData2
  });
  pop();
}
function CyberwareHeader($$payload, $$props) {
  push();
  let currentTime = "00:00:00";
  $$payload.out += `<div class="cyberware-header svelte-g852ux"><div class="header-content svelte-g852ux"><div class="time-display svelte-g852ux"><span class="label svelte-g852ux">TIME</span> <div class="time-controls svelte-g852ux"><span class="time-box svelte-g852ux">${escape_html(currentTime)}</span></div></div> <div class="title-container svelte-g852ux">`;
  GlitchText($$payload, {
    text: "PERSONAL CYBERWARE SYSTEM",
    class_name: "title-text"
  });
  $$payload.out += `<!----> <div class="subtitle svelte-g852ux">CYBERNETIC ENHANCEMENT INTERFACE v2.77</div></div> <a href="/" class="header-link svelte-g852ux"><div class="connection-status svelte-g852ux"><span class="icon svelte-g852ux">⚡</span> <span class="text svelte-g852ux">BACK TO CYBERDECK</span></div></a></div></div>`;
  pop();
}
function HudElements($$payload, $$props) {
  push();
  $$payload.out += `<div class="hud-elements svelte-97kmne"><!-- All HUD elements have been removed --></div>`;
  pop();
}
function _page($$payload, $$props) {
  push();
  const memoryArchives = portfolioData.experience.map((job) => ({
    title: job.title,
    company: job.company,
    duration: job.duration,
    description: job.description,
    skills: job.skills
  }));
  const breachProtocols = portfolioData.projects.map((project) => ({
    title: project.title,
    description: project.description,
    technologies: project.technologies,
    link: project.link,
    github: project.github
  }));
  $$payload.out += `<div class="cyberware-page svelte-u0d4pz">`;
  ScanLines($$payload);
  $$payload.out += `<!----> `;
  CyberwareHeader($$payload);
  $$payload.out += `<!----> `;
  CyberwareSystem($$payload, {
    cyberwareSystems,
    memoryArchives,
    breachProtocols,
    portfolioData
  });
  $$payload.out += `<!----> `;
  HudElements($$payload, { userData: portfolioData.about });
  $$payload.out += `<!----></div>`;
  pop();
}
export {
  _page as default
};
