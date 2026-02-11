import { useState } from 'react';
import { Activity, AlertCircle, CheckCircle } from 'lucide-react';

export default function HeartDiseaseForm() {
    const [formData, setFormData] = useState({
        age: '',
        sex: '1',
        chest_pain_type: '0',
        resting_bp: '',
        cholesterol: '',
        fasting_blood_sugar: '0',
        resting_ecg: '0',
        max_heart_rate: '',
        exercise_angina: '0',
        st_depression: '',
        st_slope: '1',
        major_vessels: '0',
        thalassemia: '2'
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
            // Convert types as needed by the API
            const payload = {
                age: parseInt(formData.age),
                sex: parseInt(formData.sex),
                chest_pain_type: parseInt(formData.chest_pain_type),
                resting_bp: parseInt(formData.resting_bp),
                cholesterol: parseInt(formData.cholesterol),
                fasting_blood_sugar: parseInt(formData.fasting_blood_sugar),
                resting_ecg: parseInt(formData.resting_ecg),
                max_heart_rate: parseInt(formData.max_heart_rate),
                exercise_angina: parseInt(formData.exercise_angina),
                st_depression: parseFloat(formData.st_depression),
                st_slope: parseInt(formData.st_slope),
                major_vessels: parseInt(formData.major_vessels),
                thalassemia: parseInt(formData.thalassemia)
            };

            const response = await fetch('/api/v1/ml/predict/heart-disease', {
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
                            <Activity className="w-5 h-5 text-rose-500" />
                            Patient Clinical Data
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Age</label>
                                <input
                                    type="number"
                                    name="age"
                                    required
                                    value={formData.age}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 sm:text-sm p-2 border"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Sex</label>
                                <select
                                    name="sex"
                                    value={formData.sex}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 sm:text-sm p-2 border"
                                >
                                    <option value="1">Male</option>
                                    <option value="0">Female</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Chest Pain Type</label>
                                <select
                                    name="chest_pain_type"
                                    value={formData.chest_pain_type}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 sm:text-sm p-2 border"
                                >
                                    <option value="0">Typical Angina</option>
                                    <option value="1">Atypical Angina</option>
                                    <option value="2">Non-anginal Pain</option>
                                    <option value="3">Asymptomatic</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Resting BP (mm Hg)</label>
                                <input
                                    type="number"
                                    name="resting_bp"
                                    required
                                    value={formData.resting_bp}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 sm:text-sm p-2 border"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Cholesterol (mg/dl)</label>
                                <input
                                    type="number"
                                    name="cholesterol"
                                    required
                                    value={formData.cholesterol}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 sm:text-sm p-2 border"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Fasting Blood Sugar &gt; 120</label>
                                <select
                                    name="fasting_blood_sugar"
                                    value={formData.fasting_blood_sugar}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 sm:text-sm p-2 border"
                                >
                                    <option value="0">No</option>
                                    <option value="1">Yes</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Resting ECG</label>
                                <select
                                    name="resting_ecg"
                                    value={formData.resting_ecg}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 sm:text-sm p-2 border"
                                >
                                    <option value="0">Normal</option>
                                    <option value="1">ST-T Wave Abnormality</option>
                                    <option value="2">LV Hypertrophy</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Max Heart Rate</label>
                                <input
                                    type="number"
                                    name="max_heart_rate"
                                    required
                                    value={formData.max_heart_rate}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 sm:text-sm p-2 border"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Exercise Induced Angina</label>
                                <select
                                    name="exercise_angina"
                                    value={formData.exercise_angina}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 sm:text-sm p-2 border"
                                >
                                    <option value="0">No</option>
                                    <option value="1">Yes</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">ST Depression</label>
                                <input
                                    type="number"
                                    step="0.1"
                                    name="st_depression"
                                    required
                                    value={formData.st_depression}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 sm:text-sm p-2 border"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Slope of ST Segment</label>
                                <select
                                    name="st_slope"
                                    value={formData.st_slope}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 sm:text-sm p-2 border"
                                >
                                    <option value="0">Upsloping</option>
                                    <option value="1">Flat</option>
                                    <option value="2">Downsloping</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Major Vessels (0-3)</label>
                                <select
                                    name="major_vessels"
                                    value={formData.major_vessels}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 sm:text-sm p-2 border"
                                >
                                    <option value="0">0</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Thalassemia</label>
                                <select
                                    name="thalassemia"
                                    value={formData.thalassemia}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 sm:text-sm p-2 border"
                                >
                                    <option value="1">Normal</option>
                                    <option value="2">Fixed Defect</option>
                                    <option value="3">Reversible Defect</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex justify-end pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 disabled:opacity-50"
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
                                        <p>Immediate medical attention recommended. Patient added to high priority queue.</p>
                                    </div>
                                ) : (
                                    <div className="flex items-start gap-2 bg-white/60 p-3 rounded text-sm text-green-700 mt-4">
                                        <CheckCircle className="w-5 h-5 flex-shrink-0" />
                                        <p>Standard monitoring protocol advised.</p>
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
