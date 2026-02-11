import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Layout';
import NurseDashboard from './pages/NurseDashboard';
import DoctorDashboard from './pages/DoctorDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/nurse" replace />} />
          <Route path="nurse" element={<NurseDashboard />} />
          <Route path="doctor" element={<DoctorDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
