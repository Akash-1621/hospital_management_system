import React from 'react';
import { motion } from 'framer-motion';
import {
  BrainCircuit,
  TrendingUp,
  Users,
  AlertTriangle,
  BedDouble,
  Clock,
  Layers,
  ArrowRight,
  Cpu,
  Network,
} from 'lucide-react';

const capabilities = [
  {
    icon: TrendingUp,
    title: 'Trend Analysis',
    desc: 'Monitors intake vs. discharge rates to predict Bed Occupancy.',
    color: 'from-cyan-500 to-blue-600',
  },
  {
    icon: Users,
    title: 'Resource Forecasting',
    desc: 'Identifies potential Staffing Shortages before they occur.',
    color: 'from-indigo-500 to-purple-600',
  },
  {
    icon: AlertTriangle,
    title: 'Proactive Care',
    desc: 'Alerts administrators 24–48 hours before the hospital reaches capacity.',
    color: 'from-amber-500 to-orange-600',
  },
  {
    icon: BedDouble,
    title: 'Outcome',
    desc: 'Reduces patient wait times and ensures critical resources (Oxygen, ICU beds) are allocated efficiently.',
    color: 'from-emerald-500 to-teal-600',
  },
];

const cnnPipeline = [
  'Input Data',
  'Convolutional Layer',
  'ReLU Activation',
  'Batch Normalization',
  'Max Pooling',
  'Fully Connected',
  'SoftMax',
  'Classification',
];

const AIForecasting = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 mesh-bg" />

      <motion.div
        className="absolute w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-3xl -right-48 top-1/3 pointer-events-none"
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
            <BrainCircuit size={14} />
            Predictive AI
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            AI-Powered <span className="text-gradient-warm">Forecasting</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            Beyond data logging — transitioning the system from a "Digital Filing Cabinet" 
            to an <strong className="text-white">Intelligent Decision Support Tool</strong>.
          </p>
        </motion.div>

        {/* Core Capabilities */}
        <div className="grid md:grid-cols-2 gap-5 mb-12">
          {capabilities.map((cap, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="glass-card-hover p-6 flex items-start gap-4 group"
            >
              <div className={`w-11 h-11 shrink-0 rounded-xl bg-gradient-to-br ${cap.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <cap.icon size={20} className="text-white" />
              </div>
              <div>
                <h4 className="font-bold text-white mb-1">{cap.title}</h4>
                <p className="text-sm text-slate-400 leading-relaxed">{cap.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CNN Pipeline Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-8 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500" />
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
              <Network size={18} className="text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">CNN Classification Pipeline</h3>
              <p className="text-xs text-slate-500">Deep learning architecture for fault detection & classification</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {cnnPipeline.map((step, i) => (
              <React.Fragment key={i}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-medium text-slate-300 hover:border-purple-500/30 hover:text-white transition-colors"
                >
                  {step}
                </motion.div>
                {i < cnnPipeline.length - 1 && (
                  <ArrowRight size={12} className="text-slate-600 shrink-0" />
                )}
              </React.Fragment>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AIForecasting;
