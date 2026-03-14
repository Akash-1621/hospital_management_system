import React from 'react';
import { motion } from 'framer-motion';
import {
  Rocket,
  GitBranch,
  Container,
  Cloud,
  TestTubes,
  Activity,
  RefreshCw,
} from 'lucide-react';

const devopsItems = [
  {
    icon: GitBranch,
    title: 'GitHub Actions',
    desc: 'Automated pipelines execute unit tests, API tests, and build verification on every code commit. Failed builds prevent deployment.',
    color: 'from-slate-500 to-gray-600',
  },
  {
    icon: RefreshCw,
    title: 'CI/CD Pipeline',
    desc: 'Enables continuous integration and automated deployment of frontend and backend services, reducing manual intervention.',
    color: 'from-cyan-500 to-blue-600',
  },
  {
    icon: Container,
    title: 'Docker',
    desc: 'Containerizes React frontend, Node.js backend, and AI services to ensure consistent environments across dev, test, and production.',
    color: 'from-indigo-500 to-blue-600',
  },
  {
    icon: Cloud,
    title: 'Cloud Deployment',
    desc: 'MongoDB Atlas for database hosting, and AWS / Render / Vercel for scalable application hosting.',
    color: 'from-purple-500 to-indigo-600',
  },
  {
    icon: TestTubes,
    title: 'Automated Testing',
    desc: 'Pre-deployment testing ensures application stability and performance before production release.',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    icon: Activity,
    title: 'Monitoring & Logging',
    desc: 'Continuous monitoring of API response times, database performance, and system uptime to maintain healthcare-grade reliability.',
    color: 'from-amber-500 to-orange-600',
  },
];

const DevOpsSolution = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 mesh-bg" />
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm font-semibold mb-6">
            <Rocket size={14} />
            DevOps & Deployment
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Production-Ready <span className="text-gradient">DevOps</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Automated pipelines, containerization, and cloud infrastructure for healthcare-grade reliability.
          </p>
        </motion.div>

        {/* DevOps Pipeline Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {devopsItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="glass-card-hover p-6 group relative overflow-hidden"
            >
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.color}`} />
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <item.icon size={20} className="text-white" />
              </div>
              <h4 className="text-sm font-bold text-white mb-2">{item.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Pipeline Flow */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-500/10 to-indigo-500/10 border border-rose-500/20">
            <Rocket size={14} className="text-rose-400" />
            <span className="text-sm text-slate-300 font-medium">Code → Test → Build → Docker → Deploy → Monitor</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DevOpsSolution;
