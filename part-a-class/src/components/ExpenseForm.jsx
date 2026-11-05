import { Component } from 'react';
import { CATEGORIES } from '../data/expenses';
import { getToday, isValidDate } from '../utils/format';

export default class ExpenseForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '', amount: '', category: CATEGORIES[0], date: getToday(), errors: {},
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState((prev) => ({
      [name]: value,
      errors: { ...prev.errors, [name]: '' },
    }));
  };

  validate() {
    const { content, amount, category, date } = this.state;
    const errors = {};
    const money = Number(amount);
    if (!content.trim()) errors.content = 'Vui lòng nhập nội dung.';
    if (content.trim().length > 100) errors.content = 'Nội dung tối đa 100 ký tự.';
    if (!amount.trim() || !Number.isInteger(money) || money <= 0 || money > 1000000000) {
      errors.amount = 'Số tiền phải là số nguyên từ 1 đến 1.000.000.000 đồng.';
    }
    if (!CATEGORIES.includes(category)) errors.category = 'Loại chi không hợp lệ.';
    if (!isValidDate(date)) errors.date = 'Vui lòng chọn ngày hợp lệ (từ năm 1900).';
    return errors;
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const errors = this.validate();
    this.setState({ errors });
    if (Object.keys(errors).length > 0) return;

    const { content, amount, category, date } = this.state;
    this.props.onAdd({ content: content.trim(), amount: Number(amount), category, date });
    this.setState({ content: '', amount: '', category: CATEGORIES[0], date: getToday() });
  };

  render() {
    const { content, amount, category, date, errors } = this.state;
    return (
      <section className="panel form-panel" aria-labelledby="form-title">
        <h2 id="form-title">Thêm khoản chi</h2>
        <form onSubmit={this.handleSubmit} noValidate>
          <div className="field">
            <label htmlFor="content">Nội dung</label>
            <input id="content" name="content" value={content} onChange={this.handleChange}
              maxLength={100} placeholder="Ví dụ: Mua giáo trình" required />
            {errors.content && <p className="error" id="content-error" role="alert">{errors.content}</p>}
          </div>
          <div className="field">
            <label htmlFor="amount">Số tiền (VNĐ)</label>
            <input id="amount" name="amount" type="number" min="1" max="1000000000" step="1"
              value={amount} onChange={this.handleChange} placeholder="Ví dụ: 50000" required />
            {errors.amount && <p className="error" id="amount-error" role="alert">{errors.amount}</p>}
          </div>
          <div className="field">
            <label htmlFor="category">Loại chi</label>
            <select id="category" name="category" value={category} onChange={this.handleChange}>
              {CATEGORIES.map((item) => <option key={item}>{item}</option>)}
            </select>
            {errors.category && <p className="error" role="alert">{errors.category}</p>}
          </div>
          <div className="field">
            <label htmlFor="date">Ngày chi</label>
            <input id="date" name="date" type="date" min="1900-01-01" max="9999-12-31"
              value={date} onChange={this.handleChange} required />
            {errors.date && <p className="error" id="date-error" role="alert">{errors.date}</p>}
          </div>
          <button className="primary" type="submit">+ Thêm khoản chi</button>
        </form>
      </section>
    );
  }
}
