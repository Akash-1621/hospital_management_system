import React from 'react';
import { motion } from 'framer-motion';
import { Info, Database, Server, Monitor, Code2, Brain } from 'lucide-react';

const techItems = [
  { icon: Monitor, label: 'React.js', desc: 'Frontend UI' },
  { icon: Server, label: 'Node.js', desc: 'Backend Runtime' },
  { icon: Code2, label: 'Express.js', desc: 'REST API Framework' },
  { icon: Database, label: 'MongoDB', desc: 'NoSQL Database' },
  { icon: Brain, label: 'AI Layer', desc: 'Predictive Analytics' },
];

const AboutSection = () => {
  return (
    <section id="about" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 mesh-bg" />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 text-sm font-semibold mb-6">
            <Info size={14} />
            About
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-slate-800">
            About <span className="text-gradient">CareSphere</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-slate-800 mb-4">AI-Powered Hospital Management</h3>
            <p className="text-slate-600 mb-4 leading-relaxed">
              CareSphere is a MERN-Stack Hospital Resource Management System designed to centralize patient information, automate hospital workflows, and optimize resource allocation using AI-based predictive analytics.
            </p>
            <p className="text-slate-600 mb-4 leading-relaxed">
              The platform provides a unified dashboard for real-time synchronization across departments including administration, doctors, pharmacy, lab, and billing. It features role-based access control (RBAC) with JWT authentication for maximum data security.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Built as part of the Fullstack Frameworks coursework at <strong>Amrita Vishwa Vidyapeetham</strong>, CareSphere demonstrates modern healthcare IT solutions using cutting-edge web technologies.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-3"
          >
            {techItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card-hover p-4 flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shrink-0">
                  <item.icon size={18} className="text-white" style={{color: 'white'}} />
                </div>
                <div>
                  <p className="font-bold text-slate-800">{item.label}</p>
                  <p className="text-xs text-slate-500">{item.desc}</p>
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
