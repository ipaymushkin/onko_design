import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IcdBadge } from '../components/ui/IcdBadge';
import { SpectrogramChart } from '../components/ui/SpectrogramChart';
import { TouchButton } from '../components/ui/TouchButton';
import { MOCK_SPECTROGRAM } from '../data/mockData';
import './SpectrometerExam.css';

const ZONE_LABELS = [
  { id: 'healthy', label: 'Зона здоровой слизистой', icon: '✅' },
  { id: 'border', label: 'Граница очага патологии', icon: '⚠️' },
  { id: 'center', label: 'Центр очага патологии', icon: '🔴' },
];

export function SpectrometerExam() {
  const navigate = useNavigate();
  const [activeZone, setActiveZone] = useState<string | null>('border');
  const [capturedZones, setCapturedZones] = useState<string[]>(['healthy']);

  const toggleCapture = (zoneId: string) => {
    setCapturedZones((prev) =>
      prev.includes(zoneId) ? prev.filter((z) => z !== zoneId) : [...prev, zoneId],
    );
  };

  return (
    <div className="page-content spectrometer-exam">
      <div className="page-header">
        <div className="page-header-row">
          <div>
            <h1 className="text-title">Спектрометр</h1>
            <p className="page-subtitle">
              Снятие спектрограмм по трём зонам для кадра · ИИ-оценка патологии
            </p>
          </div>
          <div className="spectrometer-exam__header-actions">
            <TouchButton variant="secondary" size="lg" onClick={() => navigate('/camera')}>
              📷 К камере
            </TouchButton>
            <TouchButton variant="primary" size="lg" onClick={() => navigate('/report')}>
              Завершить
            </TouchButton>
          </div>
        </div>
      </div>

      <div className="spectrometer-exam__body">
        <div className="spectrometer-exam__main">
          <div className="spectrometer-exam__preview card">
            <div className="spectrometer-exam__preview-content">
              <span className="spectrometer-exam__preview-icon">🔬</span>
              <span className="text-caption">Режим спектрометра · SpecOral S-300</span>
              <span className="badge badge-accent">Кадр #1 · 14:32:08</span>
            </div>
          </div>

          <div className="card card-padding">
            <h3 className="text-subheading">Зоны снятия спектрограммы</h3>
            <p className="text-caption spectrometer-exam__zones-hint">
              Наведите спектрометр на зону и нажмите кнопку на устройстве или кнопку ниже
            </p>
            <div className="spectrometer-exam__zones-grid">
              {ZONE_LABELS.map((zone) => (
                <button
                  key={zone.id}
                  type="button"
                  className={`spectrometer-zone ${activeZone === zone.id ? 'spectrometer-zone--active' : ''} ${capturedZones.includes(zone.id) ? 'spectrometer-zone--captured' : ''}`}
                  onClick={() => setActiveZone(zone.id)}
                >
                  <span className="spectrometer-zone__icon">{zone.icon}</span>
                  <span className="spectrometer-zone__label">{zone.label}</span>
                  {capturedZones.includes(zone.id) ? (
                    <span className="badge badge-success">Снято</span>
                  ) : (
                    <TouchButton
                      variant="secondary"
                      size="md"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleCapture(zone.id);
                      }}
                    >
                      Снять
                    </TouchButton>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="spectrometer-exam__results">
          <div className="card card-padding">
            <h3 className="text-subheading">Спектрограмма</h3>
            <SpectrogramChart zones={MOCK_SPECTROGRAM.zones} />
          </div>

          <div className="card card-padding spectrometer-exam__ai-results">
            <h3 className="text-subheading">Оценка ИИ по зонам</h3>
            <div className="spectrometer-exam__zone-results">
              {MOCK_SPECTROGRAM.zones.map((zone) => (
                <div key={zone.label} className="spectrometer-exam__zone-result">
                  <div className="spectrometer-exam__zone-result-header">
                    <span className="text-caption">{zone.label}</span>
                    <span
                      className={`spectrometer-exam__prob ${zone.pathologyProbability >= 70 ? 'probability-high' : zone.pathologyProbability >= 40 ? 'probability-medium' : 'probability-low'}`}
                    >
                      {zone.pathologyProbability}%
                    </span>
                  </div>
                  {zone.icdCode !== '—' && (
                    <IcdBadge code={zone.icdCode} probability={zone.pathologyProbability} size="sm" />
                  )}
                  {zone.icdCode === '—' && (
                    <span className="badge badge-success">Норма</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="card card-padding-sm spectrometer-exam__summary">
            <span className="section-title">Итог по кадру</span>
            <p className="text-body">
              Вероятность патологии в центре очага: <strong>88%</strong>. Рекомендуется
              спектрограмма для оставшихся кадров.
            </p>
            <div className="spectrometer-exam__progress">
              <span className="text-small">Прогресс: 1/4 кадров со спектрограммой</span>
              <div className="probability-bar">
                <div className="probability-bar-fill probability-medium" style={{ width: '25%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
