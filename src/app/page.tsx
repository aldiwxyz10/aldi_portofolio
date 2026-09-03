"use client";

import { useEffect, useState } from "react";
import {
  Mail,
  ExternalLink,
  Code2,
  Download,
  MonitorSmartphone,
  Server,
  Database,
  Palette,
  ImageOff,
} from "lucide-react";
import { motion } from "framer-motion";

// --- Social Icons ---
const GithubIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.24c3-.34 6-1.54 6-6.36 0-1.42-.5-2.6-1.3-3.51a3.7 3.7 0 0 0 .1-3.48s-1.1-.35-3.6 1.35a12.1 12.1 0 0 0-6.6 0C5.9 1.63 4.8 1.98 4.8 1.98a3.7 3.7 0 0 0 .1 3.48A4.9 4.9 0 0 0 3.6 9c0 4.81 3 6.01 6 6.35a4.8 4.8 0 0 0-1 3.25v4" /><path d="M9 19c-4.2 1.2-5.4-2-5.4-2" /></svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
);

// Update this to match your actual GitHub username
const GITHUB_USERNAME = "aldiwxyz10";

// Optional: hand-pick a screenshot for any repo here (recommended for repos
// without a live "homepage" URL set on GitHub, e.g. mobile apps or APIs).
// Example: { "nama-repo-kamu": "/projects/nama-repo.png" }
const PROJECT_IMAGES: Record<string, string> = {
  // "portfolio-website": "/projects/portfolio-website.png",
};

interface Repository {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  topics: string[];
  stargazers_count: number;
}

// Auto screenshot for repos that have a live "homepage" link set on GitHub.
// Falls back to a manual entry in PROJECT_IMAGES, then to an icon placeholder.
function getProjectImage(repo: Repository): string | null {
  if (PROJECT_IMAGES[repo.name]) return PROJECT_IMAGES[repo.name];
  if (repo.homepage) {
    return `https://s.wordpress.com/mshots/v1/${encodeURIComponent(repo.homepage)}?w=900&h=560`;
  }
  return null;
}

// --- Skill categories ---
type Skill = { name: string; value: number };
type SkillGroup = { title: string; icon: React.ElementType; skills: Skill[] };

const SKILL_GROUPS: SkillGroup[] = [
  {
    title: "Frontend",
    icon: Code2,
    skills: [
      { name: "HTML & CSS", value: 90 },
      { name: "JavaScript", value: 85 },
      { name: "Tailwind CSS", value: 90 },
      { name: "React / Next.js", value: 75 },
    ],
  },
  {
    title: "Backend",
    icon: Server,
    skills: [
      { name: "PHP", value: 80 },
      { name: "Laravel", value: 80 },
    ],
  },
  {
    title: "Database & Tools",
    icon: Database,
    skills: [
      { name: "MySQL", value: 78 },
      { name: "Git", value: 85 },
      { name: "GitHub", value: 85 },
    ],
  },
  {
    title: "UI / UX",
    icon: Palette,
    skills: [
      { name: "Figma", value: 75 },
      { name: "Adobe XD", value: 60 },
      { name: "Wireframing", value: 70 },
    ],
  },
];

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-3">
        <span className="h-7 w-1 rounded-full bg-gradient-to-b from-sky-400 to-blue-600" />
        <span className="text-xs font-medium text-blue-400/80">{eyebrow}</span>
      </div>
      <h2 className="text-2xl md:text-4xl font-semibold tracking-tight text-white mb-2">{title}</h2>
      <p className="text-gray-400 text-sm max-w-md leading-relaxed">{description}</p>
    </div>
  );
}

function ProjectImage({ repo }: { repo: Repository }) {
  const [failed, setFailed] = useState(false);
  const src = getProjectImage(repo);

  if (!src || failed) {
    return (
      <div className="h-40 w-full rounded-t-xl bg-gradient-to-br from-[#0e1524] to-[#0a0d16] border-b border-white/5 flex flex-col items-center justify-center gap-2">
        <ImageOff className="w-5 h-5 text-blue-500/50" />
        <span className="text-[11px] text-gray-600">No preview yet</span>
      </div>
    );
  }

  return (
    <div className="h-40 w-full overflow-hidden rounded-t-xl border-b border-white/5 bg-[#0a0d16]">
      <img
        src={src}
        alt={`Screenshot of ${repo.name}`}
        onError={() => setFailed(true)}
        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
      />
    </div>
  );
}

