import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import Clock from './Clock';
export default function Header({ showClock, onToggleClock }) {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <header className="header">
      <h1>Sổ chi tiêu cá nhân</h1>
      <div className="header-tools">
        {showClock && <Clock />}
        <button type="button" onClick={onToggleClock}>{showClock ? 'Ẩn đồng hồ' : 'Hiện đồng hồ'}</button>
        <button type="button" onClick={toggleTheme}>{theme === 'light' ? 'Chế độ tối' : 'Chế độ sáng'}</button>
      </div>
    </header>
  );
}
