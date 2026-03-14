import React from 'react';
import { motion } from 'framer-motion';
import {
  Database,
  Search,
  Layers,
  Zap,
  FileJson,
  GitBranch,
  ArrowRight,
  Server,
} from 'lucide-react';

const indexingFeatures = [
  {
    title: 'Compound Indexing',
    desc: 'Linking Patient ID + Date of Birth for rapid lookups.',
    icon: Search,
  },
  {
    title: 'B-Tree Search',
    desc: 'Converts "Full Collection Scan" into "B-Tree Search," reducing lookup time from seconds to milliseconds.',
    icon: Zap,
  },
  {
    title: 'Horizontal Scaling (Sharding)',
    desc: 'Distributing data across multiple server clusters based on a "Shard Key" for infinite scalability.',
    icon: Server,
  },
];

const ehrFeatures = [
  {
    title: 'Sparse Data Solution',
    desc: 'MongoDB avoids "Null" value waste found in SQL by only storing fields that actually exist for a patient.',
    color: 'text-cyan-400',
  },
  {
    title: 'Dynamic Schema (BSON)',
    desc: 'Add new fields (e.g., "Vaccination Status") instantly without "Alter Table" migrations or system downtime.',
    color: 'text-indigo-400',
  },
  {
    title: 'Polymorphic Records',
    desc: 'Stores text prescriptions, numeric vitals, and scan metadata in a single "Patient" collection.',
    color: 'text-emerald-400',
  },
  {
    title: 'No-Join Logic',
    desc: 'Nesting data (Prescriptions/Allergies) inside one document for maximum read performance.',
    color: 'text-amber-400',
  },
];

const DatabaseScaling = () => {
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
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-semibold mb-6">
            <Database size={14} />
            Database Engineering
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Scaling & <span className="text-gradient">EHR Modeling</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            As the database grows, a "Linear Scan" creates life-threatening delays in emergency data retrieval. 
            Our indexing and scaling strategy eliminates this risk.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Indexing & Scaling */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-emerald-500" />
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                <Layers size={18} className="text-white" />
              </div>
              <h3 className="text-lg font-bold text-white">Indexing & Sharding</h3>
            </div>
            <div className="space-y-5">
              {indexingFeatures.map((feat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3 group"
                >
                  <div className="w-9 h-9 shrink-0 rounded-lg bg-green-500/10 flex items-center justify-center mt-0.5 group-hover:bg-green-500/20 transition-colors">
                    <feat.icon size={16} className="text-green-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1">{feat.title}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">{feat.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* EHR Modeling */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 relative overflow-hidden glow-cyan"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-indigo-500" />
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <FileJson size={18} className="text-white" />
              </div>
              <h3 className="text-lg font-bold text-white">Flexible EHR Modeling</h3>
            </div>
            <div className="space-y-4">
              {ehrFeatures.map((feat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-start gap-3"
                >
                  <ArrowRight size={14} className={`${feat.color} mt-1 shrink-0`} />
                  <div>
                    <span className="text-sm font-bold text-white">{feat.title}: </span>
                    <span className="text-xs text-slate-400">{feat.desc}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DatabaseScaling;
