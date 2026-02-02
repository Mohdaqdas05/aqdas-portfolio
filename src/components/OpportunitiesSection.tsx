import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Brain, Code, Globe, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";

const opportunities = [
  {
    icon: Brain,
    title: "AI / Machine Learning",
    description: "Eager to apply ML concepts and Python skills to real-world AI projects",
    highlights: ["Deep Learning", "Computer Vision", "NLP Basics"],
  },
  {
    icon: Code,
    title: "Python Development",
    description: "Building robust backend systems and automation solutions",
    highlights: ["Backend APIs", "Automation", "Data Processing"],
  },
  {
    icon: Globe,
    title: "Web Development",
    description: "Creating modern, responsive web applications and interfaces",
    highlights: ["React", "Frontend", "Full Stack"],
  },
];

const OpportunityCard = ({ 
  item, 
  index, 
  isInView 
}: { 
  item: typeof opportunities[0]; 
  index: number; 
  isInView: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 * index }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -10 }}
      className="relative p-8 rounded-2xl bg-card border border-border text-center group overflow-hidden"
    >
      {/* Background gradient */}
      <motion.div
        animate={{ opacity: isHovered ? 1 : 0 }}
        className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent"
      />
      
      {/* Animated ring */}
      <motion.div
        animate={{ rotate: isHovered ? 360 : 0 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="absolute -top-20 -right-20 w-40 h-40 border border-primary/10 rounded-full"
      />
      
      {/* Icon */}
      <motion.div 
        animate={{ 
          scale: isHovered ? 1.1 : 1,
          rotate: isHovered ? 5 : 0
        }}
        className="relative w-20 h-20 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors"
      >
        <item.icon className="text-primary" size={36} />
        <motion.div
          animate={{ scale: isHovered ? [1, 1.5, 1] : 1, opacity: isHovered ? [0.5, 0, 0.5] : 0 }}
          transition={{ duration: 1, repeat: Infinity }}
          className="absolute inset-0 rounded-2xl border-2 border-primary/30"
        />
      </motion.div>
      
      <h3 className="relative font-heading font-semibold text-xl mb-3 group-hover:text-primary transition-colors">
        {item.title}
      </h3>
      <p className="relative text-sm text-muted-foreground mb-4">{item.description}</p>
      
      {/* Highlights */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: isHovered ? 1 : 0, height: isHovered ? "auto" : 0 }}
        className="relative flex flex-wrap justify-center gap-2 overflow-hidden"
      >
        {item.highlights.map((highlight, hIndex) => (
          <motion.span
            key={highlight}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isHovered ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: hIndex * 0.05 }}
            className="px-3 py-1 text-xs bg-secondary rounded-full text-muted-foreground"
          >
            {highlight}
          </motion.span>
        ))}
      </motion.div>

      {/* Corner accent */}
      <div className="absolute top-4 right-4">
        <motion.div
          animate={{ rotate: isHovered ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ArrowRight size={16} className="text-primary/30 group-hover:text-primary transition-colors" />
        </motion.div>
      </div>
    </motion.div>
  );
};

const OpportunitiesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding relative overflow-hidden" ref={ref}>
      {/* Background elements */}
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
      />
      
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 text-primary text-sm font-medium uppercase tracking-widest"
          >
            <Sparkles size={14} />
            Opportunities
            <Sparkles size={14} />
          </motion.span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mt-4 mb-6">
            Open to <span className="text-gradient">Internships</span>
          </h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Currently seeking learning-driven, contribution-focused intern-level roles where 
            I can apply my skills and grow as a developer.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {opportunities.map((item, index) => (
            <OpportunityCard 
              key={item.title} 
              item={item} 
              index={index} 
              isInView={isInView} 
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative p-8 rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border border-primary/20 overflow-hidden"
        >
          {/* Animated border */}
          <motion.div
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-0 w-1/2 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
          />
          <motion.div
            animate={{ x: ["100%", "-100%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-0 left-0 w-1/2 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
          />
          
          <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center flex-shrink-0"
            >
              <CheckCircle2 className="text-primary" size={32} />
            </motion.div>
            <div>
              <p className="text-muted-foreground">
                <span className="text-foreground font-semibold">Note:</span> I'm an early-career engineer 
                focused on learning and contributing. Not currently offering commercial services, but 
                eager to collaborate and grow with the right team.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OpportunitiesSection;
