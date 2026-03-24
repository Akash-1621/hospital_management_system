import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, Clock, User, CheckCircle2, XCircle, AlertTriangle, TrendingUp, 
  Activity, BedDouble, Mail, Hash, Phone, Briefcase, X, LogOut, Home, 
  ShieldCheck, Users, Hospital, CreditCard, Heart, Search, ArrowLeft 
} from 'lucide-react';
import AppointmentBooking from '../components/AppointmentBooking';
import PatientPortal from '../components/PatientPortal';
import PatientPrediction from '../components/PatientPrediction';
import regression from 'regression';
import UserProfile from '../components/UserProfile';
import PatientsSection from '../components/PatientsSection';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip } from 'recharts';

const DetailsModal = ({ isOpen, onClose, data, type }) => {
  if (!isOpen || !data) return null;

  const ModalRow = ({ label, value, icon: Icon }) => (
    <div className="flex flex-col sm:flex-row sm:items-center py-3 border-b border-slate-50 last:border-0 group">
      <div className="sm:w-1/3 flex items-center gap-2.5 text-slate-400 group-hover:text-slate-600 transition-colors">
        <Icon size={14} />
        <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
      </div>
      <div className="sm:w-2/3 mt-0.5 sm:mt-0">
        <span className="font-bold text-slate-700 text-sm">{value || 'N/A'}</span>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
      <motion.div initial={{ opacity: 0, scale: 0.98, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98, y: 10 }} className="bg-white rounded-[2rem] p-8 w-full max-w-md shadow-2xl relative border border-slate-100">
        <button onClick={onClose} className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-900 transition-colors">
          <X size={20} />
        </button>
        
        <div className="flex items-center gap-6 mb-8">
          <div className={`w-20 h-20 rounded-2xl flex items-center justify-center font-black text-2xl text-white shadow-lg overflow-hidden ${type === 'doctor' ? 'bg-slate-900 border-4 border-slate-100' : 'bg-blue-600'}`}>
             {((data.avatar || data.photo) && ((data.avatar || data.photo).startsWith('http') || (data.avatar || data.photo).startsWith('data:'))) ? (
               <img src={data.avatar || data.photo} alt={data.name} className="w-full h-full object-cover" />
             ) : (
               <span>{data.name.charAt(0)}</span>
             )}
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900 leading-tight">{data.name}</h2>
            <div className="flex items-center gap-2 mt-1">
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{type} Record</span>
               <span className="w-1 h-1 rounded-full bg-slate-300" />
               <span className={`text-[10px] font-black uppercase tracking-widest ${data.isAvailable !== false ? 'text-emerald-500' : 'text-slate-400'}`}>
                 {data.isAvailable !== false ? 'Active' : 'Inactive'}
               </span>
            </div>
          </div>
        </div>

        <div className="space-y-1 py-4 border-t border-slate-100">
          {type === 'doctor' ? (
            <>
              <ModalRow icon={Briefcase} label="Department" value={data.department} />
              <ModalRow icon={CheckCircle2} label="Availability" value={data.isAvailable ? 'Available Now' : 'Currently Away'} />
              {data.unavailabilityReason && <ModalRow icon={AlertTriangle} label="Notice" value={data.unavailabilityReason} />}
              <ModalRow icon={Mail} label="Professional Email" value={data.email || 'records@caresphere.com'} />
            </>
          ) : (
            <>
              <ModalRow icon={Hash} label="Record ID" value={data._id} />
              <ModalRow icon={Phone} label="Primary Contact" value={data.contact} />
              <ModalRow icon={Calendar} label="Demographics" value={`${data.age} Yrs / ${data.gender}`} />
              <ModalRow icon={AlertTriangle} label="Medical Note" value={data.medicalHistory || 'No history recorded'} />
            </>
          )}
        </div>

        <button onClick={onClose} className="w-full mt-6 py-3.5 bg-slate-50 text-slate-900 font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl border border-slate-200 hover:bg-slate-100 transition-all">
          Close Record
        </button>
      </motion.div>
    </div>
  );
};

