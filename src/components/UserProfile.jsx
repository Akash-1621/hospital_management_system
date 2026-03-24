import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { 
  User, Mail, Phone, MapPin, BadgeCheck, Camera, Edit3, 
  ArrowLeft, Hash, Save, X, Shield, Calendar, Briefcase,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const InfoRow = ({ label, value, icon: Icon, isEditable, field, isEditing, editForm, setEditForm }) => (
  <div className="flex flex-col sm:flex-row sm:items-center py-4 border-b border-slate-100 last:border-0 group">
    <div className="sm:w-1/3 flex items-center gap-3 text-slate-400 group-hover:text-slate-600 transition-colors">
      <Icon size={16} />
      <span className="text-xs font-bold uppercase tracking-wider">{label}</span>
    </div>
    <div className="sm:w-2/3 mt-1 sm:mt-0">
      {isEditing && isEditable ? (
        <input 
          type={field === 'phone' ? 'tel' : 'text'}
          value={editForm[field] || ''} 
          onChange={(e) => {
            const val = e.target.value;
            if (field === 'phone') {
              const cleaned = val.replace(/\D/g, '').slice(0, 10);
              setEditForm({...editForm, [field]: cleaned});
            } else {
              setEditForm({...editForm, [field]: val});
            }
          }}
          placeholder={field === 'phone' ? '10-digit mobile number' : ''}
          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        />
      ) : (
        <span className="font-semibold text-slate-700">{value || 'Not Specified'}</span>
      )}
    </div>
  </div>
);

const UserProfile = ({ user: initialUser, onBack }) => {
  const [user, setUser] = useState(initialUser);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ ...initialUser });
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPhotoMenu, setShowPhotoMenu] = useState(false);
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [stream, setStream] = useState(null);
  const [randomId] = useState(() => Math.floor(100000 + Math.random() * 900000).toString());
  
  const videoRef = React.useRef(null);
  const canvasRef = React.useRef(null);

  const { updateUser } = useContext(AuthContext);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      // Use the entire editForm to support all fields (age, gender, specialization, etc.)
      const res = await fetch(`http://localhost:5000/api/auth/profile/${user.email}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm)
      });

      const data = await res.json();
      if (data.success) {
        const updatedData = data.data;
        setUser(updatedData);
        updateUser(updatedData);
        setIsEditing(false);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      } else {
        alert(data.message || "Failed to save profile");
      }
    } catch (err) {
      console.error("Save error:", err);
      alert("Error saving profile details to server");
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        setEditForm(prev => ({ ...prev, photo: result }));
        if (!isEditing) setUser(prev => ({ ...prev, photo: result }));
        setShowPhotoMenu(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
      if (videoRef.current) videoRef.current.srcObject = mediaStream;
      setShowCameraModal(true);
      setShowPhotoMenu(false);
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("Unable to access camera. Please check permissions.");
    }
  };

  const stopCamera = () => {
    if (stream) stream.getTracks().forEach(track => track.stop());
    setStream(null);
    setShowCameraModal(false);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      context.drawImage(videoRef.current, 0, 0, 320, 240);
      const data = canvasRef.current.toDataURL('image/png');
      setEditForm(prev => ({ ...prev, photo: data }));
      if (!isEditing) setUser(prev => ({ ...prev, photo: data }));
      stopCamera();
    }
  };

  const avatarUrl = editForm.photo || user?.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=f1f5f9&color=64748b&size=128`;


  return (
    <div className="min-h-screen bg-slate-50/50 p-4 md:p-8 pt-24 md:pt-32 font-sans overflow-x-hidden">
      <AnimatePresence>
        {showSuccess && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] bg-slate-900 text-white px-5 py-2.5 rounded-full shadow-xl flex items-center gap-2 text-sm font-bold">
            <CheckCircle2 size={16} className="text-emerald-400" /> Changes Saved
          </motion.div>
        )}

        {showCameraModal && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl relative">
              <button onClick={stopCamera} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-900 transition-colors"><X size={20} /></button>
              <h3 className="text-lg font-bold text-slate-900 mb-6">Capture Photo</h3>
              <div className="aspect-video bg-slate-100 rounded-2xl mb-6 overflow-hidden relative">
                <video ref={videoRef} autoPlay className="w-full h-full object-cover" />
                <canvas ref={canvasRef} width="320" height="240" className="hidden" />
              </div>
              <button 
                onClick={capturePhoto}
                className="w-full py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
              >
                <Camera size={18} /> Capture Now
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold transition-all text-xs group">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back
          </button>
          <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest hidden sm:block">Healthcare Management System • User Profile</div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden relative">
          <div className="p-8 md:p-12 border-b border-slate-100 flex flex-col md:flex-row items-center gap-8">
            <div className="relative shrink-0">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-slate-50 border border-slate-100 overflow-hidden shadow-sm">
                <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-2 -right-2">
                <button 
                  onClick={() => setShowPhotoMenu(!showPhotoMenu)}
                  className="p-2.5 bg-white border border-slate-200 rounded-lg shadow-sm text-slate-400 hover:text-slate-900 transition-colors relative z-20"
                >
                  <Camera size={14} />
                </button>
                
                <AnimatePresence>
                  {showPhotoMenu && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setShowPhotoMenu(false)} />
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 10 }}
                        className="absolute bottom-full right-0 mb-2 bg-white border border-slate-200 rounded-xl shadow-xl p-1 z-20 w-36 overflow-hidden"
                      >
                        <button 
                          onClick={startCamera}
                          className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 rounded-lg transition-colors text-left"
                        >
                          <Camera size={14} /> Take Photo
                        </button>
                        <label className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 rounded-lg transition-colors text-left cursor-pointer">
                          <Edit3 size={14} /> Upload File
                          <input type="file" className="hidden" accept="image/*" onChange={handlePhotoChange} />
                        </label>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  {isEditing ? (
                    <input 
                      type="text" 
                      value={editForm.name} 
                      onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                      className="text-2xl font-bold text-slate-800 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  ) : (
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-1">{user?.name}</h1>
                  )}
                  <p className="text-slate-500 font-medium">{user?.email}</p>
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-black uppercase rounded mt-3 border border-blue-100">
                    <Shield size={10} /> {user?.role} Access
                  </div>
                </div>
                
                <div className="flex gap-2">
                  {isEditing ? (
                    <>
                      <button onClick={() => setIsEditing(false)} className="px-4 py-2 border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 text-xs transition-all">Cancel</button>
                      <button onClick={handleSave} className="px-5 py-2 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 text-xs shadow-lg shadow-slate-900/10 transition-all">Save</button>
                    </>
                  ) : (
                    <button onClick={() => { setEditForm({...user}); setIsEditing(true); }} className="px-5 py-2.5 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 text-xs shadow-lg shadow-slate-900/10 transition-all flex items-center gap-2">
                      <Edit3 size={14} /> Edit Profile
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 md:p-12 space-y-2">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Account Details</h3>
            <InfoRow icon={Hash} label="Profile ID" value={randomId} isEditable={false} isEditing={isEditing} editForm={editForm} setEditForm={setEditForm} />
            <InfoRow icon={Mail} label="Email Address" value={user?.email} isEditable={false} isEditing={isEditing} editForm={editForm} setEditForm={setEditForm} />
            <InfoRow icon={Phone} label="Contact Phone" value={user?.phone || user?.contact} isEditable={true} field="phone" isEditing={isEditing} editForm={editForm} setEditForm={setEditForm} />
            
            {user?.role === 'Doctor' && (
              <>
                <InfoRow icon={Briefcase} label="Department" value={user?.department} isEditable={true} field="department" isEditing={isEditing} editForm={editForm} setEditForm={setEditForm} />
                <InfoRow icon={BadgeCheck} label="Specialization" value={user?.specialization} isEditable={true} field="specialization" isEditing={isEditing} editForm={editForm} setEditForm={setEditForm} />
                <InfoRow icon={Calendar} label="Experience" value={user?.experience} isEditable={true} field="experience" isEditing={isEditing} editForm={editForm} setEditForm={setEditForm} />
              </>
            )}

            {user?.role === 'Patient' && (
              <>
                <InfoRow icon={User} label="Age" value={user?.age} isEditable={true} field="age" isEditing={isEditing} editForm={editForm} setEditForm={setEditForm} />
                <InfoRow icon={User} label="Gender" value={user?.gender} isEditable={true} field="gender" isEditing={isEditing} editForm={editForm} setEditForm={setEditForm} />
                <InfoRow icon={MapPin} label="Address" value={user?.address} isEditable={true} field="address" isEditing={isEditing} editForm={editForm} setEditForm={setEditForm} />
                <InfoRow icon={Shield} label="Medical History" value={user?.medicalHistory} isEditable={true} field="medicalHistory" isEditing={isEditing} editForm={editForm} setEditForm={setEditForm} />
              </>
            )}

            <InfoRow icon={BadgeCheck} label="Status" value={user?.status || 'Verified Account'} isEditable={false} isEditing={isEditing} editForm={editForm} setEditForm={setEditForm} />
          </div>
        </div>

        <div className="mt-8 px-4 flex justify-between items-center opacity-40">
           <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">HIPAA Protected • Data Encrypted</span>
           <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">v1.2.5</span>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
