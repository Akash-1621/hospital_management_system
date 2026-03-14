import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, TrendingUp, ArrowLeft } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import regression from 'regression';

const PatientPrediction = ({ onBack }) => {
  const [chartData, setChartData] = useState([]);
  const [highVolumeAlert, setHighVolumeAlert] = useState(false);

  useEffect(() => {
    generatePredictionData();
  }, []);

  const generatePredictionData = () => {
    // Mock historical data: last 7 days of patient volume
    const today = new Date();
    const historicalVol = [45, 52, 48, 60, 55, 65, 70]; // Example past 7 days
    
    const regressionData = historicalVol.map((vol, index) => [index, vol]);
    const result = regression.linear(regressionData);
    
    const newChartData = [];
    let highVolumeDetected = false;

    // Add historical data
    for (let i = 0; i < historicalVol.length; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - (historicalVol.length - i - 1));
      newChartData.push({
        date: d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
        actual: historicalVol[i],
        predicted: null
      });
    }

    // Add predicted data for next 3 days
    for (let i = 0; i < 3; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() + i + 1);
      const prediction = Math.round(result.predict(historicalVol.length + i)[1]);
      
      if (prediction > 75) {
        highVolumeDetected = true;
      }

      newChartData.push({
        date: d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
        actual: null,
        predicted: prediction
      });
    }

    setChartData(newChartData);
    setHighVolumeAlert(highVolumeDetected);
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
        <p className="text-slate-600 text-lg mb-8">AI-powered analytics for hospital management.</p>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
          {highVolumeAlert && (
            <div className="absolute top-0 left-0 right-0 bg-rose-500 text-white p-3 flex justify-center items-center gap-2 font-bold animate-pulse z-10">
              <AlertTriangle size={20} /> 
              High Patient Volume Expected in the coming days. Ensure adequate staffing!
            </div>
          )}
          
          <div className={`flex items-center justify-between mb-6 ${highVolumeAlert ? 'mt-12' : ''}`}>
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <TrendingUp size={20} className="text-pink-600"/> 
              7-Day Historical & 3-Day Forecast
            </h2>
          </div>
          
          <p className="text-sm text-slate-500 mb-6 font-medium max-w-3xl">
            This module uses a machine learning linear regression model trained on historical patient registration data. It identifies daily volume trends to provide a 3-day short-term forecast, helping the administration prepare resources and optimize wait times proactively.
          </p>

          <div className="h-[450px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 13, fontWeight: 600}} dy={15} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 13, fontWeight: 600}} dx={-10} />
                <Tooltip 
                  cursor={{fill: '#F8FAFC'}}
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', padding: '12px'}}
                  labelStyle={{fontWeight: 'bold', color: '#334155', marginBottom: '8px'}}
                />
                <Legend wrapperStyle={{paddingTop: '30px'}} iconType="circle" />
                <Bar name="Actual Patient Count" dataKey="actual" fill="#0EA5E9" radius={[8, 8, 0, 0]} maxBarSize={60} />
                <Bar name="Predicted Patient Count" dataKey="predicted" fill="#F43F5E" radius={[8, 8, 0, 0]} maxBarSize={60} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PatientPrediction;
