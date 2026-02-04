import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Phone, Mail, Linkedin, Github, Send, MapPin, Sparkles, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const contactInfo = [
  {
    icon: Phone,
    label: "Phone",
    value: "+91-9559724854",
    href: "tel:+919559724854",
  },
  {
    icon: Mail,
    label: "Email",
    value: "aqdasalifarooqui41@gmail.com",
    href: "mailto:aqdasalifarooqui41@gmail.com",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "Mohd Aqdas Farooqui",
    href: "https://linkedin.com/in/mohd-aqdas-farooqui-636a42332",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "Mohdaqdas05",
    href: "https://github.com/Mohdaqdas05",
  },
];

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Message Sent!",
          description: "Thank you for reaching out. I'll get back to you soon!",
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
        (e.target as HTMLFormElement).reset();
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to send message. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 hero-gradient rotate-180" />
      
      {/* Animated background elements */}
      <motion.div
        animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-20 right-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 20, 0], x: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute bottom-20 left-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl"
      />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-10" />
      
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
            Contact
            <Sparkles size={14} />
          </motion.span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mt-4 mb-6">
            Let's Work<br />
            <span className="text-gradient">Together</span>
          </h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-xl mx-auto"
          >
            Interested in discussing internship opportunities or collaboration? 
            Feel free to reach out!
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="font-heading font-semibold text-xl mb-6 flex items-center gap-2">
              <span className="w-8 h-px bg-primary" />
              Get in Touch
            </h3>
            <div className="space-y-4 mb-8">
              {contactInfo.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  whileHover={{ x: 10, scale: 1.02 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border group hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all"
                >
                  <motion.div 
                    whileHover={{ rotate: 10 }}
                    className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors"
                  >
                    <item.icon className="text-primary" size={20} />
                  </motion.div>
                  <div className="flex-1">
                    <div className="text-sm text-muted-foreground">{item.label}</div>
                    <div className="font-medium group-hover:text-primary transition-colors">{item.value}</div>
                  </div>
                  <ArrowUpRight size={16} className="text-muted-foreground group-hover:text-primary transition-colors opacity-0 group-hover:opacity-100" />
                </motion.a>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="p-6 rounded-xl bg-card border border-border relative overflow-hidden group hover:border-primary/30 transition-all"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
              />
              <div className="relative flex items-center gap-3 mb-3">
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <MapPin className="text-primary" size={20} />
                </motion.div>
                <span className="font-medium">Location</span>
              </div>
              <p className="relative text-muted-foreground text-sm">
                Universal College of Engineering<br />
                India
              </p>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <h3 className="font-heading font-semibold text-xl mb-6 flex items-center gap-2">
              <span className="w-8 h-px bg-primary" />
              Send a Message
            </h3>
            
            <motion.form 
              onSubmit={handleSubmit} 
              className="space-y-4 p-6 rounded-2xl bg-card/50 border border-border backdrop-blur-sm"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <motion.div
                  animate={{ scale: focusedField === "name" ? 1.02 : 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Input
                    name="name"
                    placeholder="Your Name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    className="bg-card border-border focus:border-primary transition-all"
                  />
                </motion.div>
                <motion.div
                  animate={{ scale: focusedField === "email" ? 1.02 : 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    className="bg-card border-border focus:border-primary transition-all"
                  />
                </motion.div>
              </div>
              <motion.div
                animate={{ scale: focusedField === "subject" ? 1.02 : 1 }}
                transition={{ duration: 0.2 }}
              >
                <Input
                  name="subject"
                  placeholder="Subject"
                  required
                  value={formData.subject}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("subject")}
                  onBlur={() => setFocusedField(null)}
                  className="bg-card border-border focus:border-primary transition-all"
                />
              </motion.div>
              <motion.div
                animate={{ scale: focusedField === "message" ? 1.02 : 1 }}
                transition={{ duration: 0.2 }}
              >
                <Textarea
                  name="message"
                  placeholder="Your Message"
                  rows={5}
                  required
                  value={formData.message}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  className="bg-card border-border focus:border-primary resize-none transition-all"
                />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  size="lg"
                  className="w-full glow-primary group"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <motion.span
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      Sending...
                    </motion.span>
                  ) : (
                    <>
                      <Send size={18} className="mr-2 group-hover:translate-x-1 transition-transform" /> 
                      Send Message
                    </>
                  )}
                </Button>
              </motion.div>
            </motion.form>

            {/* Decorative element */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-10 -right-10 w-32 h-32 border border-dashed border-primary/20 rounded-full hidden lg:block"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
