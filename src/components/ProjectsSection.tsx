import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Github, ArrowRight, ArrowUpRight, Layers, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import hospitalImg from "@/assets/project-hospital.jpg";
import carImg from "@/assets/project-car.jpg";

const projects = [
  {
    title: "Hospital Management System",
    description:
      "Python-based backend system to manage patient records, doctors, and billing. Implemented file handling and modular architecture with focus on backend logic and data handling.",
    image: hospitalImg,
    tags: ["Python", "File Handling", "Backend"],
    features: [
      "Patient record management",
      "Doctor scheduling",
      "Billing system",
      "Modular architecture",
    ],
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    title: "Obstacle Detection Car",
    description:
      "Sensor-based vehicle capable of detecting obstacles and avoiding collisions. Implemented real-time decision logic and motor control demonstrating embedded systems exposure.",
    image: carImg,
    tags: ["C Programming", "Embedded Systems", "Hardware"],
    features: [
      "Real-time obstacle detection",
      "Collision avoidance",
      "Motor control logic",
      "Sensor integration",
    ],
    color: "from-purple-500/20 to-pink-500/20",
  },
];

const ProjectCard = ({ 
  project, 
  index, 
  isInView 
}: { 
  project: typeof projects[0]; 
  index: number; 
  isInView: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.2 * index }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative rounded-2xl bg-card border border-border overflow-hidden"
    >
      {/* Gradient overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        className={`absolute inset-0 bg-gradient-to-br ${project.color} z-0`}
      />
      
      {/* Project Image */}
      <div className="relative h-64 overflow-hidden">
        <motion.img
          src={project.image}
          alt={project.title}
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
        
        {/* Floating badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 + index * 0.1 }}
          className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-card/90 backdrop-blur-sm border border-border flex items-center gap-2"
        >
          <Layers size={14} className="text-primary" />
          <span className="text-xs font-medium">Project</span>
        </motion.div>
        
        {/* Tags overlay */}
        <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
          {project.tags.map((tag, tagIndex) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.4 + index * 0.1 + tagIndex * 0.05 }}
              className="px-3 py-1.5 text-xs font-medium bg-primary/20 text-primary rounded-full backdrop-blur-sm border border-primary/20"
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Project Content */}
      <div className="relative p-6 z-10">
        <motion.div
          animate={{ x: isHovered ? 5 : 0 }}
          className="flex items-center gap-2 mb-3"
        >
          <h3 className="font-heading font-bold text-xl group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <motion.span
            animate={{ x: isHovered ? 5 : 0, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowUpRight size={18} className="text-primary" />
          </motion.span>
        </motion.div>
        
        <p className="text-muted-foreground text-sm mb-5 leading-relaxed">
          {project.description}
        </p>

        {/* Features with animation */}
        <div className="grid grid-cols-2 gap-2 mb-6">
          {project.features.map((feature, featureIndex) => (
            <motion.div 
              key={feature} 
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.5 + featureIndex * 0.05 }}
              className="flex items-center gap-2 text-xs text-muted-foreground"
            >
              <motion.span 
                animate={{ scale: isHovered ? [1, 1.5, 1] : 1 }}
                transition={{ delay: featureIndex * 0.1 }}
                className="w-1.5 h-1.5 rounded-full bg-primary" 
              />
              {feature}
            </motion.div>
          ))}
        </div>

        {/* Actions */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button size="sm" className="w-full glow-primary group/btn" asChild>
            <a href="https://github.com/Mohdaqdas05" target="_blank" rel="noopener noreferrer">
              <Github size={16} className="mr-2" /> 
              View Code
              <motion.span
                animate={{ x: isHovered ? 5 : 0 }}
                className="ml-2"
              >
                →
              </motion.span>
            </a>
          </Button>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <motion.div
        animate={{ opacity: isHovered ? 0.5 : 0 }}
        className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2"
      />
    </motion.div>
  );
};

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="section-padding relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      
      {/* Animated background elements */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute top-40 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 7, repeat: Infinity }}
        className="absolute bottom-40 right-10 w-80 h-80 bg-primary/5 rounded-full blur-3xl"
      />
      
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16"
        >
          <div>
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 text-primary text-sm font-medium uppercase tracking-widest"
            >
              <span className="w-8 h-px bg-primary" />
              Portfolio
            </motion.span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mt-4">
              My Recent<br />
              <span className="text-gradient">Projects</span>
            </h2>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button variant="outline" className="group self-start md:self-auto" asChild>
              <a href="https://github.com/Mohdaqdas05" target="_blank" rel="noopener noreferrer">
                See All Projects 
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="ml-2"
                >
                  <ArrowRight size={16} />
                </motion.span>
              </a>
            </Button>
          </motion.div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard 
              key={project.title} 
              project={project} 
              index={index} 
              isInView={isInView} 
            />
          ))}
        </div>

        {/* Bottom decoration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border">
            <Zap size={14} className="text-primary" />
            <span className="text-sm text-muted-foreground">More projects coming soon...</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
