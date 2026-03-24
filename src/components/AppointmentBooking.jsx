import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Stethoscope, Calendar, Clock, User, Phone, Mail,
  CheckCircle2, AlertCircle, IndianRupee, FileText, ChevronRight,
  Search, Filter, X, Loader2
} from 'lucide-react';

const API_BASE = 'http://localhost:5000/api';

const departments = ['All', 'Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'General Medicine'];

// ============ STEP INDICATOR ============
const StepIndicator = ({ currentStep }) => {
  const steps = [
    { num: 1, label: 'Select Doctor' },
    { num: 2, label: 'Pick Slot' },
    { num: 3, label: 'Your Details' },
    { num: 4, label: 'Confirm' },
  ];

  return (
    <div className="flex items-center justify-center gap-2 mb-10">
      {steps.map((step, i) => (
        <React.Fragment key={step.num}>
          <div className="flex items-center gap-2">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 ${
                currentStep >= step.num
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30'
                  : 'bg-slate-100 text-slate-400 border border-slate-200'
              }`}
            >
              {currentStep > step.num ? <CheckCircle2 size={16} /> : step.num}
            </div>
            <span className={`text-sm font-medium hidden sm:block ${currentStep >= step.num ? 'text-cyan-700' : 'text-slate-400'}`}>
              {step.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className={`w-8 h-0.5 rounded-full transition-all duration-500 ${currentStep > step.num ? 'bg-cyan-500' : 'bg-slate-200'}`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

// ============ DOCTOR CARD ============
const DoctorCard = ({ doctor, onSelect, selected }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ y: -4 }}
    onClick={() => onSelect(doctor)}
    className={`cursor-pointer p-5 rounded-2xl border-2 transition-all duration-300 ${
      selected?._id === doctor._id
        ? 'border-cyan-500 bg-cyan-50/60 shadow-lg shadow-cyan-500/10'
        : 'border-slate-200/60 bg-white/70 hover:border-cyan-300 hover:bg-white/90 hover:shadow-md'
    }`}
  >
    <div className="flex items-start gap-4">
      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${doctor.color} flex items-center justify-center shadow-lg shrink-0 overflow-hidden`}>
        {(doctor.avatar && (doctor.avatar.startsWith('http') || doctor.avatar.startsWith('data:'))) ? (
          <img src={doctor.avatar} alt={doctor.name} className="w-full h-full object-cover" />
        ) : (
          <span className="text-lg font-bold text-white">{doctor.name?.charAt(0) || '?'}</span>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-slate-800 text-base">{doctor.name}</h3>
        <p className="text-sm text-cyan-600 font-semibold">{doctor.department}</p>
        <p className="text-xs text-slate-500 mt-1">{doctor.specialization} • {doctor.experience}</p>
        <div className="flex items-center gap-1 mt-2">
          <IndianRupee size={14} className="text-emerald-600" />
          <span className="font-bold text-emerald-700 text-sm">₹{doctor.consultationFee}</span>
          <span className="text-xs text-slate-400 ml-1">consultation</span>
        </div>
      </div>
      {selected?._id === doctor._id && (
        <CheckCircle2 size={22} className="text-cyan-500 shrink-0" />
      )}
    </div>
  </motion.div>
);

// ============ TIME SLOT GRID ============
const TimeSlotGrid = ({ slots, selectedSlot, onSelect, loading }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 size={24} className="animate-spin text-cyan-500" />
        <span className="ml-3 text-slate-500">Loading slots...</span>
      </div>
    );
  }

  if (!slots || slots.length === 0) {
    return <p className="text-center text-slate-500 py-8">No slots available. Please select a different date.</p>;
  }

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
      {slots.map((slot) => (
        <motion.button
          key={slot.time}
          whileHover={{ scale: slot.available ? 1.05 : 1 }}
          whileTap={{ scale: slot.available ? 0.95 : 1 }}
          onClick={() => slot.available && onSelect(slot.time)}
          disabled={!slot.available}
          className={`px-3 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
            selectedSlot === slot.time
              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30'
              : slot.available
                ? 'bg-white/80 text-slate-700 border border-slate-200 hover:border-cyan-400 hover:bg-cyan-50/50'
                : 'bg-slate-100 text-slate-300 border border-slate-100 cursor-not-allowed line-through'
          }`}
        >
          <Clock size={12} className="inline mr-1" />
          {slot.time}
          <div className={`text-[10px] mt-1 font-normal ${selectedSlot === slot.time ? 'text-cyan-100' : slot.available ? 'text-slate-400' : 'text-slate-300'}`}>
            {slot.booked}/{slot.max} booked
          </div>
        </motion.button>
      ))}
    </div>
  );
};

// ============ MAIN COMPONENT ============
const AppointmentBooking = ({ onBack }) => {
  const [step, setStep] = useState(1);
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [slots, setSlots] = useState([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [bookedAppointment, setBookedAppointment] = useState(null);
  const [form, setForm] = useState({
    patientName: '',
    patientContact: '',
    patientEmail: '',
    reason: '',
  });

  // Fetch doctors
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch(`${API_BASE}/doctors`);
        const data = await res.json();
        if (data.success) {
          setDoctors(data.data);
          setFilteredDoctors(data.data);
        }
      } catch (e) {
        console.error('Failed to fetch doctors:', e);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  // Filter doctors by department
  useEffect(() => {
    if (selectedDept === 'All') {
      setFilteredDoctors(doctors);
    } else {
      setFilteredDoctors(doctors.filter((d) => d.department === selectedDept));
    }
  }, [selectedDept, doctors]);

  // Fetch available slots when doctor + date selected
  useEffect(() => {
    if (selectedDoctor && selectedDate) {
      const fetchSlots = async () => {
        setSlotsLoading(true);
        try {
          const res = await fetch(`${API_BASE}/appointments/slots/${selectedDoctor._id}?date=${selectedDate}`);
          const data = await res.json();
          if (data.success) {
            setSlots(data.data);
          }
        } catch (e) {
          console.error('Failed to fetch slots:', e);
        } finally {
          setSlotsLoading(false);
        }
      };
      fetchSlots();
    }
  }, [selectedDoctor, selectedDate]);

  const handleSubmit = async () => {
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch(`${API_BASE}/appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          doctorId: selectedDoctor._id,
          appointmentDate: selectedDate,
          timeSlot: selectedSlot,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setBookedAppointment(data.data);
        setSuccess(true);
        setStep(4);
      } else {
        setError(data.message || 'Failed to book appointment');
      }
    } catch (e) {
      setError('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50/30">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ x: -4 }}
              whileTap={{ scale: 0.95 }}
              onClick={onBack}
              className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
            >
              <ArrowLeft size={18} className="text-slate-600" />
            </motion.button>
            <div>
              <h1 className="text-xl font-bold text-slate-800">Book Appointment</h1>
              <p className="text-sm text-slate-500">Schedule a visit with our specialists</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-50 border border-cyan-200">
            <Calendar size={16} className="text-cyan-600" />
            <span className="text-sm font-semibold text-cyan-700">
              {selectedDate ? new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Select Date'}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {!success && <StepIndicator currentStep={step} />}

        <AnimatePresence mode="wait">
          {/* ======= STEP 1: SELECT DOCTOR ======= */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
              {/* Department Filter */}
              <div className="flex flex-wrap gap-2 mb-8 justify-center">
                {departments.map((dept) => (
                  <button
                    key={dept}
                    onClick={() => setSelectedDept(dept)}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                      selectedDept === dept
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/25'
                        : 'bg-white/80 text-slate-600 border border-slate-200 hover:border-cyan-400'
                    }`}
                  >
                    {dept}
                  </button>
                ))}
              </div>

              {loading ? (
                <div className="flex items-center justify-center py-16">
                  <Loader2 size={32} className="animate-spin text-cyan-500" />
                  <span className="ml-4 text-lg text-slate-500">Loading doctors...</span>
                </div>
              ) : filteredDoctors.length === 0 ? (
                <div className="text-center py-12 glass-card p-8">
                  <Stethoscope size={48} className="text-slate-300 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-slate-600">No doctors available</h3>
                  <p className="text-slate-400 mt-2">No doctors found in this department. Please seed the doctors first by running: <code className="bg-slate-100 px-2 py-1 rounded text-sm">node seedDoctors.js</code></p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-4">
                  {filteredDoctors.map((doctor) => (
                    <DoctorCard
                      key={doctor._id}
                      doctor={doctor}
                      onSelect={(d) => {
                        setSelectedDoctor(d);
                        setSelectedSlot('');
                        setSlots([]);
                      }}
                      selected={selectedDoctor}
                    />
                  ))}
                </div>
              )}

              {selectedDoctor && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center mt-8">
                  <button
                    onClick={() => setStep(2)}
                    className="btn-primary flex items-center gap-2 text-base"
                  >
                    Continue with {selectedDoctor.name} <ChevronRight size={18} />
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* ======= STEP 2: PICK DATE & SLOT ======= */}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
              <div className="glass-card p-6 mb-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${selectedDoctor.color} flex items-center justify-center shadow-lg`}>
                    <span className="text-base font-bold" style={{ color: 'white' }}>{selectedDoctor.avatar}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">{selectedDoctor.name}</h3>
                    <p className="text-sm text-cyan-600">{selectedDoctor.department} — {selectedDoctor.specialization}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    <Calendar size={14} className="inline mr-2" />Select Date
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    min={today}
                    onChange={(e) => { setSelectedDate(e.target.value); setSelectedSlot(''); }}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/80 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all text-slate-700"
                  />
                </div>

                {selectedDate && (
                  <div>
                    <h4 className="text-sm font-semibold text-slate-700 mb-3">
                      <Clock size={14} className="inline mr-2" />Available Time Slots
                    </h4>
                    <TimeSlotGrid
                      slots={slots}
                      selectedSlot={selectedSlot}
                      onSelect={setSelectedSlot}
                      loading={slotsLoading}
                    />
                  </div>
                )}
              </div>

              <div className="flex justify-between">
                <button onClick={() => setStep(1)} className="btn-secondary flex items-center gap-2">
                  <ArrowLeft size={16} /> Back
                </button>
                {selectedSlot && (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={() => setStep(3)}
                    className="btn-primary flex items-center gap-2"
                  >
                    Continue <ChevronRight size={18} />
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}

          {/* ======= STEP 3: PATIENT DETAILS ======= */}
          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
              <div className="glass-card p-6 mb-6">
                <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <User size={20} className="text-cyan-600" /> Patient Information
                </h3>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name *</label>
                    <div className="relative">
                      <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        value={form.patientName}
                        onChange={(e) => setForm({ ...form, patientName: e.target.value })}
                        placeholder="Enter patient name"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white/80 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all text-slate-700"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Contact Number *</label>
                    <div className="relative">
                      <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="tel"
                        value={form.patientContact}
                        onChange={(e) => setForm({ ...form, patientContact: e.target.value })}
                        placeholder="+91 XXXXX XXXXX"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white/80 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all text-slate-700"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email</label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="email"
                        value={form.patientEmail}
                        onChange={(e) => setForm({ ...form, patientEmail: e.target.value })}
                        placeholder="patient@email.com"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white/80 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all text-slate-700"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Reason for Visit</label>
                    <div className="relative">
                      <FileText size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        value={form.reason}
                        onChange={(e) => setForm({ ...form, reason: e.target.value })}
                        placeholder="Brief description"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white/80 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all text-slate-700"
                      />
                    </div>
                  </div>
                </div>

                {error && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 p-3 rounded-xl bg-red-50 border border-red-200 flex items-center gap-2 text-red-700 text-sm">
                    <AlertCircle size={16} /> {error}
                  </motion.div>
                )}

                {/* Booking Summary */}
                <div className="mt-6 p-4 rounded-xl bg-slate-50/80 border border-slate-200/60">
                  <h4 className="text-sm font-bold text-slate-700 mb-3">📋 Booking Summary</h4>
                  <div className="grid sm:grid-cols-2 gap-2 text-sm text-slate-600">
                    <p><span className="font-medium">Doctor:</span> {selectedDoctor.name}</p>
                    <p><span className="font-medium">Department:</span> {selectedDoctor.department}</p>
                    <p><span className="font-medium">Date:</span> {new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                    <p><span className="font-medium">Time:</span> {selectedSlot}</p>
                    <p><span className="font-medium">Fee:</span> <span className="font-bold text-emerald-700">₹{selectedDoctor.consultationFee}</span></p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <button onClick={() => setStep(2)} className="btn-secondary flex items-center gap-2">
                  <ArrowLeft size={16} /> Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!form.patientName || !form.patientContact || submitting}
                  className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <><Loader2 size={16} className="animate-spin" /> Booking...</>
                  ) : (
                    <>Confirm Booking <CheckCircle2 size={18} /></>
                  )}
                </button>
              </div>
            </motion.div>
          )}

          {/* ======= STEP 4: SUCCESS ======= */}
          {step === 4 && success && (
            <motion.div key="step4" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
              <div className="glass-card p-10 max-w-lg mx-auto">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
                  className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-emerald-500/30"
                >
                  <CheckCircle2 size={40} style={{ color: 'white' }} />
                </motion.div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Appointment Booked!</h2>
                <p className="text-slate-500 mb-6">Your appointment has been successfully scheduled.</p>

                {bookedAppointment && (
                  <div className="text-left p-5 rounded-xl bg-emerald-50/80 border border-emerald-200/60 mb-6">
                    <div className="space-y-2 text-sm text-slate-700">
                      <p><span className="font-semibold">Doctor:</span> {bookedAppointment.doctorId?.name}</p>
                      <p><span className="font-semibold">Department:</span> {bookedAppointment.department}</p>
                      <p><span className="font-semibold">Date:</span> {new Date(bookedAppointment.appointmentDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                      <p><span className="font-semibold">Time:</span> {bookedAppointment.timeSlot}</p>
                      <p><span className="font-semibold">Patient:</span> {bookedAppointment.patientName}</p>
                      <p><span className="font-semibold">Status:</span>{' '}
                        <span className="px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-800 text-xs font-bold">{bookedAppointment.status}</span>
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex gap-3 justify-center">
                  <button
                    onClick={() => {
                      setStep(1);
                      setSuccess(false);
                      setSelectedDoctor(null);
                      setSelectedDate('');
                      setSelectedSlot('');
                      setForm({ patientName: '', patientContact: '', patientEmail: '', reason: '' });
                      setBookedAppointment(null);
                    }}
                    className="btn-primary"
                  >
                    Book Another
                  </button>
                  <button onClick={onBack} className="btn-secondary">
                    Back to Home
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AppointmentBooking;
