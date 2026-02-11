import { useState, useEffect } from 'react';
import {
    Users,
    AlertTriangle,
    Activity,
    Clock,
    CheckCircle,
    MoreVertical,
    Bed,
    Wind
} from 'lucide-react';

export default function DoctorDashboard() {
    const [queue, setQueue] = useState([]);
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [queueRes, resourcesRes] = await Promise.all([
                    fetch('/api/v1/triage/queue'),
                    fetch('/api/v1/resources/status')
                ]);

                if (queueRes.ok && resourcesRes.ok) {
                    const queueData = await queueRes.json();
                    const resourcesData = await resourcesRes.json();
                    setQueue(queueData);
                    setResources(resourcesData);
                }
            } catch (error) {
                console.error('Failed to fetch dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        // Poll every 30 seconds
        const interval = setInterval(fetchData, 30000);
        return () => clearInterval(interval);
    }, []);

    const getRiskColor = (category) => {
        switch (category?.toUpperCase()) {
            case 'CRITICAL': return 'bg-red-100 text-red-800 border-red-200';
            case 'HIGH': return 'bg-orange-100 text-orange-800 border-orange-200';
            case 'MEDIUM': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'LOW': return 'bg-green-100 text-green-800 border-green-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const stats = [
        { label: 'Total Patients', value: queue.length, icon: Users, color: 'text-blue-500', bg: 'bg-blue-50' },
        { label: 'Critical Cases', value: queue.filter(p => p.risk_category === 'CRITICAL' || p.risk_category === 'HIGH').length, icon: AlertTriangle, color: 'text-red-500', bg: 'bg-red-50' },
        { label: 'Avg Wait Time', value: '14 min', icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50' },
        { label: 'Resources Available', value: '85%', icon: Activity, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex items-center">
                            <div className={`p-3 rounded-lg ${stat.bg} mr-4`}>
                                <Icon className={`w-6 h-6 ${stat.color}`} />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Priority Queue */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-gray-900">Priority Triage Queue</h3>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            Live Updates
                        </span>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assessment</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Level</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Wait Time</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {queue.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-12 text-center text-gray-500 text-sm">
                                            No patients in the queue.
                                        </td>
                                    </tr>
                                ) : (
                                    queue.map((patient) => (
                                        <tr key={patient.patient_id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold">
                                                        {patient.name.charAt(0)}
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                                                        <div className="text-sm text-gray-500">{patient.age} yrs • {patient.gender}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900 capitalize">{patient.disease_type || 'General'}</div>
                                                <div className="text-sm text-gray-500">
                                                    Score: {(patient.risk_score * 100).toFixed(0)}%
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full border ${getRiskColor(patient.risk_category)}`}>
                                                    {patient.risk_category || 'PENDING'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {patient.wait_time_minutes} min
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button className="text-blue-600 hover:text-blue-900 font-medium">Admit</button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Resource Status */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900">Hospital Resources</h3>
                    </div>
                    <div className="p-6 space-y-6">
                        {resources.map((resource, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                        {resource.resource_type.includes('Ventilator') ? <Wind className="w-4 h-4" /> : <Bed className="w-4 h-4" />}
                                        {resource.resource_type}
                                    </span>
                                    <span className="text-sm font-medium text-gray-900">
                                        {resource.available} / {resource.total_capacity} Available
                                    </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                    <div
                                        className={`h-2.5 rounded-full ${(resource.used / resource.total_capacity) > 0.8 ? 'bg-red-500' :
                                            (resource.used / resource.total_capacity) > 0.5 ? 'bg-amber-500' : 'bg-emerald-500'
                                            }`}
                                        style={{ width: `${(resource.used / resource.total_capacity) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}

                        <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200 text-sm text-gray-600">
                            <h4 className="font-semibold text-gray-800 mb-2">Optimization Suggestion</h4>
                            <p>Calculated using OR-Tools (Simulated):</p>
                            <ul className="list-disc pl-5 mt-1 space-y-1">
                                <li>Allocate Bed #302 to Patient <strong>{queue[0]?.name}</strong> (Critical).</li>
                                <li>Discharge pending for Bed #105.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
