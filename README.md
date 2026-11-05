# Trần Đoàn Việt Cường - B25DCTV012
# ITW – Bài thực hành 03: Sổ chi tiêu cá nhân

Dự án gồm hai phiên bản React:
- **Phần A (`phan-a`):** Class Component, sử dụng dữ liệu mẫu trong code.
- **Phần B (`phan-b`):** Function Component + Hooks, sử dụng MockAPI để lưu dữ liệu.

## Yêu cầu

- Cài [Node.js](https://nodejs.org/) phiên bản **20.19+ hoặc 22.12+** (khuyên dùng Node.js 22.12+).
- Có npm (được cài kèm Node.js).

## 1. Chạy Phần A – Class Component

Mở Terminal tại thư mục `phan-a` (thư mục chứa `package.json`), chạy:

```bash
npm install
npm run dev
```

Mở đường dẫn **Local** hiện trong Terminal (thường là `http://localhost:5173/`).

- Ứng dụng chính: `/`
- Trang demo custom hook `useClock`: `/clock-demo.html`

**Lưu ý:** Phần A dùng dữ liệu mẫu, không cần kết nối MockAPI. Tải lại trang sẽ khôi phục dữ liệu ban đầu.

## 2. Chạy Phần B – Function Component + Hooks

**Bước 1: Cấu hình MockAPI**

1. Vào [mockapi.io](https://mockapi.io/), tạo project và resource tên `expenses`.
2. Resource cần có các trường: `content` (String), `amount` (Number), `category` (String), `date` (String). Trường `id` do MockAPI tự tạo.
3. Mở `.env` và thay đường dẫn bằng URL resource thực tế của bạn:

```env
VITE_API_URL=https://TEN_PROJECT.mockapi.io/api/v1/expenses
```

Có thể sử dụng dữ liệu mẫu trong `mockapi-data.json` để tạo các bản ghi trên MockAPI. `category` nhận một trong bốn giá trị: `Ăn uống`, `Đi lại`, `Học tập`, `Giải trí`; `date` có dạng `YYYY-MM-DD`.

**Bước 2: Chạy ứng dụng**

Mở Terminal tại thư mục `phan-b` (thư mục chứa `package.json`), chạy:

```bash
npm install
npm run dev
```

Mở đường dẫn **Local** hiện trong Terminal (thường là `http://localhost:5173/`). Nếu chạy đồng thời cả hai phần, Vite có thể tự chọn cổng khác, ví dụ `5174`.

**Lưu ý:** Phần B cần URL MockAPI hợp lệ để tải, thêm và xóa dữ liệu. Sau khi sửa `.env`, nhấn `Ctrl + C` để dừng server rồi chạy lại `npm run dev`.
