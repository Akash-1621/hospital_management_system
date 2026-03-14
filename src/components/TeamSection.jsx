import React from 'react';
import { motion } from 'framer-motion';
import { Users, GraduationCap, Code2, Sparkles } from 'lucide-react';

const teamMembers = [
  {
    name: 'Akash Prasad M',
    rollNo: 'CB.SC.U4CSE23703',
    role: 'Full Stack Developer',
    avatar: 'AP',
    color: 'from-rose-500 to-pink-600',
    glow: 'shadow-rose-500/30',
  },
  {
    name: 'Akash B',
    rollNo: 'CB.SC.U4CSE23502',
    role: 'Backend Developer',
    avatar: 'AB',
    color: 'from-cyan-500 to-blue-600',
    glow: 'shadow-cyan-500/30',
  },
  {
    name: 'Charan Jith M.E',
    rollNo: 'CB.SC.U4CSE23713',
    role: 'Frontend Developer',
    avatar: 'CJ',
    color: 'from-indigo-500 to-purple-600',
    glow: 'shadow-indigo-500/30',
  },
];

const TeamSection = () => {
  return (
    <section id="team" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 mesh-bg" />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-semibold mb-6">
            <Users size={14} />
            Our Team
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Meet the <span className="text-gradient-warm">Developers</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-xl mx-auto">
            Built with 💜 by students of Amrita Vishwa Vidyapeetham
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="glass-card-hover p-8 text-center group"
            >
              {/* Avatar */}
              <div className="relative mx-auto mb-6 w-20 h-20">
                <div className={`w-full h-full rounded-2xl bg-gradient-to-br ${member.color} flex items-center justify-center shadow-xl ${member.glow} group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-2xl font-bold" style={{color: 'white'}}>{member.avatar}</span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-400 rounded-lg flex items-center justify-center border-2 border-white">
                  <Code2 size={12} style={{color: 'white'}} />
                </div>
              </div>

              {/* Info */}
              <h3 className="text-lg font-bold text-slate-800 mb-1">{member.name}</h3>
              <p className="text-sm text-cyan-400 font-medium mb-2">{member.role}</p>
              <p className="text-xs text-slate-500 font-mono">{member.rollNo}</p>
            </motion.div>
          ))}
        </div>

        {/* Professor & University */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 glass-card p-8 max-w-2xl mx-auto text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/20">
              <GraduationCap size={24} style={{color: 'white'}} />
            </div>
          </div>
          <h4 className="text-lg font-bold text-slate-800 mb-2">Case Study Review 1</h4>
          <p className="text-slate-600 mb-1">
            Professor: <span className="text-slate-800 font-medium">T Senthil Kumar (CSE)</span>
          </p>
          <p className="text-slate-600">
            Course: <span className="text-slate-800 font-medium">23CSE461 — Fullstack Frameworks</span>
          </p>
          <div className="mt-6 flex items-center justify-center gap-2">
            <Sparkles size={14} className="text-amber-400" />
            <p className="text-sm text-amber-400 font-semibold">Amrita Vishwa Vidyapeetham</p>
            <Sparkles size={14} className="text-amber-400" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TeamSection;
