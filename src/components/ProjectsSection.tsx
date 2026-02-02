import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
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
  },
];

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="section-padding relative" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16"
        >
          <div>
            <span className="text-primary text-sm font-medium uppercase tracking-widest">Portfolio</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mt-4">
              My Recent<br />
              <span className="text-gradient">Projects</span>
            </h2>
          </div>
          <Button variant="outline" className="self-start md:self-auto" asChild>
            <a href="https://github.com/Mohdaqdas05" target="_blank" rel="noopener noreferrer">
              See All Projects <ArrowRight size={16} className="ml-2" />
            </a>
          </Button>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="group rounded-2xl bg-card border border-border overflow-hidden card-hover"
            >
              {/* Project Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                
                {/* Tags overlay */}
                <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-medium bg-primary/20 text-primary rounded-full backdrop-blur-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="font-heading font-bold text-xl mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Features */}
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {project.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="w-1 h-1 rounded-full bg-primary" />
                      {feature}
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <Button size="sm" className="flex-1 glow-primary" asChild>
                    <a href="https://github.com/Mohdaqdas05" target="_blank" rel="noopener noreferrer">
                      <Github size={16} className="mr-2" /> View Code
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;