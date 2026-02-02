import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Brain, Code, Globe, Sparkles } from "lucide-react";

const opportunities = [
  {
    icon: Brain,
    title: "AI / Machine Learning",
    description: "Eager to apply ML concepts and Python skills to real-world AI projects",
  },
  {
    icon: Code,
    title: "Python Development",
    description: "Building robust backend systems and automation solutions",
  },
  {
    icon: Globe,
    title: "Web Development",
    description: "Creating modern, responsive web applications and interfaces",
  },
];

const OpportunitiesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding relative" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium uppercase tracking-widest">Opportunities</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mt-4 mb-6">
            Open to <span className="text-gradient">Internships</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Currently seeking learning-driven, contribution-focused intern-level roles where 
            I can apply my skills and grow as a developer.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {opportunities.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="relative p-8 rounded-2xl bg-card border border-border card-hover text-center group"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <item.icon className="text-primary" size={32} />
              </div>
              <h3 className="font-heading font-semibold text-lg mb-3">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center p-8 rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border border-primary/20"
        >
          <Sparkles className="text-primary mx-auto mb-4" size={32} />
          <p className="text-muted-foreground">
            <span className="text-foreground font-medium">Note:</span> I'm an early-career engineer 
            focused on learning and contributing. Not currently offering commercial services, but 
            eager to collaborate and grow with the right team.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default OpportunitiesSection;