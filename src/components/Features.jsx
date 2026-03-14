import React from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  CalendarClock,
  Brain,
  RefreshCcw,
  Shield,
  LayoutDashboard,
  FileCheck,
} from 'lucide-react';

const features = [
  {
    icon: Users,
    title: 'Patient Registration & EHR',
    desc: 'Centralized patient registration and Electronic Health Record management with comprehensive medical histories.',
    color: 'from-cyan-500 to-blue-600',
    glow: 'shadow-cyan-500/20',
  },
  {
    icon: CalendarClock,
    title: 'Smart Scheduling',
    desc: 'Appointment scheduling with dynamic slot management and automated reminders for doctors and patients.',
    color: 'from-indigo-500 to-purple-600',
    glow: 'shadow-indigo-500/20',
  },
  {
    icon: Brain,
    title: 'AI-Based Forecasting',
    desc: 'AI-based bed occupancy and staff workload forecasting to optimize hospital operations proactively.',
    color: 'from-rose-500 to-pink-600',
    glow: 'shadow-rose-500/20',
  },
  {
    icon: RefreshCcw,
    title: 'Real-Time Sync',
    desc: 'Real-time synchronization between administration, doctors, pharmacy, lab, and billing departments.',
    color: 'from-emerald-500 to-teal-600',
    glow: 'shadow-emerald-500/20',
  },
  {
    icon: Shield,
    title: 'Secure Access Control',
    desc: 'Role-based access control powered by JWT authentication and RBAC for maximum data security.',
    color: 'from-amber-500 to-orange-600',
    glow: 'shadow-amber-500/20',
  },
  {
    icon: LayoutDashboard,
    title: 'Unified Dashboard',
    desc: 'Hospital monitoring dashboard with patient statistics, analytics, and AI-driven performance insights.',
    color: 'from-violet-500 to-purple-600',
    glow: 'shadow-violet-500/20',
  },
  {
    icon: FileCheck,
    title: 'End-to-End Workflow',
    desc: 'Complete workflow tracking from patient admission to discharge, including billing and documentation.',
    color: 'from-sky-500 to-blue-600',
    glow: 'shadow-sky-500/20',
  },
];

const Features = () => {
  return (
    <section id="features" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 mesh-bg" />
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-semibold mb-6">
            <LayoutDashboard size={14} />
            Key Features
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Everything You Need to{' '}
            <span className="text-gradient">Manage</span> a Hospital
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Built with the latest technologies to provide a comprehensive, AI-powered Hospital Resource Management platform.
          </p>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className={`glass-card-hover p-7 group relative ${index === features.length - 1 ? 'md:col-span-2 lg:col-span-1' : ''}`}
            >
              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-5 shadow-lg ${feature.glow} group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon size={22} className="text-white" />
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold text-white mb-3 group-hover:text-gradient transition-all">
                {feature.title}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                {feature.desc}
              </p>

              {/* Corner Accent */}
              <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl ${feature.color} opacity-0 group-hover:opacity-5 rounded-bl-[3rem] rounded-tr-2xl transition-opacity duration-500`} />
            </motion.div>
          ))}
        </div>

        {/* Alerts Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 glass-card p-8 text-center"
        >
          <div className="flex flex-wrap justify-center gap-6 md:gap-12">
            {[
              { value: '5+', label: 'Departments', color: 'text-cyan-400' },
              { value: '4', label: 'Patient Statuses', color: 'text-indigo-400' },
              { value: 'JWT', label: 'Authentication', color: 'text-emerald-400' },
              { value: 'CRUD', label: 'Full Operations', color: 'text-amber-400' },
              { value: 'Real-time', label: 'Notifications', color: 'text-rose-400' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                <p className="text-xs text-slate-500 font-medium mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
