import React from 'react';
import { motion } from 'framer-motion';
import { HeartPulse, Phone, Clock, Building2 } from 'lucide-react';

const nurses = [
  {
    name: 'Kavitha Rajan',
    department: 'Cardiology',
    shift: 'Morning (6 AM – 2 PM)',
    experience: '6 years',
    contact: '+91 97654 32100',
    avatar: 'KR',
    color: 'from-pink-500 to-rose-600',
  },
  {
    name: 'Suman Gupta',
    department: 'Neurology',
    shift: 'Night (10 PM – 6 AM)',
    experience: '9 years',
    contact: '+91 97654 32101',
    avatar: 'SG',
    color: 'from-indigo-500 to-blue-600',
  },
  {
    name: 'Revathi Mohan',
    department: 'Pediatrics',
    shift: 'Afternoon (2 PM – 10 PM)',
    experience: '4 years',
    contact: '+91 97654 32102',
    avatar: 'RM',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    name: 'Jyothi Prakash',
    department: 'General Medicine',
    shift: 'Morning (6 AM – 2 PM)',
    experience: '11 years',
    contact: '+91 97654 32103',
    avatar: 'JP',
    color: 'from-amber-500 to-orange-600',
  },
  {
    name: 'Nimisha Thomas',
    department: 'Orthopedics',
    shift: 'Afternoon (2 PM – 10 PM)',
    experience: '7 years',
    contact: '+91 97654 32104',
    avatar: 'NT',
    color: 'from-cyan-500 to-blue-600',
  },
  {
    name: 'Preethi Das',
    department: 'ICU',
    shift: 'Night (10 PM – 6 AM)',
    experience: '13 years',
    contact: '+91 97654 32105',
    avatar: 'PD',
    color: 'from-violet-500 to-purple-600',
  },
];

const NursesSection = () => {
  return (
    <section id="nurses" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 mesh-bg" />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-600 text-sm font-semibold mb-6">
            <HeartPulse size={14} />
            Nurses
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-slate-800">
            Nursing <span className="text-gradient-warm">Staff</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Dedicated nursing professionals providing round-the-clock patient care.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {nurses.map((nurse, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="glass-card-hover p-6 group"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${nurse.color} flex items-center justify-center shadow-lg shrink-0`}>
                  <span className="text-sm font-bold text-white" style={{color: 'white'}}>{nurse.avatar}</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">{nurse.name}</h3>
                  <p className="text-sm text-slate-500">{nurse.experience} experience</p>
                </div>
              </div>

              <div className="space-y-2 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <Building2 size={14} className="text-slate-400" />
                  <span>{nurse.department}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-slate-400" />
                  <span>{nurse.shift}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={14} className="text-slate-400" />
                  <span>{nurse.contact}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NursesSection;
