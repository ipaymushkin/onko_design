import { Navigate, Route, Routes } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { CameraExam } from './pages/CameraExam';
import { Dashboard } from './pages/Dashboard';
import { PatientEntry } from './pages/PatientEntry';
import { Report } from './pages/Report';
import { Settings } from './pages/Settings';
import { SpectrometerExam } from './pages/SpectrometerExam';
import { UploadMaterials } from './pages/UploadMaterials';

export default function App() {
  return (
    <div className="app-router">
      <Routes>
        <Route path="/" element={<PatientEntry />} />
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/camera" element={<CameraExam />} />
          <Route path="/spectrometer" element={<SpectrometerExam />} />
          <Route path="/upload" element={<UploadMaterials />} />
          <Route path="/report" element={<Report />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
