import { useState } from 'react';
import { Activity, AlertCircle, CheckCircle } from 'lucide-react';

export default function LiverDiseaseForm({ patientId }) {
    const [formData, setFormData] = useState({
        Age: '',
        Gender: '1',
        Total_Bilirubin: '',
        Direct_Bilirubin: '',
        Alkaline_Phosphotase: '',
        Alamine_Aminotransferase: '',
        Aspartate_Aminotransferase: '',
        Total_Protiens: '',
        Albumin: '',
        Albumin_Globulin_Ratio: ''
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
                Age: parseInt(formData.Age),
                Gender: parseInt(formData.Gender),
                Total_Bilirubin: parseFloat(formData.Total_Bilirubin),
                Direct_Bilirubin: parseFloat(formData.Direct_Bilirubin),
                Alkaline_Phosphotase: parseInt(formData.Alkaline_Phosphotase),
                Alamine_Aminotransferase: parseInt(formData.Alamine_Aminotransferase),
                Aspartate_Aminotransferase: parseInt(formData.Aspartate_Aminotransferase),
                Total_Protiens: parseFloat(formData.Total_Protiens),
                Albumin: parseFloat(formData.Albumin),
                Albumin_Globulin_Ratio: parseFloat(formData.Albumin_Globulin_Ratio)
            };

            const response = await fetch('/api/v1/ml/predict/liver-disease', {
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
                            <Activity className="w-5 h-5 text-amber-500" />
                            Liver Function Metrics
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Age</label>
                                <input
                                    type="number"
                                    name="Age"
                                    required
                                    value={formData.Age}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm p-2 border"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Gender</label>
                                <select
                                    name="Gender"
                                    value={formData.Gender}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm p-2 border"
                                >
                                    <option value="1">Male</option>
                                    <option value="0">Female</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Total Bilirubin</label>
                                <input
                                    type="number"
                                    step="0.1"
                                    name="Total_Bilirubin"
                                    required
                                    value={formData.Total_Bilirubin}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm p-2 border"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Direct Bilirubin</label>
                                <input
                                    type="number"
                                    step="0.1"
                                    name="Direct_Bilirubin"
                                    required
                                    value={formData.Direct_Bilirubin}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm p-2 border"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Alkaline Phosphatase</label>
                                <input
                                    type="number"
                                    name="Alkaline_Phosphotase"
                                    required
                                    value={formData.Alkaline_Phosphotase}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm p-2 border"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Alamine Aminotransferase</label>
                                <input
                                    type="number"
                                    name="Alamine_Aminotransferase"
                                    required
                                    value={formData.Alamine_Aminotransferase}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm p-2 border"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Aspartate Aminotransferase</label>
                                <input
                                    type="number"
                                    name="Aspartate_Aminotransferase"
                                    required
                                    value={formData.Aspartate_Aminotransferase}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm p-2 border"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Total Proteins</label>
                                <input
                                    type="number"
                                    step="0.1"
                                    name="Total_Protiens"
                                    required
                                    value={formData.Total_Protiens}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm p-2 border"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Albumin</label>
                                <input
                                    type="number"
                                    step="0.1"
                                    name="Albumin"
                                    required
                                    value={formData.Albumin}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm p-2 border"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Albumin/Globulin Ratio</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    name="Albumin_Globulin_Ratio"
                                    required
                                    value={formData.Albumin_Globulin_Ratio}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm p-2 border"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50"
                            >
                                {loading ? 'Analyzing...' : 'Assess Risk'}
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
                                Assessment Result
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
                                        Risk Probability
                                    </div>
                                </div>

                                <div className="border-t border-gray-200/50 pt-4 space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Category:</span>
                                        <span className="font-bold">{result.risk_category}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Confidence:</span>
                                        <span className="font-medium">{Math.round(result.confidence * 100)}%</span>
                                    </div>
                                </div>

                                {result.risk_category === 'HIGH' || result.risk_category === 'CRITICAL' ? (
                                    <div className="flex items-start gap-2 bg-white/60 p-3 rounded text-sm text-red-700 mt-4">
                                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                        <p>Immediate medical attention recommended. Patient added to queue.</p>
                                    </div>
                                ) : (
                                    <div className="flex items-start gap-2 bg-white/60 p-3 rounded text-sm text-green-700 mt-4">
                                        <CheckCircle className="w-5 h-5 flex-shrink-0" />
                                        <p>Routine monitoring recommended.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="bg-gray-50 rounded-xl border border-dashed border-gray-300 p-8 text-center h-full flex flex-col items-center justify-center text-gray-500">
                            <Activity className="w-12 h-12 mb-3 text-gray-300" />
                            <p>Complete the form to generate risk assessment</p>
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
