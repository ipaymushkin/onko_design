import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TouchButton } from '../components/ui/TouchButton';
import { TouchInput } from '../components/ui/TouchInput';
import { MOCK_PATIENT } from '../data/mockData';
import './PatientEntry.css';

export function PatientEntry() {
  const navigate = useNavigate();
  const [cardNumber, setCardNumber] = useState(MOCK_PATIENT.medicalCardNumber);
  const [screeningDate, setScreeningDate] = useState('2025-06-30');

  return (
    <div className="patient-entry">
      <div className="patient-entry__bg" />

      <div className="patient-entry__card card card-elevated">
        <div className="patient-entry__header">
          <div className="patient-entry__logo">🦷</div>
          <h1 className="text-title">ОнкоСкрин</h1>
          <p className="patient-entry__desc">
            Система поддержки принятия врачебных решений на основе ИИ для диагностики
            предраковых заболеваний и рака слизистой оболочки полости рта
          </p>
        </div>

        <div className="patient-entry__form">
          <TouchInput
            label="Номер медицинской карты"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="Введите номер медкарты"
            inputMode="text"
          />
          <TouchInput
            label="Дата онкоскрининга"
            type="date"
            value={screeningDate}
            onChange={(e) => setScreeningDate(e.target.value)}
          />
        </div>

        <div className="patient-entry__actions">
          <TouchButton
            variant="primary"
            size="xl"
            fullWidth
            onClick={() => navigate('/dashboard')}
          >
            Начать осмотр
          </TouchButton>
        </div>

        <div className="patient-entry__footer">
          <span className="text-small">Версия ПО 1.0.0 · ИИ-модель v2.4.1</span>
        </div>
      </div>
    </div>
  );
}
