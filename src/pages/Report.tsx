import { useNavigate } from 'react-router-dom';
import { FrameCard } from '../components/ui/FrameCard';
import { IcdBadge } from '../components/ui/IcdBadge';
import { SpectrogramChart } from '../components/ui/SpectrogramChart';
import { TouchButton } from '../components/ui/TouchButton';
import {
  AI_CONCLUSION,
  CLINICAL_RECOMMENDATIONS,
  MOCK_FRAMES,
  MOCK_PATIENT,
  MOCK_SPECTROGRAM,
} from '../data/mockData';
import './Report.css';

export function Report() {
  const navigate = useNavigate();

  return (
    <div className="page-content report">
      <div className="page-header">
        <div className="page-header-row">
          <div>
            <h1 className="text-title">Итоговое заключение</h1>
            <p className="page-subtitle">
              Отчёт онкоскрининга · {MOCK_PATIENT.medicalCardNumber} · {MOCK_PATIENT.screeningDate}
            </p>
          </div>
          <div className="report__header-actions">
            <TouchButton variant="secondary" size="lg">
              🖨️ Печать
            </TouchButton>
            <TouchButton variant="secondary" size="lg">
              📤 Экспорт PDF
            </TouchButton>
            <TouchButton variant="primary" size="lg" onClick={() => navigate('/dashboard')}>
              Новый осмотр
            </TouchButton>
          </div>
        </div>
      </div>

      <div className="report__body scroll-y">
        <section className="report__section card card-padding">
          <h2 className="text-heading report__section-title">Заключение ИИ</h2>
          <p className="report__conclusion">{AI_CONCLUSION}</p>
          <div className="report__diagnoses">
            <IcdBadge code="K13.1" probability={85} />
            <IcdBadge code="K13.6" probability={72} />
            <IcdBadge code="L43.0" probability={68} />
          </div>
        </section>

        <section className="report__section card card-padding">
          <h2 className="text-heading report__section-title">Клинические рекомендации</h2>
          <ol className="report__recommendations">
            {CLINICAL_RECOMMENDATIONS.map((rec, i) => (
              <li key={i}>{rec}</li>
            ))}
          </ol>
        </section>

        <section className="report__section card card-padding">
          <h2 className="text-heading report__section-title">
            Фото/видео материалы ({MOCK_FRAMES.length})
          </h2>
          <div className="report__frames-grid">
            {MOCK_FRAMES.map((frame) => (
              <FrameCard key={frame.id} frame={frame} />
            ))}
          </div>
        </section>

        <section className="report__section card card-padding">
          <h2 className="text-heading report__section-title">Спектрограммы и оценка ИИ</h2>
          <div className="report__spectrogram-block">
            <div className="report__spectrogram-chart">
              <span className="text-caption">Кадр #1 · 14:32:08</span>
              <SpectrogramChart zones={MOCK_SPECTROGRAM.zones} compact />
            </div>
            <div className="report__spectrogram-ai">
              {MOCK_SPECTROGRAM.zones.map((zone) => (
                <div key={zone.label} className="report__spectrogram-zone">
                  <span className="text-caption">{zone.label}</span>
                  {zone.icdCode !== '—' ? (
                    <IcdBadge code={zone.icdCode} probability={zone.pathologyProbability} size="sm" />
                  ) : (
                    <span className="badge badge-success">Норма · {zone.pathologyProbability}%</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="report__meta card card-padding-sm">
          <div className="report__meta-grid">
            <div>
              <span className="section-title">Пациент</span>
              <span className="text-body">{MOCK_PATIENT.medicalCardNumber}</span>
            </div>
            <div>
              <span className="section-title">Дата скрининга</span>
              <span className="text-body">{MOCK_PATIENT.screeningDate}</span>
            </div>
            <div>
              <span className="section-title">ИИ-модель</span>
              <span className="text-body">v2.4.1</span>
            </div>
            <div>
              <span className="section-title">Врач</span>
              <span className="text-body">Стоматолог · Подпись: _______</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
