import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: 'What is CareSphere?',
    answer: 'CareSphere is an AI-powered Hospital Resource Management System built on the MERN stack (MongoDB, Express.js, React.js, Node.js). It centralizes patient records, automates workflows, and provides real-time analytics for hospital operations.',
  },
  {
    question: 'How do I register a new patient?',
    answer: 'Navigate to the Patients section or use the App Launcher to access the API Tester. From there, use the "Create" tab to fill in patient details including name, age, department, assigned doctor, and medical history. Click "Send Request" to register.',
  },
  {
    question: 'What departments does the system support?',
    answer: 'CareSphere supports multiple departments including Cardiology, Neurology, Orthopedics, Pediatrics, General Medicine, ICU, Emergency, Radiology, Pathology, Pharmacy, Physiotherapy, and ENT.',
  },
  {
    question: 'How is patient data secured?',
    answer: 'The platform uses JWT (JSON Web Token) based authentication with Role-Based Access Control (RBAC). Different user roles (Admin, Doctor, Nurse, Receptionist) have different levels of data access to ensure security and privacy.',
  },
  {
    question: 'Can I view hospital reports and analytics?',
    answer: 'Yes! The Reports section provides real-time analytics including total patients, bed occupancy rates, department-wise performance metrics, patient flow charts, and critical case monitoring.',
  },
  {
    question: 'How does the AI-based forecasting work?',
    answer: 'CareSphere uses predictive algorithms to forecast bed demand, staff workload, and patient influx based on historical data. This helps hospital administrators plan resources proactively and reduce bottlenecks.',
  },
  {
    question: 'Is the system accessible on mobile devices?',
    answer: 'Yes, CareSphere is fully responsive and works on desktops, tablets, and mobile devices. The interface automatically adapts to different screen sizes for an optimal experience.',
  },
  {
    question: 'Who developed this project?',
    answer: 'CareSphere was developed by Akash B, Charan Jith M.E, and Akash Prasad M — students at Amrita Vishwa Vidyapeetham, as part of the Fullstack Frameworks course (23CSE461) under Professor T Senthil Kumar.',
  },
];

const FAQItem = ({ faq, isOpen, onToggle }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="glass-card-hover overflow-hidden"
  >
    <button
      onClick={onToggle}
      className="w-full px-6 py-5 flex items-center justify-between text-left"
    >
      <span className="font-semibold text-slate-800 pr-4">{faq.question}</span>
      {isOpen ? <ChevronUp size={18} className="text-slate-500 shrink-0" /> : <ChevronDown size={18} className="text-slate-500 shrink-0" />}
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="px-6 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
            {faq.answer}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

const HelpSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="help" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 mesh-bg" />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 text-sm font-semibold mb-6">
            <HelpCircle size={14} />
            Help
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-slate-800">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Find answers to common questions about CareSphere.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HelpSection;
