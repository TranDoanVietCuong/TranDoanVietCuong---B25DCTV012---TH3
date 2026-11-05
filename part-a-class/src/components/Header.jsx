import { Component } from 'react';
import Clock from './Clock';

export default class Header extends Component {
  render() {
    const { showClock, onToggleClock } = this.props;
    return (
      <header className="header">
        <h1>Sổ chi tiêu cá nhân</h1>
        <div className="header-tools">
          {showClock && <Clock />}
          <button type="button" onClick={onToggleClock} aria-expanded={showClock}>
            {showClock ? 'Ẩn đồng hồ' : 'Hiện đồng hồ'}
          </button>
        </div>
      </header>
    );
  }
}
