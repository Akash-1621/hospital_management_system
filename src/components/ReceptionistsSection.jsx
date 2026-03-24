import React from 'react';
import { motion } from 'framer-motion';
import { UserCheck, Phone, Clock, MapPin } from 'lucide-react';

const receptionists = [
  {
    name: 'Meera Krishnan',
    desk: 'Main Lobby – Front Desk',
    shift: 'Morning (8 AM – 4 PM)',
    languages: 'English, Hindi, Malayalam',
    contact: '+91 96543 21000',
    avatar: 'MK',
    color: 'from-teal-500 to-emerald-600',
  },
  {
    name: 'Divya Sharma',
    desk: 'Emergency Reception',
    shift: 'Night (10 PM – 6 AM)',
    languages: 'English, Hindi',
    contact: '+91 96543 21001',
    avatar: 'DS',
    color: 'from-blue-500 to-indigo-600',
  },
  {
    name: 'Pooja Nambiar',
    desk: 'OPD Reception – Block A',
    shift: 'Afternoon (12 PM – 8 PM)',
    languages: 'English, Tamil, Malayalam',
    contact: '+91 96543 21002',
    avatar: 'PN',
    color: 'from-purple-500 to-violet-600',
  },
  {
    name: 'Charanjith',
    desk: 'Lab & Diagnostics Counter',
    shift: 'Morning (8 AM – 4 PM)',
    languages: 'English, Hindi, Kannada',
    contact: '+91 96543 21003',
    avatar: 'CJ',
    color: 'from-orange-500 to-red-600',
  },
];

const ReceptionistsSection = () => {
  return (
    <section id="receptionists" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-600 text-sm font-semibold mb-6">
            <UserCheck size={14} />
            Receptionists
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-slate-800">
            Reception <span className="text-gradient-teal">Desk</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Friendly and efficient reception staff ensuring smooth hospital operations.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {receptionists.map((rec, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card-hover p-6 group"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${rec.color} flex items-center justify-center shadow-lg shrink-0`}>
                  <span className="text-sm font-bold text-white" style={{color: 'white'}}>{rec.avatar}</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">{rec.name}</h3>
                  <p className="text-sm text-slate-500">{rec.languages}</p>
                </div>
              </div>

              <div className="space-y-2 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="text-slate-400" />
                  <span>{rec.desk}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-slate-400" />
                  <span>{rec.shift}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={14} className="text-slate-400" />
                  <span>{rec.contact}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReceptionistsSection;
