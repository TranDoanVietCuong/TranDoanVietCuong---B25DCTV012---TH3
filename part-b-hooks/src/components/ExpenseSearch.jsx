import { useEffect, useState } from 'react';
export default function ExpenseSearch({ onSearch }) {
  const [keyword, setKeyword] = useState('');
  useEffect(() => {
    const timer = setTimeout(() => onSearch(keyword), 400);
    return () => clearTimeout(timer);
  }, [keyword, onSearch]);
  return <div className="search-box"><label htmlFor="search">Tìm theo nội dung</label>
    <input id="search" type="search" value={keyword} onChange={e => setKeyword(e.target.value)} placeholder="Nhập nội dung cần tìm..." /></div>;
}
