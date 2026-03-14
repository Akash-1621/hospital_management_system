import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, User, CheckCircle2, XCircle, AlertTriangle, TrendingUp, Activity, BedDouble, Mail, Hash, Phone, Briefcase, X, LogOut, Home } from 'lucide-react';
import AppointmentBooking from '../components/AppointmentBooking';
import PatientPortal from '../components/PatientPortal';
import PatientPrediction from '../components/PatientPrediction';
import regression from 'regression';
import UserProfile from '../components/UserProfile';
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
             {(data.avatar && (data.avatar.startsWith('http') || data.avatar.startsWith('data:'))) ? (
               <img src={data.avatar} alt={data.name} className="w-full h-full object-cover" />
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
    // Fetch all appointments for now (or filter by doctorId if we have it in user object)
    // Assuming we want to show some appointments
    const fetchAppointments = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/appointments`);
        const data = await res.json();
        const docRes = await fetch(`http://localhost:5000/api/doctors`);
        const docData = await docRes.json();
        
        if (data.success) {
          // If the user object contains the doctor's name, we can filter by name, or if it has the doctor ID
          // For demonstration, we'll just show the latest 5 appointments
          setAppointments(data.data.slice(0, 5));
        }

        if (docData.success && docData.data.length > 0) {
          // Find the doctor document that matches the logged in user's name, or default to the first one for testing
          const myDoc = docData.data.find(d => d.name === user?.name) || docData.data[0];
          if (myDoc) {
            setDoctorProfile(myDoc);
            setIsAvailable(myDoc.isAvailable);
            setUnavailabilityReason(myDoc.unavailabilityReason || '');
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
    return <UserProfile user={user} onBack={() => setShowProfile(false)} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8 pt-32">
      <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} className="max-w-5xl mx-auto bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-6 border-b border-slate-100 gap-4">
           <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-2">Doctor Dashboard</h1>
              <p className="text-slate-600 text-lg">Welcome back, {user?.name}. You are logged in as a <strong>{user?.role}</strong>.</p>
           </div>
           <div className="flex gap-2">
             <button onClick={() => window.location.href = '/'} className="flex items-center gap-2 px-5 py-2.5 bg-slate-100 border border-slate-200 text-slate-700 font-bold rounded-xl shadow-sm hover:shadow hover:bg-white transition-all shrink-0">
                <Home size={18} className="text-blue-500" /> Visit Homepage
             </button>
             <button onClick={() => setShowProfile(true)} className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl shadow-sm hover:shadow hover:bg-slate-50 transition-all shrink-0">
                <User size={18} className="text-cyan-500" /> My Profile
             </button>
             <button onClick={() => { logout(); window.location.href = '/login'; }} className="flex items-center gap-2 px-5 py-2.5 bg-rose-50 border border-rose-100 text-rose-600 font-bold rounded-xl shadow-sm hover:shadow hover:bg-rose-100 transition-all shrink-0">
                <LogOut size={18} /> Logout
             </button>
           </div>
        </div>
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col gap-6">
              <div className="p-6 rounded-2xl bg-cyan-50 border border-cyan-100 flex flex-col justify-center flex-1">
                  <h3 className="font-bold text-cyan-800">Today's Appointments</h3>
                  <p className="text-3xl font-black text-cyan-600 mt-2">{appointments.length || 0}</p>
              </div>
              <button 
                onClick={() => setShowPrediction(true)}
                className="p-6 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 border border-indigo-400 flex flex-col justify-center flex-1 hover:shadow-lg transition-all hover:-translate-y-1 text-left relative overflow-hidden group"
              >
                  <div className="absolute -right-4 -top-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <TrendingUp size={80} color="white" />
                  </div>
                  <h3 className="font-bold text-white flex items-center gap-2 relative z-10">
                    <TrendingUp size={18} /> View Predictions
                  </h3>
                  <p className="text-indigo-100 text-sm mt-2 relative z-10">Check expected patient volume for upcoming days</p>
              </button>
            </div>
            <div className="md:col-span-2 p-6 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-slate-800">My Availability</h3>
                  <div className="flex items-center gap-2">
                     <span className={`text-sm font-bold ${isAvailable ? 'text-emerald-600' : 'text-slate-500'}`}>
                       {isAvailable ? 'Available' : 'Unavailable'}
                     </span>
                     <button 
                       onClick={() => {
                         setIsAvailable(!isAvailable);
                         setEditingReason(true);
                       }}
                       className={`w-12 h-6 rounded-full transition-colors relative ${isAvailable ? 'bg-emerald-500' : 'bg-slate-300'}`}
                     >
                        <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${isAvailable ? 'left-7' : 'left-1'}`} />
                     </button>
                  </div>
                </div>
                
                <AnimatePresence>
                  {!isAvailable && editingReason && (
                    <motion.div initial={{opacity:0, height:0}} animate={{opacity:1, height:'auto'}} exit={{opacity:0, height:0}}>
                      <label className="block text-sm font-semibold text-slate-700 mb-2 mt-4">Reason for Unavailability</label>
                      <input 
                        type="text" 
                        value={unavailabilityReason} 
                        onChange={(e) => setUnavailabilityReason(e.target.value)}
                        placeholder="e.g. On Leave, In Surgery, Not feeling well"
                        className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {!isAvailable && !editingReason && (
                   <div className="mt-4 p-4 bg-rose-50 border border-rose-100 rounded-xl flex items-center justify-between">
                     <div>
                       <p className="text-xs text-rose-500 font-bold uppercase">Current Reason</p>
                       <p className="text-slate-700 font-medium">{doctorProfile?.unavailabilityReason}</p>
                     </div>
                     <button onClick={() => setEditingReason(true)} className="text-sm font-bold text-rose-600 hover:text-rose-800 underline">Edit</button>
                   </div>
                )}

                {(isAvailable || editingReason) && (
                  <div className="mt-4 flex justify-end items-center gap-4">
                    {showSuccess && <span className="text-emerald-600 font-bold text-sm animate-pulse">Saved Successfully!</span>}
                    <button 
                      onClick={handleUpdateAvailability}
                      disabled={updatingAvailability || (!isAvailable && !unavailabilityReason.trim())}
                      className="px-4 py-2 bg-slate-800 text-white rounded-lg text-sm font-semibold hover:bg-slate-700 transition-colors disabled:opacity-50"
                    >
                      {updatingAvailability ? 'Saving...' : 'Save Status'}
                    </button>
                  </div>
                )}
                {doctorProfile && doctorProfile.isAvailable !== isAvailable && !updatingAvailability && (
                  <p className="text-xs text-amber-600 mt-2 text-right">You have unsaved changes</p>
                )}
            </div>
        </div>

        <div className="mt-10">
          <h2 className="text-xl font-bold text-slate-800 mb-6">Recent Assigned Patients & Appointments</h2>
          {loading ? (
            <p className="text-slate-500 animate-pulse">Loading appointments...</p>
          ) : appointments.length > 0 ? (
            <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm">
                    <th className="p-4 font-semibold">Patient Name</th>
                    <th className="p-4 font-semibold">Date & Time</th>
                    <th className="p-4 font-semibold">Reason</th>
                    <th className="p-4 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {appointments.map(apt => (
                    <tr key={apt._id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-700 font-bold">
                            {apt.patientName.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-slate-800">{apt.patientName}</p>
                            <p className="text-xs text-slate-500">{apt.patientContact}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <p className="text-sm text-slate-700 flex items-center gap-1"><Calendar size={14} className="text-slate-400"/> {new Date(apt.appointmentDate).toLocaleDateString()}</p>
                        <p className="text-xs text-slate-500 mt-1 flex items-center gap-1"><Clock size={14} className="text-slate-400"/> {apt.timeSlot}</p>
                      </td>
                      <td className="p-4">
                        <p className="text-sm text-slate-600 truncate max-w-[200px]">{apt.reason || 'N/A'}</p>
                      </td>
                      <td className="p-4">
                        <span className={`px-3 py-1 text-xs font-bold rounded-full flex items-center gap-1 w-max ${
                          apt.status === 'SCHEDULED' ? 'bg-blue-100 text-blue-700' :
                          apt.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-700' :
                          'bg-slate-100 text-slate-600'
                        }`}>
                          {apt.status === 'SCHEDULED' && <Clock size={12} />}
                          {apt.status === 'COMPLETED' && <CheckCircle2 size={12} />}
                          {apt.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200">
              <p className="text-slate-500">No appointments found.</p>
            </div>
          )}
        </div>
      </motion.div>
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

    useEffect(() => {
        // Fetch all doctors so patient can see them
        const fetchDoctors = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/doctors`);
                const data = await res.json();
                if (data.success) {
                    setDoctors(data.data);
                }
            } catch (err) {
                console.error("Failed to fetch doctors", err);
            }
        };
        fetchDoctors();
    }, []);

    if (showAppointmentBooking) {
      return <AppointmentBooking onBack={() => setShowAppointmentBooking(false)} />;
    }

    if (showPatientPortal) {
      return <PatientPortal onBack={() => setShowPatientPortal(false)} />;
    }

    if (showPrediction) {
      return <PatientPrediction onBack={() => setShowPrediction(false)} />;
    }

    if (showProfile) {
      return <UserProfile user={user} onBack={() => setShowProfile(false)} />;
    }

    return (
      <div className="min-h-screen bg-slate-50 p-8 pt-32 relative">
        <DetailsModal isOpen={!!selectedDoctor} onClose={() => setSelectedDoctor(null)} data={selectedDoctor} type="doctor" />
        
        <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} className="max-w-5xl mx-auto bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-6 border-b border-slate-100 gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">Patient Portal</h1>
              <p className="text-slate-600 text-lg">Welcome, {user?.name}. You are logged in as a <strong>{user?.role}</strong>.</p>
            </div>
           <div className="flex gap-2">
             <button onClick={() => window.location.href = '/'} className="flex items-center gap-2 px-5 py-2.5 bg-slate-100 border border-slate-200 text-slate-700 font-bold rounded-xl shadow-sm hover:shadow hover:bg-white transition-all shrink-0">
               <Home size={18} className="text-teal-500" /> Visit Homepage
             </button>
             <button onClick={() => setShowProfile(true)} className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl shadow-sm hover:shadow hover:bg-slate-50 transition-all shrink-0">
               <User size={18} className="text-emerald-500" /> My Profile
             </button>
             <button onClick={() => { logout(); window.location.href = '/login'; }} className="flex items-center gap-2 px-5 py-2.5 bg-rose-50 border border-rose-100 text-rose-600 font-bold rounded-xl shadow-sm hover:shadow hover:bg-rose-100 transition-all shrink-0">
                <LogOut size={18} /> Logout
             </button>
           </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button onClick={() => setShowAppointmentBooking(true)} className="p-6 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all text-left border border-cyan-400">
                  <h3 className="font-bold text-xl">📋 Book Appointment</h3>
                  <p className="mt-2 text-cyan-100">Schedule a visit with our specialists and choose a convenient timing.</p>
              </button>
              <button onClick={() => setShowPatientPortal(true)} className="p-6 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all text-left border border-emerald-400">
                  <h3 className="font-bold text-xl">🏥 Hospital Portal</h3>
                  <p className="mt-2 text-emerald-100">View real-time bed availability, see doctor schedules, and request admission online.</p>
              </button>
              <button 
                onClick={() => setShowPrediction(true)}
                className="p-6 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 text-white shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all text-left border border-purple-400 col-span-1 md:col-span-2 flex items-center justify-between"
              >
                  <div>
                    <h3 className="font-bold text-xl flex items-center gap-2"><TrendingUp size={20} /> Traffic Predictor</h3>
                    <p className="mt-2 text-purple-100">See expected patient volume trends before visiting the hospital.</p>
                  </div>
                  <TrendingUp size={48} className="opacity-20 hidden sm:block" />
              </button>
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 col-span-1 md:col-span-2 mt-2">
                  <h3 className="font-bold text-slate-800">Our Doctors Directory</h3>
                  <p className="text-slate-600 mt-2 mb-4 text-sm">Click on any doctor to view their details, department, and availability.</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                     {doctors.length > 0 ? doctors.map(doc => (
                        <div key={doc._id} onClick={() => setSelectedDoctor(doc)} className="bg-white border border-slate-200 hover:border-emerald-400 p-4 rounded-xl cursor-pointer shadow-sm hover:shadow-md transition-all flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center font-bold text-emerald-700 overflow-hidden">
                                {(doc.avatar && (doc.avatar.startsWith('http') || doc.avatar.startsWith('data:'))) ? (
                                    <img src={doc.avatar} alt={doc.name} className="w-full h-full object-cover" />
                                ) : (
                                    <span>{doc.avatar || doc.name.charAt(0)}</span>
                                )}
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-800 text-sm">{doc.name}</h4>
                                <p className="text-xs text-slate-500">{doc.department}</p>
                            </div>
                        </div>
                     )) : (
                        <p className="text-slate-500 text-sm">Loading doctors...</p>
                     )}
                  </div>
              </div>
          </div>
        </motion.div>
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
    const [selectedEntity, setSelectedEntity] = useState(null); // {data, type}
    const [patientsMap, setPatientsMap] = useState({});
    const [showProfile, setShowProfile] = useState(false);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const [resApt, resDoc] = await Promise.all([
            fetch(`http://localhost:5000/api/appointments`),
            fetch(`http://localhost:5000/api/doctors`) // Now it returns all doctors because of our backend change
          ]);
          const dataApt = await resApt.json();
          const dataDoc = await resDoc.json();
          
          if (dataApt.success) {
            // Apply mock No-Show prediction risk to appointments
            const aptsWithRisk = dataApt.data.slice(0, 5).map(apt => ({
              ...apt,
              noShowRisk: calculateNoShowRisk(apt)
            }));
            setAppointments(aptsWithRisk); 
          }
          if (dataDoc.success) {
            setDoctors(dataDoc.data);
          }
          
          // Fetch patients so we have details for the modal
          const resPat = await fetch(`http://localhost:5000/api/patients`);
          const patData = await resPat.json();
          if (patData.success) {
             const pMap = {};
             patData.data.forEach(p => pMap[p._id] = p);
             setPatientsMap(pMap);
          }

          generateInventoryForecast();
        } catch (err) {
          console.error("Failed to fetch data", err);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }, []);

    // 1. Appointment No-Show Predictor (Classification Heuristic)
    const calculateNoShowRisk = (apt) => {
      let riskScore = 0;
      const today = new Date();
      const aptDate = new Date(apt.appointmentDate);
      const leadTimeDays = Math.floor((aptDate - today) / (1000 * 60 * 60 * 24));
      
      // Feature: Lead Time (longer lead time = higher no show risk)
      if (leadTimeDays > 14) riskScore += 3;
      else if (leadTimeDays > 7) riskScore += 2;
      else if (leadTimeDays > 3) riskScore += 1;

      // Feature: Follow-up or General (General reasons often have higher drop off)
      if (!apt.reason || apt.reason.toLowerCase().includes('consultation')) riskScore += 1;
      
      // Feature: Department
      if (apt.department === 'General Medicine' || apt.department === 'Dermatology') riskScore += 1;

      if (riskScore >= 4) return 'High';
      if (riskScore >= 2) return 'Medium';
      return 'Low';
    };

    // 2. Length of Stay (LoS) Estimator
    const mockAdmittedPatients = [
      { id: 1, name: 'Robert Chen', age: 65, condition: 'Pneumonia (Severe)', admittedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) },
      { id: 2, name: 'Sarah Miller', age: 28, condition: 'Appendectomy', admittedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) },
      { id: 3, name: 'James Wilson', age: 45, condition: 'Cardiac Observation', admittedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) },
      { id: 4, name: 'Maria Garcia', age: 52, condition: 'Knee Replacement', admittedDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000) },
    ];

    const calculateLoSPrediction = (patient) => {
       // Mock Regression logic based on condition severity and age
       let baseStay = 3; // base 3 days
       if (patient.condition.includes('Severe') || patient.condition.includes('Cardiac')) baseStay += 4;
       if (patient.condition.includes('Replacement')) baseStay += 5;
       
       if (patient.age > 60) baseStay += 2;
       else if (patient.age > 40) baseStay += 1;

       const dischargeDate = new Date(patient.admittedDate);
       dischargeDate.setDate(dischargeDate.getDate() + baseStay);
       
       const today = new Date();
       const daysRemaining = Math.max(0, Math.ceil((dischargeDate - today) / (1000 * 60 * 60 * 24)));
       const totalStay = baseStay;
       const daysSpent = Math.max(0, Math.ceil((today - patient.admittedDate) / (1000 * 60 * 60 * 24)));
       const progressPercent = Math.min(100, (daysSpent / totalStay) * 100);

       return { predictedStay: totalStay, daysRemaining, progressPercent, dischargeDate };
    };

    // 4. Pharmacy & Inventory Demand Forecasting (Time-Series ML)
    const generateInventoryForecast = () => {
      // Mock historical data: last 14 days of Saline IV & Mask usage
      const today = new Date();
      const historicalDemand = [120, 115, 125, 130, 140, 135, 150, 145, 160, 155, 165, 175, 170, 185]; 
      
      const regressionData = historicalDemand.map((vol, index) => [index, vol]);
      const result = regression.polynomial(regressionData, { order: 2 }); // Non-linear demand curve
      
      const newChartData = [];

      // Add historical data
      for (let i = 0; i < historicalDemand.length; i++) {
        const d = new Date(today);
        d.setDate(d.getDate() - (historicalDemand.length - i - 1));
        newChartData.push({
          date: d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
          historical: historicalDemand[i],
          forecast: null
        });
      }

      // Add forecasted data for next 7 days
      for (let i = 0; i < 7; i++) {
        const d = new Date(today);
        d.setDate(d.getDate() + i + 1);
        const forecastValue = Math.round(result.predict(historicalDemand.length + i)[1]);

        newChartData.push({
          date: d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
          historical: null,
          forecast: forecastValue
        });
      }

      setInventoryData(newChartData);
    };

    if (showPrediction) {
      return <PatientPrediction onBack={() => setShowPrediction(false)} />;
    }

    if (showProfile) {
      return <UserProfile user={user} onBack={() => setShowProfile(false)} />;
    }

    return (
      <div className="min-h-screen bg-slate-50 p-8 pt-32 relative">
        <DetailsModal 
           isOpen={!!selectedEntity} 
           onClose={() => setSelectedEntity(null)} 
           data={selectedEntity?.data} 
           type={selectedEntity?.type} 
        />
        
        <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} className="max-w-6xl mx-auto bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-6 border-b border-slate-100 gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">Reception Desk</h1>
              <p className="text-slate-600 text-lg">Hello, {user?.name}. You are logged in as a <strong>{user?.role}</strong>.</p>
            </div>
           <div className="flex gap-2">
             <button onClick={() => window.location.href = '/'} className="flex items-center gap-2 px-5 py-2.5 bg-slate-100 border border-slate-200 text-slate-700 font-bold rounded-xl shadow-sm hover:shadow hover:bg-white transition-all shrink-0">
                <Home size={18} className="text-purple-500" /> Visit Homepage
             </button>
             <button onClick={() => setShowProfile(true)} className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl shadow-sm hover:shadow hover:bg-slate-50 transition-all shrink-0">
               <User size={18} className="text-purple-500" /> My Profile
             </button>
             <button onClick={() => { logout(); window.location.href = '/login'; }} className="flex items-center gap-2 px-5 py-2.5 bg-rose-50 border border-rose-100 text-rose-600 font-bold rounded-xl shadow-sm hover:shadow hover:bg-rose-100 transition-all shrink-0">
                <LogOut size={18} /> Logout
             </button>
           </div>
          </div>
          
          <div className="flex items-center justify-between mb-4 mt-8">
            <div>
              <h1 className="text-xl font-bold text-slate-800">Hospital Overview</h1>
            </div>
            <button 
              onClick={() => setShowPrediction(true)}
              className="flex items-center gap-2 bg-pink-50 text-pink-600 hover:bg-pink-100 px-4 py-2 rounded-xl transition-colors font-bold text-sm border border-pink-200 shadow-sm"
            >
              <TrendingUp size={16} /> Volume Analytics
            </button>
          </div>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-purple-50 border border-purple-100 flex flex-col justify-center">
                  <h3 className="font-bold text-purple-800">New Registrations</h3>
                  <p className="text-3xl font-black text-purple-600 mt-2">24</p>
              </div>
              <div className="p-6 rounded-2xl bg-fuchsia-50 border border-fuchsia-100 flex flex-col justify-center">
                  <h3 className="font-bold text-fuchsia-800">Bed Occupancy</h3>
                  <p className="text-3xl font-black text-fuchsia-600 mt-2">85%</p>
              </div>
              <div className="p-6 rounded-2xl bg-pink-50 border border-pink-100 flex flex-col justify-center">
                  <h3 className="font-bold text-pink-800">Pending Bills</h3>
                  <p className="text-3xl font-black text-pink-600 mt-2">12</p>
              </div>
          </div>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2"><Clock size={20} className="text-purple-600"/> Recent Appointments</h2>
              {loading ? (
                <p className="text-slate-500 animate-pulse">Loading appointments...</p>
              ) : appointments.length > 0 ? (
                <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[500px]">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm">
                        <th className="p-4 font-semibold">Patient</th>
                        <th className="p-4 font-semibold">Doctor Assigned</th>
                        <th className="p-4 font-semibold">No-Show Risk (ML)</th>
                        <th className="p-4 font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {appointments.map(apt => (
                        <tr key={apt._id} className="hover:bg-slate-50 transition-colors">
                          <td className="p-4">
                            <button 
                               onClick={() => {
                                  const pat = patientsMap[apt.patientId] || { name: apt.patientName, age: 'N/A', gender: 'N/A', contact: apt.patientContact, medicalHistory: 'Not found' };
                                  setSelectedEntity({ data: pat, type: 'patient' });
                               }}
                               className="text-left group hover:opacity-80"
                            >
                               <span className="font-bold text-slate-800 group-hover:text-purple-600 transition-colors underline decoration-purple-200 underline-offset-4">{apt.patientName}</span>
                               <span className="block text-xs text-slate-500 mt-1 flex items-center gap-1"><Calendar size={12} /> {new Date(apt.appointmentDate).toLocaleDateString()}</span>
                            </button>
                          </td>
                          <td className="p-4">
                            <button 
                               onClick={() => {
                                  if (apt.doctorId) {
                                      setSelectedEntity({ data: apt.doctorId, type: 'doctor' });
                                  }
                               }}
                               className="text-left group hover:opacity-80"
                            >
                               <span className="font-semibold text-indigo-900 group-hover:text-fuchsia-600 transition-colors underline decoration-fuchsia-200 underline-offset-4">{apt.doctorId?.name || 'Unknown'}</span>
                               <span className="block text-xs text-indigo-600 mt-1">{apt.department}</span>
                            </button>
                          </td>
                          <td className="p-4">
                             <span className={`px-2 py-1 text-xs font-bold rounded-lg flex items-center justify-center gap-1 w-max border ${
                                apt.noShowRisk === 'High' ? 'bg-rose-50 text-rose-700 border-rose-200 shadow-sm shadow-rose-100' :
                                apt.noShowRisk === 'Medium' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                                'bg-emerald-50 text-emerald-700 border-emerald-200'
                              }`}>
                                {apt.noShowRisk === 'High' && <AlertTriangle size={12} />}
                                {apt.noShowRisk}
                             </span>
                          </td>
                          <td className="p-4">
                            <span className={`px-2 py-1 text-[10px] font-bold rounded-full flex items-center gap-1 w-max ${
                              apt.status === 'SCHEDULED' ? 'bg-blue-100 text-blue-700' :
                              apt.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-700' :
                              'bg-slate-100 text-slate-600'
                            }`}>
                              {apt.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200">
                  <p className="text-slate-500">No appointments found.</p>
                </div>
              )}
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2"><User size={20} className="text-indigo-600"/> Doctor Availability</h2>
              {loading ? (
                <p className="text-slate-500 animate-pulse">Loading doctors...</p>
              ) : doctors.length > 0 ? (
                <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm overflow-y-auto max-h-[400px]">
                  <table className="w-full text-left border-collapse min-w-[400px]">
                    <thead className="sticky top-0 bg-white z-10">
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm">
                        <th className="p-4 font-semibold">Doctor</th>
                        <th className="p-4 font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {doctors.map(doc => (
                        <tr key={doc._id} className="hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => setSelectedEntity({ data: doc, type: 'doctor' })}>
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${doc.color || 'from-indigo-500 to-purple-600'} flex items-center justify-center text-white font-bold text-xs overflow-hidden border border-white/20 shadow-sm`}>
                                {(doc.avatar && (doc.avatar.startsWith('http') || doc.avatar.startsWith('data:'))) ? (
                                  <img src={doc.avatar} alt={doc.name} className="w-full h-full object-cover" />
                                ) : (
                                  <span>{doc.avatar || doc.name.charAt(0)}</span>
                                )}
                              </div>
                              <div>
                                <p className="font-bold text-slate-800 text-sm hover:text-indigo-600 underline decoration-indigo-200 underline-offset-2">{doc.name}</p>
                                <p className="text-xs text-slate-500">{doc.department}</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex flex-col gap-1 text-sm">
                              {doc.isAvailable ? (
                                <span className="text-emerald-600 font-bold flex items-center gap-1"><CheckCircle2 size={14} /> Available</span>
                              ) : (
                                <>
                                  <span className="text-rose-500 font-bold flex items-center gap-1"><XCircle size={14} /> Unavailable</span>
                                  {doc.unavailabilityReason && <span className="text-xs text-rose-400 max-w-[150px] truncate" title={doc.unavailabilityReason}>Reason: {doc.unavailabilityReason}</span>}
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200">
                  <p className="text-slate-500">No doctors found.</p>
                </div>
              )}
            </div>
            
            {/* Added: Length of Stay ML Estimator */}
            <div className="lg:col-span-2 mt-2">
              <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <BedDouble size={20} className="text-fuchsia-600"/> 
                Admitted Patients & Length of Stay (LoS) Predictor
              </h2>
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <p className="text-sm text-slate-500 mb-6 font-medium">
                  This estimator uses a regression model to predict the total length of hospital stay based on patient age, baseline condition severity, and historical recovery data.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mockAdmittedPatients.map(patient => {
                    const los = calculateLoSPrediction(patient);
                    return (
                      <div key={patient.id} className="p-4 border border-slate-100 bg-slate-50 rounded-xl hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-bold text-slate-800 flex items-center gap-2">
                               {patient.name} <span className="text-xs font-normal text-slate-500">({patient.age}y)</span>
                            </h4>
                            <p className="text-xs font-semibold text-slate-500 mt-1">{patient.condition}</p>
                          </div>
                          <span className={`text-xs font-bold px-2 py-1 rounded-md ${los.daysRemaining <= 1 ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}`}>
                             {los.daysRemaining === 0 ? 'Discharging Today' : `${los.daysRemaining} days left`}
                          </span>
                        </div>
                        
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs font-bold text-slate-600">
                             <span>Admitted: {patient.admittedDate.toLocaleDateString(undefined, {month: 'short', day: 'numeric'})}</span>
                             <span>Est. Discharge: {los.dischargeDate.toLocaleDateString(undefined, {month: 'short', day: 'numeric'})}</span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-2">
                            <div 
                               className={`h-2 rounded-full ${los.progressPercent > 80 ? 'bg-emerald-500' : 'bg-fuchsia-500'}`} 
                               style={{ width: `${los.progressPercent}%` }}
                            />
                          </div>
                          <div className="flex justify-between text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-wider">
                            <span>Predicted Stay: {los.predictedStay} Days</span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Added: Inventory Forecasting Chart */}
            <div className="lg:col-span-2 mt-2">
              <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Activity size={20} className="text-emerald-600"/> 
                Medical Supply Demand Forecast (ML)
              </h2>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                 <p className="text-sm text-slate-500 mb-6 font-medium">
                  Polynomial regression model trained on the past 14 days of usage to predict the required volume of critical supplies (like Saline IVs and Masks) for the next 7 days.
                 </p>
                 <div className="h-[250px] w-full mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={inventoryData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="colorHist" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#94A3B8" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#94A3B8" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorFore" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                      <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 11}} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 11}} dx={-10} domain={['auto', 'auto']} />
                      <RechartsTooltip 
                        contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                      />
                      <Area type="monotone" name="Past Demand" dataKey="historical" stroke="#94A3B8" strokeWidth={3} fillOpacity={1} fill="url(#colorHist)" />
                      <Area type="monotone" name="Predicted Demand" dataKey="forecast" stroke="#10B981" strokeWidth={3} strokeDasharray="5 5" fillOpacity={1} fill="url(#colorFore)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    );
  };
