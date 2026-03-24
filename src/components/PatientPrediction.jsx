import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, TrendingUp, ArrowLeft, Users, Activity } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';

const PatientPrediction = ({ onBack }) => {
  const [chartData, setChartData] = useState([]);
  const [highVolumeAlert, setHighVolumeAlert] = useState(false);
  const [loading, setLoading] = useState(true);
  const [peakDay, setPeakDay] = useState(null);
  const [totalPredicted, setTotalPredicted] = useState(0);

  useEffect(() => {
    fetchRealPredictionData();
  }, []);

  const fetchRealPredictionData = async () => {
    try {
      // Fetch real appointment data from MongoDB (last 30 days)
      const res = await fetch('http://localhost:5000/api/patient-prediction');
      const data = await res.json();
      if (data.success) {
        const maxPredicted = Math.max(...data.data.filter(d => d.predicted).map(d => d.predicted));
        const total = data.data.filter(d => d.predicted).reduce((sum, d) => sum + d.predicted, 0);
        const peak = data.data.find(d => d.predicted === maxPredicted);
        setPeakDay(peak?.date);
        setTotalPredicted(total);
        setHighVolumeAlert(maxPredicted > 75);
        setChartData(data.data);
      }
    } catch (err) {
      console.error('Prediction fetch failed', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8 pt-32">
      <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} className="max-w-6xl mx-auto bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors mb-6 font-semibold"
        >
          <ArrowLeft size={20} /> Back to Dashboard
        </button>

        <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-2">Patient Influx Prediction (ML)</h1>
        <p className="text-slate-600 text-lg mb-8">AI-powered analytics using real MongoDB appointment data.</p>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="p-5 rounded-2xl bg-blue-50 border border-blue-100">
            <div className="flex items-center gap-2 text-blue-700 font-bold text-sm mb-1"><Users size={16}/> Total Predicted (30 days)</div>
            <p className="text-3xl font-black text-blue-600">{loading ? '...' : totalPredicted}</p>
          </div>
          <div className="p-5 rounded-2xl bg-rose-50 border border-rose-100">
            <div className="flex items-center gap-2 text-rose-700 font-bold text-sm mb-1"><TrendingUp size={16}/> Peak Volume Day</div>
            <p className="text-2xl font-black text-rose-600">{loading ? '...' : (peakDay || 'N/A')}</p>
          </div>
          <div className={`p-5 rounded-2xl border ${highVolumeAlert ? 'bg-amber-50 border-amber-200' : 'bg-emerald-50 border-emerald-100'}`}>
            <div className={`flex items-center gap-2 font-bold text-sm mb-1 ${highVolumeAlert ? 'text-amber-700' : 'text-emerald-700'}`}>
              <Activity size={16}/> Alert Status
            </div>
            <p className={`text-xl font-black ${highVolumeAlert ? 'text-amber-600' : 'text-emerald-600'}`}>
              {loading ? '...' : (highVolumeAlert ? '⚠ High Volume Expected' : '✓ Normal Volume')}
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
          {highVolumeAlert && (
            <div className="absolute top-0 left-0 right-0 bg-rose-500 text-white p-3 flex justify-center items-center gap-2 font-bold animate-pulse z-10">
              <AlertTriangle size={20} /> 
              High Patient Volume Expected! Ensure adequate staffing and resources.
            </div>
          )}
          
          <div className={`flex items-center justify-between mb-4 ${highVolumeAlert ? 'mt-12' : ''}`}>
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <TrendingUp size={20} className="text-pink-600"/> 
              30-Day Historical & 30-Day Forecast
            </h2>
            <span className="text-xs font-bold px-3 py-1 bg-pink-50 text-pink-700 border border-pink-200 rounded-full">Live MongoDB Data</span>
          </div>
          
          <p className="text-sm text-slate-500 mb-6 font-medium max-w-3xl">
            Linear regression model trained on the <strong>last 30 days of real patient appointment data</strong> from MongoDB Atlas. Predicts daily patient volume for the <strong>next 30 days</strong> to help administration prepare resources and optimize wait times.
          </p>

          {loading ? (
            <div className="h-[450px] flex items-center justify-center">
              <p className="text-slate-400 animate-pulse font-semibold">Loading real data from MongoDB...</p>
            </div>
          ) : (
            <div className="h-[450px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 11, fontWeight: 600}} dy={15} interval={4} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 13, fontWeight: 600}} dx={-10} />
                  <Tooltip 
                    cursor={{fill: '#F8FAFC'}}
                    contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', padding: '12px'}}
                    labelStyle={{fontWeight: 'bold', color: '#334155', marginBottom: '8px'}}
                  />
                  <Legend wrapperStyle={{paddingTop: '30px'}} iconType="circle" />
                  <ReferenceLine y={75} stroke="#F43F5E" strokeDasharray="5 5" label={{ value: 'High Volume Threshold', fill: '#F43F5E', fontSize: 11 }} />
                  <Bar name="Actual Patient Count" dataKey="actual" fill="#0EA5E9" radius={[6, 6, 0, 0]} maxBarSize={40} />
                  <Bar name="Predicted Patient Count" dataKey="predicted" fill="#F43F5E" radius={[6, 6, 0, 0]} maxBarSize={40} fillOpacity={0.85} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default PatientPrediction;
