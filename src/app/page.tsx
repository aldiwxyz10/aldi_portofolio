"use client";

import { useEffect, useState } from "react";
import { Mail, ExternalLink, Code2, ChevronDown, Download, MonitorSmartphone } from "lucide-react";
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

interface Repository {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  topics: string[];
  stargazers_count: number;
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

  // Tech Icons from SimpleIcons CDN
  const techLogos = [
    { name: "HTML5", src: "https://cdn.simpleicons.org/html5/E34F26" },
    { name: "CSS3", src: "https://cdn.simpleicons.org/css3/1572B6" },
    { name: "JavaScript", src: "https://cdn.simpleicons.org/javascript/F7DF1E" },
    { name: "PHP", src: "https://cdn.simpleicons.org/php/777BB4" },
    { name: "Laravel", src: "https://cdn.simpleicons.org/laravel/FF2D20" },
    { name: "React", src: "https://cdn.simpleicons.org/react/61DAFB" },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-gray-100 font-sans selection:bg-blue-500/30">
      {/* Navbar Option */}
      <nav className="fixed top-0 w-full z-50 bg-[#050505]/80 backdrop-blur-md border-b border-white/5">
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
      <section id="home" className="relative pt-28 pb-16 flex items-center justify-center overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] opacity-60 pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center relative z-10 w-full">
          {/* Left Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-5 text-center md:text-left"
          >
            <div className="inline-block px-3 py-1 rounded bg-blue-500/10 text-blue-400 text-xs font-semibold mb-1 border border-blue-500/20">
              Full Stack Web Developer
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
              Hi, I'm <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
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
              <p className="text-xs text-gray-500 font-medium mb-3 uppercase tracking-wider">Technologies I Use</p>
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

          {/* Right Image / Muka */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center relative mt-10 md:mt-0"
          >
            {/* Profile Picture Placeholder - Lebih Kecil / Fit Proportions */}
            <div className="w-[280px] h-[280px] md:w-[360px] md:h-[360px] relative rounded-full p-2 bg-gradient-to-tr from-blue-900/40 to-blue-500/10 border border-blue-500/20 shadow-2xl flex items-center justify-center">

              {/* Spinning decorative border */}
              <div className="absolute inset-0 rounded-full border border-dashed border-blue-500/30 animate-[spin_15s_linear_infinite]" />

              {/* Inner Image Container */}
              <div className="w-full h-full rounded-full bg-[#0a0a0a] overflow-hidden flex flex-col items-center justify-center relative border-2 border-transparent z-10">
                {/* USER INSTRUCTION: Replace this img src with your actual photo URL or file in /public */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-blue-950/40 backdrop-blur-[2px]">
                  <MonitorSmartphone className="w-8 h-8 text-blue-400 mb-3" />
                  <p className="text-blue-300 font-medium text-sm mb-1">Foto Profil Anda</p>
                  <p className="text-xs text-gray-400">Ganti dengan `<img src="/foto-anda.jpg" />`</p>
                </div>
              </div>

              {/* Floating Decorative Elements */}
              <div className="absolute -right-4 top-10 bg-[#0a0a0a] p-3 rounded-lg border border-white/10 shadow-lg hidden md:block">
                <Code2 className="w-5 h-5 text-blue-500" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section (Compact) */}
      <section id="skills" className="py-16 bg-[#080808] border-t border-b border-white/5">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">My <span className="text-blue-500">Skills</span></h2>
            <p className="text-gray-400 text-sm">Technologies I work with to bring ideas to life.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { name: 'HTML & CSS', value: 90 },
              { name: 'JavaScript', value: 85 },
              { name: 'PHP / Laravel', value: 80 },
              { name: 'React / Next.js', value: 75 },
              { name: 'Tailwind CSS', value: 90 },
              { name: 'Git & GitHub', value: 85 },
            ].map((skill, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-end mb-2">
                  <span className="text-sm font-medium text-gray-200">{skill.name}</span>
                  <span className="text-xs text-gray-500">{skill.value}%</span>
                </div>
                <div className="w-full bg-[#111] rounded-full h-1.5 border border-white/5">
                  <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${skill.value}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-12 text-center md:text-left">
            <h2 className="text-2xl md:text-4xl font-bold mb-3">Latest <span className="text-blue-500">Projects</span></h2>
            <p className="text-gray-400 text-sm max-w-xl">
              Here are some of my recent open-source repositories fetched directly from GitHub.
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-48 rounded-xl bg-white/5 animate-pulse border border-white/5" />
              ))}
            </div>
          ) : projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.slice(0, 6).map((repo, idx) => (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  key={repo.id}
                  className="group relative bg-[#0a0a0a] rounded-xl p-5 border border-white/5 hover:border-blue-500/40 transition-all flex flex-col h-full hover:shadow-[0_8px_30px_-15px_rgba(37,99,235,0.2)]"
                >
                  <div className="flex justify-between items-start mb-3">
                    <Code2 className="w-6 h-6 text-blue-500" />
                    <a href={repo.html_url} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white transition-colors" title="View Source">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>

                  <h3 className="text-lg font-bold mb-2 group-hover:text-blue-400 transition-colors line-clamp-1">
                    {repo.name}
                  </h3>

                  <p className="text-gray-400 text-xs mb-5 flex-grow line-clamp-2 leading-relaxed">
                    {repo.description || "No description provided."}
                  </p>

                  {repo.topics && repo.topics.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-auto pt-4 border-t border-white/5">
                      {repo.topics.slice(0, 3).map(topic => (
                        <span key={topic} className="text-[10px] font-medium px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 uppercase tracking-wider">
                          {topic}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
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
      <section id="contact" className="py-20 border-t border-white/5 bg-[#080808]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-4xl font-bold mb-4">Let's Work <span className="text-blue-500">Together</span></h2>
          <p className="text-gray-400 text-sm mb-8">
            I'm always open to discussing new projects, creative ideas, or opportunities.
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
