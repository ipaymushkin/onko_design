import { useState } from 'react';
import { TouchButton } from '../components/ui/TouchButton';
import { TouchToggle } from '../components/ui/TouchToggle';
import './Settings.css';

export function Settings() {
  const [glareDetection, setGlareDetection] = useState(true);
  const [streamingAi, setStreamingAi] = useState(true);
  const [blurHints, setBlurHints] = useState(true);
  const [deviceMode, setDeviceMode] = useState<'camera' | 'spectrometer'>('camera');

  return (
    <div className="page-content settings">
      <div className="page-header">
        <h1 className="text-title">Настройки</h1>
        <p className="page-subtitle">Конфигурация ИИ-моделей, режимов и подключённых устройств</p>
      </div>

      <div className="settings__body scroll-y">
        <section className="settings__section card card-padding">
          <h2 className="text-heading settings__section-title">ИИ-модель</h2>
          <div className="settings__model-upload">
            <div className="settings__model-info">
              <span className="settings__model-name">Текущая модель: onko-detect v2.4.1</span>
              <span className="text-caption">Обучена на 12 400 кадрах · 8 классов МКБ</span>
            </div>
            <TouchButton variant="secondary" size="lg">
              📦 Загрузить свою модель
            </TouchButton>
          </div>
          <div className="settings__model-dropzone">
            <span className="text-caption">Форматы: .onnx, .pt, .tflite</span>
          </div>
        </section>

        <section className="settings__section card card-padding">
          <h2 className="text-heading settings__section-title">Режимы ИИ</h2>
          <div className="settings__toggles">
            <TouchToggle
              label="Распознавание бликов (доп. модель ИИ)"
              description="Автоматическое обнаружение и компенсация бликов на снимках"
              checked={glareDetection}
              onChange={setGlareDetection}
            />
            <TouchToggle
              label="Потоковый ИИ по видео"
              description="Анализ видеопотока в реальном времени с автоматической фиксацией кадров"
              checked={streamingAi}
              onChange={setStreamingAi}
            />
            <TouchToggle
              label="Подсказки при размытии кадра"
              description="Уведомления для стоматолога при обнаружении размытого изображения"
              checked={blurHints}
              onChange={setBlurHints}
            />
          </div>
        </section>

        <section className="settings__section card card-padding">
          <h2 className="text-heading settings__section-title">Режим устройства</h2>
          <p className="text-caption settings__device-hint">
            Переключение между интраоральной камерой и спектрометром
          </p>
          <div className="settings__device-switch">
            <button
              type="button"
              className={`settings__device-option ${deviceMode === 'camera' ? 'settings__device-option--active' : ''}`}
              onClick={() => setDeviceMode('camera')}
            >
              <span className="settings__device-icon">📷</span>
              <span>Интраоральная камера</span>
              <span className="badge badge-success">Подключена</span>
            </button>
            <button
              type="button"
              className={`settings__device-option ${deviceMode === 'spectrometer' ? 'settings__device-option--active' : ''}`}
              onClick={() => setDeviceMode('spectrometer')}
            >
              <span className="settings__device-icon">🔬</span>
              <span>Спектрометр</span>
              <span className="badge badge-success">Подключён</span>
            </button>
          </div>
        </section>

        <section className="settings__section card card-padding">
          <h2 className="text-heading settings__section-title">Классы МКБ</h2>
          <div className="settings__icd-grid">
            {[
              'K13.1 — Прикусывание щеки и губ',
              'L43.0 — Лишай гипертрофический красный плоский',
              'S00.5 — Поверхностная травма губы и полости рта',
              'K06.2 — Поражения десны (травма)',
              'D10.0 — Доброкач. новообразование губы',
              'K13.6 — Гиперплазия слизистой',
              'L43.9 — Лишай красный плоский неуточн.',
              'D10.3 — Доброкач. новообразование рта',
            ].map((item) => (
              <div key={item} className="settings__icd-item">
                <span className="badge badge-accent">✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="settings__section card card-padding-sm">
          <div className="settings__about">
            <span className="text-small">ОнкоСкрин v1.0.0 · СППВР для стоматологии</span>
            <span className="text-small">Разрешение: 1920×1080 · Сенсорный интерфейс</span>
          </div>
        </section>
      </div>
    </div>
  );
}
