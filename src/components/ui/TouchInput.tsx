import type { InputHTMLAttributes } from 'react';
import './TouchInput.css';

interface TouchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
}

export function TouchInput({ label, hint, className = '', id, ...props }: TouchInputProps) {
  const inputId = id ?? label.replace(/\s+/g, '-').toLowerCase();

  return (
    <div className={`touch-input ${className}`}>
      <label htmlFor={inputId} className="touch-input__label">
        {label}
      </label>
      <input
        id={inputId}
        className="touch-input__field"
        inputMode={props.type === 'number' ? 'numeric' : props.inputMode}
        {...props}
      />
      {hint && <span className="touch-input__hint">{hint}</span>}
    </div>
  );
}
