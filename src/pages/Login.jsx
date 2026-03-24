import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Mail, Lock, Loader2, ArrowLeft, User, Stethoscope, Users, Contact, Calendar, Hash, Phone, Camera } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [isLoginModel, setIsLoginModel] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Patient');
  const [age, setAge] = useState('');
  const [dob, setDob] = useState('');
  const [phone, setPhone] = useState('');
  const [photo, setPhoto] = useState('');
  const [repName, setRepName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleDobChange = (e) => {
    const value = e.target.value;
    setDob(value);
    
    if (value) {
      const birthDate = new Date(value);
      const today = new Date();
      let calculatedAge = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        calculatedAge--;
      }
      if (calculatedAge >= 0) {
        setAge(calculatedAge.toString());
      }
    }
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    const endpoint = isLoginModel ? 'login' : 'register';
    
    // Determine representative relation
    let relation = 'NONE';
    if (role === 'Patient') {
      if (parseInt(age) < 18) relation = 'PARENT';
      else if (parseInt(age) > 45) relation = 'GUARDIAN';
    }

    const payload = isLoginModel 
      ? { email, password } 
      : { 
          name, email, password, role, 
          phone, photo,
          age: role === 'Patient' ? parseInt(age) : undefined,
          dob: role === 'Patient' ? dob : undefined,
          representative: role === 'Patient' ? { name: repName, relation } : undefined
        };

    try {
      const response = await fetch(`http://localhost:5000/api/auth/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        if (!isLoginModel) {
            setSuccess('Account created successfully! Signing you in...');
            setTimeout(() => {
                login(data.data);
                redirectUser(data.data.role);
            }, 1500);
        } else {
            login(data.data);
            redirectUser(data.data.role);
        }
      } else {
        setError(data.message || 'Authentication failed. Please check your details.');
      }
    } catch (err) {
      setError('A network error occurred. Is the backend running?');
    } finally {
      if (isLoginModel) setIsLoading(false);
    }
  };

  const redirectUser = (role) => {
    switch(role) {
      case 'Doctor': navigate('/doctor-dashboard'); break;
      case 'Receptionist': navigate('/receptionist-dashboard'); break;
      case 'Patient':
      default: navigate('/patient-dashboard'); break;
    }
  };

  const roles = [
    { id: 'Patient', label: 'Patient', icon: Users },
    { id: 'Doctor', label: 'Doctor', icon: Stethoscope },
    { id: 'Receptionist', label: 'Receptionist', icon: Contact }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-400/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex justify-center mb-6"
        >
          <button 
            onClick={() => navigate('/')}
            className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-xl shadow-cyan-500/30 hover:scale-105 transition-transform"
          >
            <Heart size={32} style={{ color: 'white' }} />
          </button>
        </motion.div>
        
        <motion.button 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          onClick={() => navigate('/')}
          className="fixed top-6 left-6 text-slate-400 hover:text-slate-900 transition-all flex items-center gap-2 group z-[100]"
        >
          <div className="w-10 h-10 rounded-xl bg-white shadow-lg border border-slate-100 flex items-center justify-center group-hover:shadow-xl transition-all">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] bg-white/50 backdrop-blur-sm px-2 py-1 rounded-lg">Back to Home</span>
        </motion.button>

        <motion.h2 
          key={isLoginModel ? 'login-h2' : 'reg-h2'}
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mt-2 text-center text-3xl font-black text-slate-900 tracking-tight"
        >
          {isLoginModel ? 'Sign in to account' : 'Create new account'}
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-2 text-center text-sm text-slate-500 font-medium"
        >
          {isLoginModel ? 'Access your CareSphere personalized dashboard' : 'Join our healthcare network today'}
        </motion.p>
      </div>

      <motion.div 
        layout
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10"
      >
        <div className="bg-white/90 backdrop-blur-xl py-8 px-4 shadow-2xl shadow-slate-200/60 sm:rounded-[2rem] sm:px-10 border border-white">
          
          <form className="space-y-5 mt-4" onSubmit={handleAuth}>
            
            {error && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="p-3.5 rounded-xl bg-rose-50 text-rose-600 text-xs font-bold border border-rose-100 text-center uppercase tracking-wider">
                {error}
              </motion.div>
            )}

            {success && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="p-3.5 rounded-xl bg-emerald-50 text-emerald-600 text-xs font-bold border border-emerald-100 text-center uppercase tracking-wider">
                {success}
              </motion.div>
            )}

            {!isLoginModel && (
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1.5 ml-1">Full Name</label>
                <div className="relative rounded-xl">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400"><User size={18} /></div>
                  <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="block w-full pl-11 pr-4 py-3.5 bg-slate-50/50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 transition-all outline-none text-slate-900 font-bold text-sm" placeholder="John Doe" />
                </div>
              </motion.div>
            )}

            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1.5 ml-1">Email Address</label>
              <div className="relative rounded-xl">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400"><Mail size={18} /></div>
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="block w-full pl-11 pr-4 py-3.5 bg-slate-50/50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 transition-all outline-none text-slate-900 font-bold text-sm" placeholder="name@example.com" />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1.5 ml-1">Password</label>
              <div className="relative rounded-xl">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400"><Lock size={18} /></div>
                <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="block w-full pl-11 pr-4 py-3.5 bg-slate-50/50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 transition-all outline-none text-slate-900 font-bold text-sm" placeholder="••••••••" />
              </div>
            </div>

            {!isLoginModel && role === 'Patient' && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1.5 ml-1">Age</label>
                    <div className="relative rounded-xl">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400"><Hash size={16} /></div>
                      <input type="number" required value={age} onChange={(e) => setAge(e.target.value)} className="block w-full pl-11 pr-4 py-3 bg-slate-50/50 border border-slate-200 rounded-2xl shadow-sm focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 transition-all outline-none text-slate-900 font-bold text-sm" placeholder="25" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1.5 ml-1">DOB</label>
                    <div className="relative rounded-xl">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400"><Calendar size={16} /></div>
                      <input type="date" required value={dob} onChange={handleDobChange} className="block w-full pl-11 pr-4 py-3 bg-slate-50/50 border border-slate-200 rounded-2xl shadow-sm focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 transition-all outline-none text-slate-900 font-bold text-sm" />
                    </div>
                  </div>
                </div>

                {(parseInt(age) < 18 || parseInt(age) > 45) && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                    <label className="block text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] mb-1.5 ml-1">
                      {parseInt(age) < 18 ? "Parent's Full Name" : "Guardian's Full Name"}
                    </label>
                    <div className="relative rounded-xl">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-blue-400"><User size={18} /></div>
                      <input type="text" required value={repName} onChange={(e) => setRepName(e.target.value)} className="block w-full pl-11 pr-4 py-3.5 bg-blue-50/30 border border-blue-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none text-slate-900 font-bold text-sm" placeholder="Representative Name" />
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}

            {!isLoginModel && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1.5 ml-1">Phone Number</label>
                  <div className="relative rounded-xl">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400"><Phone size={18} /></div>
                    <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} className="block w-full pl-11 pr-4 py-3.5 bg-slate-50/50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 transition-all outline-none text-slate-900 font-bold text-sm" placeholder="10-digit number" />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 ml-1">Profile Photo</label>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0">
                      {photo ? (
                        <img src={photo} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-300">
                          <User size={24} />
                        </div>
                      )}
                    </div>
                    <label className="flex-1 cursor-pointer">
                      <div className="flex items-center justify-center gap-2 px-4 py-3 bg-white border-2 border-dashed border-slate-200 rounded-2xl hover:border-cyan-400 hover:bg-cyan-50 transition-all group">
                        <Camera size={18} className="text-slate-400 group-hover:text-cyan-500" />
                        <span className="text-xs font-bold text-slate-500 group-hover:text-cyan-600">Upload Photo</span>
                      </div>
                      <input type="file" className="hidden" accept="image/*" onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => setPhoto(reader.result);
                          reader.readAsDataURL(file);
                        }
                      }} />
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2.5 ml-1">Select your role</label>
                  <div className="grid grid-cols-3 gap-2">
                    {roles.map((r) => (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => setRole(r.id)}
                        className={`py-3.5 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${role === r.id ? 'bg-slate-900 border-slate-900 text-white shadow-lg' : 'bg-slate-50 border-slate-100 text-slate-500 hover:border-slate-300'}`}
                      >
                        <r.icon size={18} className={role === r.id ? 'text-cyan-400' : 'text-slate-400'} />
                        <span className="text-[10px] font-black uppercase tracking-wider">{r.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {isLoginModel && (
              <div className="flex items-center justify-between pb-2">
                <div className="flex items-center gap-2 cursor-pointer group">
                  <input id="remember" type="checkbox" className="w-4 h-4 rounded-md border-slate-300 text-cyan-600 focus:ring-cyan-500" />
                  <label htmlFor="remember" className="text-xs font-bold text-slate-500 group-hover:text-slate-900 cursor-pointer transition-colors">Remember me</label>
                </div>
                <a href="#" className="text-xs font-bold text-cyan-600 hover:text-cyan-700 transition-colors">Forgot Password?</a>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-slate-900 text-white font-black text-[11px] uppercase tracking-[0.3em] rounded-2xl shadow-xl shadow-slate-900/20 hover:bg-slate-800 hover:shadow-cyan-500/10 transition-all active:scale-[0.98] disabled:opacity-70 flex items-center justify-center"
            >
              {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : (isLoginModel ? 'Sign In Now' : 'Create My Account')}
            </button>
          </form>

          <div className="mt-8 text-center border-t border-slate-100 pt-6">
            <p className="text-sm font-medium text-slate-500">
              {isLoginModel ? "New to CareSphere?" : "Already have an account?"}
              <button 
                onClick={() => { setIsLoginModel(!isLoginModel); setError(''); setSuccess(''); }}
                className="ml-2 font-black text-cyan-600 hover:text-cyan-700 transition-colors uppercase text-[11px] tracking-widest outline-none"
              >
                {isLoginModel ? "Register" : "Sign In"}
              </button>
            </p>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-2">
            {[
              { role: 'Doctor', email: 'doctor@care.com' },
              { role: 'Patient', email: 'patient@care.com' },
              { role: 'Staff', email: 'receptionist@care.com' }
            ].map(test => (
              <button 
                key={test.role}
                onClick={() => { setEmail(test.email); setPassword('password123'); setIsLoginModel(true); }}
                className="flex flex-col items-center gap-1 p-2.5 rounded-2xl bg-slate-50/50 border border-slate-100 hover:bg-white hover:border-cyan-200 transition-all group"
              >
                <span className="text-[9px] font-black text-slate-400 group-hover:text-cyan-500 transition-colors uppercase tracking-widest">{test.role}</span>
                <span className="text-[8px] font-medium text-slate-300 group-hover:text-slate-500">Demo</span>
              </button>
            ))}
          </div>
          
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
