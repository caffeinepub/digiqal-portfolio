import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useActor } from "@/hooks/useActor";
import {
  AlertCircle,
  Box,
  Briefcase,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Film,
  Gamepad2,
  Gauge,
  GitBranch,
  Heart,
  ImageIcon,
  LayoutGrid,
  Loader2,
  Menu,
  Send,
  Triangle,
  X,
} from "lucide-react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

/* ============================================================
   HERO PARTICLES
   ============================================================ */
function HeroParticles() {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    bottom: Math.random() * 30,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 8 + 6,
    delay: Math.random() * 6,
    drift: Math.random() * 100,
    color:
      i % 3 === 0
        ? "oklch(0.79 0.16 210)"
        : i % 3 === 1
          ? "oklch(0.6 0.22 290)"
          : "oklch(0.7 0.19 50)",
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: `${p.left}%`,
            bottom: `${p.bottom}%`,
            width: p.size,
            height: p.size,
            background: p.color,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ["--drift" as any]: `${p.drift}px`,
          }}
        />
      ))}
    </div>
  );
}

/* ============================================================
   TYPEWRITER HOOK
   ============================================================ */
function useTypewriter(text: string, speed = 40, delay = 600) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;
        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, speed, delay]);

  return { displayed, done };
}

/* ============================================================
   SECTION REVEAL WRAPPER
   ============================================================ */
function SectionReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ============================================================
   NAVIGATION
   ============================================================ */
const navLinks = [
  { id: "about", label: "About", ocid: "nav.about.link" },
  { id: "skills", label: "Skills", ocid: "nav.skills.link" },
  { id: "experience", label: "Experience", ocid: "nav.experience.link" },
  { id: "portfolio", label: "Portfolio", ocid: "nav.portfolio.link" },
  { id: "gallery", label: "Gallery", ocid: "nav.gallery.link" },
  { id: "contact", label: "Contact", ocid: "nav.contact.link" },
];

function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-xl border-b border-neon-blue/10 shadow-neon-blue/5"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-display font-bold text-xl tracking-widest text-gradient-blue-purple neon-glow-blue focus-visible:outline-none"
          aria-label="DIGIQAL — scroll to top"
        >
          DIGIQAL
        </button>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.id}>
              <button
                type="button"
                data-ocid={link.ocid}
                onClick={() => scrollTo(link.id)}
                className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neon-blue rounded-sm"
              >
                {link.label}
                <span className="absolute bottom-0 left-4 right-4 h-px bg-neon-blue scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left shadow-neon-blue" />
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile Toggle */}
        <button
          type="button"
          className="md:hidden p-2 rounded-sm text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neon-blue"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden bg-background/95 backdrop-blur-xl border-b border-neon-blue/10"
          >
            <ul className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    data-ocid={link.ocid}
                    onClick={() => scrollTo(link.id)}
                    className="w-full text-left px-4 py-3 text-sm font-medium text-muted-foreground hover:text-neon-blue transition-colors duration-200 border border-transparent hover:border-neon-blue/20 hover:bg-neon-blue/5 rounded-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neon-blue"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ============================================================
   HERO SECTION
   ============================================================ */
