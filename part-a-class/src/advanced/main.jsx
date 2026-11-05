import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import ClockWithHook from './ClockWithHook';
import '../styles.css';

function ClockDemo() {
  const [show, setShow] = useState(true);
  return (
    <main className="app clock-demo">
      <section className="panel">
        <h1>Ví dụ custom Hook useClock</h1>
        <p>Đồng hồ dùng useState và useEffect. Khi ẩn, component bị gỡ và bộ đếm được dọn dẹp.</p>
        {show && <ClockWithHook />}
        <button type="button" onClick={() => setShow((prev) => !prev)}>
          {show ? 'Ẩn đồng hồ' : 'Hiện đồng hồ'}
        </button>
        <p><a href="./">Về ứng dụng phần A</a></p>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode><ClockDemo /></StrictMode>,
);
