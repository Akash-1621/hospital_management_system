import React from 'react';
import { motion } from 'framer-motion';
import {
  Brain,
  Sparkles,
  TrendingUp,
  Activity,
  ShieldAlert,
  BarChart3,
  FileSearch,
  Zap,
} from 'lucide-react';

const aiRoles = [
  {
    icon: Activity,
    title: 'Intelligent Patient Flow',
    desc: 'Patient flow analysis and prioritization for optimal resource utilization.',
    color: 'from-cyan-500 to-blue-600',
  },
  {
    icon: TrendingUp,
    title: 'Pattern & Trend Analysis',
    desc: 'Trend analysis from historical admission and treatment data.',
    color: 'from-indigo-500 to-purple-600',
  },
  {
    icon: BarChart3,
    title: 'Occupancy Forecasting',
    desc: 'Bed occupancy forecasting and staff workload prediction.',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    icon: ShieldAlert,
    title: 'Risk & Anomaly Detection',
    desc: 'Risk identification and anomaly detection in hospital operations.',
    color: 'from-rose-500 to-pink-600',
  },
  {
    icon: Sparkles,
    title: 'Predictive Insights',
    desc: 'Predictive insights for proactive resource allocation.',
    color: 'from-amber-500 to-orange-600',
  },
  {
    icon: FileSearch,
    title: 'Automated Summarization',
    desc: 'Automated summarization and decision support for administrators.',
    color: 'from-violet-500 to-purple-600',
  },
];

const RoleOfAI = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 mesh-bg" />
      <div className="absolute inset-0 grid-pattern opacity-30" />

      {/* Decorative Orb */}
      <motion.div
        className="absolute w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-3xl -right-48 top-1/4 pointer-events-none"
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-semibold mb-6">
            <Brain size={14} />
            Artificial Intelligence
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            The <span className="text-gradient-warm">Role of AI</span> in CareSphere
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
            AI plays a central role in enhancing the system's decision-making and automation capabilities — 
            analyzing structured and operational hospital data to deliver meaningful healthcare insights.
          </p>
        </motion.div>

        {/* AI Capabilities Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {aiRoles.map((role, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="glass-card-hover p-7 group relative"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${role.color} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <role.icon size={22} className="text-white" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">{role.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                {role.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-8 relative overflow-hidden glow-indigo"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-500" />
          <div className="flex items-start gap-5">
            <div className="w-12 h-12 shrink-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Zap size={22} className="text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Beyond Record Management</h3>
              <p className="text-slate-400 leading-relaxed">
                By incorporating AI, the platform moves beyond simple record management to provide intelligent, 
                data-driven assistance for efficient and proactive hospital governance.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default RoleOfAI;
