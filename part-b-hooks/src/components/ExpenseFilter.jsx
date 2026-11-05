import { ALL_CATEGORIES, CATEGORIES } from '../data/expenses';

export default function ExpenseFilter({ selectedCategory, onChange }) {
  return (
    <div className="filters" role="group" aria-label="Lọc khoản chi theo loại">
      {[ALL_CATEGORIES, ...CATEGORIES].map((category) => (
        <button key={category} type="button" aria-pressed={selectedCategory === category}
          className={`filter-button ${selectedCategory === category ? 'active' : ''}`}
          onClick={() => onChange(category)}>{category}</button>
      ))}
    </div>
  );
}
