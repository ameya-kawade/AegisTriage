import { useState } from 'react';
import { Heart, Activity, Droplets, Utensils, Thermometer } from 'lucide-react';
import HeartDiseaseForm from './forms/HeartDiseaseForm';
import LiverDiseaseForm from './forms/LiverDiseaseForm';

export default function NurseDashboard() {
    const [activeTab, setActiveTab] = useState('heart');

    const tabs = [
        { id: 'heart', label: 'Heart Disease', icon: Heart, color: 'text-rose-500' },
        { id: 'liver', label: 'Liver Disease', icon: Activity, color: 'text-amber-500' },
        { id: 'kidney', label: 'Kidney Disease', icon: Droplets, color: 'text-blue-500' },
        { id: 'diabetes', label: 'Diabetes', icon: Utensils, color: 'text-emerald-500' },
        { id: 'vitals', label: 'General Vitals', icon: Thermometer, color: 'text-purple-500' },
    ];

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
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
                    {activeTab === 'heart' ? (
                        <HeartDiseaseForm />
                    ) : activeTab === 'liver' ? (
                        <LiverDiseaseForm />
                    ) : (
                        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                            <h3 className="text-lg font-medium text-gray-900">
                                {tabs.find(t => t.id === activeTab)?.label} Assessment Form
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                                Implementation pending for this module.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
