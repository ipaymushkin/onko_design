import type { ButtonHTMLAttributes, ReactNode } from 'react';
import './TouchButton.css';

type TouchButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
type TouchButtonSize = 'md' | 'lg' | 'xl';

interface TouchButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: TouchButtonVariant;
  size?: TouchButtonSize;
  icon?: ReactNode;
  fullWidth?: boolean;
}

export function TouchButton({
  variant = 'primary',
  size = 'lg',
  icon,
  fullWidth,
  children,
  className = '',
  ...props
}: TouchButtonProps) {
  return (
    <button
      className={`touch-btn touch-btn--${variant} touch-btn--${size} ${fullWidth ? 'touch-btn--full' : ''} ${className}`}
      {...props}
    >
      {icon && <span className="touch-btn__icon">{icon}</span>}
      {children && <span className="touch-btn__label">{children}</span>}
    </button>
  );
}
