import { useEffect, useState } from 'react';
import Header from './components/Header';
import ExpenseForm from './components/ExpenseForm';
import ExpenseFilter from './components/ExpenseFilter';
import ExpenseSearch from './components/ExpenseSearch';
import ExpenseList from './components/ExpenseList';
import ExpenseStats from './components/ExpenseStats';
import useFetch from './hooks/useFetch';
import { ALL_CATEGORIES } from './data/expenses';
import { formatMoney, getTotal } from './utils/format';

const API = (import.meta.env.VITE_API_URL || '').trim().replace(/\/+$/, '');
export default function App() {
  const { data: expenses, loading, saving, error, reload, add, remove } = useFetch(API);
  const [selectedCategory, setSelectedCategory] = useState(ALL_CATEGORIES);
  const [keyword, setKeyword] = useState('');
  const [showClock, setShowClock] = useState(true);
  const [message, setMessage] = useState('');
  const total = getTotal(expenses);
  useEffect(() => { document.title = `Tổng chi: ${formatMoney(total)} | Sổ chi tiêu`; }, [total]);
  const filteredExpenses = expenses.filter(item =>
    (selectedCategory === ALL_CATEGORIES || item.category === selectedCategory)
    && item.content.toLowerCase().includes(keyword.trim().toLowerCase()));

  async function handleAdd(expense) {
    setMessage('');
    const success = await add(expense);
    if (success) setMessage(`Đã thêm “${expense.content}”.`);
    return success;
  }
  async function handleDelete(id) {
    if (saving || !window.confirm('Bạn có chắc muốn xóa khoản chi này?')) return;
    setMessage('');
    if (await remove(id)) setMessage('Đã xóa khoản chi.');
  }
  return (
    <div className="app">
      <Header showClock={showClock} onToggleClock={() => setShowClock(prev => !prev)} />
      <main>
        {error && <div className="error-box" role="alert"><p>{error}</p><button disabled={saving || loading} onClick={reload}>Tải lại dữ liệu</button></div>}
        {loading ? <p role="status">Đang tải dữ liệu...</p> : <>
          <div className="overview"><p>Tổng chi toàn bộ: <strong data-testid="all-total">{formatMoney(total)}</strong></p><p>Số khoản chi: <strong>{expenses.length}</strong></p></div>
          <div className="workspace">
            <ExpenseForm onAdd={handleAdd} disabled={saving || !API || API.includes('YOUR_PROJECT')} />
            <section className="panel list-panel">
              <h2>Danh sách khoản chi</h2>
              <ExpenseSearch onSearch={setKeyword} />
              <ExpenseFilter selectedCategory={selectedCategory} onChange={setSelectedCategory} />
              <p className="note">Đang hiển thị {filteredExpenses.length}/{expenses.length} khoản chi.</p>
              <p className="status" role="status">{saving ? 'Đang lưu thay đổi...' : message}</p>
              <fieldset disabled={saving}>
                <ExpenseList expenses={filteredExpenses} total={getTotal(filteredExpenses)} onDelete={handleDelete} />
              </fieldset>
            </section>
          </div>
          <ExpenseStats expenses={expenses} />
        </>}
      </main>
      <footer>Sổ chi tiêu cá nhân</footer>
    </div>
  );
}
