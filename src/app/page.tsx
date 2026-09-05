"use client";

import { useState, useEffect } from "react";
import {
  Mail,
  ExternalLink,
  Code2,
  MonitorSmartphone,
  Server,
  Database,
  Palette,
  ImageOff,
  User,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ArrowUp,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

// Where "Send Message" delivers to. See the setup note at the bottom of the
// chat for how to get this URL (Formspree, free, ~2 minutes).
const FORM_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";
const CONTACT_EMAIL = "riszaldiwildan@gmail.com";

const CONTACT_LINKS = [
  {
    number: "01",
    icon: Mail,
    label: "Email",
    value: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
    external: false,
  },
  {
    number: "02",
    icon: GithubIcon,
    label: "GitHub",
    value: `github.com/${GITHUB_USERNAME}`,
    href: `https://github.com/${GITHUB_USERNAME}`,
    external: true,
  },
  {
    number: "03",
    icon: LinkedinIcon,
    label: "LinkedIn",
    value: "linkedin.com/in/risyaldi-wildan-pratama-87582234a",
    href: "https://www.linkedin.com/in/risyaldi-wildan-pratama-87582234a",
    external: true,
  },
];

// Example: { "nama-repo-kamu": "/projects/nama-repo.png" }
const PROJECT_IMAGES: Record<string, string> = {
  "aldi_portofolio": "/portofolio.jpg",
  "toko-diza": "/toko-diza.jpg",
  "vlab": "/vlab.jpg",
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
      { name: "JavaScript", value: 75 },
      { name: "Tailwind CSS", value: 90 },
      { name: "React / Next.js", value: 70 },
    ],
  },
  {
    title: "Backend",
    icon: Server,
    skills: [
      { name: "PHP", value: 90 },
      { name: "Laravel", value: 90 },
    ],
  },
  {
    title: "Database & Tools",
    icon: Database,
    skills: [
      { name: "MySQL", value: 95 },
      { name: "Git", value: 85 },
      { name: "GitHub", value: 90 },
    ],
  },
  {
    title: "UI / UX",
    icon: Palette,
    skills: [
      { name: "Figma", value: 95 },
      { name: "Wireframing", value: 80 },
    ],
  },
];

// --- About quick facts — edit freely ---
const ABOUT_FACTS = [
  { label: "Based in", value: "Bekasi, Indonesia" },
  { label: "Focus", value: "Web Development" },
  { label: "Currently", value: "Open to new projects" },
  { label: "Stack", value: "Laravel + React/Next.js" },
];

// --- Experience — this is a placeholder structure, replace with your real history ---
type ExperienceRole = { title: string; period: string; description: string };
type ExperienceGroup = { org: string; subtitle: string; roles: ExperienceRole[] };

const EXPERIENCE: ExperienceGroup[] = [
  {
    org: "Laboratorium Manajemen Menengah",
    subtitle: "Universitas Gunadarma",
    roles: [
      {
        title: "Programmer Divisi Website",
        period: "September 2025 – Sekarang",
        description:
          "Membuat dan Mengelola website dari Laboratorium Manajemen Menengah, yaitu v-lab.gunadarma.ac.id menggunakan framework Laravel. Mengelola database MySQL, serta mengoptimalkan performa website agar lebih cepat dan responsif.",
      },
      {
        title: "Asisten Programmer",
        period: "September 2025 – Sekarang",
        description: "Mengawasi pembelajaran saat praktikum, dan mengatasi masalah yang muncul saat praktikan menggunakan software di PC praktikum dari Lab. Manajemen Menengah.",
      },
    ],
  },
  //{
    //org: "Proyek / Organisasi Lain (opsional)",
    //subtitle: "Kota, Indonesia",
    //roles: [
      //{
        //title: "Peran Kamu",
        //period: "Bulan Tahun – Bulan Tahun",
        //description: "Tambahkan pengalaman lain di sini, atau hapus blok ini kalau tidak perlu.",
      //},
    //],
  //},
];

const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

