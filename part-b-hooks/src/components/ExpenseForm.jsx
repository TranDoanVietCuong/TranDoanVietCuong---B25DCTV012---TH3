import { useEffect, useRef, useState } from 'react';
import { CATEGORIES } from '../data/expenses';
import { getToday, isValidDate } from '../utils/format';
const emptyForm = () => ({ content: '', amount: '', category: CATEGORIES[0], date: getToday() });

export default function ExpenseForm({ onAdd, disabled }) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [focusAfterAdd, setFocusAfterAdd] = useState(false);
  const inputRef = useRef(null);
  useEffect(() => {
    if (focusAfterAdd && !disabled) {
      inputRef.current.focus();
      setFocusAfterAdd(false);
    }
  }, [focusAfterAdd, disabled]);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  }
  function validate() {
    const result = {};
    const amount = Number(form.amount);
    if (!form.content.trim() || form.content.trim().length > 100) result.content = 'Nhập nội dung từ 1 đến 100 ký tự.';
    if (!Number.isInteger(amount) || amount <= 0 || amount > 1000000000) result.amount = 'Nhập số tiền nguyên từ 1 đến 1.000.000.000 đồng.';
    if (!CATEGORIES.includes(form.category)) result.category = 'Loại chi không hợp lệ.';
    if (!isValidDate(form.date)) result.date = 'Chọn ngày chi hợp lệ (từ năm 1900).';
    return result;
  }
  async function handleSubmit(event) {
    event.preventDefault();
    if (disabled) return;
    const result = validate();
    setErrors(result);
    if (Object.keys(result).length) return;
    const success = await onAdd({ ...form, content: form.content.trim(), amount: Number(form.amount) });
    if (success) {
      setForm(emptyForm());
      setFocusAfterAdd(true);
    }
  }
  return (
    <section className="panel form-panel">
      <h2>Thêm khoản chi</h2>
      <form onSubmit={handleSubmit} noValidate>
        <fieldset disabled={disabled}>
          <div className="field"><label htmlFor="content">Nội dung</label>
            <input ref={inputRef} id="content" name="content" value={form.content} onChange={handleChange} maxLength={100} />
            {errors.content && <p className="error" role="alert">{errors.content}</p>}</div>
          <div className="field"><label htmlFor="amount">Số tiền (VNĐ)</label>
            <input id="amount" name="amount" type="number" min="1" max="1000000000" step="1" value={form.amount} onChange={handleChange} />
            {errors.amount && <p className="error" role="alert">{errors.amount}</p>}</div>
          <div className="field"><label htmlFor="category">Loại chi</label>
            <select id="category" name="category" value={form.category} onChange={handleChange}>{CATEGORIES.map(item => <option key={item}>{item}</option>)}</select>
            {errors.category && <p className="error" role="alert">{errors.category}</p>}</div>
          <div className="field"><label htmlFor="date">Ngày chi</label>
            <input id="date" name="date" type="date" min="1900-01-01" max="9999-12-31" value={form.date} onChange={handleChange} />
            {errors.date && <p className="error" role="alert">{errors.date}</p>}</div>
          <button className="primary" type="submit">+ Thêm khoản chi</button>
        </fieldset>
      </form>
    </section>
  );
}
