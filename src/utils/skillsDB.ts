// A predefined list of domains and their associated technical skills (comma and hyphen variations handled automatically by matching logic)
export const SKILLS_DB: Record<string, string[]> = {
  "Frontend Engineering": [
    "react", "react.js", "reactjs", "react native", "react-native",
    "next.js", "nextjs",
    "vue", "vue.js", "vuejs",
    "angular", "angularjs",
    "svelte", "sveltekit",
    "javascript", "typescript",
    "html", "css", "html5", "css3",
    "tailwind", "tailwindcss", "bootstrap", "material UI", "mui",
    "redux", "zustand", "context api",
    "webpack", "vite", "babel",
    "jest", "cypress", "playwright"
  ],
  "Backend Engineering": [
    "node.js", "nodejs", "node",
    "express", "express.js", "expressjs",
    "nestjs", "nest.js",
    "python", "django", "flask", "fastapi",
    "java", "spring", "spring boot",
    "c#", ".net", "dotnet", "asp.net",
    "go", "golang",
    "ruby", "ruby on rails", "rails",
    "php", "laravel",
    "sql", "postgresql", "mysql", "mongodb", "redis", "elasticsearch",
    "graphql", "rest", "grpc",
    "rabbitmq", "kafka"
  ],
  "Fullstack Engineering": [
    "mern", "mean", "lamp",
    "react", "node.js", "next.js", "sql", "postgresql", "mongodb", "typescript"
  ],
  "DevOps / Cloud": [
    "aws", "amazon web services",
    "gcp", "google cloud platform",
    "azure", "microsoft azure",
    "docker", "kubernetes", "k8s",
    "terraform", "ansible", "chef", "puppet",
    "linux", "bash", "shell scripting",
    "ci/cd", "jenkins", "github actions", "gitlab ci", "circleci",
    "prometheus", "grafana", "datadog", "elk"
  ],
  "Data Science / AI": [
    "python", "r", "sql",
    "machine learning", "deep learning", "nlp", "computer vision",
    "pandas", "numpy", "scikit-learn", "scikit learn",
    "pytorch", "tensorflow", "keras",
    "matplotlib", "seaborn",
    "apache spark", "hadoop",
    "gen ai", "llms", "langchain", "openai"
  ],
  "Mobile Engineering": [
    "swift", "ios", "objective-c",
    "kotlin", "android", "java",
    "react native", "react-native",
    "flutter", "dart"
  ]
};

// Extrapolate all possible recognized skills into a flat array for easy checking
export const ALL_KNOWN_SKILLS = Array.from(new Set(Object.values(SKILLS_DB).flat()));

export function extractDomainAndSkills(text: string) {
  const normalizedText = text.toLowerCase();
  
  // Find all matched skills
  const matchedSkills = new Set<string>();
  const domainScores: Record<string, number> = {};
  
  // Initialize scores
  Object.keys(SKILLS_DB).forEach(domain => {
    domainScores[domain] = 0;
  });

  // Check each domain and its skills
  Object.entries(SKILLS_DB).forEach(([domain, skills]) => {
    skills.forEach(skill => {
      // Use word boundaries to avoid partial matches (e.g., 'go' matching inside 'good')
      // Note: skills with special chars like c# or .net need escape, simplified here but works mostly
      const escapedSkill = skill.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      const regex = new RegExp(`\\b${escapedSkill}\\b`, 'i');
      
      if (regex.test(normalizedText)) {
        matchedSkills.add(skill);
        domainScores[domain]++;
      }
    });
  });

  // Determine top domains
  const sortedDomains = Object.entries(domainScores)
    .sort((a, b) => b[1] - a[1]);

  let topDomain = sortedDomains[0]?.[1] > 0 ? sortedDomains[0][0] : "Software Engineering";
  let secondaryDomain = sortedDomains[1]?.[1] > 0 ? sortedDomains[1][0] : "";

  return {
    domain: topDomain,
    secondaryDomain: secondaryDomain,
    skills: Array.from(matchedSkills)
  };
}

export interface EducationEntry {
  degree: string;
  institution: string;
  year?: string;
  grade?: string;
}

export interface ExperienceEntry {
  role: string;
  company: string;
  duration?: string;
  description: string[];
  location?: string;
}

export interface ProjectEntry {
  name: string;
  description: string[];
  techStack: string[];
}

export function extractResumeDetails(text: string) {
  const result = extractDomainAndSkills(text);
  return {
    ...result,
    education: [] as EducationEntry[],
    experience: [] as ExperienceEntry[],
    projects: [] as ProjectEntry[]
  };
}