export const DoctorDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [doctorProfile, setDoctorProfile] = useState(null);
  const [isAvailable, setIsAvailable] = useState(true);
  const [unavailabilityReason, setUnavailabilityReason] = useState('');
  const [updatingAvailability, setUpdatingAvailability] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [editingReason, setEditingReason] = useState(false);
  const [showPrediction, setShowPrediction] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/appointments`);
        const data = await res.json();
        const docRes = await fetch(`http://localhost:5000/api/doctors`);
        const docData = await docRes.json();
        
        if (docData.success && docData.data.length > 0) {
          const myDoc = docData.data.find(d => d.name === user?.name) || docData.data[0];
          if (myDoc) {
            setDoctorProfile(myDoc);
            setIsAvailable(myDoc.isAvailable);
            setUnavailabilityReason(myDoc.unavailabilityReason || '');
            
            if (data.success) {
              const myAppointments = data.data.filter(apt => {
                const docId = apt.doctorId?._id || apt.doctorId;
                return docId === myDoc._id || apt.doctorId?.name === myDoc.name;
              });
              
              myAppointments.sort((a, b) => new Date(b.appointmentDate) - new Date(a.appointmentDate));
              setAppointments(myAppointments);
            }
          }
        }
      } catch (err) {
        console.error("Failed to fetch data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, [user]);

  const todaysCount = appointments.filter(apt => {
    const aptDate = new Date(apt.appointmentDate).toDateString();
    const today = new Date().toDateString();
    return aptDate === today;
  }).length;

  const handleUpdateAvailability = async () => {
    if (!doctorProfile) return;
    setUpdatingAvailability(true);
    try {
      const res = await fetch(`http://localhost:5000/api/doctors/${doctorProfile._id}/availability`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isAvailable, unavailabilityReason })
      });
      const data = await res.json();
      if (data.success) {
        setDoctorProfile(data.data);
        setShowSuccess(true);
        setEditingReason(false);
        setTimeout(() => setShowSuccess(false), 3000);
      }
    } catch (err) {
      console.error("Failed to update availability", err);
    } finally {
      setUpdatingAvailability(false);
    }
  }

  if (showPrediction) {
    return <PatientPrediction onBack={() => setShowPrediction(false)} />;
  }

  if (showProfile) {
    return <UserProfile user={{...user, ...doctorProfile}} onBack={() => setShowProfile(false)} />;
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-8 pt-24 md:pt-32 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-100/50 rounded-full blur-3xl -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl -ml-48 -mb-48" />

      <motion.div initial={{opacity:0, y:-20}} animate={{opacity:1, y:0}} className="max-w-6xl mx-auto mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="relative">
          <div className="flex items-center gap-3 mb-3">
             <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl shadow-lg shadow-cyan-500/20">
                <Activity size={24} className="text-white" />
             </div>
             <span className="text-sm font-black tracking-widest text-cyan-600 uppercase">Medical Dashboard</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            Doctor <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">Portal</span>
          </h1>
          <p className="text-slate-500 text-lg mt-2 font-medium">
            Welcome back, {user?.name}. Today is <span className="text-slate-900 font-bold">{new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>.
          </p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <button onClick={() => window.location.href = '/'} className="group flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-2xl shadow-sm hover:shadow-md hover:border-blue-200 transition-all">
             <Home size={18} className="text-blue-500 group-hover:scale-110 transition-transform" /> Visit Home
          </button>
          <button onClick={() => setShowProfile(true)} className="group flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-2xl shadow-sm hover:shadow-md hover:border-cyan-200 transition-all">
             <User size={18} className="text-cyan-500 group-hover:scale-110 transition-transform" /> My Profile
          </button>
          <button onClick={() => { logout(); window.location.href = '/login'; }} className="group flex items-center gap-2 px-6 py-3 bg-rose-50 border border-rose-100 text-rose-600 font-bold rounded-2xl shadow-sm hover:shadow-md hover:bg-rose-100 transition-all">
             <LogOut size={18} className="group-hover:translate-x-1 transition-transform" /> Logout
          </button>
        </div>
      </motion.div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="relative group overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-[2rem] shadow-xl shadow-cyan-500/20 group-hover:scale-[1.02] transition-transform duration-500" />
             <div className="relative p-8 text-white">
                <div className="flex justify-between items-start mb-6">
                   <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                      <Calendar size={24} />
                   </div>
                   <div className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider">Today</div>
                </div>
                <h3 className="text-white/80 font-bold text-lg mb-1">Total Appointments</h3>
                <div className="flex items-baseline gap-2">
                   <span className="text-6xl font-black">{todaysCount}</span>
                   <span className="text-cyan-100 font-medium">scheduled</span>
                </div>
                <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                   <div className="text-sm font-medium text-cyan-100 flex items-center gap-2">
                      <CheckCircle2 size={16} /> All requests received
                   </div>
                </div>
             </div>
          </div>

          <button onClick={() => setShowPrediction(true)} className="relative group p-8 rounded-[2rem] bg-indigo-900 border border-indigo-700/50 shadow-xl shadow-indigo-500/10 overflow-hidden text-left hover:-translate-y-1 transition-all">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl -tr-16 -mt-16" />
            <div className="relative z-10">
               <div className="w-12 h-12 rounded-2xl bg-indigo-500/30 flex items-center justify-center text-indigo-300 mb-6">
                  <TrendingUp size={24} />
               </div>
               <h3 className="text-white font-black text-xl mb-2">Patient Traffic Prediction</h3>
               <p className="text-indigo-200 text-sm leading-relaxed mb-4">View upcoming patient volume trends and optimize your schedule.</p>
               <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm group-hover:gap-4 transition-all uppercase tracking-widest">
                  View Analytics <ArrowLeft size={16} className="rotate-180" />
               </div>
            </div>
          </button>

          <div className="p-8 rounded-[2rem] bg-white border border-slate-200 shadow-xl shadow-slate-200/50">
             <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                   <div className={`w-3 h-3 rounded-full animate-pulse ${isAvailable ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                   <h3 className="font-black text-slate-800 tracking-tight">MY AVAILABILITY</h3>
                </div>
                <button onClick={() => { setIsAvailable(!isAvailable); setEditingReason(true); }} className={`w-14 h-7 rounded-full transition-all relative ${isAvailable ? 'bg-emerald-500 shadow-lg shadow-emerald-500/20' : 'bg-slate-200'}`}>
                   <div className={`w-5 h-5 rounded-full bg-white absolute top-1 transition-all ${isAvailable ? 'left-8' : 'left-1'} shadow-sm`} />
                </button>
             </div>
             <div className="space-y-4">
                <div className={`p-4 rounded-2xl border transition-all ${isAvailable ? 'bg-emerald-50 border-emerald-100' : 'bg-slate-50 border-slate-100'}`}>
                   <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Current Status</p>
                   <p className={`text-lg font-black ${isAvailable ? 'text-emerald-700' : 'text-slate-500'}`}>{isAvailable ? 'ACTIVE ON DUTY' : 'OUT OF OFFICE'}</p>
                </div>
                <AnimatePresence>
                  {!isAvailable && editingReason && (
                    <motion.div initial={{opacity:0, height:0}} animate={{opacity:1, height:'auto'}} className="space-y-4">
                      <input type="text" value={unavailabilityReason} onChange={(e) => setUnavailabilityReason(e.target.value)} placeholder="e.g. In Surgery, On Leave" className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-cyan-500 focus:bg-white transition-all font-medium" />
                    </motion.div>
                  )}
                </AnimatePresence>
                {!isAvailable && !editingReason && (
                   <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center justify-between">
                     <p className="text-slate-700 font-bold truncate pr-4">{doctorProfile?.unavailabilityReason || 'No reason specified'}</p>
                     <button onClick={() => setEditingReason(true)} className="text-xs font-black text-rose-600 uppercase tracking-widest hover:text-rose-800">Edit</button>
                   </div>
                )}
                {(isAvailable || editingReason) && (
                   <div className="pt-2">
                     <button onClick={handleUpdateAvailability} disabled={updatingAvailability || (!isAvailable && !unavailabilityReason.trim())} className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-800 shadow-xl shadow-slate-900/10 transition-all disabled:opacity-50">
                       {updatingAvailability ? 'SYNCHRONIZING...' : 'SAVE CHANGES'}
                     </button>
                     {showSuccess && <p className="text-center text-emerald-600 font-bold text-xs mt-3 animate-bounce">Settings Updated Successfully!</p>}
                   </div>
                )}
             </div>
          </div>
        </div>

        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="p-8 bg-white rounded-[2rem] border border-slate-200 shadow-xl shadow-slate-200/50">
             <div className="flex items-center justify-between mb-8 text-slate-900 font-black">
                <h2 className="text-2xl tracking-tight">Recent Appointments</h2>
                <div className="p-2 bg-slate-100 rounded-xl"><Users size={20} className="text-slate-400" /></div>
             </div>
             {loading ? (
                <div className="py-20 flex flex-col items-center justify-center">
                   <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-4" />
                   <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Accessing Medical Records...</p>
                </div>
             ) : appointments.length > 0 ? (
                <div className="overflow-x-auto">
                   <table className="w-full border-separate border-spacing-y-4">
                      <thead>
                         <tr className="text-left text-xs font-black text-slate-400 uppercase tracking-[0.2em]">
                            <th className="pb-2 px-4">PATIENT</th><th className="pb-2 px-4">SCHEDULE</th><th className="pb-2 px-4">REASON</th><th className="pb-2 px-4">STATUS</th>
                         </tr>
                      </thead>
                      <tbody>
                         {appointments.map(apt => (
                            <tr key={apt._id} className="group transition-all hover:-translate-y-1">
                               <td className="bg-slate-50/50 group-hover:bg-cyan-50 border-y border-l border-slate-100 group-hover:border-cyan-100 p-4 rounded-l-2xl transition-colors">
                                  <div className="flex items-center gap-4">
                                     <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-cyan-600 font-black text-lg border border-slate-100">{apt.patientName.charAt(0)}</div>
                                     <div><p className="font-black text-slate-800">{apt.patientName}</p><p className="text-xs text-slate-500 font-bold">{apt.patientContact}</p></div>
                                  </div>
                               </td>
                               <td className="bg-slate-50/50 border-y p-4"><span className="text-sm font-black text-slate-700">{new Date(apt.appointmentDate).toDateString()}</span><br/><span className="text-[10px] uppercase font-black text-cyan-500">{apt.timeSlot}</span></td>
                               <td className="bg-slate-50/50 border-y p-4 text-sm font-bold text-slate-600 italic">"{apt.reason}"</td>
                               <td className="bg-slate-50/50 border-y border-r p-4 rounded-r-2xl"><div className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest ${apt.status === 'SCHEDULED' ? 'bg-blue-600 text-white' : 'bg-emerald-500 text-white'}`}>{apt.status}</div></td>
                            </tr>
                         ))}
                      </tbody>
                   </table>
                </div>
             ) : (
                <div className="py-20 text-center bg-slate-50 rounded-[2rem] border border-dashed border-slate-300"><h3 className="font-bold text-slate-500">No Appointments Found</h3></div>
             )}
          </div>
          <div className="p-8 bg-white rounded-[2rem] border border-slate-200 shadow-xl shadow-slate-200/50">
             <h2 className="text-2xl font-black text-slate-800 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-600 mb-8">Patient Directory</h2>
             <PatientsSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export const PatientDashboard = () => {
    const { user, logout } = useContext(AuthContext);
    const [showAppointmentBooking, setShowAppointmentBooking] = useState(false);
    const [showPatientPortal, setShowPatientPortal] = useState(false);
    const [showPrediction, setShowPrediction] = useState(false);
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [showProfile, setShowProfile] = useState(false);
    const [patientProfile, setPatientProfile] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/doctors`);
                const data = await res.json();
                if (data.success) setDoctors(data.data);
                const resPat = await fetch(`http://localhost:5000/api/patients`);
                const dataPat = await resPat.json();
                if (dataPat.success) {
                  const myPat = dataPat.data.find(p => p.email === user?.email);
                  if (myPat) setPatientProfile(myPat);
                }
            } catch (err) { console.error(err); }
        };
        fetchData();
    }, [user]);

    if (showAppointmentBooking) return <AppointmentBooking onBack={() => setShowAppointmentBooking(false)} />;
    if (showPatientPortal) return <PatientPortal onBack={() => setShowPatientPortal(false)} />;
    if (showPrediction) return <PatientPrediction onBack={() => setShowPrediction(false)} />;
    if (showProfile) return <UserProfile user={{...user, ...patientProfile}} onBack={() => setShowProfile(false)} />;

    return (
      <div className="min-h-screen bg-[#f8fafc] p-4 md:p-8 pt-24 md:pt-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-100/40 rounded-full blur-3xl -ml-48 -mb-48" />
        <DetailsModal isOpen={!!selectedDoctor} onClose={() => setSelectedDoctor(null)} data={selectedDoctor} type="doctor" />
        
        <motion.div initial={{opacity:0, y:-20}} animate={{opacity:1, y:0}} className="max-w-6xl mx-auto mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
               <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-lg shadow-emerald-500/20"><Heart size={24} className="text-white" /></div>
               <span className="text-sm font-black tracking-widest text-emerald-600 uppercase">Health Portal</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Patient <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">Dashboard</span></h1>
            <p className="text-slate-500 text-lg mt-2 font-medium">Welcome back, {user?.name}. Your wellness journey continues <span className="text-emerald-600 font-bold">today</span>.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button onClick={() => window.location.href = '/'} className="px-6 py-3 bg-white border rounded-2xl font-bold flex items-center gap-2 shadow-sm hover:shadow-md transition-all"><Home size={18} className="text-emerald-500" /> Visit Home</button>
            <button onClick={() => setShowProfile(true)} className="px-6 py-3 bg-white border rounded-2xl font-bold flex items-center gap-2 shadow-sm hover:shadow-md transition-all"><User size={18} className="text-teal-500" /> My Profile</button>
            <button onClick={() => { logout(); window.location.href = '/login'; }} className="px-6 py-3 bg-rose-50 border border-rose-100 text-rose-600 font-bold rounded-2xl shadow-sm hover:shadow-md transition-all flex items-center gap-2"><LogOut size={18} /> Logout</button>
          </div>
        </motion.div>

        <div className="max-w-6xl mx-auto space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'Book Appointment', desc: 'Schedule a visit with our specialists.', icon: Calendar, color: 'from-cyan-600 to-blue-700', action: () => setShowAppointmentBooking(true) },
                { label: 'Hospital Portal', desc: 'View real-time bed & admission status.', icon: Hospital, color: 'from-emerald-600 to-teal-700', action: () => setShowPatientPortal(true) },
                { label: 'Traffic Predictor', desc: 'Plan your visit around peak trends.', icon: TrendingUp, color: 'bg-[#1e293b]', action: () => setShowPrediction(true), text: 'text-indigo-400' }
              ].map((item, i) => (
                <button key={i} onClick={item.action} className={`group relative p-8 rounded-[2rem] bg-gradient-to-br ${item.color} overflow-hidden text-left shadow-xl hover:-translate-y-1 transition-all ${item.color === 'bg-[#1e293b]' ? 'border border-slate-700' : ''}`}>
                    <div className="relative z-10 text-white">
                      <div className={`w-14 h-14 rounded-2xl ${item.color === 'bg-[#1e293b]' ? 'bg-indigo-500/20 ' + item.text : 'bg-white/20'} flex items-center justify-center mb-6`}><item.icon size={28} /></div>
                      <h3 className="font-black text-2xl mb-2">{item.label}</h3>
                      <p className={`text-sm mb-6 ${item.color.includes('emerald') ? 'text-emerald-100' : item.color.includes('cyan') ? 'text-cyan-100' : 'text-slate-400'}`}>{item.desc}</p>
                      <div className={`flex items-center gap-2 font-black text-xs uppercase tracking-widest group-hover:gap-4 transition-all ${item.text || ''}`}>Open <ArrowLeft size={16} className="rotate-180" /></div>
                    </div>
                </button>
              ))}
          </div>

          <div className="p-8 bg-white rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/50">
              <div className="flex items-center gap-3 mb-8"><div className="p-2 bg-emerald-50 rounded-xl"><Search size={22} className="text-emerald-600" /></div><h2 className="text-2xl font-black text-slate-800 tracking-tight">Specialists Directory</h2></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                 {doctors.map(doc => (
                    <div key={doc._id} onClick={() => setSelectedDoctor(doc)} className="group bg-slate-50 border border-slate-100 hover:border-emerald-200 p-6 rounded-3xl cursor-pointer transition-all flex flex-col items-center text-center">
                        <div className="w-20 h-20 rounded-2xl bg-white shadow-sm flex items-center justify-center overflow-hidden mb-4">
                           {(doc.avatar && doc.avatar.startsWith('http')) ? <img src={doc.avatar} className="w-full h-full object-cover" /> : <span className="text-3xl font-black text-emerald-600">{doc.name.charAt(0)}</span>}
                        </div>
                        <h4 className="font-black text-slate-900 group-hover:text-emerald-900">{doc.name}</h4>
                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest mt-1 mb-3">{doc.department}</p>
                        <div className="px-3 py-1 bg-white border rounded-full text-[10px] font-black uppercase text-slate-600 tracking-widest">{doc.specialization || 'Consultant'}</div>
                    </div>
                 ))}
              </div>
          </div>
        </div>
      </div>
    );
  };

