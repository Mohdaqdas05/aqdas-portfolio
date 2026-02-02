import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Heart, ArrowUp } from "lucide-react";

const socialLinks = [
  { icon: Github, href: "https://github.com/Mohdaqdas05", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/mohd-aqdas-farooqui-636a42332", label: "LinkedIn" },
  { icon: Mail, href: "mailto:aqdasalifarooqui41@gmail.com", label: "Email" },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative py-12 border-t border-border overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-card/50 to-transparent" />
      
      <div className="container-custom relative z-10">
        <div className="flex flex-col items-center gap-8">
          {/* Logo/Brand */}
          <motion.a 
            href="#home"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-2xl font-bold"
          >
            Aqdas<span className="text-gradient">.</span>
          </motion.a>

          {/* Social Links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-4"
          >
            {socialLinks.map(({ icon: Icon, href, label }, index) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + index * 0.05 }}
                className="p-3 rounded-xl bg-secondary/50 hover:bg-primary/20 border border-border hover:border-primary/30 text-muted-foreground hover:text-primary transition-all"
                aria-label={label}
              >
                <Icon size={20} />
              </motion.a>
            ))}
          </motion.div>

          {/* Divider */}
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="w-24 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
          />

          {/* Copyright */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-2 text-sm text-muted-foreground"
          >
            <span>© {currentYear} Mohd Aqdas Farooqui.</span>
            <span className="hidden sm:flex items-center gap-1">
              Made with 
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Heart size={14} className="text-primary fill-primary" />
              </motion.span>
              in India
            </span>
          </motion.div>
        </div>

        {/* Back to top button */}
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          whileHover={{ y: -5 }}
          whileTap={{ scale: 0.95 }}
          className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 rounded-xl bg-secondary/50 hover:bg-primary/20 border border-border hover:border-primary/30 text-muted-foreground hover:text-primary transition-all group"
          aria-label="Back to top"
        >
          <motion.div
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowUp size={20} />
          </motion.div>
        </motion.button>
      </div>
    </footer>
  );
};

export default Footer;
