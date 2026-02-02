import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, Sparkles, Code2, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import profileImage from "@/assets/profile.jpg";
import { useEffect, useState } from "react";

const roles = [
  "AI & ML Engineer",
  "Python Developer",
  "Problem Solver",
  "Tech Enthusiast",
];

const FloatingIcon = ({ 
  icon: Icon, 
  className, 
  delay = 0 
}: { 
  icon: React.ElementType; 
  className: string; 
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.5 }}
    className={`absolute ${className}`}
  >
    <motion.div
      animate={{ 
        y: [0, -15, 0],
        rotate: [0, 5, -5, 0]
      }}
      transition={{ 
        duration: 4, 
        repeat: Infinity, 
        ease: "easeInOut",
        delay 
      }}
      className="p-3 rounded-xl bg-card/80 backdrop-blur-sm border border-border/50 shadow-lg"
    >
      <Icon size={24} className="text-primary" />
    </motion.div>
  </motion.div>
);

const HeroSection = () => {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const role = roles[currentRole];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < role.length) {
          setDisplayText(role.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentRole((prev) => (prev + 1) % roles.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRole]);

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute inset-0 grid-pattern opacity-20" />
      
      {/* Animated gradient orbs */}
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-20 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute bottom-20 left-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl"
      />
      
      {/* Animated accent lines */}
      <motion.div 
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent origin-left" 
      />
      <motion.div 
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, delay: 0.8 }}
        className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent origin-right" 
      />

      {/* Floating Icons */}
      <FloatingIcon icon={Code2} className="top-32 left-[15%] hidden lg:block" delay={1} />
      <FloatingIcon icon={Brain} className="top-48 right-[12%] hidden lg:block" delay={1.2} />
      <FloatingIcon icon={Sparkles} className="bottom-32 left-[20%] hidden lg:block" delay={1.4} />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 backdrop-blur-sm"
            >
              <motion.span 
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-primary" 
              />
              <span className="text-sm text-primary font-medium">Available for Internships</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-2"
            >
              <span className="text-muted-foreground text-lg">Hello, I'm</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-4xl sm:text-5xl lg:text-7xl font-heading font-bold leading-tight mb-4"
            >
              <span className="relative">
                MOHD AQDAS
                <motion.span
                  initial={{ width: "100%" }}
                  animate={{ width: 0 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                  className="absolute right-0 top-0 h-full bg-background"
                />
              </span>
              <br />
              <span className="text-gradient relative">
                FAROOQUI
                <motion.span
                  initial={{ width: "100%" }}
                  animate={{ width: 0 }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                  className="absolute right-0 top-0 h-full bg-background"
                />
              </span>
            </motion.h1>

            {/* Typewriter Effect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="h-8 mb-6"
            >
              <span className="text-lg text-muted-foreground">— </span>
              <span className="text-lg text-primary font-medium">
                {displayText}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="inline-block w-0.5 h-5 bg-primary ml-1 align-middle"
                />
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-muted-foreground max-w-lg mb-8 leading-relaxed"
            >
              Passionate about building intelligent systems and solving real-world problems 
              through machine learning and data-driven solutions. Currently pursuing B.E. 
              in AI/ML at Universal College of Engineering.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-4 mb-8"
            >
              <Button size="lg" className="glow-primary group" asChild>
                <a href="#projects" className="flex items-center gap-2">
                  View Projects
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </a>
              </Button>
              <Button size="lg" variant="outline" className="backdrop-blur-sm" asChild>
                <a href="#contact">Contact Me</a>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex items-center gap-4"
            >
              {[
                { icon: Github, href: "https://github.com/Mohdaqdas05", label: "GitHub" },
                { icon: Linkedin, href: "https://linkedin.com/in/mohd-aqdas-farooqui-636a42332", label: "LinkedIn" },
                { icon: Mail, href: "mailto:aqdasalifarooqui41@gmail.com", label: "Email" },
              ].map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 rounded-xl bg-secondary/50 hover:bg-secondary border border-border/50 hover:border-primary/30 transition-colors backdrop-blur-sm"
                  aria-label={label}
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Enhanced Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Animated ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-4 rounded-full border-2 border-dashed border-primary/30"
              />
              
              {/* Glow effect behind image */}
              <motion.div 
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute inset-0 bg-primary/30 blur-3xl rounded-full scale-75" 
              />
              
              {/* Image container */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
                {/* Decorative frame */}
                <motion.div 
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 6 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="absolute inset-0 rounded-2xl border-2 border-primary/40" 
                />
                <motion.div 
                  initial={{ rotate: 0 }}
                  animate={{ rotate: -3 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="absolute inset-0 rounded-2xl border border-primary/20" 
                />
                
                {/* Main image */}
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 rounded-2xl overflow-hidden border-2 border-border bg-card"
                >
                  <img
                    src={profileImage}
                    alt="Mohd Aqdas Farooqui"
                    className="w-full h-full object-cover object-top"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                </motion.div>

                {/* Status badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 }}
                  className="absolute -bottom-4 -right-4 px-4 py-2 rounded-xl bg-card border border-border shadow-lg backdrop-blur-sm"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-sm font-medium">Open to Work</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Enhanced Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2"
        >
          <span className="text-xs text-muted-foreground uppercase tracking-widest">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="p-2 rounded-full border border-border/50"
          >
            <ArrowDown size={16} className="text-primary" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
