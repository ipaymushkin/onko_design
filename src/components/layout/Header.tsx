import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { TouchButton } from '../ui/TouchButton';
import './Header.css';

const NAV_ITEMS = [
  { path: '/dashboard', label: 'Главная', icon: '🏠' },
  { path: '/camera', label: 'Камера', icon: '📷' },
  { path: '/spectrometer', label: 'Спектрометр', icon: '🔬' },
  { path: '/upload', label: 'Загрузка', icon: '📁' },
  { path: '/report', label: 'Заключение', icon: '📋' },
  { path: '/settings', label: 'Настройки', icon: '⚙️' },
];

export function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="app-header">
      <div className="app-header__brand" onClick={() => navigate('/dashboard')}>
        <div className="app-header__logo">🦷</div>
        <div className="app-header__title-group">
          <span className="app-header__title">ОнкоСкрин</span>
          <span className="app-header__subtitle">СППВР · ИИ-диагностика</span>
        </div>
      </div>

      <nav className="app-header__nav">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.path}
            type="button"
            className={`app-header__nav-item ${location.pathname === item.path ? 'app-header__nav-item--active' : ''}`}
            onClick={() => navigate(item.path)}
          >
            <span className="app-header__nav-icon">{item.icon}</span>
            <span className="app-header__nav-label">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="app-header__actions">
        <TouchButton
          variant="ghost"
          size="md"
          onClick={toggleTheme}
          aria-label="Переключить тему"
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </TouchButton>
        <div className="app-header__patient">
          <span className="app-header__patient-label">Пациент</span>
          <span className="app-header__patient-id">МК-2024-0847</span>
        </div>
      </div>
    </header>
  );
}
