import { Component } from 'react';
import Header from './components/Header';
import ExpenseForm from './components/ExpenseForm';
import ExpenseFilter from './components/ExpenseFilter';
import ExpenseSearch from './components/ExpenseSearch';
import ExpenseList from './components/ExpenseList';
import ExpenseStats from './components/ExpenseStats';
import { ALL_CATEGORIES, INITIAL_EXPENSES } from './data/expenses';
import { formatMoney, getTotal } from './utils/format';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expenses: [...INITIAL_EXPENSES],
      selectedCategory: ALL_CATEGORIES,
      keyword: '',
      showClock: true,
      message: '',
    };
    this.nextId = 6;
  }

  componentDidMount() {
    this.updateDocumentTitle();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.expenses !== this.state.expenses) {
      this.updateDocumentTitle();
    }
  }

  updateDocumentTitle = () => {
    document.title = `Tổng chi: ${formatMoney(getTotal(this.state.expenses))} | Sổ chi tiêu`;
  };

  handleAdd = (expense) => {
    const newExpense = { ...expense, id: this.nextId };
    this.nextId += 1;
    this.setState((prev) => ({
      expenses: [newExpense, ...prev.expenses],
      message: `Đã thêm “${expense.content}”.`,
    }));
  };

  handleDelete = (id) => {
    if (!window.confirm('Bạn có chắc muốn xóa khoản chi này?')) return;
    this.setState((prev) => ({
      expenses: prev.expenses.filter((expense) => expense.id !== id),
      message: 'Đã xóa khoản chi.',
    }));
  };

  handleFilter = (selectedCategory) => {
    this.setState({ selectedCategory, message: '' });
  };

  handleSearch = (keyword) => {
    this.setState({ keyword, message: '' });
  };

  toggleClock = () => {
    this.setState((prev) => ({ showClock: !prev.showClock }));
  };

  render() {
    const { expenses, selectedCategory, keyword, showClock, message } = this.state;
    const searchText = keyword.trim().toLowerCase();
    const filteredExpenses = expenses.filter((expense) => {
      const matchCategory = selectedCategory === ALL_CATEGORIES || expense.category === selectedCategory;
      const matchKeyword = expense.content.toLowerCase().includes(searchText);
      return matchCategory && matchKeyword;
    });

    return (
      <div className="app">
        <Header showClock={showClock} onToggleClock={this.toggleClock} />
        <main>
          <div className="overview">
            <p>Tổng chi toàn bộ: <strong data-testid="all-total">{formatMoney(getTotal(expenses))}</strong></p>
            <p>Số khoản chi: <strong>{expenses.length}</strong></p>
          </div>
          <div className="workspace">
            <ExpenseForm onAdd={this.handleAdd} />
            <section className="panel list-panel" aria-labelledby="list-title">
              <h2 id="list-title">Danh sách khoản chi</h2>
              <ExpenseSearch onSearch={this.handleSearch} />
              <ExpenseFilter selectedCategory={selectedCategory} onChange={this.handleFilter} />
              <p className="note">Đang hiển thị {filteredExpenses.length}/{expenses.length} khoản chi.</p>
              <p className="status" role="status">{message}</p>
              <ExpenseList expenses={filteredExpenses} total={getTotal(filteredExpenses)} onDelete={this.handleDelete} />
            </section>
          </div>
          <ExpenseStats expenses={expenses} />
        </main>
        <footer>Dữ liệu lưu trong state. Tải lại trang sẽ trở về dữ liệu mẫu.</footer>
      </div>
    );
  }
}
