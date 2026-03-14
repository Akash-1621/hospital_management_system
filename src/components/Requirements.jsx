import React from 'react';
import { motion } from 'framer-motion';
import {
  ClipboardCheck,
  UserPlus,
  CalendarClock,
  FileHeart,
  ShieldCheck,
  Gauge,
  Clock,
  CheckCircle2,
} from 'lucide-react';

const functionalReqs = [
  {
    icon: UserPlus,
    title: 'Patient Registration',
    desc: 'Self-onboarding via portals and "single-sign-on" to prevent duplicate records.',
    highlight: 'self-onboarding',
    color: 'from-cyan-500 to-blue-600',
  },
  {
    icon: CalendarClock,
    title: 'Appointment Scheduling',
    desc: 'Dynamic slot management (adjusting for emergency overrides) and automated SMS/Email reminders to reduce "no-show" rates.',
    highlight: 'dynamic slot management',
    color: 'from-indigo-500 to-purple-600',
  },
  {
    icon: FileHeart,
    title: 'EHR Management',
    desc: 'Shift from static text to structured data (ICD-10/SNOMED coding) that allows for AI analysis of patient history and trends.',
    highlight: 'structured data',
    color: 'from-emerald-500 to-teal-600',
  },
];

const nonFunctionalReqs = [
  {
    icon: ShieldCheck,
    title: 'Security',
    value: 'Zero-Trust + RBAC',
    desc: 'Implementation of Zero-Trust Architecture and Role-Based Access Control. Ensuring a lab tech can\'t see a patient\'s billing history.',
    color: 'text-rose-400',
    bg: 'bg-rose-500/10',
  },
  {
    icon: Gauge,
    title: 'High Availability',
    value: '99.9% Uptime',
    desc: 'Healthcare is 24/7. Cloud-based clusters or replica sets ensure care never stops.',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
  },
  {
    icon: Clock,
    title: 'Query Latency',
    value: '< 200ms',
    desc: 'In emergencies, every second counts. Fast data retrieval ensures doctors aren\'t waiting for a screen to load.',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
  },
];

const Requirements = () => {
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
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-semibold mb-6">
            <ClipboardCheck size={14} />
            System Requirements
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Functional & <span className="text-gradient-warm">Non-Functional</span> Standards
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            The modern essentials and high-bar standards that power CareSphere.
          </p>
        </motion.div>

        {/* Functional Requirements */}
        <div className="mb-12">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm font-bold text-cyan-400 uppercase tracking-widest mb-6 flex items-center gap-2"
          >
            <CheckCircle2 size={14} /> Functional Requirements — Modern Essentials
          </motion.h3>
          <div className="grid lg:grid-cols-3 gap-5">
            {functionalReqs.map((req, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card-hover p-7 group relative overflow-hidden"
              >
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${req.color}`} />
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${req.color} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <req.icon size={22} className="text-white" />
                </div>
                <h4 className="text-base font-bold text-white mb-3">{req.title}</h4>
                <p className="text-sm text-slate-400 leading-relaxed">{req.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Non-Functional Requirements */}
        <div>
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm font-bold text-rose-400 uppercase tracking-widest mb-6 flex items-center gap-2"
          >
            <ShieldCheck size={14} /> Non-Functional Requirements — High-Bar Standards
          </motion.h3>
          <div className="grid lg:grid-cols-3 gap-5">
            {nonFunctionalReqs.map((req, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-7 group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 ${req.bg} rounded-xl flex items-center justify-center`}>
                    <req.icon size={20} className={req.color} />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">{req.title}</h4>
                    <span className={`text-xs font-bold ${req.color}`}>{req.value}</span>
                  </div>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed">{req.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Requirements;
