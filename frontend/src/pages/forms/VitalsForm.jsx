import { useState } from 'react';
import { Thermometer, Activity, Heart, Wind, Droplets } from 'lucide-react';

export default function VitalsForm({ patientId }) {
    const [formData, setFormData] = useState({
        Body_Temperature: '',
        Pulse_Rate: '',
        Respiration_Rate: '',
        Systolic_BP: '',
        Diastolic_BP: '',
        Oxygen_Saturation: ''
    });

    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const payload = {
                patient_id: patientId,
                Body_Temperature: parseFloat(formData.Body_Temperature),
                Pulse_Rate: parseInt(formData.Pulse_Rate),
                Respiration_Rate: parseInt(formData.Respiration_Rate),
                Systolic_BP: parseInt(formData.Systolic_BP),
                Diastolic_BP: parseInt(formData.Diastolic_BP),
                Oxygen_Saturation: parseFloat(formData.Oxygen_Saturation)
            };

            const response = await fetch('/api/v1/ml/predict/vitals', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error('Failed to get prediction');
            }

            const data = await response.json();
            setResult(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                            <Activity className="w-5 h-5 text-purple-500" />
                            General Vitals Data
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Body Temperature (°C)</label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Thermometer className="h-4 w-4 text-gray-400" />
                                    </div>
                                    <input type="number" step="0.1" name="Body_Temperature" required value={formData.Body_Temperature} onChange={handleChange} className="focus:ring-purple-500 focus:border-purple-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md p-2 border" placeholder="37.0" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Pulse Rate (bpm)</label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Heart className="h-4 w-4 text-gray-400" />
                                    </div>
                                    <input type="number" name="Pulse_Rate" required value={formData.Pulse_Rate} onChange={handleChange} className="focus:ring-purple-500 focus:border-purple-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md p-2 border" placeholder="72" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Respiration Rate (bpm)</label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Wind className="h-4 w-4 text-gray-400" />
                                    </div>
                                    <input type="number" name="Respiration_Rate" required value={formData.Respiration_Rate} onChange={handleChange} className="focus:ring-purple-500 focus:border-purple-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md p-2 border" placeholder="16" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Oxygen Saturation (%)</label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Droplets className="h-4 w-4 text-gray-400" />
                                    </div>
                                    <input type="number" step="0.1" name="Oxygen_Saturation" required value={formData.Oxygen_Saturation} onChange={handleChange} className="focus:ring-purple-500 focus:border-purple-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md p-2 border" placeholder="98" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Systolic BP (mmHg)</label>
                                <input type="number" name="Systolic_BP" required value={formData.Systolic_BP} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm p-2 border" placeholder="120" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Diastolic BP (mmHg)</label>
                                <input type="number" name="Diastolic_BP" required value={formData.Diastolic_BP} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm p-2 border" placeholder="80" />
                            </div>
                        </div>

                        <div className="flex justify-end pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50"
                            >
                                {loading ? 'Analyzing...' : 'Assess Vitals'}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Results Panel */}
                <div className="md:col-span-1">
                    {result ? (
                        <div className={`rounded-xl shadow-lg border p-6 ${result.risk_category === 'HIGH' || result.risk_category === 'CRITICAL'
                            ? 'bg-red-50 border-red-200'
                            : result.risk_category === 'MEDIUM'
                                ? 'bg-amber-50 border-amber-200'
                                : 'bg-green-50 border-green-200'
                            }`}>
                            <h4 className={`text-lg font-bold mb-2 ${result.risk_category === 'HIGH' || result.risk_category === 'CRITICAL'
                                ? 'text-red-800'
                                : result.risk_category === 'MEDIUM'
                                    ? 'text-amber-800'
                                    : 'text-green-800'
                                }`}>
                                Vitals Assessment
                            </h4>

                            <div className="space-y-4">
                                <div className="text-center py-4">
                                    <div className={`text-4xl font-extrabold ${result.risk_category === 'HIGH' || result.risk_category === 'CRITICAL'
                                        ? 'text-red-600'
                                        : result.risk_category === 'MEDIUM'
                                            ? 'text-amber-600'
                                            : 'text-green-600'
                                        }`}>
                                        {Math.round(result.risk_score * 100)}%
                                    </div>
                                    <div className="text-sm font-medium text-gray-500 uppercase tracking-wide mt-1">
                                        Risk Score
                                    </div>
                                </div>

                                <div className="border-t border-gray-200/50 pt-4 space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Category:</span>
                                        <span className="font-bold">{result.risk_category}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Model Version:</span>
                                        <span className="font-mono text-xs">{result.model_version}</span>
                                    </div>
                                </div>

                                {result.risk_category === 'HIGH' || result.risk_category === 'CRITICAL' ? (
                                    <div className="bg-white/60 p-3 rounded text-sm text-red-700 mt-4">
                                        <p className="font-semibold">Abnormal Vitals Detected</p>
                                        <p>Immediate attention recommended.</p>
                                    </div>
                                ) : (
                                    <div className="bg-white/60 p-3 rounded text-sm text-green-700 mt-4">
                                        <p className="font-semibold">Vitals Stable</p>
                                        <p>Within normal physiological ranges.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="bg-gray-50 rounded-xl border border-dashed border-gray-300 p-8 text-center h-full flex flex-col items-center justify-center text-gray-500">
                            <Activity className="w-12 h-12 mb-3 text-gray-300" />
                            <p>Enter vitals to generate assessment</p>
                        </div>
                    )}

                    {error && (
                        <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-md border border-red-200 text-sm">
                            Error: {error}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