function HeroSection() {
  const tagline =
    "Specialized in Mobile Game Optimized Environments, UI Design, and Game Art for Android Games.";
  const { displayed, done } = useTypewriter(tagline, 25, 1200);

  const scrollToPortfolio = () => {
    document
      .getElementById("portfolio")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden scanlines"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('/assets/generated/hero-city-bg.dim_1920x1080.jpg')",
        }}
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/40" />

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-overlay opacity-40" />

      {/* Particles */}
      <HeroParticles />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 border border-neon-blue/30 bg-neon-blue/5 rounded-full text-xs font-mono text-neon-blue tracking-widest uppercase"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-neon-blue animate-pulse" />
          Available for Projects
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-tight mb-6"
        >
          <span className="text-foreground">Professional </span>
          <span className="text-gradient-blue-purple neon-glow-blue">
            3D Game Artist
          </span>
          <span className="text-foreground"> & </span>
          <span className="text-neon-orange neon-glow-orange">UI Designer</span>
          <br />
          <span className="text-foreground text-3xl sm:text-4xl lg:text-5xl">
            with{" "}
          </span>
          <span className="text-gradient-blue-purple text-3xl sm:text-4xl lg:text-5xl">
            5+ Years Experience
          </span>
        </motion.h1>

        {/* Typewriter tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 1.0 }}
          className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto mb-10 font-mono min-h-[3em]"
        >
          {displayed}
          {!done && <span className="animate-blink text-neon-blue">|</span>}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button
            type="button"
            data-ocid="hero.primary_button"
            onClick={scrollToPortfolio}
            className="group relative px-8 py-4 font-display font-semibold text-sm tracking-widest uppercase bg-neon-blue text-background clip-angular-sm animate-pulse-glow hover:bg-neon-blue/90 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-blue focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <span className="relative z-10 flex items-center gap-2">
              View My Work
              <ChevronDown
                size={16}
                className="group-hover:translate-y-1 transition-transform"
              />
            </span>
          </button>
          <button
            type="button"
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="px-8 py-4 font-display font-semibold text-sm tracking-widest uppercase border border-neon-purple/50 text-neon-purple clip-angular-sm hover:bg-neon-purple/10 hover:border-neon-purple transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-purple focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Hire Me
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground"
      >
        <span className="text-xs font-mono tracking-widest uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          className="w-px h-8 bg-gradient-to-b from-neon-blue/60 to-transparent"
        />
      </motion.div>
    </section>
  );
}

/* ============================================================
   ABOUT SECTION
   ============================================================ */
function AboutSection() {
  return (
    <section
      id="about"
      className="relative py-24 lg:py-32 overflow-hidden about-bg"
    >
      {/* Neon edge separators */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-blue/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-purple/30 to-transparent" />

      {/* Fine grid overlay on top of the rich bg */}
      <div className="absolute inset-0 grid-overlay opacity-10" />

      {/* Decorative blobs — slightly more vibrant for contrast against the richer bg */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-neon-purple/8 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-neon-blue/8 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      {/* Center accent glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-neon-blue/3 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image side */}
          <SectionReveal>
            <div className="relative">
              <div className="relative overflow-hidden clip-angular neon-border-blue aspect-[4/3]">
                <img
                  src="/assets/generated/hero-city-bg.dim_1920x1080.jpg"
                  alt="3D Game Environment"
                  className="w-full h-full object-cover scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/10 to-neon-purple/10" />
              </div>

              {/* Floating badge */}
              <motion.div
                animate={{ y: [-4, 4, -4] }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                className="absolute -bottom-6 -right-6 glass-card clip-angular p-4 border border-neon-blue/30"
              >
                <div className="text-3xl font-display font-bold text-neon-blue neon-glow-blue">
                  5+
                </div>
                <div className="text-xs text-muted-foreground tracking-wider uppercase">
                  Years Experience
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [4, -4, 4] }}
                transition={{
                  duration: 3.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                className="absolute -top-4 -left-4 glass-card clip-angular p-4 border border-neon-purple/30"
              >
                <div className="text-2xl font-display font-bold text-neon-purple neon-glow-purple">
                  11+
                </div>
                <div className="text-xs text-muted-foreground tracking-wider uppercase">
                  Games Shipped
                </div>
              </motion.div>
            </div>
          </SectionReveal>

          {/* Text side */}
          <SectionReveal delay={0.2}>
            <div>
              <span className="font-mono text-xs tracking-widest uppercase text-neon-blue mb-4 block">
                {"// About Me"}
              </span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl mb-6">
                <span className="section-title-line text-foreground">
                  CG Artist &
                </span>
                <br />
                <span className="text-gradient-blue-purple">
                  3D Game Designer
                </span>
              </h2>

              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  I am a passionate{" "}
                  <span className="text-neon-blue font-semibold">
                    CG Artist and 3D Game Designer
                  </span>{" "}
                  with more than{" "}
                  <span className="text-neon-blue font-semibold">
                    5 years of professional experience
                  </span>{" "}
                  in the gaming industry. I specialize in{" "}
                  <span className="text-neon-blue font-semibold">
                    mobile game optimized environments
                  </span>
                  , game UI design, and 3D game assets.
                </p>
                <p>
                  My expertise includes creating high-quality yet optimized
                  visuals for mobile games using industry tools such as{" "}
                  <span className="text-neon-purple font-semibold">Unity</span>,{" "}
                  <span className="text-neon-purple font-semibold">
                    Autodesk Maya
                  </span>
                  ,{" "}
                  <span className="text-neon-purple font-semibold">
                    Adobe Photoshop
                  </span>
                  , and{" "}
                  <span className="text-neon-purple font-semibold">
                    Adobe Premiere Pro
                  </span>
                  .
                </p>
                <p>
                  Throughout my career, I have worked on a wide range of mobile
                  games including open-world games, action shooters, rescue
                  simulations, and driving games. I focus on delivering{" "}
                  <span className="text-neon-orange font-semibold">
                    immersive game environments
                  </span>{" "}
                  and visually appealing user interfaces that enhance gameplay
                  experience.
                </p>
              </div>

              {/* Skill pills */}
              <div className="flex flex-wrap gap-2 mt-8">
                {[
                  "Unity",
                  "Autodesk Maya",
                  "Photoshop",
                  "Premiere Pro",
                  "Android Games",
                  "3D Modeling",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-mono tracking-wide border border-neon-blue/20 bg-neon-blue/5 text-neon-blue clip-angular-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   SKILLS SECTION
   ============================================================ */
const skills = [
  {
    Icon: Box,
    name: "3D Environment Design",
    desc: "Creating detailed, immersive game worlds optimized for mobile platforms",
    color: "blue",
  },
  {
    Icon: Gauge,
    name: "Mobile Game Optimization",
    desc: "Performance-first approach ensuring smooth gameplay on all Android devices",
    color: "orange",
  },
  {
    Icon: LayoutGrid,
    name: "Game UI Design",
    desc: "Crafting intuitive, visually striking user interfaces that enhance gameplay",
    color: "purple",
  },
  {
    Icon: Triangle,
    name: "3D Modeling (Autodesk Maya)",
    desc: "Professional asset creation with high-quality topology and UV mapping",
    color: "blue",
  },
  {
    Icon: Gamepad2,
    name: "Game Engine Integration",
    desc: "Seamless asset pipeline integration within Unity for mobile games",
    color: "orange",
  },
  {
    Icon: ImageIcon,
    name: "Adobe Photoshop",
    desc: "Texture creation, UI mockups, and high-quality 2D asset production",
    color: "purple",
  },
  {
    Icon: Film,
    name: "Adobe Premiere Pro",
    desc: "Game trailer editing and promotional video production for mobile games",
    color: "blue",
  },
  {
    Icon: GitBranch,
    name: "Mobile Art Pipeline",
    desc: "End-to-end 3D art pipeline management from concept to in-game asset",
    color: "orange",
  },
];

function SkillCard({
  skill,
  index,
  inView,
}: {
  skill: (typeof skills)[0];
  index: number;
  inView: boolean;
}) {
  const colorMap = {
    blue: {
      border: "hover:border-neon-blue/50",
      icon: "text-neon-blue",
      glow: "hover:shadow-neon-blue",
      bg: "bg-neon-blue/5",
    },
    purple: {
      border: "hover:border-neon-purple/50",
      icon: "text-neon-purple",
      glow: "hover:shadow-neon-purple",
      bg: "bg-neon-purple/5",
    },
    orange: {
      border: "hover:border-neon-orange/50",
      icon: "text-neon-orange",
      glow: "hover:shadow-neon-orange",
      bg: "bg-neon-orange/5",
    },
  };
  const c = colorMap[skill.color as keyof typeof colorMap];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`glass-card glass-card-hover clip-angular p-6 border border-border ${c.border} ${c.glow} group`}
    >
      <div
        className={`w-12 h-12 ${c.bg} clip-angular-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
      >
        <skill.Icon size={22} className={c.icon} />
      </div>
      <h3 className="font-display font-semibold text-foreground text-base mb-2">
        {skill.name}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed">
        {skill.desc}
      </p>
    </motion.div>
  );
}

function SkillsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" className="relative py-24 lg:py-32">
      <div className="absolute inset-0 grid-overlay opacity-15" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-neon-purple/3 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal className="text-center mb-16">
          <span className="font-mono text-xs tracking-widest uppercase text-neon-purple mb-4 block">
            {"// Skills & Expertise"}
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl">
            <span className="section-title-line">My Toolset &</span>
            <br />
            <span className="text-gradient-blue-purple">Capabilities</span>
          </h2>
        </SectionReveal>

        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {skills.map((skill, i) => (
            <SkillCard
              key={skill.name}
              skill={skill}
              index={i}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   EXPERIENCE SECTION
   ============================================================ */
function ExperienceSection() {
  const experiences = [
    {
      company: "Game Rezort",
      role: "3D Game Artist → Lead Art Department",
      duration: "3 Years",
      description:
        "Worked for 3 years and led the design art department. Responsible for creating mobile optimized game environments, UI elements, and managing the 3D art pipeline for multiple Android games.",
      skills: [
        "3D Environments",
        "UI Design",
        "Art Pipeline",
        "Team Leadership",
      ],
      color: "blue" as const,
    },
    {
      company: "Credex Solutions",
      role: "Lead 3D Modeling Team",
      location: "Model Town Link Road",
      description:
        "Managed and supervised the 3D modeling team and created high-quality assets for multiple mobile games. Established standards and workflows for efficient asset delivery.",
      skills: [
        "3D Modeling",
        "Team Management",
        "Asset Production",
        "Mobile Games",
      ],
      color: "purple" as const,
    },
  ];

  return (
    <section
      id="experience"
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 grid-overlay opacity-15" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-neon-blue/4 rounded-full blur-3xl" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal className="text-center mb-16">
          <span className="font-mono text-xs tracking-widest uppercase text-neon-orange mb-4 block">
            {"// Professional Experience"}
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl">
            <span className="section-title-line">Career</span>{" "}
            <span className="text-gradient-blue-purple">Timeline</span>
          </h2>
        </SectionReveal>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical neon line */}
          <div className="absolute left-6 lg:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-neon-blue via-neon-purple to-transparent opacity-40 -translate-x-1/2" />

          <div className="space-y-12">
            {experiences.map((exp, i) => {
              const isLeft = i % 2 === 0;
              const colorMap = {
                blue: {
                  dot: "bg-neon-blue shadow-neon-blue",
                  border: "border-neon-blue/20 hover:border-neon-blue/50",
                  badge: "text-neon-blue border-neon-blue/30 bg-neon-blue/5",
                  pill: "border-neon-blue/20 bg-neon-blue/5 text-neon-blue",
                },
                purple: {
                  dot: "bg-neon-purple shadow-neon-purple",
                  border: "border-neon-purple/20 hover:border-neon-purple/50",
                  badge:
                    "text-neon-purple border-neon-purple/30 bg-neon-purple/5",
                  pill: "border-neon-purple/20 bg-neon-purple/5 text-neon-purple",
                },
              };
              const c = colorMap[exp.color];

              return (
                <SectionReveal key={exp.company} delay={i * 0.15}>
                  <div
                    className={`relative flex gap-8 lg:gap-0 ${isLeft ? "lg:flex-row" : "lg:flex-row-reverse"}`}
                  >
                    {/* Dot */}
                    <div className="flex-shrink-0 relative z-10 lg:w-1/2 lg:flex lg:justify-center">
                      <div
                        className={`w-4 h-4 rounded-full ${c.dot} ring-4 ring-background animate-pulse-glow mt-6 flex-shrink-0 lg:absolute lg:left-1/2 lg:-translate-x-1/2`}
                      />
                    </div>

                    {/* Card */}
                    <div
                      className={`flex-1 lg:w-[calc(50%-2rem)] lg:px-8 ${isLeft ? "lg:mr-auto lg:pr-12" : "lg:ml-auto lg:pl-12"}`}
                    >
                      <div
                        className={`glass-card clip-angular p-6 border ${c.border} transition-all duration-300`}
                      >
                        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                          <div>
                            <h3 className="font-display font-bold text-xl text-foreground">
                              {exp.company}
                            </h3>
                            {exp.location && (
                              <p className="text-xs text-muted-foreground font-mono">
                                {exp.location}
                              </p>
                            )}
                          </div>
                          {exp.duration && (
                            <span
                              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-mono border clip-angular-sm ${c.badge}`}
                            >
                              <Calendar size={11} />
                              {exp.duration}
                            </span>
                          )}
                        </div>

                        <div
                          className={`flex items-center gap-2 mb-4 px-3 py-2 border clip-angular-sm ${c.badge}`}
                        >
                          <Briefcase size={13} />
                          <span className="text-xs font-semibold">
                            {exp.role}
                          </span>
                        </div>

                        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                          {exp.description}
                        </p>

                        <div className="flex flex-wrap gap-1.5">
                          {exp.skills.map((skill) => (
                            <span
                              key={skill}
                              className={`px-2 py-0.5 text-xs font-mono border clip-angular-sm ${c.pill}`}
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </SectionReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   PORTFOLIO SECTION
   ============================================================ */
const games = [
  {
    title: "Gangster City Mafia Crime",
    img: "/assets/generated/game-gangster-city.dim_600x400.jpg",
    desc: "Open-world gangster game with detailed city environments, UI design, and character assets for Android.",
    tags: ["Open World", "City", "UI Design"],
  },
  {
    title: "Super Hero Food Delivery",
    img: "/assets/generated/game-superhero-food.dim_600x400.jpg",
    desc: "Colorful superhero runner with delivery mechanics, vibrant game UI and character animations.",
    tags: ["Runner", "Casual", "Characters"],
  },
  {
    title: "US Fire Fighter Rescue Simulator",
    img: "/assets/generated/game-firefighter.dim_600x400.jpg",
    desc: "Emergency rescue simulator featuring detailed fire truck models and mission-based UI.",
    tags: ["Simulator", "Vehicles", "Missions"],
  },
  {
    title: "US Ambulance Rescue Open World",
    img: "/assets/generated/game-ambulance.dim_600x400.jpg",
    desc: "Open-world ambulance rescue game with optimized environments and emergency vehicle models.",
    tags: ["Open World", "Vehicles", "Missions"],
  },
  {
    title: "Shooter Combat Trigger",
    img: "/assets/generated/game-shooter.dim_600x400.jpg",
    desc: "Tactical mobile shooter with urban combat environments, character models, and gameplay HUD.",
    tags: ["Shooter", "Combat", "HUD"],
  },
  {
    title: "Gangster KGF Theft Auto",
    img: "/assets/generated/game-kgf.dim_600x400.jpg",
    desc: "Dark crime game with KGF-inspired environments, dramatic lighting, and detailed set pieces.",
    tags: ["Crime", "Dark Theme", "Environments"],
  },
  {
    title: "Police NYPD Chase Game",
    img: "/assets/generated/game-police-nypd.dim_600x400.jpg",
    desc: "High-speed police chase game set in New York, with optimized vehicle models and city streets.",
    tags: ["Chase", "New York", "Vehicles"],
  },
  {
    title: "Police Bike Rescue Game",
    img: "/assets/generated/game-police-bike.dim_600x400.jpg",
    desc: "Action bike rescue game featuring motorcycle models and mission-based city environments.",
    tags: ["Bikes", "Rescue", "City"],
  },
  {
    title: "Endless Runner Game",
    img: "/assets/generated/game-endless-runner.dim_600x400.jpg",
    desc: "Futuristic endless runner with neon tunnel environments and speed-optimized obstacle design.",
    tags: ["Runner", "Futuristic", "Neon"],
  },
  {
    title: "Drift and Drive City Game",
    img: "/assets/generated/game-drift.dim_600x400.jpg",
    desc: "Night city drifting game with sports car models, wet road reflections, and drift scoring UI.",
    tags: ["Racing", "Night City", "Drift"],
  },
  {
    title: "Car Driving Game",
    img: "/assets/generated/game-car-driving.dim_600x400.jpg",
    desc: "Realistic car driving simulator with scenic environments and detailed vehicle controls UI.",
    tags: ["Driving", "Simulator", "Vehicles"],
  },
];

function GameCard({
  game,
  index,
  inView,
}: { game: (typeof games)[0]; index: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      data-ocid={`portfolio.item.${index + 1}`}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: (index % 3) * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative overflow-hidden clip-angular group cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className="aspect-[3/2] overflow-hidden">
        <motion.img
          src={game.img}
          alt={game.title}
          animate={{ scale: hovered ? 1.08 : 1 }}
          transition={{ duration: 0.4 }}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Always-visible bottom bar */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background via-background/70 to-transparent">
        <h3 className="font-display font-semibold text-sm text-foreground">
          {game.title}
        </h3>
        <div className="flex gap-1 mt-1">
          {game.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-xs font-mono border border-neon-blue/20 bg-neon-blue/5 text-neon-blue clip-angular-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Hover overlay */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 bg-background/85 backdrop-blur-sm flex flex-col justify-center p-6 border border-neon-blue/30"
            style={{ boxShadow: "inset 0 0 30px oklch(0.79 0.16 210 / 0.1)" }}
          >
            <h3 className="font-display font-bold text-base text-neon-blue mb-2">
              {game.title}
            </h3>
            <p className="text-muted-foreground text-xs leading-relaxed mb-3">
              {game.desc}
            </p>
            <div className="flex flex-wrap gap-1">
              {game.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 text-xs font-mono border border-neon-purple/30 bg-neon-purple/5 text-neon-purple clip-angular-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Neon corner accent */}
      <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-neon-blue/60" />
      <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-neon-blue/60" />
    </motion.article>
  );
}

function PortfolioSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="portfolio" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 grid-overlay opacity-15" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-neon-orange/4 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal className="text-center mb-16">
          <span className="font-mono text-xs tracking-widest uppercase text-neon-orange mb-4 block">
            {"// Games Portfolio"}
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl">
            <span className="section-title-line">Games I've</span>{" "}
            <span className="text-gradient-blue-purple">Shipped</span>
          </h2>
          <p className="text-muted-foreground mt-6 max-w-xl mx-auto text-sm">
            11 mobile games shipped on Android — from open-world crime to rescue
            simulations. Hover each card to learn more.
          </p>
        </SectionReveal>

        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {games.map((game, i) => (
            <GameCard key={game.title} game={game} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   GALLERY SECTION
   ============================================================ */
const galleryItems = [
  {
    src: "/assets/generated/gallery-city-env.dim_800x600.jpg",
    caption: "City Environment",
  },
  {
    src: "/assets/generated/gallery-game-ui.dim_800x600.jpg",
    caption: "Game UI Design",
  },
  {
    src: "/assets/generated/gallery-vehicle.dim_800x600.jpg",
    caption: "Vehicle Model",
  },
  {
    src: "/assets/generated/gallery-open-world.dim_800x600.jpg",
    caption: "Open World Map",
  },
  {
    src: "/assets/generated/gallery-character.dim_800x600.jpg",
    caption: "Character Asset",
  },
  {
    src: "/assets/generated/gallery-environment2.dim_800x600.jpg",
    caption: "Environment Design",
  },
];

function GallerySection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="gallery" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 grid-overlay opacity-15" />
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-neon-purple/4 rounded-full blur-3xl -translate-y-1/2" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal className="text-center mb-16">
          <span className="font-mono text-xs tracking-widest uppercase text-neon-blue mb-4 block">
            {"// Art Gallery"}
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl">
            <span className="section-title-line">Selected</span>{" "}
            <span className="text-gradient-blue-purple">Artwork</span>
          </h2>
        </SectionReveal>

        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {galleryItems.map((item, i) => (
            <motion.div
              key={item.caption}
              data-ocid={`gallery.item.${i + 1}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{
                duration: 0.5,
                delay: i * 0.07,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative overflow-hidden clip-angular group cursor-pointer"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <motion.img
                  src={item.src}
                  alt={item.caption}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.4 }}
                />
              </div>

              {/* Caption overlay */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileHover={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="absolute inset-0 bg-background/70 backdrop-blur-sm flex items-end p-4 border border-neon-blue/30"
                style={{
                  boxShadow: "inset 0 0 30px oklch(0.79 0.16 210 / 0.08)",
                }}
              >
                <span className="font-display font-semibold text-neon-blue text-sm neon-glow-blue">
                  {item.caption}
                </span>
              </motion.div>

              {/* Corner accents */}
              <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-neon-purple/60 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-neon-purple/60 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   CONTACT SECTION
   ============================================================ */
type ContactStatus = "idle" | "loading" | "success" | "error";

function ContactSection() {
  const { actor } = useActor();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<ContactStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    if (!actor) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      await actor.submitMessage(name.trim(), email.trim(), message.trim());
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to send message. Please try again.");
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 grid-overlay opacity-15" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-neon-blue/5 rounded-full blur-3xl" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-neon-purple/4 rounded-full blur-3xl" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal className="text-center mb-16">
          <span className="font-mono text-xs tracking-widest uppercase text-neon-blue mb-4 block">
            {"// Get In Touch"}
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl mb-4">
            <span className="section-title-line">Let's Build</span>{" "}
            <span className="text-gradient-blue-purple">Together</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Interested in working together on game development projects? Feel
            free to contact me.
          </p>
        </SectionReveal>

        <SectionReveal delay={0.15}>
          <div className="glass-card clip-angular p-8 sm:p-10 border border-neon-blue/15 neon-border-blue">
            {/* Success State */}
            <AnimatePresence>
              {status === "success" && (
                <motion.div
                  data-ocid="contact.success_state"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex flex-col items-center text-center py-10 gap-4"
                >
                  <div className="w-16 h-16 rounded-full bg-neon-blue/10 border border-neon-blue/30 flex items-center justify-center neon-border-blue">
                    <CheckCircle2 size={32} className="text-neon-blue" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-neon-blue neon-glow-blue">
                    Message Sent!
                  </h3>
                  <p className="text-muted-foreground text-sm max-w-sm">
                    Thank you for reaching out. I'll get back to you as soon as
                    possible.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="px-6 py-2.5 text-xs font-mono tracking-widest uppercase border border-neon-blue/30 text-neon-blue hover:bg-neon-blue/10 clip-angular-sm transition-colors"
                  >
                    Send Another
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Form */}
            {status !== "success" && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="name"
                      className="font-mono text-xs tracking-wider uppercase text-muted-foreground"
                    >
                      Name
                    </Label>
                    <Input
                      id="name"
                      data-ocid="contact.name.input"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      required
                      disabled={status === "loading"}
                      className="bg-input/50 border-border focus:border-neon-blue/50 focus:ring-1 focus:ring-neon-blue/30 rounded-none font-mono text-sm placeholder:text-muted-foreground/40"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="font-mono text-xs tracking-wider uppercase text-muted-foreground"
                    >
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      data-ocid="contact.email.input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                      disabled={status === "loading"}
                      className="bg-input/50 border-border focus:border-neon-blue/50 focus:ring-1 focus:ring-neon-blue/30 rounded-none font-mono text-sm placeholder:text-muted-foreground/40"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="message"
                    className="font-mono text-xs tracking-wider uppercase text-muted-foreground"
                  >
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    data-ocid="contact.message.textarea"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell me about your project..."
                    required
                    rows={5}
                    disabled={status === "loading"}
                    className="bg-input/50 border-border focus:border-neon-blue/50 focus:ring-1 focus:ring-neon-blue/30 rounded-none font-mono text-sm placeholder:text-muted-foreground/40 resize-none"
                  />
                </div>

                {/* Error state */}
                <AnimatePresence>
                  {status === "error" && (
                    <motion.div
                      data-ocid="contact.error_state"
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="flex items-center gap-3 p-3 border border-destructive/30 bg-destructive/10 rounded-sm text-destructive text-sm font-mono"
                    >
                      <AlertCircle size={16} />
                      {errorMsg}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Loading state */}
                {status === "loading" && (
                  <div
                    data-ocid="contact.loading_state"
                    className="flex items-center gap-2 text-xs font-mono text-neon-blue"
                  >
                    <Loader2 size={14} className="animate-spin" />
                    Transmitting message...
                  </div>
                )}

                <Button
                  type="submit"
                  data-ocid="contact.submit_button"
                  disabled={status === "loading"}
                  className="w-full sm:w-auto px-10 py-3 font-display font-semibold text-sm tracking-widest uppercase bg-neon-blue text-background clip-angular-sm hover:bg-neon-blue/90 transition-all animate-pulse-glow rounded-none border-0 h-auto"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 size={16} className="animate-spin mr-2" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} className="mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

/* ============================================================
   FOOTER
   ============================================================ */
function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined"
      ? encodeURIComponent(window.location.hostname)
      : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`;

  return (
    <footer className="relative border-t border-neon-blue/10 py-10 overflow-hidden">
      {/* Neon top line */}
      <div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-blue/60 to-transparent"
        style={{ boxShadow: "0 0 8px oklch(0.79 0.16 210 / 0.4)" }}
      />

      <div className="absolute inset-0 grid-overlay opacity-10" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col items-center sm:items-start gap-1">
            <span className="font-display font-bold text-lg tracking-widest text-gradient-blue-purple neon-glow-blue">
              DIGIQAL
            </span>
            <span className="text-xs font-mono text-muted-foreground">
              3D Game Artist & Game UI Designer
            </span>
          </div>

          <div className="flex flex-col items-center gap-1 text-center">
            <p className="text-xs text-muted-foreground">
              Copyright © {year} DIGIQAL Game Artist Portfolio
            </p>
            <p className="text-xs text-muted-foreground">
              Built with{" "}
              <Heart size={11} className="inline text-neon-orange mx-0.5" />{" "}
              using{" "}
              <a
                href={caffeineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neon-blue hover:text-neon-blue/80 transition-colors"
              >
                caffeine.ai
              </a>
            </p>
          </div>

          <div className="flex items-center gap-1">
            {navLinks.slice(0, 4).map((link) => (
              <button
                type="button"
                key={link.id}
                onClick={() =>
                  document
                    .getElementById(link.id)
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="px-3 py-1.5 text-xs text-muted-foreground hover:text-neon-blue transition-colors font-mono"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ============================================================
   APP ROOT
   ============================================================ */
export default function App() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <PortfolioSection />
        <GallerySection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
