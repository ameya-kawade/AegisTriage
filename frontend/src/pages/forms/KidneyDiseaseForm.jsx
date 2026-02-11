import { useState } from 'react';
import { Activity, AlertCircle, CheckCircle } from 'lucide-react';

export default function KidneyDiseaseForm({ patientId }) {
    const [formData, setFormData] = useState({
        Age: '',
        Blood_Pressure: '',
        Specific_Gravity: '',
        Albumin: '0',
        Sugar: '0',
        Red_Blood_Cells: '0',
        Pus_Cells: '0',
        Pus_Cell_Clumps: '0',
        Bacteria: '0',
        Blood_Glucose_Random: '',
        Blood_Urea: '',
        Serum_Creatinine: '',
        Sodium: '',
        Potassium: '',
        Hemoglobin: '',
        Packed_Cell_Volume: '',
        White_Blood_Cell_Count: '',
        Red_Blood_Cell_Count: '',
        Hypertension: '0',
        Diabetes_Mellitus: '0',
        Coronary_Artery_Disease: '0',
        Appetite: '0',
        Pedal_Edema: '0',
        Anemia: '0'
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
                Blood_Pressure: parseInt(formData.Blood_Pressure),
                Specific_Gravity: parseFloat(formData.Specific_Gravity),
                Albumin: parseInt(formData.Albumin),
                Sugar: parseInt(formData.Sugar),
                Red_Blood_Cells: parseInt(formData.Red_Blood_Cells),
                Pus_Cells: parseInt(formData.Pus_Cells),
                Pus_Cell_Clumps: parseInt(formData.Pus_Cell_Clumps),
                Bacteria: parseInt(formData.Bacteria),
                Blood_Glucose_Random: parseInt(formData.Blood_Glucose_Random),
                Blood_Urea: parseInt(formData.Blood_Urea),
                Serum_Creatinine: parseFloat(formData.Serum_Creatinine),
                Sodium: parseInt(formData.Sodium),
                Potassium: parseFloat(formData.Potassium),
                Hemoglobin: parseFloat(formData.Hemoglobin),
                Packed_Cell_Volume: parseInt(formData.Packed_Cell_Volume),
                White_Blood_Cell_Count: parseInt(formData.White_Blood_Cell_Count),
                Red_Blood_Cell_Count: parseFloat(formData.Red_Blood_Cell_Count),
                Hypertension: parseInt(formData.Hypertension),
                Diabetes_Mellitus: parseInt(formData.Diabetes_Mellitus),
                Coronary_Artery_Disease: parseInt(formData.Coronary_Artery_Disease),
                Appetite: parseInt(formData.Appetite),
                Pedal_Edema: parseInt(formData.Pedal_Edema),
                Anemia: parseInt(formData.Anemia)
            };

            const response = await fetch('/api/v1/ml/predict/kidney-disease', {
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
                            <Activity className="w-5 h-5 text-blue-500" />
                            Kidney Function Metrics
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Age</label>
                                <input type="number" name="Age" required value={formData.Age} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Blood Pressure (mm/Hg)</label>
                                <input type="number" name="Blood_Pressure" required value={formData.Blood_Pressure} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Specific Gravity</label>
                                <select name="Specific_Gravity" value={formData.Specific_Gravity} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border">
                                    <option value="">Select</option>
                                    <option value="1.005">1.005</option>
                                    <option value="1.010">1.010</option>
                                    <option value="1.015">1.015</option>
                                    <option value="1.020">1.020</option>
                                    <option value="1.025">1.025</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Albumin (0-5)</label>
                                <select name="Albumin" value={formData.Albumin} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border">
                                    <option value="0">0</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Sugar (0-5)</label>
                                <select name="Sugar" value={formData.Sugar} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border">
                                    <option value="0">0</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Red Blood Cells</label>
                                <select name="Red_Blood_Cells" value={formData.Red_Blood_Cells} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border">
                                    <option value="1">Normal</option>
                                    <option value="0">Abnormal</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Pus Cells</label>
                                <select name="Pus_Cells" value={formData.Pus_Cells} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border">
                                    <option value="1">Normal</option>
                                    <option value="0">Abnormal</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Blood Glucose Random</label>
                                <input type="number" name="Blood_Glucose_Random" required value={formData.Blood_Glucose_Random} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Blood Urea</label>
                                <input type="number" name="Blood_Urea" required value={formData.Blood_Urea} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Serum Creatinine</label>
                                <input type="number" step="0.1" name="Serum_Creatinine" required value={formData.Serum_Creatinine} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Hemoglobin</label>
                                <input type="number" step="0.1" name="Hemoglobin" required value={formData.Hemoglobin} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Potassium</label>
                                <input type="number" step="0.1" name="Potassium" required value={formData.Potassium} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Hypertension</label>
                                <select name="Hypertension" value={formData.Hypertension} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border">
                                    <option value="0">No</option>
                                    <option value="1">Yes</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Diabetes Mellitus</label>
                                <select name="Diabetes_Mellitus" value={formData.Diabetes_Mellitus} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border">
                                    <option value="0">No</option>
                                    <option value="1">Yes</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Appetite</label>
                                <select name="Appetite" value={formData.Appetite} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border">
                                    <option value="0">Good</option>
                                    <option value="1">Poor</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Pedal Edema</label>
                                <select name="Pedal_Edema" value={formData.Pedal_Edema} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border">
                                    <option value="0">No</option>
                                    <option value="1">Yes</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Anemia</label>
                                <select name="Anemia" value={formData.Anemia} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border">
                                    <option value="0">No</option>
                                    <option value="1">Yes</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex justify-end pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
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
                                        <span className="text-gray-600">CKD Detected:</span>
                                        <span className={`font-bold ${result.chronic_kidney_disease ? 'text-red-600' : 'text-green-600'}`}>
                                            {result.chronic_kidney_disease ? 'YES' : 'NO'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Confidence:</span>
                                        <span className="font-medium">{Math.round(result.confidence * 100)}%</span>
                                    </div>
                                </div>

                                {result.risk_category === 'HIGH' || result.risk_category === 'CRITICAL' ? (
                                    <div className="flex items-start gap-2 bg-white/60 p-3 rounded text-sm text-red-700 mt-4">
                                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                        <p>Immediate Nephrology consultation required. Patient prioritized.</p>
                                    </div>
                                ) : (
                                    <div className="flex items-start gap-2 bg-white/60 p-3 rounded text-sm text-green-700 mt-4">
                                        <CheckCircle className="w-5 h-5 flex-shrink-0" />
                                        <p>Kidney function appears stable.</p>
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
