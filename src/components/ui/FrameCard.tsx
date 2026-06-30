import type { CapturedFrame } from '../../data/mockData';
import { IcdBadge } from './IcdBadge';
import './FrameCard.css';

interface FrameCardProps {
  frame: CapturedFrame;
  selected?: boolean;
  onClick?: () => void;
}

export function FrameCard({ frame, selected, onClick }: FrameCardProps) {
  return (
    <button
      type="button"
      className={`frame-card ${selected ? 'frame-card--selected' : ''}`}
      onClick={onClick}
    >
      <div className="frame-card__preview">
        <div className="frame-card__placeholder">
          <span>🦷</span>
        </div>
        {frame.source === 'ai' && (
          <span className="frame-card__source badge badge-accent">ИИ</span>
        )}
        {frame.source === 'manual' && (
          <span className="frame-card__source badge badge-info">Врач</span>
        )}
      </div>
      <div className="frame-card__info">
        <div className="frame-card__meta">
          <span className="frame-card__time">{frame.timestamp}</span>
          {frame.hasSpectrogram && (
            <span className="badge badge-success">Спектр</span>
          )}
        </div>
        <IcdBadge code={frame.icdCode} probability={frame.probability} size="sm" />
      </div>
    </button>
  );
}
