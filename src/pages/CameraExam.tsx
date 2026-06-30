import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FrameCard } from '../components/ui/FrameCard';
import { IcdBadge } from '../components/ui/IcdBadge';
import { TouchButton } from '../components/ui/TouchButton';
import { MOCK_FRAMES } from '../data/mockData';
import './CameraExam.css';

export function CameraExam() {
  const navigate = useNavigate();
  const [selectedFrame, setSelectedFrame] = useState(MOCK_FRAMES[0].id);
  const [isRecording, setIsRecording] = useState(true);
  const [streamingAi, setStreamingAi] = useState(true);

  const selected = MOCK_FRAMES.find((f) => f.id === selectedFrame) ?? MOCK_FRAMES[0];

  return (
    <div className="page-content camera-exam">
      <div className="page-header">
        <div className="page-header-row">
          <div>
            <h1 className="text-title">Осмотр — интраоральная камера</h1>
            <p className="page-subtitle">
              Автоматическая фиксация кадров с разметкой зон патологии и оценкой по МКБ
            </p>
          </div>
          <div className="camera-exam__header-actions">
            <TouchButton
              variant={streamingAi ? 'success' : 'secondary'}
              size="md"
              onClick={() => setStreamingAi(!streamingAi)}
            >
              {streamingAi ? '🤖 ИИ-поток: ВКЛ' : '🤖 ИИ-поток: ВЫКЛ'}
            </TouchButton>
            <TouchButton variant="primary" size="lg" onClick={() => navigate('/spectrometer')}>
              🔬 Спектрограмма
            </TouchButton>
            <TouchButton variant="secondary" size="lg" onClick={() => navigate('/report')}>
              Завершить осмотр
            </TouchButton>
          </div>
        </div>
      </div>

      <div className="camera-exam__body">
        <div className="camera-exam__video-area">
          <div className="camera-exam__video card">
            <div className="camera-exam__video-placeholder">
              <span className="camera-exam__video-icon">📷</span>
              <span className="text-caption">Видеопоток интраоральной камеры</span>
              {isRecording && (
                <span className="camera-exam__rec badge badge-danger recording-indicator">
                  ● REC
                </span>
              )}
            </div>

            {streamingAi && (
              <>
                <div className="detection-box" style={{ top: '25%', left: '30%', width: '35%', height: '40%' }}>
                  <span className="detection-label">K13.1 — 85%</span>
                </div>
                <div className="detection-box" style={{ top: '55%', left: '55%', width: '25%', height: '25%' }}>
                  <span className="detection-label">K13.6 — 72%</span>
                </div>
              </>
            )}

            <div className="camera-exam__video-overlay">
              <span className="badge badge-accent">OralCam Pro X2</span>
              {streamingAi && <span className="badge badge-success">ИИ активен</span>}
            </div>
          </div>

          <div className="camera-exam__controls">
            <TouchButton
              variant={isRecording ? 'danger' : 'primary'}
              size="lg"
              onClick={() => setIsRecording(!isRecording)}
            >
              {isRecording ? '⏹ Остановить' : '▶ Начать запись'}
            </TouchButton>
            <TouchButton variant="secondary" size="lg">
              📸 Зафиксировать кадр
            </TouchButton>
            <TouchButton variant="ghost" size="md">
              💡 Подсказка: при размытии — стабилизируйте камеру
            </TouchButton>
          </div>
        </div>

        <div className="camera-exam__sidebar">
          <div className="camera-exam__ai-panel card card-padding">
            <h3 className="text-subheading">Текущая детекция ИИ</h3>
            <div className="camera-exam__ai-badges">
              <IcdBadge code="K13.1" probability={85} />
              <IcdBadge code="K13.6" probability={72} />
            </div>
          </div>

          <div className="camera-exam__frames card card-padding flex-1">
            <div className="camera-exam__frames-header">
              <h3 className="text-subheading">Зафиксированные кадры</h3>
              <span className="badge badge-neutral">{MOCK_FRAMES.length} шт.</span>
            </div>
            <div className="camera-exam__frames-list scroll-y">
              {MOCK_FRAMES.map((frame) => (
                <FrameCard
                  key={frame.id}
                  frame={frame}
                  selected={selectedFrame === frame.id}
                  onClick={() => setSelectedFrame(frame.id)}
                />
              ))}
            </div>
          </div>

          {selected && (
            <div className="camera-exam__selected card card-padding-sm">
              <span className="text-small">Выбран кадр {selected.timestamp}</span>
              <IcdBadge code={selected.icdCode} probability={selected.probability} size="sm" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
