import { Component } from 'react';
import { formatDate, formatMoney } from '../utils/format';

export default class ExpenseItem extends Component {
  render() {
    const { expense, onDelete } = this.props;
    return (
      <tr>
        <td className="expense-content">{expense.content}</td>
        <td>{expense.category}</td>
        <td className="date-cell">{formatDate(expense.date)}</td>
        <td className="money">{formatMoney(expense.amount)}</td>
        <td><button type="button" className="delete-button"
          aria-label={`Xóa khoản chi ${expense.content}`} onClick={() => onDelete(expense.id)}>Xóa</button></td>
      </tr>
    );
  }
}
