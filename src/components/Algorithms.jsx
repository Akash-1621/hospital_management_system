import React from 'react';
import { motion } from 'framer-motion';
import {
  Binary,
  BrainCircuit,
  LineChart,
  Settings2,
  BedDouble,
  TrendingUp,
  Users,
  BarChart3,
  ShieldAlert,
  CreditCard,
  Calendar,
  Clock,
  Gauge,
  UserCog,
} from 'lucide-react';

const algorithmGroups = [
  {
    title: 'Machine Learning',
    subtitle: 'Predictive Analytics Models',
    icon: BrainCircuit,
    color: 'from-cyan-500 to-blue-600',
    items: [
      'Bed occupancy forecasting',
      'Patient admission trend prediction',
      'Staff workload estimation',
      'Resource utilization analysis',
    ],
  },
  {
    title: 'Classification',
    subtitle: 'Supervised Learning / Logistic Regression / Decision Trees',
    icon: Binary,
    color: 'from-indigo-500 to-purple-600',
    items: [
      'Patient priority classification (Emergency / Normal / Follow-up)',
      'Treatment type categorization',
      'Readmission risk detection',
      'Billing anomaly detection',
    ],
  },
  {
    title: 'Time Series Analysis',
    subtitle: 'Temporal Pattern Recognition',
    icon: LineChart,
    color: 'from-emerald-500 to-teal-600',
    items: [
      'Forecasting daily / weekly patient inflow',
      'ICU capacity trend monitoring',
      'Seasonal admission pattern detection',
    ],
  },
  {
    title: 'Optimization',
    subtitle: 'Resource Allocation Models',
    icon: Settings2,
    color: 'from-rose-500 to-pink-600',
    items: [
      'Optimal bed allocation',
      'Doctor schedule balancing',
      'Staff shift optimization',
      'Minimizing patient waiting time',
    ],
  },
];

const Algorithms = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 mesh-bg" />
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <motion.div
        className="absolute w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-3xl -left-40 top-1/3 pointer-events-none"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 12, repeat: Infinity }}
      />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-semibold mb-6">
            <BrainCircuit size={14} />
            Algorithms Used
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Intelligent <span className="text-gradient">Algorithms</span> at Work
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Four categories of algorithms power CareSphere's AI-driven hospital intelligence.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {algorithmGroups.map((group, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-7 relative overflow-hidden group"
            >
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${group.color}`} />

              <div className="flex items-center gap-4 mb-5">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${group.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <group.icon size={22} className="text-white" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">{group.title}</h3>
                  <p className="text-xs text-slate-500">{group.subtitle}</p>
                </div>
              </div>

              <div className="space-y-3">
                {group.items.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/30 mt-2 shrink-0" />
                    <p className="text-sm text-slate-400 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Algorithms;
