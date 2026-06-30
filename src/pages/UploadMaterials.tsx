import { useNavigate } from 'react-router-dom';
import { TouchButton } from '../components/ui/TouchButton';
import './UploadMaterials.css';

const UPLOAD_TYPES = [
  { id: 'video', icon: '🎬', label: 'Видео', formats: 'MP4, AVI, MOV' },
  { id: 'photo', icon: '🖼️', label: 'Фотографии', formats: 'JPG, PNG, DICOM' },
  { id: 'spectrogram', icon: '📊', label: 'Спектрограммы', formats: 'CSV, JSON, PNG' },
];

export function UploadMaterials() {
  const navigate = useNavigate();

  return (
    <div className="page-content upload-materials">
      <div className="page-header">
        <div className="page-header-row">
          <div>
            <h1 className="text-title">Загрузка материалов</h1>
            <p className="page-subtitle">
              Путь 2: загрузка видео, фото и спектрограмм с внешних источников для анализа ИИ
            </p>
          </div>
          <TouchButton variant="primary" size="lg" onClick={() => navigate('/report')}>
            Получить заключение
          </TouchButton>
        </div>
      </div>

      <div className="upload-materials__body">
        <div className="upload-materials__dropzone card">
          <div className="upload-materials__dropzone-content">
            <span className="upload-materials__dropzone-icon">📁</span>
            <h2 className="text-heading">Перетащите файлы сюда</h2>
            <p className="text-caption">или нажмите для выбора файлов с устройства / USB-накопителя</p>
            <TouchButton variant="primary" size="xl">
              Выбрать файлы
            </TouchButton>
          </div>
        </div>

        <div className="upload-materials__types">
          {UPLOAD_TYPES.map((type) => (
            <div key={type.id} className="upload-type-card card card-padding">
              <span className="upload-type-card__icon">{type.icon}</span>
              <div className="upload-type-card__info">
                <span className="upload-type-card__label">{type.label}</span>
                <span className="text-small">{type.formats}</span>
              </div>
              <span className="badge badge-neutral">0 файлов</span>
            </div>
          ))}
        </div>

        <div className="upload-materials__queue card card-padding">
          <h3 className="text-subheading">Очередь загрузки</h3>
          <div className="empty-state">
            <span className="empty-state-icon">📂</span>
            <span>Файлы не загружены</span>
            <span className="text-small">Загрузите материалы для начала анализа</span>
          </div>
        </div>

        <div className="upload-materials__info card card-padding-sm">
          <span className="section-title">Информация</span>
          <ul className="upload-materials__info-list">
            <li>После загрузки ИИ автоматически проанализирует материалы</li>
            <li>Для каждого кадра будет определена зона патологии и класс МКБ</li>
            <li>Спектрограммы будут сопоставлены с фото при наличии метаданных</li>
            <li>Результат — итоговое заключение с клиническими рекомендациями</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
