import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, Trash2, Edit, Eye, PlusCircle, ArrowLeft, 
  Activity, CheckCircle2, XCircle, Loader2 
} from 'lucide-react';

const API_BASE = 'http://localhost:5000/api/patients';

const tabs = [
  { id: 'create', label: 'Create', icon: PlusCircle, color: 'bg-emerald-500' },
  { id: 'getAll', label: 'Get All', icon: Eye, color: 'bg-blue-500' },
  { id: 'getOne', label: 'Get One', icon: Eye, color: 'bg-indigo-500' },
  { id: 'update', label: 'Update', icon: Edit, color: 'bg-amber-500' },
  { id: 'delete', label: 'Delete', icon: Trash2, color: 'bg-red-500' },
];

const defaultPatient = {
  name: 'Rahul Sharma',
  age: 35,
  gender: 'MALE',
  contact: '9876543210',
  email: 'rahul.sharma@email.com',
  address: '42 MG Road, Bangalore',
  department: 'Cardiology',
  medicalHistory: 'Hypertension, mild arrhythmia',
  status: 'ADMITTED',
  assignedDoctor: 'Dr. Priya Menon',
  photo: '',
};

const ApiTester = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('create');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Form states
  const [createForm, setCreateForm] = useState(defaultPatient);
  const [patientId, setPatientId] = useState('');
  const [updateForm, setUpdateForm] = useState({ status: 'UNDER_TREATMENT', assignedDoctor: 'Dr. Anil Kumar' });
  const [updateId, setUpdateId] = useState('');
  const [deleteId, setDeleteId] = useState('');
  const [filters, setFilters] = useState({ department: '', status: '', page: 1, limit: 10 });

  const makeRequest = async (method, url, body = null) => {
    setLoading(true);
    setError(null);
    setResponse(null);
    try {
      const options = {
        method,
        headers: { 'Content-Type': 'application/json' },
      };
      if (body) options.body = JSON.stringify(body);
      const res = await fetch(url, options);
      const data = await res.json();
      setResponse(data);
      return data;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => makeRequest('POST', API_BASE, createForm);
  
  const handleGetAll = () => {
    const params = new URLSearchParams();
    if (filters.department) params.append('department', filters.department);
    if (filters.status) params.append('status', filters.status);
    params.append('page', filters.page);
    params.append('limit', filters.limit);
    makeRequest('GET', `${API_BASE}?${params.toString()}`);
  };

  const handleGetOne = () => makeRequest('GET', `${API_BASE}/${patientId}`);
  const handleUpdate = () => makeRequest('PUT', `${API_BASE}/${updateId}`, updateForm);
  const handleDelete = () => makeRequest('DELETE', `${API_BASE}/${deleteId}`);

  const renderCreateForm = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
        POST /api/patients
      </h3>
      <p className="text-sm text-slate-500">Create a new patient record</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {Object.entries(createForm).map(([key, value]) => (
          <div key={key}>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">{key}</label>
            {key === 'gender' ? (
              <select value={value} onChange={e => setCreateForm({...createForm, [key]: e.target.value})}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400">
                <option value="MALE">MALE</option>
                <option value="FEMALE">FEMALE</option>
                <option value="OTHER">OTHER</option>
              </select>
            ) : key === 'department' ? (
              <select value={value} onChange={e => setCreateForm({...createForm, [key]: e.target.value})}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400">
                <option value="Cardiology">Cardiology</option>
                <option value="Neurology">Neurology</option>
                <option value="Orthopedics">Orthopedics</option>
                <option value="Pediatrics">Pediatrics</option>
                <option value="General Medicine">General Medicine</option>
              </select>
            ) : key === 'status' ? (
              <select value={value} onChange={e => setCreateForm({...createForm, [key]: e.target.value})}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400">
                <option value="ADMITTED">ADMITTED</option>
                <option value="DISCHARGED">DISCHARGED</option>
                <option value="UNDER_TREATMENT">UNDER_TREATMENT</option>
                <option value="CRITICAL">CRITICAL</option>
              </select>
            ) : key === 'age' ? (
              <input type="number" value={value} onChange={e => setCreateForm({...createForm, [key]: parseInt(e.target.value)})}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400" />
            ) : (
              <input type="text" value={value} onChange={e => setCreateForm({...createForm, [key]: e.target.value})}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400" />
            )}
          </div>
        ))}
      </div>
      <button onClick={handleCreate} className="mt-4 px-6 py-3 bg-emerald-500 text-white rounded-xl font-semibold hover:bg-emerald-600 transition-colors flex items-center gap-2">
        <Send size={16} /> Send Request
      </button>
    </div>
  );

  const renderGetAllForm = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-blue-500"></span>
        GET /api/patients
      </h3>
      <p className="text-sm text-slate-500">Get all patients with optional filters & pagination</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Department</label>
          <select value={filters.department} onChange={e => setFilters({...filters, department: e.target.value})}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400">
            <option value="">All Departments</option>
            <option value="Cardiology">Cardiology</option>
            <option value="Neurology">Neurology</option>
            <option value="Orthopedics">Orthopedics</option>
            <option value="Pediatrics">Pediatrics</option>
            <option value="General Medicine">General Medicine</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Status</label>
          <select value={filters.status} onChange={e => setFilters({...filters, status: e.target.value})}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400">
            <option value="">All Statuses</option>
            <option value="ADMITTED">ADMITTED</option>
            <option value="DISCHARGED">DISCHARGED</option>
            <option value="UNDER_TREATMENT">UNDER_TREATMENT</option>
            <option value="CRITICAL">CRITICAL</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Page</label>
          <input type="number" value={filters.page} min={1} onChange={e => setFilters({...filters, page: parseInt(e.target.value)})}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Limit</label>
          <input type="number" value={filters.limit} min={1} onChange={e => setFilters({...filters, limit: parseInt(e.target.value)})}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400" />
        </div>
      </div>
      <button onClick={handleGetAll} className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition-colors flex items-center gap-2">
        <Send size={16} /> Send Request
      </button>
    </div>
  );

  const renderGetOneForm = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
        GET /api/patients/:id
      </h3>
      <p className="text-sm text-slate-500">Get a single patient by ID</p>
      <div>
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Patient ID</label>
        <input type="text" value={patientId} onChange={e => setPatientId(e.target.value)} placeholder="Enter patient MongoDB ID"
          className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400" />
      </div>
      <button onClick={handleGetOne} className="mt-4 px-6 py-3 bg-indigo-500 text-white rounded-xl font-semibold hover:bg-indigo-600 transition-colors flex items-center gap-2">
        <Send size={16} /> Send Request
      </button>
    </div>
  );

  const renderUpdateForm = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-amber-500"></span>
        PUT /api/patients/:id
      </h3>
      <p className="text-sm text-slate-500">Update a patient record (partial update supported)</p>
      <div>
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Patient ID</label>
        <input type="text" value={updateId} onChange={e => setUpdateId(e.target.value)} placeholder="Enter patient MongoDB ID"
          className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-400" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Status</label>
          <select value={updateForm.status || ''} onChange={e => setUpdateForm({...updateForm, status: e.target.value})}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-400">
            <option value="ADMITTED">ADMITTED</option>
            <option value="DISCHARGED">DISCHARGED</option>
            <option value="UNDER_TREATMENT">UNDER_TREATMENT</option>
            <option value="CRITICAL">CRITICAL</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Assigned Doctor</label>
          <input type="text" value={updateForm.assignedDoctor || ''} onChange={e => setUpdateForm({...updateForm, assignedDoctor: e.target.value})}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-400" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Department</label>
          <select value={updateForm.department || ''} onChange={e => setUpdateForm({...updateForm, department: e.target.value})}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-400">
            <option value="">No Change</option>
            <option value="Cardiology">Cardiology</option>
            <option value="Neurology">Neurology</option>
            <option value="Orthopedics">Orthopedics</option>
            <option value="Pediatrics">Pediatrics</option>
            <option value="General Medicine">General Medicine</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Medical History</label>
          <input type="text" value={updateForm.medicalHistory || ''} onChange={e => setUpdateForm({...updateForm, medicalHistory: e.target.value})}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-400" />
        </div>
      </div>
      <button onClick={handleUpdate} className="mt-4 px-6 py-3 bg-amber-500 text-white rounded-xl font-semibold hover:bg-amber-600 transition-colors flex items-center gap-2">
        <Send size={16} /> Send Request
      </button>
    </div>
  );

  const renderDeleteForm = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-red-500"></span>
        DELETE /api/patients/:id
      </h3>
      <p className="text-sm text-slate-500">Delete a patient record by ID</p>
      <div>
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Patient ID</label>
        <input type="text" value={deleteId} onChange={e => setDeleteId(e.target.value)} placeholder="Enter patient MongoDB ID"
          className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-400" />
      </div>
      <button onClick={handleDelete} className="mt-4 px-6 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-colors flex items-center gap-2">
        <Trash2 size={16} /> Delete Patient
      </button>
    </div>
  );

  const renderForm = () => {
    switch (activeTab) {
      case 'create': return renderCreateForm();
      case 'getAll': return renderGetAllForm();
      case 'getOne': return renderGetOneForm();
      case 'update': return renderUpdateForm();
      case 'delete': return renderDeleteForm();
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-slate-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="p-2 rounded-xl hover:bg-slate-100 transition-colors">
              <ArrowLeft size={20} className="text-slate-600" />
            </button>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center">
              <Activity className="text-white w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900">CareSphere API Tester</h1>
              <p className="text-xs text-slate-400">Patient Management Module</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-xs font-semibold text-emerald-700">Connected</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Tabs */}
          <div className="lg:w-56 flex lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setResponse(null); setError(null); }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left whitespace-nowrap transition-all text-sm font-medium ${
                  activeTab === tab.id
                    ? 'bg-white shadow-lg shadow-slate-200/50 text-slate-900 border border-slate-100'
                    : 'text-slate-500 hover:bg-white/60 hover:text-slate-700'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg ${tab.color} flex items-center justify-center`}>
                  <tab.icon size={16} className="text-white" />
                </div>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Main Content */}
          <div className="flex-1 space-y-6">
            {/* Request Panel */}
            <motion.div 
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6"
            >
              {renderForm()}
            </motion.div>

            {/* Response Panel */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                <h3 className="font-bold text-slate-800">Response</h3>
                {loading && <Loader2 size={16} className="animate-spin text-blue-500" />}
                {response?.success && <CheckCircle2 size={16} className="text-emerald-500" />}
                {(error || response?.success === false) && <XCircle size={16} className="text-red-500" />}
              </div>
              <div className="p-6">
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 size={32} className="animate-spin text-blue-500" />
                  </div>
                ) : error ? (
                  <div className="bg-red-50 border border-red-100 rounded-xl p-4">
                    <p className="text-red-600 text-sm font-medium">{error}</p>
                  </div>
                ) : response ? (
                  <pre className="bg-slate-900 text-emerald-400 rounded-xl p-4 text-sm overflow-auto max-h-[500px] font-mono leading-relaxed">
                    {JSON.stringify(response, null, 2)}
                  </pre>
                ) : (
                  <div className="text-center py-12 text-slate-400">
                    <Send size={32} className="mx-auto mb-3 opacity-50" />
                    <p className="text-sm">Send a request to see the response</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiTester;
