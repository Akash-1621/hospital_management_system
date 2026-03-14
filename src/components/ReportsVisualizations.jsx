import React from 'react';
import { motion } from 'framer-motion';
import {
  FileBarChart,
  BarChart3,
  TrendingUp,
  PieChart,
  Activity,
  BedDouble,
  Users,
  CreditCard,
  AlertTriangle,
  Building2,
  Gauge,
  BrainCircuit,
  Clock,
  LineChart,
} from 'lucide-react';

const reports = [
  { icon: Activity, name: 'Patient Admission Report' },
  { icon: BedDouble, name: 'Bed Occupancy Report' },
  { icon: Users, name: 'Doctor Workload Report' },
  { icon: CreditCard, name: 'Billing Summary Report' },
  { icon: AlertTriangle, name: 'Pending Payment Report' },
  { icon: Building2, name: 'Department Performance Report' },
  { icon: Gauge, name: 'ICU Usage Report' },
  { icon: BrainCircuit, name: 'AI Forecast Report' },
];

const visualizations = [
  { icon: TrendingUp, name: 'Bed Occupancy Trend Graph', color: 'text-cyan-400' },
  { icon: LineChart, name: 'Patient Inflow Time-Series Graph', color: 'text-indigo-400' },
  { icon: BarChart3, name: 'Doctor Workload Chart', color: 'text-emerald-400' },
  { icon: TrendingUp, name: 'Revenue Trend Chart', color: 'text-amber-400' },
  { icon: PieChart, name: 'Department-wise Patient Pie Chart', color: 'text-rose-400' },
  { icon: Gauge, name: 'ICU Capacity Utilization Graph', color: 'text-purple-400' },
  { icon: Activity, name: 'Forecast vs Actual Comparison Chart', color: 'text-teal-400' },
];

const ReportsVisualizations = () => {
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
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-semibold mb-6">
            <FileBarChart size={14} />
            Reporting & Analytics
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-gradient">8 Reports</span> · 7 Visualizations
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Comprehensive dashboard analytics and AI-powered insights for hospital decision-making.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Reports */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-7 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-blue-500" />
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <FileBarChart size={18} className="text-white" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">System Reports</h3>
                <span className="text-xs text-indigo-400 font-semibold">8 reports</span>
              </div>
            </div>
            <div className="space-y-2.5">
              {reports.map((report, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white/3 hover:bg-white/5 transition-colors group"
                >
                  <report.icon size={14} className="text-indigo-400/60 group-hover:text-indigo-400 transition-colors shrink-0" />
                  <span className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors">{report.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Visualizations */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-7 relative overflow-hidden glow-indigo"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500" />
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                <BarChart3 size={18} className="text-white" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Dashboard Visualizations</h3>
                <span className="text-xs text-purple-400 font-semibold">7 interactive charts</span>
              </div>
            </div>
            <div className="space-y-2.5">
              {visualizations.map((viz, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white/3 hover:bg-white/5 transition-colors group"
                >
                  <viz.icon size={14} className={`${viz.color} shrink-0`} />
                  <span className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors">{viz.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ReportsVisualizations;
