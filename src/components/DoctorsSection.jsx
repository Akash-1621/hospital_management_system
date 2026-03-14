import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Stethoscope, Phone, Mail, CheckCircle2, XCircle } from 'lucide-react';

const DoctorsSection = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/doctors`);
        const data = await res.json();
        if (data.success) {
          setDoctors(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch doctors", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  return (
    <section id="doctors" className="section-padding relative overflow-hidden bg-slate-50/50">
      <div className="absolute inset-0 mesh-bg opacity-30" />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-600 text-sm font-semibold mb-6">
            <Stethoscope size={14} />
            Doctors
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-slate-800">
            Our <span className="text-gradient">Doctors</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Meet our team of experienced and dedicated medical professionals.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <p className="text-xl text-slate-500 animate-pulse">Loading amazing doctors...</p>
          </div>
        ) : doctors.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors.map((doctor, index) => (
              <motion.div
                key={doctor._id || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className={`glass-card-hover p-6 group relative border-2 transition-all ${doctor.isAvailable ? 'border-transparent' : 'border-rose-100 bg-rose-50/10'}`}
              >
                {!doctor.isAvailable && (
                  <div className="absolute top-4 right-4 flex flex-col items-end gap-1 text-right">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-100 text-rose-700 text-[10px] font-bold uppercase tracking-wider">
                      <XCircle size={12} /> Unavailable
                    </span>
                    {doctor.unavailabilityReason && (
                       <span className="text-[10px] text-rose-500 max-w-[120px] truncate leading-tight font-medium bg-white/60 px-2 py-0.5 rounded backdrop-blur-sm" title={doctor.unavailabilityReason}>
                           {doctor.unavailabilityReason}
                       </span>
                    )}
                  </div>
                )}
                {doctor.isAvailable && (
                   <div className="absolute top-4 right-4">
                     <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase tracking-wider">
                        <CheckCircle2 size={12} /> Available
                     </span>
                   </div>
                )}

                <div className="flex items-start gap-4 mb-4 mt-2">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${doctor.color || 'from-cyan-500 to-blue-600'} flex items-center justify-center shadow-lg shrink-0 ${!doctor.isAvailable && 'grayscale opacity-80'}`}>
                    <span className="text-lg font-bold text-white" style={{color: 'white'}}>{doctor.avatar || doctor.name.substring(0,2)}</span>
                  </div>
                  <div className="pr-12">
                    <h3 className={`text-lg font-bold ${doctor.isAvailable ? 'text-slate-800' : 'text-slate-600'}`}>{doctor.name}</h3>
                    <p className={`text-sm font-semibold ${doctor.isAvailable ? 'text-cyan-600' : 'text-slate-500'}`}>{doctor.department}</p>
                  </div>
                </div>

                <div className="space-y-2 text-sm text-slate-600">
                  <p><span className="font-medium text-slate-700">Specialization:</span> {doctor.specialization}</p>
                  <p><span className="font-medium text-slate-700">Experience:</span> {doctor.experience}</p>
                  <div className="flex items-center gap-2">
                    <Phone size={14} className="text-slate-400" />
                    <span>{doctor.contact}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail size={14} className="text-slate-400" />
                    <span>{doctor.email}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
             <p className="text-slate-500 text-lg">No doctors found. Please run the seed script to populate doctors.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default DoctorsSection;
