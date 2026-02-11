import { useState, useEffect } from 'react';
import { Heart, Activity, Droplets, Utensils, Thermometer, User, PlusCircle } from 'lucide-react';
import HeartDiseaseForm from './forms/HeartDiseaseForm';
import LiverDiseaseForm from './forms/LiverDiseaseForm';
import KidneyDiseaseForm from './forms/KidneyDiseaseForm';
import DiabetesForm from './forms/DiabetesForm';
import VitalsForm from './forms/VitalsForm';
import PatientRegistration from './forms/PatientRegistration';

export default function NurseDashboard() {
    const [activeTab, setActiveTab] = useState('heart');
    const [patients, setPatients] = useState([]);
    const [selectedPatientId, setSelectedPatientId] = useState('');
    const [showRegistration, setShowRegistration] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPatients();
    }, []);

    const fetchPatients = async () => {
        try {
            const response = await fetch('/api/v1/patients/');
            if (response.ok) {
                const data = await response.json();
                setPatients(data);
                // Select first patient or most recent?
                if (data.length > 0 && !selectedPatientId) {
                    setSelectedPatientId(data[0].patient_id);
                }
            }
        } catch (error) {
            console.error('Failed to fetch patients', error);
        } finally {
            setLoading(false);
        }
    };

    const handlePatientCreated = (newPatient) => {
        setPatients(prev => [newPatient, ...prev]);
        setSelectedPatientId(newPatient.patient_id);
    };

    const tabs = [
        { id: 'heart', label: 'Heart Disease', icon: Heart, color: 'text-rose-500' },
        { id: 'liver', label: 'Liver Disease', icon: Activity, color: 'text-amber-500' },
        { id: 'kidney', label: 'Kidney Disease', icon: Droplets, color: 'text-blue-500' },
        { id: 'diabetes', label: 'Diabetes', icon: Utensils, color: 'text-emerald-500' },
        { id: 'vitals', label: 'General Vitals', icon: Thermometer, color: 'text-purple-500' },
    ];

    return (
        <div className="space-y-6">
            {/* Patient Selection Header */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <div className="bg-blue-100 p-2 rounded-full">
                        <User className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                        <label className="block text-xs font-medium text-gray-500 uppercase">Active Patient</label>
                        <select
                            value={selectedPatientId}
                            onChange={(e) => setSelectedPatientId(e.target.value)}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                        >
                            <option value="" disabled>Select a patient...</option>
                            {patients.map(p => (
                                <option key={p.patient_id} value={p.patient_id}>
                                    {p.name} ({p.age}y / {p.gender})
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <button
                    onClick={() => setShowRegistration(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium w-full sm:w-auto justify-center"
                >
                    <PlusCircle className="w-4 h-4" />
                    New Patient
                </button>
            </div>

            {showRegistration && (
                <PatientRegistration
                    onPatientCreated={handlePatientCreated}
                    onClose={() => setShowRegistration(false)}
                />
            )}

            <div className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden ${!selectedPatientId ? 'opacity-50 pointer-events-none' : ''}`}>
                <div className="border-b border-gray-200 bg-gray-50">
                    <nav className="flex overflow-x-auto" aria-label="Tabs">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`
                    group relative min-w-0 flex-1 overflow-hidden py-4 px-4 text-center text-sm font-medium hover:bg-gray-100 focus:z-10 focus:outline-none cursor-pointer
                    ${activeTab === tab.id ? 'text-gray-900 bg-white border-b-2 border-blue-500' : 'text-gray-500 border-b-2 border-transparent'}
                  `}
                                >
                                    <div className="flex items-center justify-center gap-2">
                                        <Icon className={`w-4 h-4 ${tab.color}`} />
                                        <span>{tab.label}</span>
                                    </div>
                                </button>
                            );
                        })}
                    </nav>
                </div>

                <div className="p-6">
                    {!selectedPatientId ? (
                        <div className="text-center py-12">
                            <p className="text-gray-500">Please select or register a patient to start assessment.</p>
                        </div>
                    ) : (
                        <>
                            {activeTab === 'heart' ? (
                                <HeartDiseaseForm patientId={selectedPatientId} />
                            ) : activeTab === 'liver' ? (
                                <LiverDiseaseForm patientId={selectedPatientId} />
                            ) : activeTab === 'kidney' ? (
                                <KidneyDiseaseForm patientId={selectedPatientId} />
                            ) : activeTab === 'diabetes' ? (
                                <DiabetesForm patientId={selectedPatientId} />
                            ) : activeTab === 'vitals' ? (
                                <VitalsForm patientId={selectedPatientId} />
                            ) : null}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
