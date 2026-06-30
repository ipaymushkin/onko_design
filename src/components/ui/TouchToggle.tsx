import './TouchToggle.css';

interface TouchToggleProps {
  label: string;
  description?: string;
  checked: boolean;
  onChange?: (checked: boolean) => void;
}

export function TouchToggle({ label, description, checked, onChange }: TouchToggleProps) {
  return (
    <label className="touch-toggle">
      <div className="touch-toggle__info">
        <span className="touch-toggle__label">{label}</span>
        {description && <span className="touch-toggle__desc">{description}</span>}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        className={`touch-toggle__switch ${checked ? 'touch-toggle__switch--on' : ''}`}
        onClick={() => onChange?.(!checked)}
      >
        <span className="touch-toggle__thumb" />
      </button>
    </label>
  );
}