export default function Portfolio() {
  const [projects, setProjects] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`);
        if (res.ok) {
          const data = await res.json();
          setProjects(data);
        }
      } catch (error) {
        console.error("Error fetching GitHub projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const techLogos = [
    { name: "HTML5", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
    { name: "CSS3", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
    { name: "JavaScript", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { name: "React", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "Laravel", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg" },
    { name: "MySQL", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  ];

  return (
    <div className="min-h-screen bg-[#050608] text-gray-100 font-sans selection:bg-blue-500/30">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-[#050608]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-bold text-lg tracking-tighter">
            Risyaldi<span className="text-blue-500">.</span>
          </span>
          <div className="hidden md:flex space-x-8 text-sm font-medium text-gray-400">
            <a href="#home" className="hover:text-blue-400 transition-colors">Home</a>
            <a href="#skills" className="hover:text-blue-400 transition-colors">Skills</a>
            <a href="#projects" className="hover:text-blue-400 transition-colors">Projects</a>
            <a href="#contact" className="hover:text-blue-400 transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative pt-28 pb-20 flex items-center justify-center overflow-hidden">
        {/* Aurora blobs — the one deliberate motion moment on the page */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-[-10%] left-[10%] w-[420px] h-[420px] rounded-full bg-blue-600/20 blur-[120px] animate-[drift1_18s_ease-in-out_infinite]" />
          <div className="absolute bottom-[-15%] right-[5%] w-[380px] h-[380px] rounded-full bg-sky-500/15 blur-[110px] animate-[drift2_22s_ease-in-out_infinite]" />
        </div>
        <style>{`
          @keyframes drift1 {
            0%, 100% { transform: translate(0, 0); }
            50% { transform: translate(40px, 30px); }
          }
          @keyframes drift2 {
            0%, 100% { transform: translate(0, 0); }
            50% { transform: translate(-30px, -25px); }
          }
        `}</style>

        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center relative z-10 w-full">
          {/* Left Text */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-5 text-center md:text-left"
          >
            <div className="inline-block px-3 py-1 rounded bg-blue-500/10 text-blue-400 text-xs font-semibold mb-1 border border-blue-500/20">
              Full Stack Web Developer
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
              Hi, I&apos;m <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-blue-400 to-blue-600">
                Risyaldi Wildan P.
              </span>
            </h1>

            <p className="text-gray-400 text-base max-w-md mx-auto md:mx-0 leading-relaxed">
              I build elegant, intuitive, and modern web applications. Passionate about beautiful interfaces and scalable backend systems.
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-3">
              <a href="#projects" className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-all shadow-[0_0_15px_-3px_rgba(37,99,235,0.4)]">
                View My Work
              </a>
              <a href="#" className="flex items-center space-x-2 px-6 py-2.5 bg-transparent border border-gray-600 hover:border-blue-500 hover:text-blue-400 text-gray-300 rounded-lg text-sm font-medium transition-all">
                <span>Download CV</span>
                <Download className="w-4 h-4" />
              </a>
            </div>

            {/* Tech Logos */}
            <div className="pt-6">
              <p className="text-xs text-gray-500 font-medium mb-3">Technologies I use</p>
              <div className="flex items-center justify-center md:justify-start gap-4">
                {techLogos.map((tech) => (
                  <img key={tech.name} src={tech.src} alt={tech.name} className="h-7 w-auto hover:scale-110 transition-transform opacity-90 hover:opacity-100" title={tech.name} />
                ))}
              </div>
            </div>

            {/* Socials */}
            <div className="flex items-center justify-center md:justify-start space-x-4 pt-4">
              <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noreferrer" className="p-2.5 bg-white/5 hover:bg-white/10 rounded border border-white/5 text-gray-400 hover:text-white transition-colors">
                <GithubIcon className="w-4 h-4" />
              </a>
              <a href="#" target="_blank" rel="noreferrer" className="p-2.5 bg-white/5 hover:bg-white/10 rounded border border-white/5 text-gray-400 hover:text-white transition-colors">
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a href="#" target="_blank" rel="noreferrer" className="p-2.5 bg-white/5 hover:bg-white/10 rounded border border-white/5 text-gray-400 hover:text-white transition-colors">
                <InstagramIcon className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex justify-center relative mt-10 md:mt-0"
          >
            <div className="w-[280px] h-[280px] md:w-[360px] md:h-[360px] relative rounded-full p-2 bg-gradient-to-tr from-blue-900/40 to-blue-500/10 border border-blue-500/20 shadow-2xl flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-dashed border-blue-500/30 animate-[spin_15s_linear_infinite]" />

              <div className="w-full h-full rounded-full bg-[#0a0a0a] overflow-hidden flex flex-col items-center justify-center relative border-2 border-transparent z-10">
                {/* Replace this placeholder with: <img src="/foto-anda.jpg" className="w-full h-full object-cover" /> */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-blue-950/40 backdrop-blur-[2px]">
                  <MonitorSmartphone className="w-8 h-8 text-blue-400 mb-3" />
                  <p className="text-blue-300 font-medium text-sm mb-1">Foto Profil Anda</p>
                  <p className="text-xs text-gray-400">Ganti dengan `&lt;img src=&quot;/foto-anda.jpg&quot; /&gt;`</p>
                </div>
              </div>

              <div className="absolute -right-4 top-10 bg-[#0a0a0a] p-3 rounded-lg border border-white/10 shadow-lg hidden md:block">
                <Code2 className="w-5 h-5 text-blue-500" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-[#08090c] border-t border-b border-white/5">
        <div className="max-w-5xl mx-auto px-6">
          <SectionHeading
            eyebrow="What I work with"
            title="Skills"
            description="Grouped by where they sit in the stack — from what people see to what powers it behind the scenes."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SKILL_GROUPS.map((group) => {
              const Icon = group.icon;
              return (
                <div
                  key={group.title}
                  className="rounded-xl border border-white/5 bg-gradient-to-b from-white/[0.03] to-transparent p-6"
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
                      <Icon className="w-4 h-4 text-blue-400" />
                    </div>
                    <h3 className="text-sm font-semibold text-gray-200">{group.title}</h3>
                  </div>

                  <div className="space-y-4">
                    {group.skills.map((skill) => (
                      <div key={skill.name}>
                        <div className="flex justify-between items-end mb-1.5">
                          <span className="text-sm text-gray-300">{skill.name}</span>
                          <span className="text-xs text-gray-500">{skill.value}%</span>
                        </div>
                        <div className="w-full bg-[#111] rounded-full h-1.5 border border-white/5">
                          <div
                            className="h-1.5 rounded-full bg-gradient-to-r from-sky-400 to-blue-600"
                            style={{ width: `${skill.value}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 relative">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeading
            eyebrow="Recent work"
            title="Latest Projects"
            description="Pulled live from GitHub, with previews of what's actually live."
          />

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-64 rounded-xl bg-white/5 animate-pulse border border-white/5" />
              ))}
            </div>
          ) : projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.slice(0, 6).map((repo) => (
                <div
                  key={repo.id}
                  className="group relative bg-[#0a0a0a] rounded-xl border border-white/5 hover:border-blue-500/40 transition-all flex flex-col h-full overflow-hidden hover:shadow-[0_8px_30px_-15px_rgba(37,99,235,0.25)]"
                >
                  <ProjectImage repo={repo} />

                  <div className="p-5 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold group-hover:text-blue-400 transition-colors line-clamp-1">
                        {repo.name}
                      </h3>
                      <a href={repo.html_url} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white transition-colors shrink-0 ml-2" title="View Source">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>

                    <p className="text-gray-400 text-xs mb-5 flex-grow line-clamp-2 leading-relaxed">
                      {repo.description || "No description provided."}
                    </p>

                    {repo.topics && repo.topics.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-auto pt-4 border-t border-white/5">
                        {repo.topics.slice(0, 3).map((topic) => (
                          <span key={topic} className="text-[10px] font-medium px-2 py-0.5 rounded bg-blue-500/10 text-blue-400">
                            {topic}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white/5 rounded-xl border border-white/5">
              <GithubIcon className="w-10 h-10 text-gray-600 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-gray-300">No projects found.</h3>
            </div>
          )}

          <div className="mt-10 text-center">
            <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noreferrer" className="inline-flex items-center space-x-2 text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors">
              <span>View all on GitHub</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section & Footer */}
      <section id="contact" className="py-20 border-t border-white/5 bg-[#08090c]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-4xl font-semibold tracking-tight text-white mb-4">Let&apos;s work together</h2>
          <p className="text-gray-400 text-sm mb-8">
            I&apos;m always open to discussing new projects, creative ideas, or opportunities.
          </p>

          <a href="mailto:prgmmn94@gmail.com" className="inline-flex items-center justify-center space-x-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-all shadow-[0_0_15px_-3px_rgba(37,99,235,0.4)]">
            <Mail className="w-4 h-4" />
            <span>Say Hello</span>
          </a>

          <div className="mt-12 flex justify-center space-x-5">
            <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-blue-400 transition-colors">
              <GithubIcon className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-500 hover:text-blue-400 transition-colors">
              <LinkedinIcon className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-500 hover:text-blue-400 transition-colors">
              <InstagramIcon className="w-5 h-5" />
            </a>
          </div>

          <p className="mt-8 text-gray-600 text-xs">
            © {new Date().getFullYear()} Risyaldi Wildan Pratama. Built with Next.js & Tailwind CSS.
          </p>
        </div>
      </section>
    </div>
  );
}