import React from 'react';
import { motion } from 'framer-motion';
import {
  Layers,
  MapPin,
  Stethoscope,
  BedDouble,
  UserCog,
  Clock,
  CreditCard,
  TrendingUp,
  ClipboardList,
  HeartHandshake,
  Globe,
} from 'lucide-react';

const requirementQuestions = [
  { icon: MapPin, text: 'Where is the patient currently admitted and what is their medical status?' },
  { icon: Stethoscope, text: 'What type of service is required (consultation, lab test, surgery, emergency care)?' },
  { icon: BedDouble, text: 'Are beds, ICU units, or required medical resources available?' },
  { icon: UserCog, text: 'Which doctor or department should handle this case?' },
  { icon: Clock, text: 'How urgently does the patient require treatment or intervention?' },
  { icon: CreditCard, text: 'What is the current billing status and are there pending payments?' },
];

const systemProvides = [
  { icon: ClipboardList, text: 'Patient admission tracking and status updates', color: 'text-cyan-400' },
  { icon: UserCog, text: 'Doctor and department assignment suggestions', color: 'text-indigo-400' },
  { icon: BedDouble, text: 'Bed occupancy and resource availability insights', color: 'text-emerald-400' },
  { icon: Stethoscope, text: 'Historical treatment and billing records', color: 'text-amber-400' },
  { icon: TrendingUp, text: 'Trend analysis based on past hospital data', color: 'text-rose-400' },
];

const ProjectOverview = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 mesh-bg" />
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-semibold mb-6">
            <Layers size={14} />
            Project Overview
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            AI-Assisted <span className="text-gradient">Decision Support</span> Platform
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
            A full-stack web application that functions as an AI-assisted hospital decision support platform. 
            Users interact with the system to manage patient records, appointments, billing, and hospital resources.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Requirements Analysis */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500" />
            <h3 className="text-xl font-bold text-white mb-2">User & Requirement Analysis</h3>
            <p className="text-sm text-slate-500 mb-6">Key questions the system answers</p>
            <div className="space-y-4">
              {requirementQuestions.map((q, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-start gap-3 group"
                >
                  <div className="w-8 h-8 shrink-0 rounded-lg bg-indigo-500/10 flex items-center justify-center mt-0.5">
                    <q.icon size={16} className="text-indigo-400" />
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                    {q.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* System Provides */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 relative overflow-hidden glow-cyan"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-blue-500" />
            <h3 className="text-xl font-bold text-white mb-2">What the System Provides</h3>
            <p className="text-sm text-slate-500 mb-6">Intelligent data processing outputs</p>
            <div className="space-y-5">
              {systemProvides.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-4 group"
                >
                  <div className="w-10 h-10 shrink-0 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-cyan-500/30 transition-colors">
                    <item.icon size={18} className={item.color} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-300 font-medium group-hover:text-white transition-colors">
                      {item.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Usage & Social Relevance */}
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card-hover p-7"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                <HeartHandshake size={20} className="text-white" />
              </div>
              <h3 className="text-lg font-bold text-white">Usage</h3>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              The platform is used by administrators, doctors, staff, and patients to manage hospital operations 
              through a centralized digital system. It supports patient registration, appointments, EHR access, 
              billing, and real-time resource monitoring for efficient coordination across departments.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass-card-hover p-7"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                <Globe size={20} className="text-white" />
              </div>
              <h3 className="text-lg font-bold text-white">Social Relevance</h3>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              The system improves healthcare quality by reducing delays and enabling faster medical decisions. 
              With AI-assisted insights, it supports proactive hospital management, reduces staff workload, 
              and enhances patient satisfaction through efficient and transparent service delivery.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProjectOverview;
