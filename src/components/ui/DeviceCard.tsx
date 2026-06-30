import type { DeviceStatus } from '../../data/mockData';
import './DeviceCard.css';

interface DeviceCardProps {
  device: DeviceStatus;
}

export function DeviceCard({ device }: DeviceCardProps) {
  return (
    <div className={`device-card ${device.connected ? 'device-card--connected' : 'device-card--disconnected'}`}>
      <div className="device-card__icon">
        {device.id === 'camera' ? '📷' : '🔬'}
      </div>
      <div className="device-card__info">
        <span className="device-card__name">{device.name}</span>
        <span className="device-card__model">{device.model}</span>
      </div>
      <div className="device-card__status">
        <span className={`device-card__dot ${device.connected ? 'pulse-dot' : ''}`} />
        <span>{device.connected ? 'Подключено' : 'Не подключено'}</span>
      </div>
    </div>
  );
}
