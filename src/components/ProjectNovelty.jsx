import React from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  BrainCircuit,
  Timer,
  FileJson,
  Layers,
  Radio,
  ArrowRight,
} from 'lucide-react';

const novelties = [
  {
    number: '01',
    icon: BrainCircuit,
    title: 'AI-Assisted Hospital Decision Support',
    desc: 'Not just a management system — it provides bed occupancy forecasting, staff workload prediction, and risk detection. Moves from data storage → intelligent hospital governance.',
    color: 'from-cyan-500 to-blue-600',
    tag: 'Core Innovation',
  },
  {
    number: '02',
    icon: Timer,
    title: 'Predictive Resource Allocation',
    desc: 'System alerts administrators 24–48 hours before capacity overflow. Traditional systems are reactive — CareSphere is proactive.',
    color: 'from-indigo-500 to-purple-600',
    tag: 'Proactive Care',
  },
  {
    number: '03',
    icon: FileJson,
    title: 'NoSQL Flexible EHR Modeling',
    desc: 'MongoDB allows dynamic medical fields, no rigid schema, and fast emergency retrieval with <200ms target latency.',
    color: 'from-emerald-500 to-teal-600',
    tag: 'Data Innovation',
  },
  {
    number: '04',
    icon: Layers,
    title: 'Integrated Full-Stack AI Architecture',
    desc: 'React → Node → MongoDB → AI Layer. A dedicated predictive intelligence service runs alongside the application stack.',
    color: 'from-amber-500 to-orange-600',
    tag: 'Architecture',
  },
  {
    number: '05',
    icon: Radio,
    title: 'Real-Time Synchronization Across Departments',
    desc: 'Admin + Doctor + Billing + Lab + Pharmacy connected in one platform for seamless, real-time hospital coordination.',
    color: 'from-rose-500 to-pink-600',
    tag: 'Integration',
  },
];

const ProjectNovelty = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 mesh-bg" />

      <motion.div
        className="absolute w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-3xl -left-48 top-1/4 pointer-events-none"
        animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 12, repeat: Infinity }}
      />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm font-semibold mb-6">
            <Sparkles size={14} />
            Project Novelty
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            What Makes CareSphere <span className="text-gradient-warm">Unique</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            5 key innovations that set this project apart for academic evaluation and real-world impact.
          </p>
        </motion.div>

        <div className="space-y-5 max-w-3xl mx-auto">
          {novelties.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card-hover p-6 flex items-start gap-5 group relative overflow-hidden"
            >
              <div className={`absolute top-0 left-0 bottom-0 w-1 bg-gradient-to-b ${item.color}`} />

              {/* Number */}
              <div className="shrink-0 w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-white/20 transition-colors">
                <span className="text-lg font-bold text-white/20 group-hover:text-white/40 transition-colors">{item.number}</span>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <h3 className="text-sm font-bold text-white">{item.title}</h3>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full bg-gradient-to-r ${item.color} text-white uppercase tracking-wider`}>
                    {item.tag}
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectNovelty;
