import type { SpectrogramZone } from '../../data/mockData';
import './SpectrogramChart.css';

interface SpectrogramChartProps {
  zones: SpectrogramZone[];
  compact?: boolean;
}

const ZONE_COLORS = [
  'var(--color-chart-line-1)',
  'var(--color-chart-line-2)',
  'var(--color-chart-line-3)',
];

function buildPath(values: number[], width: number, height: number): string {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  const step = width / (values.length - 1);

  return values
    .map((v, i) => {
      const x = i * step;
      const y = height - ((v - min) / range) * (height - 20) - 10;
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    })
    .join(' ');
}

export function SpectrogramChart({ zones, compact }: SpectrogramChartProps) {
  const width = compact ? 280 : 400;
  const height = compact ? 100 : 140;

  return (
    <div className={`spectrogram-chart ${compact ? 'spectrogram-chart--compact' : ''}`}>
      <svg viewBox={`0 0 ${width} ${height}`} className="spectrogram-chart__svg">
        {[0, 0.25, 0.5, 0.75, 1].map((ratio) => (
          <line
            key={ratio}
            x1={0}
            y1={height * ratio}
            x2={width}
            y2={height * ratio}
            className="spectrogram-chart__grid"
          />
        ))}
        {zones.map((zone, idx) => (
          <path
            key={zone.label}
            d={buildPath(zone.values, width, height)}
            fill="none"
            stroke={ZONE_COLORS[idx]}
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}
      </svg>
      <div className="spectrogram-chart__legend">
        {zones.map((zone, idx) => (
          <div key={zone.label} className="spectrogram-chart__legend-item">
            <span
              className="spectrogram-chart__legend-dot"
              style={{ background: ZONE_COLORS[idx] }}
            />
            <span className="spectrogram-chart__legend-label">{zone.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
