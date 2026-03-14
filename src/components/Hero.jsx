import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, HeartPulse, Shield, Brain, Sparkles, Activity } from 'lucide-react';

const FloatingOrb = ({ className, delay = 0 }) => (
  <motion.div
    className={`absolute rounded-full blur-3xl pointer-events-none ${className}`}
    animate={{
      y: [0, -30, 0],
      x: [0, 15, 0],
      scale: [1, 1.1, 1],
    }}
    transition={{
      duration: 8,
      repeat: Infinity,
      delay,
      ease: "easeInOut"
    }}
  />
);

const StatCard = ({ icon: Icon, value, label, color }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="glass-card px-5 py-4 flex items-center gap-4"
  >
    <div className={`w-11 h-11 rounded-xl flex items-center justify-center bg-gradient-to-br ${color}`}>
      <Icon size={20} style={{color: 'white'}} />
    </div>
    <div>
      <p className="text-xl font-bold text-slate-800">{value}</p>
      <p className="text-xs text-slate-500 font-medium">{label}</p>
    </div>
  </motion.div>
);

const Hero = () => {
  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden mesh-bg grid-pattern">
      {/* Floating Orbs */}
      <FloatingOrb className="w-96 h-96 bg-cyan-500/10 -top-20 -left-20" delay={0} />
      <FloatingOrb className="w-80 h-80 bg-indigo-500/10 top-1/3 -right-20" delay={2} />
      <FloatingOrb className="w-64 h-64 bg-rose-500/8 bottom-10 left-1/3" delay={4} />

      <div className="container-custom relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-8"
            >
              <Sparkles size={14} className="text-cyan-500" />
              <span className="text-sm font-semibold text-cyan-600 tracking-wide">AI-Powered Healthcare Platform</span>
            </motion.div>

            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-[1.1]">
              <span className="text-slate-800">MERN-Stack</span>
              <br />
              <span className="text-gradient">Hospital</span>
              <br />
              <span className="text-slate-800">Management</span>
            </h1>

            <p className="text-lg text-slate-600 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              An AI-assisted Hospital Resource Management platform built on the MERN stack. Centralizes patient information, automates workflows, and optimizes resource allocation in real time.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <button onClick={() => scrollTo('#doctors')} className="btn-primary flex items-center gap-2 group">
                Explore Dashboard
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button onClick={() => scrollTo('#reports')} className="btn-secondary flex items-center gap-2">
                <Activity size={18} className="text-cyan-500" />
                View Reports
              </button>
            </div>

            {/* Stats Row */}
            <div className="mt-14 grid grid-cols-2 sm:grid-cols-3 gap-4">
              <StatCard icon={HeartPulse} value="5+" label="Departments" color="from-rose-500 to-pink-600" />
              <StatCard icon={Shield} value="RBAC" label="JWT Security" color="from-indigo-500 to-purple-600" />
              <StatCard icon={Brain} value="AI" label="Smart Insights" color="from-cyan-500 to-blue-600" />
            </div>
          </motion.div>

          {/* Right: Floating Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex-1 w-full max-w-2xl"
          >
            <div className="relative">
              {/* Glow behind */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-indigo-500/20 to-rose-500/10 rounded-3xl blur-3xl -z-10 transform translate-y-6 scale-95" />

              {/* Main Card */}
              <div className="glass-card p-1.5 glow-cyan">
                <div className="bg-slate-900 rounded-2xl p-6 space-y-4">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center">
                        <Activity size={16} style={{color: 'white'}} />
                      </div>
                      <span className="text-sm font-semibold" style={{color: 'white'}}>CareSphere Dashboard</span>
                    </div>
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-rose-500" />
                      <div className="w-3 h-3 rounded-full bg-amber-500" />
                      <div className="w-3 h-3 rounded-full bg-emerald-500" />
                    </div>
                  </div>

                  {/* Mini Cards */}
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: 'Total Patients', value: '1,247', change: '+12%', color: 'from-cyan-500/20 to-cyan-500/5', textColor: 'text-cyan-400' },
                      { label: 'Bed Occupancy', value: '78%', change: '+5%', color: 'from-indigo-500/20 to-indigo-500/5', textColor: 'text-indigo-400' },
                      { label: 'Active Doctors', value: '64', change: '+3', color: 'from-emerald-500/20 to-emerald-500/5', textColor: 'text-emerald-400' },
                    ].map((stat, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 + i * 0.15 }}
                        className={`bg-gradient-to-b ${stat.color} rounded-xl p-3 border border-white/5`}
                      >
                        <p className="text-[10px] font-medium" style={{color: '#94a3b8'}}>{stat.label}</p>
                        <p className={`text-lg font-bold ${stat.textColor}`}>{stat.value}</p>
                        <p className="text-[10px] font-medium" style={{color: '#34d399'}}>{stat.change}</p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Chart */}
                  <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                    <p className="text-[10px] mb-3 font-medium" style={{color: '#94a3b8'}}>Patient Flow Analytics</p>
                    <div className="flex items-end gap-1.5 h-20">
                      {[40, 65, 45, 80, 55, 70, 90, 60, 75, 85, 50, 95].map((h, i) => (
                        <motion.div
                          key={i}
                          initial={{ height: 0 }}
                          animate={{ height: `${h}%` }}
                          transition={{ delay: 0.8 + i * 0.05, duration: 0.6, ease: "easeOut" }}
                          className="flex-1 rounded-sm bg-gradient-to-t from-cyan-500/60 to-cyan-400/20"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Bottom Row */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                      <p className="text-[10px] font-medium" style={{color: '#94a3b8'}}>Live Monitoring Active</p>
                    </div>
                    <p className="text-[10px]" style={{color: '#64748b'}}>Amrita Vishwa Vidyapeetham</p>
                  </div>
                </div>
              </div>

              {/* Floating Notification */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 }}
                className="absolute -right-4 top-1/4 glass-card py-3 px-4 flex items-center gap-3 glow-indigo"
              >
                <div className="w-8 h-8 bg-indigo-500/20 rounded-lg flex items-center justify-center">
                  <Brain size={16} className="text-indigo-500" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-800">AI Prediction</p>
                  <p className="text-[10px] text-slate-500">Bed demand ↑ 15% this week</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
