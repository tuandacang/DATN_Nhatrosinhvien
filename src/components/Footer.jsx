import { Link } from 'react-router-dom'

const columns = [
  {
    title: 'Khu vực trường lớn',
    items: [
      'Quanh ĐH Bách Khoa - Xây Dựng - KTQD',
      'Quanh ĐHQG Hà Nội - Sư Phạm - Ngoại Ngữ',
      'Quanh Học viện Ngoại Giao - Ngoại Thương',
      'Quanh ĐH Thủy Lợi - Công Đoàn - Ngân Hàng',
    ],
  },
  {
    title: 'Hỗ trợ sinh viên',
    items: [
      'Cẩm nang thuê trọ an toàn',
      'Mẫu hợp đồng thuê phòng chuẩn',
      'Quy chuẩn giá điện nước sinh viên',
      'Báo cáo phòng lừa đảo / cọc ảo',
    ],
  },
  {
    title: 'Dành cho chủ trọ',
    items: [
      'Quy định đăng tin chính chủ',
      'Xác thực giấy tờ phòng trọ',
      'Bảng điều khiển quản lý phòng',
      'Hotline CSKH: 1900 6868',
    ],
  },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__cols">
          <div className="footer__brand">
            <Link to="/trang-chu" className="footer__logo">
              TroGanTruong
            </Link>
            <p>
              Hệ thống kết nối phòng trọ, căn hộ mini uy tín, an toàn và minh
              bạch dành riêng cho cộng đồng sinh viên các trường đại học tại Hà
              Nội.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4>{col.title}</h4>
              <ul>
                {col.items.map((text) => (
                  <li key={text}>{text}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer__bottom">
          <p>
            © 2025 TroGanTruong.vn - Đồng hành cùng tân sinh viên và người thuê
            trọ Hà Nội.
          </p>
          <div className="footer__links">
            <span>Chính sách bảo mật</span>
            <span>Điều khoản dịch vụ</span>
            <span>Liên hệ quản trị</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
