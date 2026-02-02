import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Code, Brain, Wrench, Sparkles } from "lucide-react";

const skillCategories = [
  {
    title: "Programming & Core Skills",
    icon: Code,
    color: "from-orange-500 to-amber-500",
    skills: [
      { name: "Python", level: 85 },
      { name: "C", level: 75 },
      { name: "C++", level: 70 },
      { name: "Data Structures", level: 75 },
      { name: "Problem Solving", level: 80 },
    ],
  },
  {
    title: "AI & Data",
    icon: Brain,
    color: "from-purple-500 to-pink-500",
    skills: [
      { name: "Python for Data Analysis", level: 80 },
      { name: "Machine Learning Basics", level: 70 },
      { name: "Data Visualization", level: 75 },
    ],
  },
  {
    title: "Tools & Technologies",
    icon: Wrench,
    color: "from-cyan-500 to-blue-500",
    skills: [
      { name: "Git & GitHub", level: 80 },
      { name: "VS Code", level: 90 },
      { name: "AutoCAD", level: 65 },
      { name: "Microsoft Excel", level: 85 },
    ],
  },
];

const SkillBar = ({ 
  name, 
  level, 
  delay,
  isInView 
}: { 
  name: string; 
  level: number; 
  delay: number;
  isInView: boolean;
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="mb-5 group"
    >
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium group-hover:text-primary transition-colors">{name}</span>
        <motion.span 
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: delay + 0.5 }}
          className="text-sm text-primary font-semibold"
        >
          {level}%
        </motion.span>
      </div>
      <div className="h-2.5 bg-secondary rounded-full overflow-hidden relative">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent"
          initial={{ x: "-100%" }}
          animate={isInView ? { x: "100%" } : {}}
          transition={{ duration: 1.5, delay, repeat: Infinity, repeatDelay: 3 }}
        />
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full relative"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1, delay: delay, ease: "easeOut" }}
        >
          <motion.div
            className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full shadow-lg shadow-primary/50"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ duration: 0.3, delay: delay + 0.8 }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="section-padding relative overflow-hidden" ref={ref}>
      {/* Background decorations */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      
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
            Skills
          </motion.span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mt-4">
            My Technical<br />
            <span className="text-gradient">Expertise</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * categoryIndex }}
              whileHover={{ y: -5 }}
              className="relative p-6 rounded-2xl bg-card border border-border group hover:border-primary/30 transition-all hover:shadow-xl hover:shadow-primary/5"
            >
              {/* Gradient overlay on hover */}
              <motion.div
                className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
              />
              
              {/* Header */}
              <div className="relative flex items-center gap-3 mb-6 pb-4 border-b border-border">
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center"
                >
                  <category.icon size={20} className="text-primary" />
                </motion.div>
                <h3 className="font-heading font-semibold text-lg">
                  {category.title}
                </h3>
              </div>
              
              {/* Skills */}
              <div className="relative">
                {category.skills.map((skill, skillIndex) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    delay={0.2 + categoryIndex * 0.1 + skillIndex * 0.1}
                    isInView={isInView}
                  />
                ))}
              </div>

              {/* Decorative corner */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.5 + categoryIndex * 0.1 }}
                className="absolute top-4 right-4"
              >
                <Sparkles size={16} className="text-primary/30" />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
