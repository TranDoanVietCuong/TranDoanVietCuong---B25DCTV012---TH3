import { CATEGORIES } from '../data/expenses';
import { formatMoney, getTotal } from '../utils/format';

export default function ExpenseStats({ expenses }) {
  return (
    <section className="panel statistics" aria-labelledby="stats-title">
      <h2 id="stats-title">Thống kê theo loại</h2>
      <p className="note">Tính trên toàn bộ khoản chi, không phụ thuộc bộ lọc và từ khóa.</p>
      <div className="stats-list">
        {CATEGORIES.map((category) => {
          const items = expenses.filter((expense) => expense.category === category);
          return (
            <div className="stat-item" key={category}>
              <h3>{category}</h3>
              <strong>{formatMoney(getTotal(items))}</strong>
              <span>{items.length} khoản chi</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
