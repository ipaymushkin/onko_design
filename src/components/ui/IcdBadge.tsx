import { getIcdLabel } from '../../data/icdCodes';
import './IcdBadge.css';

interface IcdBadgeProps {
  code: string;
  probability: number;
  size?: 'sm' | 'md';
}

function getProbabilityClass(probability: number): string {
  if (probability >= 75) return 'probability-high';
  if (probability >= 50) return 'probability-medium';
  return 'probability-low';
}

export function IcdBadge({ code, probability, size = 'md' }: IcdBadgeProps) {
  return (
    <div className={`icd-badge icd-badge--${size}`}>
      <div className="icd-badge__header">
        <span className="icd-badge__code">{code}</span>
        <span className={`icd-badge__prob ${getProbabilityClass(probability)}`}>
          {probability}%
        </span>
      </div>
      <span className="icd-badge__name">{getIcdLabel(code).split(' — ')[1]}</span>
      <div className="probability-bar">
        <div
          className={`probability-bar-fill ${getProbabilityClass(probability)}`}
          style={{ width: `${probability}%` }}
        />
      </div>
    </div>
  );
}
