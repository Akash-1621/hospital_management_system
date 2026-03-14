import React from 'react';
import { motion } from 'framer-motion';
import {
  LayoutGrid,
  UserCog,
  Stethoscope,
  CalendarClock,
  CreditCard,
  BedDouble,
  BrainCircuit,
  ChevronRight,
} from 'lucide-react';

const modules = [
  {
    icon: UserCog,
    title: 'Patient Management',
    color: 'from-cyan-500 to-blue-600',
    subs: ['Registration', 'EHR Management', 'Admission/Discharge Tracking', 'Medical History'],
  },
  {
    icon: Stethoscope,
    title: 'Doctor & Staff Management',
    color: 'from-indigo-500 to-purple-600',
    subs: ['Doctor Profile Management', 'Staff Allocation', 'Shift Scheduling', 'Workload Monitoring'],
  },
  {
    icon: CalendarClock,
    title: 'Appointment & Scheduling',
    color: 'from-emerald-500 to-teal-600',
    subs: ['Slot Management', 'Emergency Override', 'Appointment Confirmation', 'Reminder System'],
  },
  {
    icon: CreditCard,
    title: 'Billing & Finance',
    color: 'from-amber-500 to-orange-600',
    subs: ['Invoice Generation', 'Payment Tracking', 'Pending Payment Alerts', 'Billing History'],
  },
  {
    icon: BedDouble,
    title: 'Resource & Bed Management',
    color: 'from-rose-500 to-pink-600',
    subs: ['Bed Allocation', 'ICU Monitoring', 'Equipment Tracking', 'Resource Availability Status'],
  },
  {
    icon: BrainCircuit,
    title: 'AI Predictive & Analytics',
    color: 'from-violet-500 to-purple-600',
    subs: ['Bed Occupancy Forecasting', 'Patient Flow Prediction', 'Staff Shortage Prediction', 'Risk & Anomaly Detection'],
  },
];

const ModulesOverview = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 mesh-bg" />
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-semibold mb-6">
            <LayoutGrid size={14} />
            System Architecture
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-gradient">6 Core Modules</span> · 24 Sub-Modules
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            A comprehensive hospital management platform organized into modular, scalable components.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {modules.map((mod, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="glass-card p-6 group relative overflow-hidden"
            >
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${mod.color}`} />
              <div className="flex items-center gap-3 mb-5">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${mod.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <mod.icon size={20} className="text-white" />
                </div>
                <h3 className="text-sm font-bold text-white">{mod.title}</h3>
              </div>
              <div className="space-y-2">
                {mod.subs.map((sub, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <ChevronRight size={12} className="text-slate-600 shrink-0" />
                    <span className="text-xs text-slate-400">{sub}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-3 border-t border-white/5">
                <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">{mod.subs.length} Sub-Modules</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ModulesOverview;
