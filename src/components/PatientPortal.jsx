import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BedDouble, Stethoscope, FileText, Upload, ArrowLeft, Activity,
  CheckCircle2, IndianRupee, Snowflake, Fan, Users, Clock, Phone,
  AlertCircle, Send, X, Eye
} from 'lucide-react';

// ============ SAMPLE DATA ============

const bedData = [
  { type: 'AC Private Room', category: 'AC', available: 12, total: 30, fee: 4500, features: ['Private bathroom', 'TV', 'AC', 'Wi-Fi', 'Attendant bed'] },
  { type: 'AC Semi-Private', category: 'AC', available: 8, total: 20, fee: 3000, features: ['Shared bathroom', 'TV', 'AC', 'Wi-Fi'] },
  { type: 'AC Deluxe Suite', category: 'AC', available: 3, total: 8, fee: 8000, features: ['Luxury suite', 'TV', 'AC', 'Wi-Fi', 'Sofa', 'Mini fridge'] },
  { type: 'Non-AC General Ward', category: 'Non-AC', available: 25, total: 50, fee: 800, features: ['Shared ward', 'Fan', 'Basic amenities'] },
  { type: 'Non-AC Semi-Private', category: 'Non-AC', available: 15, total: 25, fee: 1500, features: ['Shared bathroom', 'Fan', 'TV'] },
  { type: 'ICU Bed', category: 'AC', available: 4, total: 15, fee: 12000, features: ['24/7 monitoring', 'Ventilator', 'AC', 'Dedicated nurse'] },
  { type: 'Pediatric Ward', category: 'AC', available: 10, total: 20, fee: 3500, features: ['Child-friendly', 'AC', 'TV', 'Play area access'] },
  { type: 'Maternity Ward', category: 'AC', available: 6, total: 15, fee: 5000, features: ['Private', 'AC', 'Newborn cradle', 'Attached bathroom'] },
];

const availableDoctors = [
  { name: 'Dr. Priya Menon', dept: 'Cardiology', specialization: 'Interventional Cardiology', available: true, nextSlot: '10:30 AM', fee: 800, experience: '12 yrs' },
  { name: 'Dr. Anil Kumar', dept: 'Neurology', specialization: 'Neurosurgery', available: true, nextSlot: '11:00 AM', fee: 1000, experience: '15 yrs' },
  { name: 'Dr. Sneha Reddy', dept: 'Pediatrics', specialization: 'Neonatology', available: false, nextSlot: 'Tomorrow 9 AM', fee: 600, experience: '8 yrs' },
  { name: 'Dr. Rajesh Iyer', dept: 'Orthopedics', specialization: 'Joint Replacement', available: true, nextSlot: '2:00 PM', fee: 900, experience: '20 yrs' },
  { name: 'Dr. Fatima Sheikh', dept: 'General Medicine', specialization: 'Internal Medicine', available: true, nextSlot: '12:30 PM', fee: 500, experience: '10 yrs' },
  { name: 'Dr. Vikram Patel', dept: 'Cardiology', specialization: 'Cardiac Electrophysiology', available: false, nextSlot: 'Tomorrow 10 AM', fee: 850, experience: '14 yrs' },
];

