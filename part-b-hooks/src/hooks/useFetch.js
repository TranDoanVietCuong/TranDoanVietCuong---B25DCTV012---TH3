import { useEffect, useRef, useState } from 'react';
import { CATEGORIES } from '../data/expenses';
import { isValidDate } from '../utils/format';

// Kiểm tra dữ liệu API trước khi dùng để tính tổng.
function readExpense(item) {
  const amount = Number(item.amount);
  if (!item.id || typeof item.content !== 'string' || !item.content.trim()
    || !Number.isInteger(amount) || amount <= 0 || amount > 1000000000
    || !CATEGORIES.includes(item.category) || !isValidDate(item.date)) {
    throw new Error('Dữ liệu API không đúng các trường id, content, amount, category, date.');
  }
  return { ...item, id: String(item.id), amount };
}

export default function useFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [reloadKey, setReloadKey] = useState(0);
  const busyRef = useRef(false);
  const mutationRef = useRef(null);

  useEffect(() => {
    const controller = new AbortController();
    let active = true;
    async function load() {
      setLoading(true);
      setError('');
      try {
        if (!url || url.includes('YOUR_PROJECT')) throw new Error('Chưa cấu hình MockAPI. Hãy điền VITE_API_URL trong file .env rồi khởi động lại ứng dụng.');
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) throw new Error(`Không tải được dữ liệu (HTTP ${response.status}).`);
        const result = await response.json();
        if (!Array.isArray(result)) throw new Error('API phải trả về một mảng khoản chi.');
        const expenses = result.map(readExpense);
        if (new Set(expenses.map(item => item.id)).size !== expenses.length) throw new Error('API chứa ID trùng nhau.');
        if (active) setData(expenses);
      } catch (err) {
        if (active && err.name !== 'AbortError') setError(err.message);
      } finally {
        if (active) setLoading(false);
      }
    }
    load();
    return () => { active = false; controller.abort(); };
  }, [url, reloadKey]);

  useEffect(() => () => mutationRef.current?.abort(), []);

  async function mutate(method, expenseOrId) {
    if (busyRef.current || loading) return false;
    busyRef.current = true;
    setSaving(true);
    setError('');
    const controller = new AbortController();
    mutationRef.current = controller;
    try {
      const target = method === 'POST' ? url : `${url}/${encodeURIComponent(expenseOrId)}`;
      const response = await fetch(target, {
        method,
        signal: controller.signal,
        ...(method === 'POST' ? {
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(expenseOrId),
        } : {}),
      });
      if (!response.ok) throw new Error(`Không thể ${method === 'POST' ? 'thêm' : 'xóa'} khoản chi (HTTP ${response.status}).`);
      if (method === 'POST') {
        const newExpense = readExpense(await response.json());
        if (!controller.signal.aborted) setData(prev => [newExpense, ...prev.filter(item => item.id !== newExpense.id)]);
      } else if (!controller.signal.aborted) {
        // DELETE có thể trả về 204 và không có JSON.
        setData(prev => prev.filter(item => item.id !== expenseOrId));
      }
      return !controller.signal.aborted;
    } catch (err) {
      if (!controller.signal.aborted) setError(err.message);
      return false;
    } finally {
      busyRef.current = false;
      if (!controller.signal.aborted) setSaving(false);
    }
  }

  return { data, loading, saving, error,
    reload: () => { if (!busyRef.current) setReloadKey(prev => prev + 1); },
    add: expense => mutate('POST', expense),
    remove: id => mutate('DELETE', id),
  };
}
