import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, BedDouble, Users, Activity, TrendingUp, AlertTriangle, HeartPulse, Pill } from 'lucide-react';

const stats = [
  { label: 'Total Patients', value: '1,247', change: '+12%', icon: Users, color: 'from-cyan-500 to-blue-600' },
  { label: 'Bed Occupancy', value: '78%', change: '+5%', icon: BedDouble, color: 'from-indigo-500 to-purple-600' },
  { label: 'Active Doctors', value: '64', change: '+3', icon: HeartPulse, color: 'from-emerald-500 to-teal-600' },
  { label: 'Critical Cases', value: '12', change: '-2', icon: AlertTriangle, color: 'from-red-500 to-rose-600' },
];

const departmentReports = [
  { dept: 'Cardiology', patients: 245, occupancy: '85%', avgStay: '4.2 days', status: 'High Load' },
  { dept: 'Neurology', patients: 178, occupancy: '72%', avgStay: '6.1 days', status: 'Normal' },
  { dept: 'Orthopedics', patients: 156, occupancy: '68%', avgStay: '5.5 days', status: 'Normal' },
  { dept: 'Pediatrics', patients: 312, occupancy: '90%', avgStay: '3.0 days', status: 'High Load' },
  { dept: 'General Medicine', patients: 356, occupancy: '82%', avgStay: '2.8 days', status: 'Normal' },
];

const ReportsSection = () => {
  return (
    <section id="reports" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 mesh-bg" />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 text-sm font-semibold mb-6">
            <BarChart3 size={14} />
            Hospital Reports
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-slate-800">
            Hospital <span className="text-gradient">Reports</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Real-time analytics and performance metrics across all departments.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <stat.icon size={18} className="text-white" style={{color: 'white'}} />
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.change.startsWith('+') ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
              <p className="text-xs text-slate-500 font-medium mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Department Report Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-slate-200">
            <h3 className="text-lg font-bold text-slate-800">Department-wise Report</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Department</th>
                  <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Total Patients</th>
                  <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Bed Occupancy</th>
                  <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Avg. Stay</th>
                  <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody>
                {departmentReports.map((row, index) => (
                  <tr key={index} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-800">{row.dept}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{row.patients}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{row.occupancy}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{row.avgStay}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${row.status === 'High Load' ? 'bg-amber-100 text-amber-700 border-amber-200' : 'bg-emerald-100 text-emerald-700 border-emerald-200'}`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Chart Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 glass-card p-6"
        >
          <h3 className="text-lg font-bold text-slate-800 mb-4">Patient Flow — Last 12 Months</h3>
          <div className="flex items-end gap-2 h-40">
            {[40, 65, 45, 80, 55, 70, 90, 60, 75, 85, 50, 95].map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                whileInView={{ height: `${h}%` }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.05, duration: 0.6 }}
                className="flex-1 rounded-t-md bg-gradient-to-t from-cyan-500 to-cyan-300"
              />
            ))}
          </div>
          <div className="flex justify-between mt-2 text-[10px] text-slate-400 font-medium">
            {['Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb'].map(m => (
              <span key={m}>{m}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ReportsSection;