const departments = ['Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'General Medicine', 'ICU', 'Maternity', 'ENT'];

// ============ SUB-COMPONENTS ============

const TabButton = ({ active, icon: Icon, label, onClick, color }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-3 px-5 py-3.5 rounded-xl text-left whitespace-nowrap transition-all text-sm font-medium ${
      active
        ? 'bg-white shadow-lg shadow-slate-200/50 text-slate-900 border border-slate-100'
        : 'text-slate-500 hover:bg-white/60 hover:text-slate-700'
    }`}
  >
    <div className={`w-9 h-9 rounded-lg ${color} flex items-center justify-center`}>
      <Icon size={16} style={{ color: 'white' }} />
    </div>
    {label}
  </button>
);

// ============ BED AVAILABILITY TAB ============

const BedAvailability = () => {
  const [filter, setFilter] = useState('All');

  const filtered = filter === 'All' ? bedData : bedData.filter(b => b.category === filter);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-slate-800 mb-1">Bed Availability</h3>
        <p className="text-sm text-slate-500">Real-time bed availability with room types and pricing</p>
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        {['All', 'AC', 'Non-AC'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === f
                ? 'bg-cyan-500 shadow-lg shadow-cyan-500/25' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
            style={filter === f ? { color: 'white' } : {}}
          >
            {f === 'AC' && <Snowflake size={14} className="inline mr-1" />}
            {f === 'Non-AC' && <Fan size={14} className="inline mr-1" />}
            {f}
          </button>
        ))}
      </div>

      {/* Bed Cards */}
      <div className="grid md:grid-cols-2 gap-4">
        {filtered.map((bed, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`bg-white rounded-2xl border p-5 transition-all hover:shadow-md ${
              bed.available === 0 ? 'border-red-200 bg-red-50/30' : 'border-slate-100'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-bold text-slate-800">{bed.type}</h4>
                <div className="flex items-center gap-2 mt-1">
                  {bed.category === 'AC' ? (
                    <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Snowflake size={10} /> AC
                    </span>
                  ) : (
                    <span className="text-xs font-medium text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Fan size={10} /> Non-AC
                    </span>
                  )}
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-slate-800 flex items-center">
                  <IndianRupee size={16} />{bed.fee.toLocaleString()}
                </p>
                <p className="text-[10px] text-slate-400">per day</p>
              </div>
            </div>

            {/* Availability Bar */}
            <div className="mb-3">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className={`font-bold ${bed.available === 0 ? 'text-red-600' : bed.available <= 5 ? 'text-amber-600' : 'text-emerald-600'}`}>
                  {bed.available} available
                </span>
                <span className="text-slate-400">{bed.total} total</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    bed.available === 0 ? 'bg-red-400' : bed.available <= 5 ? 'bg-amber-400' : 'bg-emerald-400'
                  }`}
                  style={{ width: `${(bed.available / bed.total) * 100}%` }}
                />
              </div>
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-1">
              {bed.features.map((f, j) => (
                <span key={j} className="text-[10px] px-2 py-0.5 bg-slate-50 text-slate-500 rounded-full border border-slate-100">
                  {f}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// ============ DOCTOR AVAILABILITY TAB ============

const DoctorAvailability = () => {
  const [deptFilter, setDeptFilter] = useState('All');

  const filtered = deptFilter === 'All' ? availableDoctors : availableDoctors.filter(d => d.dept === deptFilter);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-slate-800 mb-1">Doctor Availability</h3>
        <p className="text-sm text-slate-500">Check doctor schedules and book consultations</p>
      </div>

      {/* Department Filter */}
      <div className="flex gap-2 flex-wrap">
        {['All', ...new Set(availableDoctors.map(d => d.dept))].map(d => (
          <button
            key={d}
            onClick={() => setDeptFilter(d)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              deptFilter === d
                ? 'bg-indigo-500 shadow-lg shadow-indigo-500/25'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
            style={deptFilter === d ? { color: 'white' } : {}}
          >
            {d}
          </button>
        ))}
      </div>

      {/* Doctor Cards */}
      <div className="space-y-3">
        {filtered.map((doc, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white rounded-2xl border border-slate-100 p-5 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold ${
                  doc.available
                    ? 'bg-gradient-to-br from-emerald-500 to-teal-600'
                    : 'bg-gradient-to-br from-slate-400 to-slate-500'
                }`} style={{ color: 'white' }}>
                  {doc.name.split(' ').slice(1).map(n => n[0]).join('')}
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">{doc.name}</h4>
                  <p className="text-xs text-slate-500">{doc.specialization} • {doc.experience}</p>
                  <p className="text-xs text-cyan-600 font-medium">{doc.dept}</p>
                </div>
              </div>

              <div className="text-right space-y-1">
                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                  doc.available
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-slate-100 text-slate-500 border border-slate-200'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${doc.available ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                  {doc.available ? 'Available' : 'Unavailable'}
                </span>
                <p className="text-xs text-slate-500 flex items-center gap-1 justify-end">
                  <Clock size={10} /> {doc.nextSlot}
                </p>
                <p className="text-sm font-bold text-slate-800 flex items-center gap-0.5 justify-end">
                  <IndianRupee size={12} />{doc.fee}
                  <span className="text-[10px] text-slate-400 font-normal ml-1">consultation</span>
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// ============ BOOK ADMISSION TAB ============

const BookAdmission = () => {
  const [form, setForm] = useState({
    name: '', age: '', gender: 'MALE', contact: '', email: '',
    department: 'Cardiology', reason: '', bedType: 'AC Private Room',
    preferredDoctor: '', emergencyContact: '',
  });
  const [file, setFile] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (key, value) => setForm(prev => ({ ...prev, [key]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-16 space-y-4"
      >
        <div className="w-20 h-20 mx-auto bg-emerald-100 rounded-full flex items-center justify-center">
          <CheckCircle2 size={40} className="text-emerald-500" />
        </div>
        <h3 className="text-2xl font-bold text-slate-800">Booking Submitted!</h3>
        <p className="text-slate-500 max-w-md mx-auto">
          Your admission request has been submitted successfully. Our team will review your documents and confirm within 24 hours. You will receive a confirmation on your registered contact.
        </p>
        <div className="bg-cyan-50 border border-cyan-200 rounded-xl p-4 max-w-sm mx-auto">
          <p className="text-sm text-cyan-700 font-medium">Booking Reference</p>
          <p className="text-xl font-bold text-cyan-800 font-mono">CS-{Date.now().toString().slice(-6)}</p>
        </div>
        <button
          onClick={() => setSubmitted(false)}
          className="px-6 py-2.5 bg-slate-100 text-slate-700 rounded-xl font-medium hover:bg-slate-200 transition-colors"
        >
          Book Another
        </button>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-slate-800 mb-1">Book Admission Online</h3>
        <p className="text-sm text-slate-500">Fill in your details to request hospital admission</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Personal Details */}
        <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
          <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Users size={14} className="text-cyan-500" /> Patient Details
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Full Name *</label>
              <input type="text" required value={form.name} onChange={e => handleChange('name', e.target.value)}
                placeholder="Enter full name"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-400" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Age *</label>
              <input type="number" required value={form.age} onChange={e => handleChange('age', e.target.value)}
                placeholder="Age"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-400" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Gender</label>
              <select value={form.gender} onChange={e => handleChange('gender', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-400">
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Contact *</label>
              <input type="tel" required value={form.contact} onChange={e => handleChange('contact', e.target.value)}
                placeholder="+91 XXXXX XXXXX"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-400" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Email</label>
              <input type="email" value={form.email} onChange={e => handleChange('email', e.target.value)}
                placeholder="email@example.com"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-400" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Emergency Contact</label>
              <input type="tel" value={form.emergencyContact} onChange={e => handleChange('emergencyContact', e.target.value)}
                placeholder="+91 XXXXX XXXXX"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-400" />
            </div>
          </div>
        </div>

        {/* Medical Details */}
        <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
          <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Stethoscope size={14} className="text-rose-500" /> Medical Details
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Department *</label>
              <select required value={form.department} onChange={e => handleChange('department', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-400">
                {departments.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Preferred Doctor</label>
              <select value={form.preferredDoctor} onChange={e => handleChange('preferredDoctor', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-400">
                <option value="">Any Available Doctor</option>
                {availableDoctors.filter(d => d.available).map(d => (
                  <option key={d.name} value={d.name}>{d.name} ({d.dept})</option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Reason for Admission *</label>
              <textarea required rows={3} value={form.reason} onChange={e => handleChange('reason', e.target.value)}
                placeholder="Describe your medical condition or reason for admission..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-400 resize-none" />
            </div>
          </div>
        </div>

        {/* Bed Preference */}
        <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
          <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4 flex items-center gap-2">
            <BedDouble size={14} className="text-indigo-500" /> Bed Preference
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Select Room Type *</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {bedData.filter(b => b.available > 0).map(bed => (
                  <button
                    key={bed.type}
                    type="button"
                    onClick={() => handleChange('bedType', bed.type)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      form.bedType === bed.type
                        ? 'border-cyan-400 bg-cyan-50 ring-2 ring-cyan-500/20'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-1 mb-1">
                      {bed.category === 'AC' ? <Snowflake size={10} className="text-blue-500" /> : <Fan size={10} className="text-orange-500" />}
                      <span className="text-[10px] text-slate-400">{bed.category}</span>
                    </div>
                    <p className="text-xs font-bold text-slate-800 leading-tight">{bed.type}</p>
                    <p className="text-xs text-slate-500 flex items-center mt-1">
                      <IndianRupee size={10} />{bed.fee.toLocaleString()}/day
                    </p>
                    <p className={`text-[10px] mt-1 font-medium ${bed.available <= 5 ? 'text-amber-600' : 'text-emerald-600'}`}>
                      {bed.available} available
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Medical Document Upload */}
        <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
          <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4 flex items-center gap-2">
            <FileText size={14} className="text-amber-500" /> Upload Medical Documents
          </h4>
          <p className="text-xs text-slate-500 mb-3">Upload your medical reports, prescriptions, or doctor referral (PDF, JPG, PNG — max 10MB)</p>

          <div className="relative">
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={e => setFile(e.target.files[0])}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className={`border-2 border-dashed rounded-xl p-6 text-center transition-all ${
              file ? 'border-emerald-300 bg-emerald-50' : 'border-slate-200 hover:border-cyan-300 hover:bg-cyan-50/30'
            }`}>
              {file ? (
                <div className="flex items-center justify-center gap-3">
                  <CheckCircle2 size={20} className="text-emerald-500" />
                  <div className="text-left">
                    <p className="text-sm font-medium text-slate-800">{file.name}</p>
                    <p className="text-xs text-slate-400">{(file.size / 1024).toFixed(1)} KB</p>
                  </div>
                  <button type="button" onClick={(e) => { e.stopPropagation(); setFile(null); }}
                    className="ml-2 p-1 rounded-lg hover:bg-red-100 text-red-400 hover:text-red-600 transition-colors">
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div>
                  <Upload size={28} className="mx-auto text-slate-300 mb-2" />
                  <p className="text-sm text-slate-500">Click or drag to upload medical documents</p>
                  <p className="text-xs text-slate-400 mt-1">PDF, JPG, PNG — Max 10MB</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full px-6 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold shadow-lg shadow-cyan-500/25 hover:shadow-xl hover:shadow-cyan-500/40 transition-all flex items-center justify-center gap-2"
          style={{ color: 'white' }}
        >
          <Send size={16} />
          Submit Admission Request
        </button>
      </form>
    </div>
  );
};

// ============ MAIN PORTAL COMPONENT ============

const PatientPortal = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('beds');

  const tabs = [
    { id: 'beds', label: 'Bed Availability', icon: BedDouble, color: 'bg-cyan-500' },
    { id: 'doctors', label: 'Doctors', icon: Stethoscope, color: 'bg-indigo-500' },
    { id: 'book', label: 'Book Admission', icon: FileText, color: 'bg-emerald-500' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-slate-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="p-2 rounded-xl hover:bg-slate-100 transition-colors">
              <ArrowLeft size={20} className="text-slate-600" />
            </button>
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center">
              <Activity className="w-5 h-5" style={{ color: 'white' }} />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900">Patient Portal</h1>
              <p className="text-xs text-slate-400">Online Admission & Availability</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold text-emerald-700">Live Data</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Tabs */}
          <div className="lg:w-56 flex lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0">
            {tabs.map(tab => (
              <TabButton
                key={tab.id}
                active={activeTab === tab.id}
                icon={tab.icon}
                label={tab.label}
                color={tab.color}
                onClick={() => setActiveTab(tab.id)}
              />
            ))}
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6"
            >
              {activeTab === 'beds' && <BedAvailability />}
              {activeTab === 'doctors' && <DoctorAvailability />}
              {activeTab === 'book' && <BookAdmission />}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientPortal;
