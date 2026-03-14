import React from 'react';
import { motion } from 'framer-motion';
import {
  Server,
  Monitor,
  Database,
  Brain,
  ShieldCheck,
  Cloud,
  ArrowRight,
  Code2,
  BookOpen,
} from 'lucide-react';

const stackLayers = [
  {
    icon: Monitor,
    title: 'Frontend',
    tech: 'React.js',
    color: 'from-cyan-500 to-blue-600',
    glow: 'shadow-cyan-500/20',
  },
  {
    icon: Server,
    title: 'Backend',
    tech: 'Node.js, Express.js',
    color: 'from-emerald-500 to-teal-600',
    glow: 'shadow-emerald-500/20',
  },
  {
    icon: Database,
    title: 'Database',
    tech: 'MongoDB (NoSQL)',
    color: 'from-green-500 to-emerald-600',
    glow: 'shadow-green-500/20',
  },
  {
    icon: Brain,
    title: 'AI Layer',
    tech: 'Predictive Models, ML, Time-Series',
    color: 'from-purple-500 to-indigo-600',
    glow: 'shadow-purple-500/20',
  },
  {
    icon: ShieldCheck,
    title: 'Auth & Security',
    tech: 'JWT, RBAC',
    color: 'from-amber-500 to-orange-600',
    glow: 'shadow-amber-500/20',
  },
  {
    icon: Cloud,
    title: 'Cloud & DevOps',
    tech: 'MongoDB Atlas, AWS, Docker, Git',
    color: 'from-rose-500 to-pink-600',
    glow: 'shadow-rose-500/20',
  },
];

const architecturePoints = [
  { label: 'Core Stack', value: 'MERN (MongoDB, Express.js, React.js, Node.js)' },
  { label: 'System Design', value: 'Full-stack app integrating patient, doctor, and billing modules' },
  { label: 'Data Model', value: 'NoSQL MongoDB for flexible, scalable EHR handling' },
  { label: 'Literature Focus', value: 'NoSQL data modeling, microservices, AI for resource forecasting' },
];

const TechStack = () => {
  return (
    <section id="tech" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 mesh-bg" />
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-semibold mb-6">
            <Code2 size={14} />
            Technology Stack
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Powered by <span className="text-gradient">MERN</span> Stack
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            End-to-end JavaScript development with AI integration, security, and cloud deployment.
          </p>
        </motion.div>

        {/* Stack Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {stackLayers.map((layer, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="glass-card-hover p-6 group"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${layer.color} flex items-center justify-center mb-4 shadow-lg ${layer.glow} group-hover:scale-110 transition-transform duration-300`}>
                <layer.icon size={22} className="text-white" />
              </div>
              <h3 className="text-base font-bold text-white mb-1">{layer.title}</h3>
              <p className="text-sm text-slate-400">{layer.tech}</p>
            </motion.div>
          ))}
        </div>

        {/* Architecture Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-8 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-emerald-500 to-purple-500" />
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <BookOpen size={18} className="text-white" />
            </div>
            <h3 className="text-lg font-bold text-white">Architecture & Literature</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {architecturePoints.map((point, i) => (
              <div key={i} className="flex items-start gap-3">
                <ArrowRight size={14} className="text-cyan-400 mt-1.5 shrink-0" />
                <div>
                  <span className="text-sm font-bold text-white">{point.label}: </span>
                  <span className="text-sm text-slate-400">{point.value}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechStack;
