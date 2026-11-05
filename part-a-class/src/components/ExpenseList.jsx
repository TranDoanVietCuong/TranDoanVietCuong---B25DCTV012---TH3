import { Component } from 'react';
import ExpenseItem from './ExpenseItem';
import { formatMoney } from '../utils/format';

export default class ExpenseList extends Component {
  render() {
    const { expenses, onDelete, total } = this.props;
    return (
      <>
        <div className="table-scroll">
          <table>
            <caption className="sr-only">Các khoản chi phù hợp với bộ lọc đang chọn</caption>
            <thead><tr><th scope="col">Nội dung</th><th scope="col">Loại</th><th scope="col">Ngày chi</th>
              <th scope="col" className="money">Số tiền</th><th scope="col" className="action-cell">Thao tác</th></tr></thead>
            <tbody>
              {expenses.length === 0 ? (
                <tr><td colSpan={5} className="empty">Chưa có khoản chi nào trong danh sách này.</td></tr>
              ) : expenses.map((expense) => (
                <ExpenseItem key={expense.id} expense={expense} onDelete={onDelete} />
              ))}
            </tbody>
            <tfoot><tr><th colSpan={3} scope="row">Tổng tiền theo bộ lọc</th>
              <td className="money" data-testid="filtered-total">{formatMoney(total)}</td><td /></tr></tfoot>
          </table>
        </div>
      </>
    );
  }
}
