import React from 'react';
import { motion } from 'framer-motion';
import { Building, MapPin, Phone, Clock, Wifi, ShieldCheck, Ambulance, FlaskConical, BedDouble, Stethoscope } from 'lucide-react';

const facilities = [
  { icon: BedDouble, label: '500+ Beds', desc: 'Across all departments' },
  { icon: Stethoscope, label: '60+ Doctors', desc: 'Specialists & consultants' },
  { icon: Ambulance, label: '24/7 Emergency', desc: 'Fully equipped ambulances' },
  { icon: FlaskConical, label: 'Advanced Lab', desc: 'In-house diagnostics' },
  { icon: ShieldCheck, label: 'NABH Accredited', desc: 'Quality certified' },
  { icon: Wifi, label: 'Smart Hospital', desc: 'IoT-enabled monitoring' },
];

const departments = [
  'Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics',
  'General Medicine', 'ICU', 'Emergency', 'Radiology',
  'Pathology', 'Pharmacy', 'Physiotherapy', 'ENT',
];

const DetailsSection = () => {
  return (
    <section id="details" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-sm font-semibold mb-6">
            <Building size={14} />
            Hospital Details
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-slate-800">
            Hospital <span className="text-gradient">Details</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Complete information about CareSphere Hospital and its facilities.
          </p>
        </motion.div>

        {/* Hospital Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-8 mb-8 max-w-3xl mx-auto"
        >
          <h3 className="text-2xl font-bold text-slate-800 mb-6">CareSphere Multi-Specialty Hospital</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-sm text-slate-600">
            <div className="flex items-start gap-3">
              <MapPin size={18} className="text-cyan-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-700">Address</p>
                <p>Amritapuri Campus, Clappana P.O., Kollam, Kerala – 690525</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone size={18} className="text-cyan-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-700">Contact</p>
                <p>+91 476 280 1234</p>
                <p>info@caresphere-hospital.com</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock size={18} className="text-cyan-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-700">Operating Hours</p>
                <p>OPD: 8:00 AM – 8:00 PM</p>
                <p>Emergency: 24/7</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Building size={18} className="text-cyan-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-700">Established</p>
                <p>2015 • NABH Accredited</p>
                <p>ISO 9001:2015 Certified</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {facilities.map((facility, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="glass-card-hover p-5 text-center group"
            >
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <facility.icon size={22} className="text-white" style={{color: 'white'}} />
              </div>
              <h4 className="font-bold text-slate-800">{facility.label}</h4>
              <p className="text-xs text-slate-500 mt-1">{facility.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Departments List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-8"
        >
          <h3 className="text-lg font-bold text-slate-800 mb-4">Departments</h3>
          <div className="flex flex-wrap gap-2">
            {departments.map((dept, i) => (
              <span key={i} className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 rounded-full border border-slate-200 hover:bg-cyan-50 hover:border-cyan-200 hover:text-cyan-700 transition-colors cursor-default">
                {dept}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DetailsSection;
