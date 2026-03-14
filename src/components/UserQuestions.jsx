import React from 'react';
import { motion } from 'framer-motion';
import {
  HelpCircle,
  BarChart3,
  Brain,
  User,
  Building2,
  Pill,
  Calendar,
  Activity,
  BedDouble,
  Users,
  AlertTriangle,
  CreditCard,
  UserCog,
  Stethoscope,
} from 'lucide-react';

const categories = [
  {
    title: 'Analytical Questions',
    icon: BarChart3,
    color: 'from-cyan-500 to-blue-600',
    borderColor: 'border-cyan-500/20',
    questions: [
      'Which departments handle the highest number of patients?',
      'What types of treatments or services are most frequently requested?',
      'How does patient admission vary by time and season?',
      'Which doctors or units experience the highest workload?',
    ],
  },
  {
    title: 'Predictive Questions',
    icon: Brain,
    color: 'from-indigo-500 to-purple-600',
    borderColor: 'border-indigo-500/20',
    questions: [
      'Will bed occupancy reach full capacity in the next 24–48 hours?',
      'Can patient inflow trends be predicted using historical data?',
      'Are there potential staff shortages in upcoming shifts?',
      'What operational risks may affect hospital efficiency?',
    ],
  },
  {
    title: 'User-Specific Questions',
    icon: User,
    color: 'from-emerald-500 to-teal-600',
    borderColor: 'border-emerald-500/20',
    questions: [
      'Has my appointment been confirmed?',
      'What is the current status of my treatment or discharge?',
      'Who is the assigned doctor for my case?',
      'What is my billing status and pending payment amount?',
    ],
  },
];

const UserQuestions = () => {
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
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-sm font-semibold mb-6">
            <HelpCircle size={14} />
            User Questions Addressed
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Questions <span className="text-gradient-teal">We Answer</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            CareSphere is designed to address three categories of critical healthcare questions.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {categories.map((cat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="glass-card p-7 relative overflow-hidden group"
            >
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${cat.color}`} />

              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <cat.icon size={22} className="text-white" />
              </div>

              <h3 className="text-lg font-bold text-white mb-5">{cat.title}</h3>

              <div className="space-y-3">
                {cat.questions.map((q, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + i * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <div className={`w-5 h-5 shrink-0 rounded-md bg-white/5 ${cat.borderColor} border flex items-center justify-center mt-0.5`}>
                      <span className="text-[9px] font-bold text-slate-500">{i + 1}</span>
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed">{q}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserQuestions;
