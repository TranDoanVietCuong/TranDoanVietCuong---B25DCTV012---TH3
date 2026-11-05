import { getToday } from '../utils/format';

export const CATEGORIES = ['Ăn uống', 'Đi lại', 'Học tập', 'Giải trí'];
export const ALL_CATEGORIES = 'Tất cả';

export const INITIAL_EXPENSES = [
  { id: 1, content: 'Ăn sáng', amount: 30000, category: 'Ăn uống', date: getToday() },
  { id: 2, content: 'Đổ xăng', amount: 50000, category: 'Đi lại', date: getToday() },
  { id: 3, content: 'Mua giáo trình', amount: 85000, category: 'Học tập', date: getToday() },
  { id: 4, content: 'Xem phim', amount: 70000, category: 'Giải trí', date: getToday() },
  { id: 5, content: 'Cơm trưa', amount: 35000, category: 'Ăn uống', date: getToday() },
];
