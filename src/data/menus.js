// Menu riêng cho từng vai trò (khớp thiết kế Figma)
export const menus = {
  guest: [
    { to: '/trang-chu', label: 'Trang chủ' },
    { to: '/tim-kiem', label: 'Tìm kiếm phòng' },
    { to: '/o-ghep', label: 'Tìm ở ghép' },
    { to: '/chu-tro', label: 'Dành cho chủ trọ' },
  ],
  student: [
    { to: '/trang-chu', label: 'Trang chủ' },
    { to: '/tim-kiem', label: 'Tìm kiếm phòng' },
    { to: '/ban-do', label: 'Bản đồ lớn' },
    { to: '/o-ghep', label: 'Tìm ở ghép' },
    { to: '/tin-nhan', label: 'Tin nhắn' },
    { to: '/yeu-thich', label: 'Yêu thích' },
  ],
  landlord: [
    { to: '/chu-tro', label: 'Bảng điều khiển' },
    { to: '/chu-tro/lich-hen', label: 'Lịch hẹn xem phòng' },
    { to: '/tin-nhan', label: 'Tin nhắn' },
    { to: '/chu-tro/xac-minh', label: 'Xác minh' },
  ],
}
