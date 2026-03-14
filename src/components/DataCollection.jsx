import React from 'react';
import { motion } from 'framer-motion';
import { Database, UserCheck, Stethoscope, Building2, Cpu, ArrowDown } from 'lucide-react';

const dataSources = [
  {
    icon: UserCheck,
    title: 'Patient Inputs',
    desc: 'Registration details, appointment bookings, medical history, and self-reported information submitted through the web application.',
    color: 'from-cyan-500 to-blue-600',
  },
  {
    icon: Stethoscope,
    title: 'Doctor & Staff Inputs',
    desc: 'Treatment notes, prescriptions, diagnosis details, shift schedules, and discharge summaries.',
    color: 'from-indigo-500 to-purple-600',
  },
  {
    icon: Building2,
    title: 'Hospital Records',
    desc: 'Historical admission data, billing transactions, bed allocation records, and resource utilization datasets.',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    icon: Cpu,
    title: 'System-Generated Data',
    desc: 'Appointment logs, occupancy metrics, and workflow tracking information.',
    color: 'from-amber-500 to-orange-600',
  },
];

const DataCollection = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 mesh-bg" />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-semibold mb-6">
            <Database size={14} />
            Data Collection Strategy
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Reliable <span className="text-gradient-warm">Data Sources</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            The system collects healthcare and operational data from multiple reliable sources 
            to support real-time hospital analysis and intelligent decision-making.
          </p>
        </motion.div>

        {/* Data Flow Cards */}
        <div className="max-w-2xl mx-auto space-y-4">
          {dataSources.map((source, index) => (
            <React.Fragment key={index}>
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card-hover p-6 flex items-start gap-5"
              >
                <div className={`w-12 h-12 shrink-0 rounded-xl bg-gradient-to-br ${source.color} flex items-center justify-center shadow-lg`}>
                  <source.icon size={22} className="text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">{source.title}</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">{source.desc}</p>
                </div>
              </motion.div>
              {index < dataSources.length - 1 && (
                <div className="flex justify-center">
                  <ArrowDown size={18} className="text-slate-600" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Bottom label */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500/10 to-indigo-500/10 border border-cyan-500/20">
            <Database size={14} className="text-cyan-400" />
            <span className="text-sm text-slate-300 font-medium">All data → MongoDB → AI Analysis → Actionable Insights</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DataCollection;
