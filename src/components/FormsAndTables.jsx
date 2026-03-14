import React from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  ArrowRightLeft,
  Database,
  Table2,
  User,
  Stethoscope,
  Users,
  Building2,
  BedDouble,
  DoorOpen,
  Pill,
  ShieldCheck,
  CalendarPlus,
  ClipboardPlus,
  LogOut,
  CreditCard,
  Wallet,
  FileHeart,
  FlaskConical,
  ArrowRight,
  UserCog,
} from 'lucide-react';

const masterForms = [
  'Patient Master', 'Doctor Master', 'Staff Master', 'Department Master',
  'Bed Master', 'Room/ICU Master', 'Treatment Type Master', 'User Role Master (RBAC)',
];

const transactionForms = [
  'Appointment Booking', 'Patient Admission', 'Discharge Entry', 'Billing Entry',
  'Payment Entry', 'Prescription Entry', 'Lab Report Entry', 'Bed Allocation Entry', 'Shift Allocation Entry',
];

const masterTables = [
  { name: 'patients', icon: User },
  { name: 'doctors', icon: Stethoscope },
  { name: 'staff', icon: Users },
  { name: 'departments', icon: Building2 },
  { name: 'beds', icon: BedDouble },
  { name: 'rooms', icon: DoorOpen },
  { name: 'treatmentTypes', icon: Pill },
  { name: 'users', icon: ShieldCheck },
];

const transactionTables = [
  { name: 'appointments', icon: CalendarPlus },
  { name: 'admissions', icon: ClipboardPlus },
  { name: 'discharges', icon: LogOut },
  { name: 'bills', icon: CreditCard },
  { name: 'payments', icon: Wallet },
  { name: 'prescriptions', icon: FileHeart },
  { name: 'labReports', icon: FlaskConical },
  { name: 'bedAllocations', icon: BedDouble },
  { name: 'shifts', icon: UserCog },
];

const FormsAndTables = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 mesh-bg" />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-semibold mb-6">
            <Table2 size={14} />
            Forms & Database
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Forms, Tables & <span className="text-gradient-warm">Collections</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            8 Master Forms, 9 Transaction Forms, and 17 MongoDB Collections powering CareSphere.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-10">
          {/* Master Forms */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-7 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-orange-500" />
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                <FileText size={18} className="text-white" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Master Forms</h3>
                <span className="text-xs text-amber-400 font-semibold">8 forms · Static/Administrative Data</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {masterForms.map((form, i) => (
                <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/3 hover:bg-white/5 transition-colors">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400/50" />
                  <span className="text-xs text-slate-400">{form}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Transaction Forms */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-7 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-blue-500" />
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <ArrowRightLeft size={18} className="text-white" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Transaction Forms</h3>
                <span className="text-xs text-cyan-400 font-semibold">9 forms · Daily Operations</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {transactionForms.map((form, i) => (
                <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/3 hover:bg-white/5 transition-colors">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400/50" />
                  <span className="text-xs text-slate-400">{form}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* MongoDB Collections */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Master Tables */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-7 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-green-500" />
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                <Database size={18} className="text-white" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Master Tables</h3>
                <span className="text-xs text-emerald-400 font-semibold">8 MongoDB Collections</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {masterTables.map((table, i) => (
                <div key={i} className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg bg-white/3 hover:bg-white/5 transition-colors group">
                  <table.icon size={14} className="text-emerald-400/60 group-hover:text-emerald-400 transition-colors shrink-0" />
                  <code className="text-xs text-slate-400 font-mono">{table.name}</code>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Transaction Tables */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass-card p-7 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500" />
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <ArrowRightLeft size={18} className="text-white" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Transaction Tables</h3>
                <span className="text-xs text-indigo-400 font-semibold">9 MongoDB Collections</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {transactionTables.map((table, i) => (
                <div key={i} className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg bg-white/3 hover:bg-white/5 transition-colors group">
                  <table.icon size={14} className="text-indigo-400/60 group-hover:text-indigo-400 transition-colors shrink-0" />
                  <code className="text-xs text-slate-400 font-mono">{table.name}</code>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FormsAndTables;
