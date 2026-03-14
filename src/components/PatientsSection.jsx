import React from 'react';
import { motion } from 'framer-motion';
import { Users, Activity, Clock, AlertCircle } from 'lucide-react';

const patients = [
  {
    name: 'Rahul Sharma',
    age: 35,
    gender: 'Male',
    department: 'Cardiology',
    status: 'Admitted',
    assignedDoctor: 'Dr. Priya Menon',
    admitDate: '2026-02-28',
    condition: 'Hypertension, mild arrhythmia',
  },
  {
    name: 'Ananya Nair',
    age: 28,
    gender: 'Female',
    department: 'Neurology',
    status: 'Under Treatment',
    assignedDoctor: 'Dr. Anil Kumar',
    admitDate: '2026-03-01',
    condition: 'Chronic migraine',
  },
  {
    name: 'Mohammed Faiz',
    age: 45,
    gender: 'Male',
    department: 'Orthopedics',
    status: 'Critical',
    assignedDoctor: 'Dr. Rajesh Iyer',
    admitDate: '2026-02-25',
    condition: 'Fractured femur, post-surgery recovery',
  },
  {
    name: 'Lakshmi Devi',
    age: 62,
    gender: 'Female',
    department: 'General Medicine',
    status: 'Admitted',
    assignedDoctor: 'Dr. Fatima Sheikh',
    admitDate: '2026-03-02',
    condition: 'Diabetes management, fever',
  },
  {
    name: 'Arjun Krishnan',
    age: 5,
    gender: 'Male',
    department: 'Pediatrics',
    status: 'Discharged',
    assignedDoctor: 'Dr. Sneha Reddy',
    admitDate: '2026-02-20',
    condition: 'Respiratory infection (recovered)',
  },
  {
    name: 'Deepa Suresh',
    age: 40,
    gender: 'Female',
    department: 'Cardiology',
    status: 'Under Treatment',
    assignedDoctor: 'Dr. Vikram Patel',
    admitDate: '2026-03-03',
    condition: 'Atrial fibrillation',
  },
];

const statusColors = {
  'Admitted': 'bg-blue-100 text-blue-700 border-blue-200',
  'Under Treatment': 'bg-amber-100 text-amber-700 border-amber-200',
  'Critical': 'bg-red-100 text-red-700 border-red-200',
  'Discharged': 'bg-emerald-100 text-emerald-700 border-emerald-200',
};

const PatientsSection = () => {
  return (
    <section id="patients" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 text-sm font-semibold mb-6">
            <Users size={14} />
            Patients
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-slate-800">
            Patient <span className="text-gradient">Records</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Comprehensive view of all patient records with real-time status tracking.
          </p>
        </motion.div>

        {/* Patient Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Patient</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Department</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Doctor</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Condition</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-slate-800">{patient.name}</p>
                        <p className="text-xs text-slate-500">{patient.age} yrs, {patient.gender} • Admitted: {patient.admitDate}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{patient.department}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{patient.assignedDoctor}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${statusColors[patient.status]}`}>
                        {patient.status === 'Critical' && <AlertCircle size={12} />}
                        {patient.status === 'Under Treatment' && <Activity size={12} />}
                        {patient.status === 'Discharged' && <Clock size={12} />}
                        {patient.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 max-w-[200px] truncate">{patient.condition}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PatientsSection;
