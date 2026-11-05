import { Component } from 'react';
import { ALL_CATEGORIES, CATEGORIES } from '../data/expenses';

export default class ExpenseFilter extends Component {
  render() {
    const { selectedCategory, onChange } = this.props;
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
}
