import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, AlertTriangle, ArrowRight, Zap, Ban, TrendingDown, AlertCircle } from 'lucide-react';

const ProblemSolution = () => {
  const problems = [
    'Fragmented patient records across departments',
    'Manual paperwork and legacy hospital systems',
    'No real-time sync between admin, pharmacy, lab & billing',
    'Lack of AI-based resource forecasting',
    'Growing operational complexity in hospitals',
  ];

  const solutions = [
    'Centralized unified database for all departments',
    'Automated digital workflows replacing paper processes',
    'Real-time synchronization across reception, pharmacy, lab & billing',
    'Predictive resource planning with AI-driven insights',
    'Digital healthcare control center for administrators & staff',
  ];

  const impacts = [
    { icon: Ban, text: 'Appointment delays & overcrowding', color: 'text-rose-400' },
    { icon: TrendingDown, text: 'Inefficient bed allocation', color: 'text-orange-400' },
    { icon: AlertCircle, text: 'Staff burnout & billing discrepancies', color: 'text-amber-400' },
    { icon: AlertTriangle, text: 'Reduced quality of patient care', color: 'text-red-400' },
  ];

  return (
    <section id="about" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 mesh-bg" />
      <div className="absolute inset-0 grid-pattern opacity-50" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm font-semibold mb-6">
            <Zap size={14} />
            Problem Statement & Solution
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            From <span className="text-gradient-warm">Chaos</span> to{' '}
            <span className="text-gradient">Clarity</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Modern hospitals generate large volumes of operational and clinical data from patient admissions, lab reports, prescriptions, 
            billing systems, and resource management tools — yet this data is often fragmented across departments.
          </p>
        </motion.div>

        {/* Decision Making Gap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-8 mb-8 relative overflow-hidden glow-rose"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500" />
          <div className="flex items-start gap-5">
            <div className="w-12 h-12 shrink-0 bg-rose-500/10 rounded-xl flex items-center justify-center">
              <AlertTriangle size={24} className="text-rose-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-rose-400 mb-3">The Decision Making Gap</h3>
              <p className="text-slate-400 leading-relaxed">
                There is no centralized platform that intelligently analyzes and correlates real-time and historical hospital data 
                to support effective healthcare decision-making. Information related to patient admissions, bed availability, 
                staff workload, billing status, and lab reports is often scattered across multiple systems and departments 
                without contextual integration or predictive analysis.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Impact Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {impacts.map((impact, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-5 text-center group hover:bg-white/10 transition-all"
            >
              <div className={`mx-auto mb-3 w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center`}>
                <impact.icon size={20} className={impact.color} />
              </div>
              <p className="text-xs text-slate-400 font-medium leading-relaxed group-hover:text-slate-300 transition-colors">
                {impact.text}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Problem vs Solution */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Problems */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 to-orange-500" />
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-rose-500/10 rounded-xl flex items-center justify-center">
                <AlertTriangle size={20} className="text-rose-400" />
              </div>
              <h3 className="text-xl font-bold text-rose-400">The Problem</h3>
            </div>
            <ul className="space-y-4">
              {problems.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3 text-slate-400 group"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-500/50 mt-2 shrink-0" />
                  <span className="group-hover:text-slate-300 transition-colors">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Solutions */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 relative overflow-hidden glow-cyan"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-blue-500" />
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-cyan-500/10 rounded-xl flex items-center justify-center">
                <CheckCircle2 size={20} className="text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold text-cyan-400">CareSphere Solution</h3>
            </div>
            <ul className="space-y-4">
              {solutions.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3 text-slate-300 group"
                >
                  <CheckCircle2 size={18} className="text-cyan-400 mt-0.5 shrink-0" />
                  <span className="group-hover:text-white transition-colors">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom CTA Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 glass-card p-6 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Zap size={22} className="text-white" />
            </div>
            <div>
              <h4 className="font-bold text-white">Ready to Transform Healthcare?</h4>
              <p className="text-sm text-slate-400">A unified, full-stack platform with AI-driven insights for proactive decision-making</p>
            </div>
          </div>
          <button className="btn-primary flex items-center gap-2 group shrink-0">
            Get Started
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSolution;
