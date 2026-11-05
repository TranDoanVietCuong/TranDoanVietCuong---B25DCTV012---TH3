import useClock from '../hooks/useClock';

export default function ClockWithHook() {
  const time = useClock();
  return (
    <div className="clock">
      <time>{time.toLocaleTimeString('vi-VN', { hour12: false })}</time>
      <span>{time.toLocaleDateString('vi-VN')}</span>
    </div>
  );
}
