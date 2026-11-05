# ITW – Bài thực hành 03 – Phần B

**Ứng dụng:** Sổ chi tiêu cá nhân – React Function Component và Hooks.

## Hooks khắc phục những hạn chế của Class Component như thế nào?

- **`useState`:** Ở Phần A, các trạng thái được khai báo trong `this.state` và cập nhật bằng `this.setState`. Sang Phần B, `useState` giúp quản lý từng trạng thái rõ ràng hơn, không cần dùng `this` hay constructor.
- **`useEffect`:** Thay cho việc chia logic giữa `componentDidMount`, `componentDidUpdate` và `componentWillUnmount`. Ví dụ: cập nhật tiêu đề tab khi tổng chi thay đổi, chạy đồng hồ và dọn dẹp `setInterval`, hoặc hủy `setTimeout` của ô tìm kiếm debounce.
- **Custom Hooks `useFetch` và `useClock`:** Tách phần gọi MockAPI (GET/POST/DELETE, trạng thái đang tải, lỗi) và phần đồng hồ ra khỏi giao diện. Nhờ đó component ngắn hơn, dễ đọc và dễ tái sử dụng logic.
- **`useRef`:** Giúp focus lại ô nhập nội dung sau khi thêm khoản chi thành công mà không cần thao tác DOM thủ công như `document.querySelector`.
- **`useContext`:** Quản lý chế độ sáng/tối thông qua `ThemeContext`, tránh phải truyền trạng thái và hàm đổi giao diện qua nhiều cấp props.

**Kết luận:** So với Class Component ở Phần A, Function Component kết hợp Hooks giúp giảm mã lặp, quản lý state và tác vụ phụ dễ hơn, đồng thời tách biệt logic với phần giao diện. Hai phần vẫn đáp ứng cùng chức năng chính của ứng dụng sổ chi tiêu.
