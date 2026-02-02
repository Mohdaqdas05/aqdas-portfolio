import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Target, Lightbulb, Zap } from "lucide-react";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const highlights = [
    {
      icon: GraduationCap,
      title: "Education",
      description: "B.E. in AI & ML at Universal College of Engineering (2027)",
    },
    {
      icon: Target,
      title: "Focus",
      description: "Intelligent systems, problem-solving, and real-world applications",
    },
    {
      icon: Lightbulb,
      title: "Mindset",
      description: "Continuous learning, logical thinking, and hands-on experience",
    },
  ];

  const stats = [
    { value: "2027", label: "Expected Graduation", icon: GraduationCap },
    { value: "AI/ML", label: "Specialization", icon: Zap },
    { value: "5+", label: "Projects", icon: Target },
  ];

  return (
    <section id="about" className="section-padding relative overflow-hidden" ref={ref}>
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background" />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        className="absolute -right-64 top-1/4 w-[500px] h-[500px] border border-primary/10 rounded-full"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
        className="absolute -right-48 top-1/4 w-[400px] h-[400px] border border-primary/5 rounded-full"
      />
      
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 text-primary text-sm font-medium uppercase tracking-widest"
          >
            <span className="w-8 h-px bg-primary" />
            About Me
          </motion.span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mt-4">
            My Background &<br />
            <span className="text-gradient">Career Focus</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Main content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              I'm an Artificial Intelligence and Machine Learning engineering student 
              with a strong foundation in programming and problem-solving. My academic 
              journey is focused on understanding how intelligent systems work and 
              applying that knowledge to create practical solutions.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Currently pursuing my Bachelor's degree at Universal College of Engineering, 
              I'm building expertise in Python, data analysis, and machine learning concepts. 
              I believe in learning by doing—which is why I actively work on hands-on projects 
              that challenge me to apply theoretical knowledge to real-world scenarios.
            </p>

            {/* Enhanced Stats */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <motion.div 
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="relative group text-center p-4 rounded-xl bg-secondary/50 border border-border overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                  <stat.icon size={16} className="mx-auto mb-2 text-primary opacity-50" />
                  <div className="text-2xl sm:text-3xl font-heading font-bold text-gradient">{stat.value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Enhanced Highlights */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.15 }}
                whileHover={{ x: 10, scale: 1.02 }}
                className="flex gap-4 p-6 rounded-xl bg-card border border-border group cursor-default transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
              >
                <motion.div 
                  whileHover={{ rotate: 10 }}
                  className="flex-shrink-0 w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors"
                >
                  <item.icon className="text-primary" size={26} />
                </motion.div>
                <div>
                  <h3 className="font-heading font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-primary"
                >
                  →
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
