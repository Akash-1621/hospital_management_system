import React from 'react';
import { motion } from 'framer-motion';
import {
  Network,
  Monitor,
  ShieldCheck,
  Server,
  Database,
  Brain,
  ArrowRight,
  GitBranch,
  UserCheck,
  ClipboardList,
  Stethoscope,
  FlaskConical,
  CreditCard,
  FileText,
  User,
} from 'lucide-react';

const archLayers = [
  { icon: Monitor, label: 'React Client', sub: 'Axios · HTTP Requests', color: 'from-cyan-500 to-blue-600' },
  { icon: ShieldCheck, label: 'Security Layer', sub: 'JWT · RBAC · Helmet · CORS', color: 'from-rose-500 to-pink-600' },
  { icon: Server, label: 'Node.js + Express', sub: 'Business Logic · RESTful API', color: 'from-emerald-500 to-teal-600' },
  { icon: Brain, label: 'AI / Analytics', sub: 'Predict Bed Occupancy · Staff Needs', color: 'from-purple-500 to-indigo-600' },
  { icon: Database, label: 'MongoDB Atlas', sub: 'EHR · Mongoose Validation', color: 'from-green-500 to-emerald-600' },
];

const workflowSteps = [
  { icon: UserCheck, label: 'Authentication', desc: 'Receptionist login & validation' },
  { icon: ClipboardList, label: 'Patient Details', desc: 'Record patient info' },
  { icon: Stethoscope, label: 'Treatment', desc: 'Doctor consultation & process' },
  { icon: FlaskConical, label: 'Lab Process', desc: 'Tests, reports & database' },
  { icon: CreditCard, label: 'Billing', desc: 'Calculate charges' },
  { icon: FileText, label: 'Reports', desc: 'Generate & deliver to patient' },
];

const SystemArchitecture = () => {
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
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-semibold mb-6">
            <Network size={14} />
            System Architecture
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Architecture & <span className="text-gradient">Workflow</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            <strong className="text-slate-300">Flow:</strong> React Client → Node/Express API (JWT Middleware) → MongoDB Database. 
            A dedicated AI Service runs predictive models, consuming data from MongoDB and providing analytical output back to the Express API.
          </p>
        </motion.div>

        {/* Architecture Flow */}
        <div className="mb-16">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm font-bold text-indigo-400 uppercase tracking-widest mb-8 flex items-center gap-2"
          >
            <Network size={14} /> System Architecture Layers
          </motion.h3>
          <div className="flex flex-col gap-3 max-w-2xl mx-auto">
            {archLayers.map((layer, index) => (
              <React.Fragment key={index}>
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="glass-card-hover p-5 flex items-center gap-4"
                >
                  <div className={`w-11 h-11 shrink-0 rounded-xl bg-gradient-to-br ${layer.color} flex items-center justify-center shadow-lg`}>
                    <layer.icon size={20} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">{layer.label}</h4>
                    <p className="text-xs text-slate-500">{layer.sub}</p>
                  </div>
                </motion.div>
                {index < archLayers.length - 1 && (
                  <div className="flex justify-center">
                    <ArrowRight size={16} className="text-slate-600 rotate-90" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Workflow Diagram */}
        <div>
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm font-bold text-emerald-400 uppercase tracking-widest mb-8 flex items-center gap-2"
          >
            <GitBranch size={14} /> Hospital Workflow
          </motion.h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {workflowSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="glass-card p-5 text-center group relative"
              >
                {/* Step Number */}
                <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-white/5 flex items-center justify-center">
                  <span className="text-[9px] font-bold text-slate-600">{index + 1}</span>
                </div>
                <div className="w-10 h-10 mx-auto mb-3 rounded-xl bg-emerald-500/10 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                  <step.icon size={18} className="text-emerald-400" />
                </div>
                <h4 className="text-xs font-bold text-white mb-1">{step.label}</h4>
                <p className="text-[10px] text-slate-500 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
          {/* Flow label */}
          <div className="text-center mt-6">
            <span className="text-xs text-slate-600 font-medium">
              Flow: Client → Secure API → Business Logic → Database / AI → Response
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SystemArchitecture;
