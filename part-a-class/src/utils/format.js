export function formatMoney(amount) {
  return amount.toLocaleString('vi-VN') + ' đ';
}

export function getTotal(expenses) {
  return expenses.reduce((sum, expense) => sum + expense.amount, 0);
}

export function getToday() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${now.getFullYear()}-${month}-${day}`;
}

export function formatDate(value) {
  const [year, month, day] = value.split('-');
  return `${day}/${month}/${year}`;
}

export function isValidDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T12:00:00`);
  if (Number.isNaN(date.getTime())) return false;
  const [year, month, day] = value.split('-').map(Number);
  return year >= 1900 && year <= 9999 && date.getFullYear() === year
    && date.getMonth() + 1 === month && date.getDate() === day;
}
