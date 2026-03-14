import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Target, Lightbulb, TrendingUp } from 'lucide-react';

const Introduction = () => {
  const points = [
    {
      icon: BookOpen,
      title: 'The Challenge',
      desc: 'Modern hospitals generate large volumes of patient records, lab reports, appointments, and billing data. Many healthcare institutions lack a unified and intelligent system to manage this data efficiently.',
    },
    {
      icon: Lightbulb,
      title: 'Our Solution',
      desc: 'CareSphere is an AI-assisted Hospital Resource Management System that centralizes patient information, automates workflows, and optimizes hospital resource allocation in real time.',
    },
    {
      icon: Target,
      title: 'Unified Platform',
      desc: 'The platform provides a unified dashboard with real-time synchronization across departments such as administration, doctors, pharmacy, and billing.',
    },
    {
      icon: TrendingUp,
      title: 'AI-Powered Future',
      desc: 'Addresses growing operational complexity in modern hospitals through AI-based resource forecasting and proactive healthcare management.',
    },
  ];

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
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-semibold mb-6">
            <BookOpen size={14} />
            Introduction
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Why <span className="text-gradient">CareSphere</span>?
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Enabling faster decisions and improved patient care through intelligent automation.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {points.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card-hover p-8 group"
            >
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 shrink-0 bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 rounded-xl flex items-center justify-center border border-white/10 group-hover:border-cyan-500/30 transition-colors">
                  <point.icon size={22} className="text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-3">{point.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                    {point.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Introduction;
