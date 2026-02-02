import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Target, Lightbulb } from "lucide-react";

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

  return (
    <section id="about" className="section-padding relative" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background" />
      
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-primary text-sm font-medium uppercase tracking-widest">About Me</span>
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

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 rounded-lg bg-secondary/50 border border-border">
                <div className="text-3xl font-heading font-bold text-gradient">2027</div>
                <div className="text-xs text-muted-foreground mt-1">Expected Graduation</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-secondary/50 border border-border">
                <div className="text-3xl font-heading font-bold text-gradient">AI/ML</div>
                <div className="text-xs text-muted-foreground mt-1">Specialization</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-secondary/50 border border-border">
                <div className="text-3xl font-heading font-bold text-gradient">5+</div>
                <div className="text-xs text-muted-foreground mt-1">Projects</div>
              </div>
            </div>
          </motion.div>

          {/* Highlights */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="flex gap-4 p-6 rounded-xl bg-card border border-border card-hover"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <item.icon className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-heading font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;