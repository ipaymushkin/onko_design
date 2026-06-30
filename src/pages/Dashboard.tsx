import { useNavigate } from 'react-router-dom';
import { DeviceCard } from '../components/ui/DeviceCard';
import { TouchButton } from '../components/ui/TouchButton';
import { MOCK_DEVICES, MOCK_PATIENT } from '../data/mockData';
import './Dashboard.css';

const MODES = [
  {
    id: 'upload',
    icon: '📁',
    title: 'Загрузка материалов',
    description: 'Перезагрузка видео, фото и спектрограмм с внешних источников для анализа',
    path: '/upload',
    color: 'mode-card--blue',
  },
  {
    id: 'camera',
    icon: '📷',
    title: 'Интраоральная камера',
    description: 'Видео/фото осмотр с автоматической фиксацией кадров и разметкой зон патологии',
    path: '/camera',
    color: 'mode-card--teal',
  },
  {
    id: 'spectrometer',
    icon: '🔬',
    title: 'Спектрометр',
    description: 'Снятие спектрограмм: здоровая слизистая, граница и центр очага патологии',
    path: '/spectrometer',
    color: 'mode-card--orange',
  },
];

export function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="page-content dashboard">
      <div className="page-header">
        <h1 className="text-title">Рабочий стол</h1>
        <p className="page-subtitle">
          Пациент {MOCK_PATIENT.medicalCardNumber} · Онкоскрининг {MOCK_PATIENT.screeningDate}
        </p>
      </div>

      <div className="dashboard__body">
        <TouchButton
          variant="primary"
          size="lg"
          fullWidth
          className="dashboard__report-btn"
          onClick={() => navigate('/report')}
        >
          📋 Итоговое заключение
        </TouchButton>
        <section className="dashboard__devices">
          <h2 className="section-title">Подключённые устройства</h2>
          <div className="dashboard__devices-list">
            {MOCK_DEVICES.map((device) => (
              <DeviceCard key={device.id} device={device} />
            ))}
          </div>
          <div className="dashboard__device-hint card card-padding-sm">
            <span className="badge badge-success">● Все устройства готовы</span>
            <span className="text-caption">
              Управление фото/видео режимами — кнопками на устройствах или в интерфейсе ПО
            </span>
          </div>
        </section>

        <section className="dashboard__modes">
          <h2 className="section-title">Выберите режим снятия данных</h2>
          <div className="dashboard__modes-grid">
            {MODES.map((mode) => (
              <button
                key={mode.id}
                type="button"
                className={`mode-card ${mode.color}`}
                onClick={() => navigate(mode.path)}
              >
                <span className="mode-card__icon">{mode.icon}</span>
                <div className="mode-card__content">
                  <span className="mode-card__title">{mode.title}</span>
                  <span className="mode-card__desc">{mode.description}</span>
                </div>
                <span className="mode-card__arrow">→</span>
              </button>
            ))}
          </div>
        </section>

        <section className="dashboard__icd">
          <h2 className="section-title">Классы МКБ — детекция ИИ</h2>
          <div className="dashboard__icd-list">
            {['K13.1', 'L43.0', 'S00.5', 'K06.2', 'D10.0', 'K13.6', 'L43.9', 'D10.3'].map(
              (code) => (
                <span key={code} className="badge badge-neutral dashboard__icd-chip">
                  {code}
                </span>
              ),
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