export const ReceptionistDashboard = () => {
    const { user, logout } = useContext(AuthContext);
    const [appointments, setAppointments] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showPrediction, setShowPrediction] = useState(false);
    const [inventoryData, setInventoryData] = useState([]);
    const [selectedEntity, setSelectedEntity] = useState(null);
    const [patientsMap, setPatientsMap] = useState({});
    const [showProfile, setShowProfile] = useState(false);
    const [stats, setStats] = useState({ newRegistrations: '...', bedOccupancy: '...', pendingBills: '...' });

    useEffect(() => {
      const fetchData = async () => {
        try {
          const [resApt, resDoc, resStats, resPat] = await Promise.all([
            fetch(`http://localhost:5000/api/appointments`),
            fetch(`http://localhost:5000/api/doctors`),
            fetch(`http://localhost:5000/api/stats`),
            fetch(`http://localhost:5000/api/patients`)
          ]);
          const dataApt = await resApt.json();
          const dataDoc = await resDoc.json();
          const dataStats = await resStats.json();
          const dataPat = await resPat.json();
          
          if (dataStats.success) setStats(dataStats.data);
          if (dataDoc.success) setDoctors(dataDoc.data);
          if (dataPat.success) {
             const pMap = {};
             dataPat.data.forEach(p => pMap[p._id] = p);
             setPatientsMap(pMap);
          }
          if (dataApt.success) {
            setAppointments(dataApt.data.slice(0, 5).map(apt => ({ ...apt, noShowRisk: calculateNoShowRisk(apt) }))); 
          }
          generateInventoryForecast();
        } catch (err) { console.error(err); } finally { setLoading(false); }
      };
      fetchData();
    }, []);

    const calculateNoShowRisk = (apt) => {
      let risk = 0;
      const lead = Math.floor((new Date(apt.appointmentDate) - new Date()) / (1000*60*60*24));
      if (lead > 14) risk += 3; else if (lead > 7) risk += 2;
      return risk >= 3 ? 'High' : risk >= 1 ? 'Medium' : 'Low';
    };

    const admittedPatients = Object.values(patientsMap).slice(0, 4).map(p => ({
      id: p._id, name: p.name, age: p.age || 45, condition: p.medicalHistory || 'Observation', admittedDate: new Date(Date.now() - 3*24*60*60*1000)
    }));

    const calculateLoSPrediction = (patient) => {
       const base = patient.age > 60 ? 7 : 4;
       const progress = 65;
       return { predictedStay: base, daysRemaining: Math.ceil(base * (1 - progress/100)), progressPercent: progress };
    };

    const generateInventoryForecast = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/forecast');
        const data = await res.json();
        if (data.success) setInventoryData(data.data);
      } catch (err) { console.error(err); }
    };

    if (showPrediction) return <PatientPrediction onBack={() => setShowPrediction(false)} />;
    if (showProfile) return <UserProfile user={user} onBack={() => setShowProfile(false)} />;

    return (
      <div className="min-h-screen bg-[#f8fafc] p-4 md:p-8 pt-24 md:pt-32 relative overflow-hidden text-slate-900">
        <DetailsModal isOpen={!!selectedEntity} onClose={() => setSelectedEntity(null)} data={selectedEntity?.data} type={selectedEntity?.type} />
        
        <motion.div initial={{opacity:0, y:-20}} animate={{opacity:1, y:0}} className="max-w-7xl mx-auto mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-3 mb-3">
               <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl shadow-lg shadow-purple-500/20"><ShieldCheck size={24} className="text-white" /></div>
               <span className="text-sm font-black tracking-widest text-purple-600 uppercase">Hospital Admin</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Receptionist <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Desk</span></h1>
            <p className="text-slate-500 text-lg mt-2 font-medium">Monitoring {user?.name}'s desk operations.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button onClick={() => window.location.href = '/'} className="px-6 py-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-2xl shadow-sm hover:shadow-md transition-all flex items-center gap-2"><Home size={18} className="text-purple-500" /> Home</button>
            <button onClick={() => setShowProfile(true)} className="px-6 py-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-2xl shadow-sm hover:shadow-md transition-all flex items-center gap-2"><User size={18} className="text-pink-500" /> Profile</button>
            <button onClick={() => { logout(); window.location.href = '/login'; }} className="px-6 py-3 bg-rose-50 border border-rose-100 text-rose-600 font-bold rounded-2xl shadow-sm hover:shadow-md transition-all flex items-center gap-2"><LogOut size={18} /> Logout</button>
          </div>
        </motion.div>

        <div className="max-w-7xl mx-auto space-y-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {[
               { label: 'New Registrations', value: stats.newRegistrations, color: 'from-purple-500 to-indigo-600', icon: Users },
               { label: 'Bed Occupancy', value: stats.bedOccupancy, color: 'from-fuchsia-500 to-pink-600', icon: Hospital },
               { label: 'Pending Bills', value: stats.pendingBills, color: 'from-rose-500 to-pink-500', icon: CreditCard }
             ].map((stat, i) => (
                <div key={i} className={`relative overflow-hidden p-6 rounded-3xl bg-gradient-to-br ${stat.color} text-white shadow-xl`}>
                   <p className="text-xs font-black uppercase tracking-widest text-white/70 mb-2">{stat.label}</p>
                   <p className="text-4xl font-black">{stat.value}</p>
                   <stat.icon size={80} className="absolute -right-4 -bottom-4 text-white/10" />
                </div>
             ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-8">
               <div className="p-8 bg-white rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/50">
                  <div className="flex items-center justify-between mb-8 text-slate-900">
                     <h2 className="text-2xl font-black tracking-tight">Today's Appointment Queue</h2>
                     <button onClick={() => setShowPrediction(true)} className="p-3 bg-purple-50 text-purple-600 rounded-2xl hover:bg-purple-100"><TrendingUp size={20} /></button>
                  </div>
                  {loading ? <div className="py-20 flex justify-center"><div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" /></div> : (
                     <div className="overflow-x-auto">
                        <table className="w-full border-separate border-spacing-y-4">
                           <thead><tr className="text-left text-[10px] font-black text-slate-400 uppercase tracking-widest px-4"><th>PATIENT</th><th>DOCTOR AGENT</th><th>NO-SHOW RISK</th><th>STATUS</th></tr></thead>
                           <tbody>
                              {appointments.map(apt => (
                                 <tr key={apt._id} className="group">
                                    <td className="bg-slate-50/50 group-hover:bg-purple-50 border-y border-l border-slate-100 p-4 rounded-l-2xl">
                                       <button onClick={() => setSelectedEntity({ data: patientsMap[apt.patientId] || { name: apt.patientName }, type: 'patient' })} className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center font-black text-purple-600 border">{apt.patientName.charAt(0)}</div><p className="font-black text-slate-800">{apt.patientName}</p></button>
                                    </td>
                                    <td className="bg-slate-50/50 p-4"><span className="block text-sm font-bold text-slate-700">{apt.doctorId?.name || 'Assigned'}</span><span className="block text-[10px] font-black uppercase text-slate-400">{apt.department}</span></td>
                                    <td className="bg-slate-50/50 p-4"><span className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase ${apt.noShowRisk === 'High' ? 'bg-rose-50 text-rose-700' : 'bg-emerald-50 text-emerald-700'}`}>{apt.noShowRisk} RISK</span></td>
                                    <td className="bg-slate-50/50 border-y border-r p-4 rounded-r-2xl"><div className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase ${apt.status === 'SCHEDULED' ? 'bg-purple-600 text-white' : 'bg-emerald-500 text-white'}`}>{apt.status}</div></td>
                                 </tr>
                              ))}
                           </tbody>
                        </table>
                     </div>
                  )}
               </div>

               <div className="p-8 bg-white rounded-[2.5rem] border border-slate-200 shadow-xl">
                  <div className="flex items-center gap-3 mb-8"><Activity size={20} className="text-indigo-600" /><h2 className="text-2xl font-black tracking-tight">Demand Forecast (Linear Regression)</h2></div>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={inventoryData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs><linearGradient id="colorFore" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#A855F7" stopOpacity={0.3}/><stop offset="95%" stopColor="#A855F7" stopOpacity={0}/></linearGradient></defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" /><XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 11}} /><YAxis axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 11}} /><RechartsTooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                        <Area type="monotone" name="Historical" dataKey="historical" stroke="#94A3B8" strokeWidth={3} fillOpacity={0} /><Area type="monotone" name="Projected" dataKey="forecast" stroke="#A855F7" strokeWidth={3} fillOpacity={1} fill="url(#colorFore)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
               </div>
            </div>

            <div className="lg:col-span-4 space-y-8">
               <div className="p-8 bg-white rounded-[2.5rem] border border-slate-200 shadow-xl">
                  <h3 className="text-xl font-black mb-6 tracking-tight">Active Specialists</h3>
                  <div className="space-y-4">
                     {doctors.slice(0, 5).map(doc => (
                        <div key={doc._id} onClick={() => setSelectedEntity({ data: doc, type: 'doctor' })} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-purple-200 cursor-pointer transition-all">
                           <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center font-black text-purple-600 overflow-hidden">{(doc.avatar && doc.avatar.startsWith('http')) ? <img src={doc.avatar} className="w-full h-full object-cover" /> : doc.name.charAt(0)}</div><p className="text-sm font-black text-slate-800">{doc.name}</p></div>
                           <div className={`w-2 h-2 rounded-full ${doc.isAvailable ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                        </div>
                     ))}
                  </div>
               </div>

               <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
                  <div className="relative z-10">
                     <h3 className="text-xl font-black mb-4 tracking-tight">Live Supply Index</h3>
                     <div className="space-y-6">
                        {[
                           { label: 'Oxygen Reserves', val: '94%', color: 'from-cyan-400 to-blue-500' },
                           { label: 'CCU Beds', val: '12 Free', color: 'from-emerald-400 to-teal-500' },
                           { label: 'Blood Supply', val: 'Optimal', color: 'from-rose-400 to-pink-500' }
                        ].map((item, i) => (
                           <div key={i}><div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-2"><span className="text-white/40">{item.label}</span><span>{item.val}</span></div><div className="h-1 w-full bg-white/10 rounded-full overflow-hidden"><div className={`h-full bg-gradient-to-r ${item.color} rounded-full`} style={{ width: item.val.includes('%') ? item.val : '70%' }} /></div></div>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
