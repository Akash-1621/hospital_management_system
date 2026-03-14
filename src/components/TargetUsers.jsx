import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Stethoscope, UserCheck, ArrowRight, Target } from 'lucide-react';

const targetUsers = [
  {
    icon: Building2,
    user: 'Hospital Administrators',
    need: 'Lack of centralized control over bed availability, staff allocation, billing status, and operational performance.',
    outcome: 'Unified hospital dashboard with real-time analytics, resource tracking, and AI-based forecasting.',
    color: 'from-cyan-500 to-blue-600',
    glow: 'shadow-cyan-500/20',
    borderColor: 'border-cyan-500/20',
  },
  {
    icon: Stethoscope,
    user: 'Doctors & Medical Staff',
    need: 'Difficulty accessing complete patient history and managing schedules efficiently.',
    outcome: 'Instant access to structured EHRs, optimized appointment schedules, and reduced administrative workload.',
    color: 'from-indigo-500 to-purple-600',
    glow: 'shadow-indigo-500/20',
    borderColor: 'border-indigo-500/20',
  },
  {
    icon: UserCheck,
    user: 'Patients',
    need: 'Limited digital access to appointments, reports, and billing information.',
    outcome: 'Easy self-registration, online appointment booking, report access, and transparent billing system.',
    color: 'from-emerald-500 to-teal-600',
    glow: 'shadow-emerald-500/20',
    borderColor: 'border-emerald-500/20',
  },
];

const TargetUsers = () => {
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
            <Target size={14} />
            Target Users
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Built for <span className="text-gradient">Everyone</span> in Healthcare
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            From administrators to patients — CareSphere serves every stakeholder with tailored solutions.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {targetUsers.map((user, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="glass-card-hover p-8 group relative overflow-hidden"
            >
              {/* Top gradient line */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${user.color}`} />

              {/* Icon */}
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${user.color} flex items-center justify-center mb-6 shadow-lg ${user.glow} group-hover:scale-110 transition-transform duration-300`}>
                <user.icon size={26} className="text-white" />
              </div>

              {/* User Type */}
              <h3 className="text-xl font-bold text-white mb-6">{user.user}</h3>

              {/* Need */}
              <div className="mb-5">
                <p className="text-xs font-bold text-rose-400 uppercase tracking-wider mb-2">The Need</p>
                <p className="text-sm text-slate-400 leading-relaxed">{user.need}</p>
              </div>

              {/* Arrow Divider */}
              <div className="flex justify-center my-4">
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${user.color} bg-opacity-20 flex items-center justify-center`}>
                  <ArrowRight size={16} className="text-white rotate-90" />
                </div>
              </div>

              {/* Outcome */}
              <div>
                <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">Expected Outcome</p>
                <p className="text-sm text-slate-300 leading-relaxed">{user.outcome}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TargetUsers;