// Fades + slides an element up into view once, the first time it's scrolled to.
function Reveal({
  children,
  delay = 0,
  className = "",
  id,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  id?: string;
}) {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-3">
        <span className="h-7 w-1 rounded-full bg-gradient-to-b from-sky-400 to-blue-600" />
        <span className="text-xs font-medium text-blue-400/80">{eyebrow}</span>
      </div>
      <h2 className="text-2xl md:text-4xl font-semibold tracking-tight text-white mb-2">{title}</h2>
      {description && <p className="text-gray-400 text-sm max-w-md leading-relaxed">{description}</p>}
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

function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleChange = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-24 border-t border-white/5 bg-[#08090c] relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-blue-600/10 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Big headline */}
          <Reveal>
            <p className="text-xs font-semibold tracking-[0.25em] text-blue-400/80 mb-4">LET&apos;S CONNECT</p>
            <h2 className="text-5xl md:text-6xl font-extrabold uppercase leading-[0.95] tracking-tight text-white mb-6">
              Let&apos;s
              <br />
              Work
              <br />
              Together
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm mb-8">
              Saya terbuka untuk peluang baru — baik proyek freelance, kolaborasi, maupun posisi full-time
              di bidang web development.
            </p>
            <button
              type="button"
              onClick={() => document.getElementById("message-form")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full border border-white/15 hover:border-blue-500/50 hover:bg-blue-500/5 text-sm font-semibold uppercase tracking-wide text-white transition-all"
            >
              Send a Message
              <Send className="w-4 h-4" />
            </button>
          </Reveal>

          {/* Numbered link cards */}
          <Reveal delay={0.1} className="space-y-4">
            {CONTACT_LINKS.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noreferrer" : undefined}
                  className="group flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-5 hover:border-blue-500/30 hover:bg-white/[0.04] hover:-translate-y-0.5 transition-all"
                >
                  <div className="p-2.5 rounded-lg bg-blue-500/10 border border-blue-500/20 shrink-0">
                    <Icon className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="flex-grow min-w-0">
                    <p className="text-[11px] tracking-wide text-gray-500">{item.label.toUpperCase()}</p>
                    <p className="text-sm font-medium text-gray-200 truncate">{item.value}</p>
                  </div>
                  {item.external && (
                    <ExternalLink className="w-4 h-4 text-gray-600 group-hover:text-blue-400 transition-colors shrink-0" />
                  )}
                  <span className="text-[11px] font-mono text-gray-700 shrink-0">{item.number}</span>
                </a>
              );
            })}
          </Reveal>
        </div>

        {/* Working message form, kept a scroll away from the CTA above */}
        <Reveal delay={0.15} id="message-form" className="mt-20 pt-4 max-w-xl mx-auto scroll-mt-24">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4">
              <Mail className="w-5 h-5 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-1.5">Or write to me directly</h3>
            <p className="text-sm text-gray-500">Fill this out and I&apos;ll get back to you as soon as I can.</p>
          </div>

          {/* Gradient border wrapper for a bit of glow instead of a flat outline */}
          <div className="rounded-3xl bg-gradient-to-b from-blue-500/25 via-white/10 to-transparent p-px shadow-[0_20px_60px_-25px_rgba(37,99,235,0.35)]">
            <form onSubmit={handleSubmit} className="rounded-[calc(1.5rem-1px)] bg-[#0a0c11] p-7 sm:p-8 flex flex-col">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    required
                    type="text"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={handleChange("name")}
                    className="w-full bg-[#0d0f14] border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-sm text-gray-200 placeholder:text-gray-500 focus:outline-none focus:border-blue-500/50 focus:bg-[#0e1117] transition-colors"
                  />
                </div>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="email"
                    placeholder="Your Email (optional)"
                    value={form.email}
                    onChange={handleChange("email")}
                    className="w-full bg-[#0d0f14] border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-sm text-gray-200 placeholder:text-gray-500 focus:outline-none focus:border-blue-500/50 focus:bg-[#0e1117] transition-colors"
                  />
                </div>
              </div>

              <textarea
                required
                placeholder="Write your message here..."
                value={form.message}
                onChange={handleChange("message")}
                rows={6}
                className="w-full flex-grow bg-[#0d0f14] border border-white/10 rounded-lg px-4 py-3 text-sm text-gray-200 placeholder:text-gray-500 focus:outline-none focus:border-blue-500/50 focus:bg-[#0e1117] transition-colors resize-none mb-4"
              />

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-lg text-sm font-semibold transition-all shadow-[0_0_20px_-5px_rgba(37,99,235,0.6)] hover:shadow-[0_0_28px_-4px_rgba(37,99,235,0.8)] hover:-translate-y-0.5"
              >
                {status === "sending" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>

              <AnimatePresence>
                {status === "success" && (
                  <motion.p
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-3 flex items-center gap-2 text-xs text-emerald-400"
                  >
                    <CheckCircle2 className="w-4 h-4" /> Message sent — thanks! I&apos;ll reply soon.
                  </motion.p>
                )}
                {status === "error" && (
                  <motion.p
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-3 flex items-center gap-2 text-xs text-red-400"
                  >
                    <AlertCircle className="w-4 h-4" /> Something went wrong. Please email me directly at{" "}
                    <a href={`mailto:${CONTACT_EMAIL}`} className="underline">{CONTACT_EMAIL}</a>.
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </div>
        </Reveal>

        <p className="mt-10 text-center text-gray-600 text-xs">
          © {new Date().getFullYear()} Risyaldi Wildan Pratama. Built with Next.js & Tailwind CSS.
        </p>
      </div>
    </section>
  );
}

export default function Portfolio() {
  const [projects, setProjects] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("home");
  const [showScrollTop, setShowScrollTop] = useState(false);

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

  // Smooth scrolling for the in-page nav anchors.
  useEffect(() => {
    const root = document.documentElement;
    const prev = root.style.scrollBehavior;
    root.style.scrollBehavior = "smooth";
    return () => {
      root.style.scrollBehavior = prev;
    };
  }, []);

  // Highlights the current section in the navbar as you scroll.
  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.getElementById(l.id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Shows the "back to top" button once you've scrolled a bit.
  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
          <div className="hidden md:flex space-x-8 text-sm font-medium">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`transition-colors ${
                  activeSection === link.id ? "text-blue-400" : "text-gray-400 hover:text-blue-400"
                }`}
              >
                {link.label}
              </a>
            ))}
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
                Risyaldi Wildan Pratama
              </span>
            </h1>

            <p className="text-gray-400 text-base max-w-md mx-auto md:mx-0 leading-relaxed">
              I build elegant, intuitive, and modern web applications. Passionate about beautiful interfaces and scalable backend systems.
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-3">
              <a href="#about" className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 hover:-translate-y-0.5 text-white rounded-lg text-sm font-medium transition-all shadow-[0_0_15px_-3px_rgba(37,99,235,0.4)]">
                About Me
              </a>
              <a href="#projects" className="flex items-center space-x-2 px-6 py-2.5 bg-transparent border border-gray-600 hover:border-blue-500 hover:-translate-y-0.5 hover:text-blue-400 text-gray-300 rounded-lg text-sm font-medium transition-all">
                <span>My Projects</span>
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
              <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noreferrer" className="p-2.5 bg-white/5 hover:bg-white/10 hover:-translate-y-0.5 rounded border border-white/5 text-gray-400 hover:text-white transition-all">
                <GithubIcon className="w-4 h-4" />
              </a>
              <a href="https://www.linkedin.com/in/risyaldi-wildan-pratama-87582234a" target="_blank" rel="noreferrer" className="p-2.5 bg-white/5 hover:bg-white/10 hover:-translate-y-0.5 rounded border border-white/5 text-gray-400 hover:text-white transition-all">
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a href="https://www.instagram.com/aldi.w.prtm._" target="_blank" rel="noreferrer" className="p-2.5 bg-white/5 hover:bg-white/10 hover:-translate-y-0.5 rounded border border-white/5 text-gray-400 hover:text-white transition-all">
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
                <img src="/profil.jpg" className="w-full h-full object-cover" alt="Risyaldi Wildan Pratama" />
              </div>

              <div className="absolute -right-4 top-10 bg-[#0a0a0a] p-3 rounded-lg border border-white/10 shadow-lg hidden md:block">
                <Code2 className="w-5 h-5 text-blue-500" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-[#08090c] border-t border-white/5">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-10 items-start">
            {/* Photo */}
            <Reveal className="mx-auto md:mx-0 w-56 md:w-full aspect-square rounded-2xl bg-gradient-to-tr from-blue-900/40 to-blue-500/10 border border-blue-500/20 p-2">
              <div className="w-full h-full rounded-xl bg-[#0a0a0a] overflow-hidden flex flex-col items-center justify-center relative">
                <img src="/profil.jpg" className="w-full h-full object-cover" alt="Risyaldi Wildan Pratama" />
              </div>
            </Reveal>

            {/* Bio */}
            <div>
              <Reveal>
                <SectionHeading eyebrow="Get to know me" title="About Me" description="" />
              </Reveal>
              <Reveal delay={0.1} className="-mt-8 space-y-4 text-sm text-gray-400 leading-relaxed max-w-2xl">
                <p>
                  Saya Risyaldi Wildan Pratama, seorang Web Developer yang berbasis di Jakarta.
                  Saya senang mengubah ide menjadi produk digital yang rapi, cepat, dan nyaman digunakan —
                  mulai dari merancang tampilan di sisi frontend sampai membangun sistem yang stabil di sisi backend.
                </p>
                <p>
                  Sehari-hari saya banyak bekerja dengan React/Next.js untuk antarmuka, serta PHP dan Laravel
                  untuk logika dan data di belakang layar. Saya percaya desain yang baik dan kode yang bersih
                  berjalan beriringan — keduanya sama-sama penting untuk pengalaman pengguna yang baik.
                </p>
              </Reveal>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 max-w-2xl">
                {ABOUT_FACTS.map((fact, i) => (
                  <Reveal key={fact.label} delay={0.15 + i * 0.05}>
                    <div className="rounded-lg border border-white/5 bg-white/[0.02] px-4 py-3 hover:border-blue-500/30 hover:-translate-y-0.5 transition-all">
                      <p className="text-[11px] text-gray-500 mb-1">{fact.label}</p>
                      <p className="text-xs font-medium text-gray-200">{fact.value}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 relative">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <SectionHeading
              eyebrow="Career journey"
              title="Experience"
              description="A quick look at the roles and projects that shaped my technical and collaboration skills."
            />
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Roles */}
            <div className="space-y-10">
              {EXPERIENCE.map((exp, ei) => (
                <Reveal key={exp.org} delay={ei * 0.08}>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">{exp.org}</h3>
                    <p className="text-sm text-blue-400 mb-5">{exp.subtitle}</p>

                    <div className="space-y-6 border-l border-white/10 pl-5">
                      {exp.roles.map((role) => (
                        <div key={role.title} className="relative">
                          <span className="absolute -left-[26px] top-1.5 w-2.5 h-2.5 rounded-full bg-blue-500 ring-4 ring-[#050608]" />
                          <h4 className="text-sm font-semibold text-gray-100">{role.title}</h4>
                          <p className="text-xs text-gray-500 mb-2">{role.period}</p>
                          <p className="text-sm text-gray-400 leading-relaxed">{role.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Photos — swap these for real photos of you at work */}
            <Reveal delay={0.15} className="space-y-4">
              <div className="rounded-xl overflow-hidden border border-white/5 bg-gradient-to-br from-[#0e1524] to-[#0a0d16] aspect-[16/10] flex flex-col items-center justify-center">
                {<img src="/mamen.jpeg" className="w-full h-full object-cover" /> }
                <ImageOff className="w-5 h-5 text-blue-500/50 mb-2" />
                <span className="text-[11px] text-gray-600">Add a photo here</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl overflow-hidden border border-white/5 bg-gradient-to-br from-[#0e1524] to-[#0a0d16] aspect-square flex flex-col items-center justify-center">
                  <ImageOff className="w-4 h-4 text-blue-500/50 mb-1" />
                  <span className="text-[10px] text-gray-600">Photo</span>
                </div>
                <div className="rounded-xl overflow-hidden border border-white/5 bg-gradient-to-br from-[#0e1524] to-[#0a0d16] aspect-square flex flex-col items-center justify-center">
                  <ImageOff className="w-4 h-4 text-blue-500/50 mb-1" />
                  <span className="text-[10px] text-gray-600">Photo</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 relative">
        <div className="max-w-5xl mx-auto px-6">
          <Reveal>
            <SectionHeading
              eyebrow="What I work with"
              title="Skills"
              description="Grouped by where they sit in the stack — from what people see to what powers it behind the scenes."
            />
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SKILL_GROUPS.map((group, gi) => {
              const Icon = group.icon;
              return (
                <Reveal key={group.title} delay={gi * 0.08}>
                  <div className="rounded-xl border border-white/5 bg-gradient-to-b from-white/[0.03] to-transparent p-6 hover:border-blue-500/20 transition-colors h-full">
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
                          <div className="w-full bg-[#111] rounded-full h-1.5 border border-white/5 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.value}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, ease: "easeOut" }}
                              className="h-1.5 rounded-full bg-gradient-to-r from-sky-400 to-blue-600"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 relative bg-[#08090c] border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <SectionHeading
              eyebrow="Recent work"
              title="Latest Projects"
              description="Pulled live from GitHub, with previews of what's actually live."
            />
          </Reveal>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-64 rounded-xl bg-white/5 animate-pulse border border-white/5" />
              ))}
            </div>
          ) : projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.slice(0, 6).map((repo, idx) => (
                <Reveal key={repo.id} delay={idx * 0.08}>
                  <div className="group relative bg-[#0a0a0a] rounded-xl border border-white/5 hover:border-blue-500/40 hover:-translate-y-1 transition-all flex flex-col h-full overflow-hidden hover:shadow-[0_8px_30px_-15px_rgba(37,99,235,0.25)]">
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
                </Reveal>
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

      {/* Contact Section (with working form) & Footer — always the last section */}
      <ContactSection />

      {/* Back to top */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        initial={false}
        animate={{ opacity: showScrollTop ? 1 : 0, y: showScrollTop ? 0 : 16 }}
        transition={{ duration: 0.25 }}
        style={{ pointerEvents: showScrollTop ? "auto" : "none" }}
        className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-[0_4px_20px_-4px_rgba(37,99,235,0.6)]"
        aria-label="Back to top"
      >
        <ArrowUp className="w-4 h-4" />
      </motion.button>
    </div>
  );
}