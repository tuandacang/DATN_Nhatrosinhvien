// Dữ liệu phòng trọ mẫu cho các trang sinh viên (thay bằng API khi có backend)
import { featuredRooms } from './rooms.js'

// Các trường đại học (toạ độ gần đúng) dùng cho bản đồ và bộ lọc bán kính
export const universities = [
  { name: 'ĐH Mỏ Địa Chất', lat: 21.0734, lng: 105.7738 },
  { name: 'ĐH Bách Khoa', lat: 21.0054, lng: 105.8431 },
  { name: 'ĐH Kinh Tế Quốc Dân', lat: 21.0007, lng: 105.8433 },
  { name: 'ĐH Xây Dựng', lat: 21.0027, lng: 105.8426 },
  { name: 'ĐH Sư Phạm Hà Nội', lat: 21.0377, lng: 105.7834 },
  { name: 'ĐHQG Hà Nội', lat: 21.0385, lng: 105.7821 },
  { name: 'Học viện Ngoại Giao', lat: 21.0247, lng: 105.8010 },
]

const extra = [
  { id: 1, type: 'studio', area: 28, address: 'Ngõ 25 Tạ Quang Bửu, Hai Bà Trưng', amenities: ['Điều hòa', 'Nóng lạnh', 'Máy giặt chung', 'Giờ giấc tự do', 'Ban công'], x: 62, y: 58 },
  { id: 2, type: 'gacxep', area: 24, address: 'Ngõ 12 Trần Đại Nghĩa, Hai Bà Trưng', amenities: ['Thang máy', 'Khóa vân tay', 'Điều hòa', 'Nóng lạnh', 'Chỗ để xe'], x: 48, y: 66 },
  { id: 3, type: 'khepkin', area: 30, address: 'Phố Lê Thanh Nghị, Hai Bà Trưng', amenities: ['Cửa sổ lớn', 'Công tơ riêng', 'An ninh 24/7', 'Điều hòa', 'Vệ sinh khép kín'], x: 70, y: 72 },
]

const base = featuredRooms.map((r) => ({ ...r, ...extra.find((e) => e.id === r.id) }))

const more = [
  { id: 4, school: 'ĐH Mỏ Địa Chất', distance: 300, title: 'Phòng Khép Kín Ngõ 54 Phố Viên, Bắc Từ Liêm', desc: 'Gần cổng trường, sạch sẽ, có chỗ nấu ăn riêng, wifi miễn phí.', price: 2.5, type: 'khepkin', area: 25, address: 'Ngõ 54 Phố Viên, Bắc Từ Liêm', amenities: ['Vệ sinh khép kín', 'Wifi miễn phí', 'Bếp riêng', 'Nóng lạnh', 'Chỗ để xe'], x: 22, y: 30, lat: 21.0747, lng: 105.7757 },
  { id: 5, school: 'ĐH Mỏ Địa Chất', distance: 650, title: 'Chung Cư Mini Full Đồ Đức Thắng', desc: 'Phòng mới xây, có thang máy, camera an ninh, giờ giấc tự do.', price: 3.6, type: 'studio', area: 30, address: 'Đức Thắng, Bắc Từ Liêm', amenities: ['Thang máy', 'Camera an ninh', 'Điều hòa', 'Máy giặt riêng', 'Giờ giấc tự do'], x: 30, y: 22, lat: 21.0718, lng: 105.7706 },
  { id: 6, school: 'ĐH Kinh Tế Quốc Dân', distance: 400, title: 'Phòng Trọ Giá Rẻ Phố Minh Khai', desc: 'Phòng 20m², điện nước giá nhà nước, chủ nhà thân thiện.', price: 2.2, type: 'gacxep', area: 20, address: 'Phố Minh Khai, Hai Bà Trưng', amenities: ['Điện nước giá nhà nước', 'Nóng lạnh', 'Wifi miễn phí', 'Chỗ để xe'], x: 55, y: 50 },
  { id: 7, school: 'ĐH Sư Phạm Hà Nội', distance: 550, title: 'Studio Có Bếp Riêng Xuân Thủy', desc: 'Studio sáng sủa, bếp và máy giặt riêng, yên tĩnh phù hợp học tập.', price: 4.0, type: 'studio', area: 32, address: 'Xuân Thủy, Cầu Giấy', amenities: ['Bếp riêng', 'Máy giặt riêng', 'Điều hòa', 'Ban công', 'Camera an ninh'], x: 38, y: 40 },
  { id: 8, school: 'Học viện Ngoại Giao', distance: 700, title: 'Phòng Ở Ghép 2 Người Láng Hạ', desc: 'Phòng rộng 35m² dành cho 2 bạn, chia đôi tiền phòng cực nhẹ nhàng.', price: 1.8, type: 'ghep', area: 35, address: 'Láng Hạ, Đống Đa', amenities: ['Điều hòa', 'Nóng lạnh', 'Wifi miễn phí', 'Giường tủ đầy đủ'], x: 44, y: 78 },

  { id: 9, school: 'ĐH Mỏ Địa Chất', distance: 200, title: 'Phòng Trọ Sát Cổng Trường Mỏ Địa Chất', desc: 'Chỉ 3 phút đi bộ tới giảng đường, phòng sạch, chủ nhà ở cùng.', price: 1.8, type: 'gacxep', area: 18, address: 'Ngõ 18 Phố Viên, Bắc Từ Liêm', amenities: ['Wifi miễn phí', 'Nóng lạnh', 'Chỗ để xe', 'Giờ giấc tự do'], x: 50, y: 50, lat: 21.0739, lng: 105.7744 },
  { id: 10, school: 'ĐH Mỏ Địa Chất', distance: 480, title: 'Studio Full Đồ Ngõ 1 Đức Thắng', desc: 'Studio mới 100%, có ban công, máy giặt riêng, camera an ninh.', price: 3.5, type: 'studio', area: 28, address: 'Ngõ 1 Đức Thắng, Bắc Từ Liêm', amenities: ['Điều hòa', 'Máy giặt riêng', 'Ban công', 'Camera an ninh', 'Nóng lạnh'], x: 50, y: 50, lat: 21.0705, lng: 105.7728 },
  { id: 11, school: 'ĐH Mỏ Địa Chất', distance: 900, title: 'Phòng Khép Kín Cổ Nhuế 2', desc: 'Khép kín, điện nước giá dân, gần chợ và trạm xe buýt.', price: 2.2, type: 'khepkin', area: 22, address: 'Cổ Nhuế 2, Bắc Từ Liêm', amenities: ['Vệ sinh khép kín', 'Điện nước giá dân', 'Wifi miễn phí', 'Chỗ để xe'], x: 50, y: 50, lat: 21.0788, lng: 105.7795 },
  { id: 12, school: 'ĐH Mỏ Địa Chất', distance: 1100, title: 'Chung Cư Mini Tân Xuân', desc: 'Thang máy, bảo vệ 24/7, phòng thoáng có cửa sổ lớn.', price: 4.2, type: 'studio', area: 32, address: 'Tân Xuân, Bắc Từ Liêm', amenities: ['Thang máy', 'Bảo vệ 24/7', 'Điều hòa', 'Bếp riêng'], x: 50, y: 50, lat: 21.0690, lng: 105.7815 },
  { id: 13, school: 'ĐH Mỏ Địa Chất', distance: 350, title: 'Phòng Ở Ghép 2 Người Phố Viên', desc: 'Phòng 30m², chia đôi chỉ 1.4 triệu/người, có đủ giường tủ.', price: 2.8, type: 'ghep', area: 30, address: 'Phố Viên, Bắc Từ Liêm', amenities: ['Giường tủ đầy đủ', 'Điều hòa', 'Nóng lạnh', 'Wifi miễn phí'], x: 50, y: 50, lat: 21.0728, lng: 105.7770 },
  { id: 14, school: 'ĐH Mỏ Địa Chất', distance: 750, title: 'Gác Xép Giá Rẻ Ngõ 52 Đức Thắng', desc: 'Giá sinh viên, an ninh tốt, cách trường 10 phút đi bộ.', price: 2.0, type: 'gacxep', area: 20, address: 'Ngõ 52 Đức Thắng, Bắc Từ Liêm', amenities: ['Nóng lạnh', 'Wifi miễn phí', 'Chỗ để xe'], x: 50, y: 50, lat: 21.0695, lng: 105.7699 },
].map((r) => ({ ...r, available: true, owner: 'Chính chủ' }))

// Phòng chưa có toạ độ riêng: đặt quanh trường theo đúng khoảng cách `distance`
const place = (r) => {
  if (r.lat) return r
  const u = universities.find((x) => x.name === r.school || x.name.includes(r.school.replace('ĐH ', ''))) || universities[0]
  const a = (r.id * 137) % 360 * (Math.PI / 180)
  return {
    ...r,
    lat: u.lat + (r.distance * Math.cos(a)) / 111000,
    lng: u.lng + (r.distance * Math.sin(a)) / (111000 * Math.cos((u.lat * Math.PI) / 180)),
  }
}

export const listings = [...base, ...more].map(place).map((r) => ({
  ...r,
  ownerName: ['Bác Tuấn', 'Chị Hương', 'Cô Lan', 'Anh Dũng'][r.id % 4],
  phone: '09' + String(10000000 + r.id * 1234567).slice(0, 8),
  rating: (4.5 + (r.id % 5) / 10).toFixed(1),
  electric: 3.5,
  water: 100,
  deposit: r.price,
}))

export const roomTypes = [
  { key: 'all', label: 'Tất cả' },
  { key: 'studio', label: 'Studio' },
  { key: 'gacxep', label: 'Gác xép' },
  { key: 'khepkin', label: 'Khép kín' },
  { key: 'ghep', label: 'Ở ghép' },
]

export const priceOptions = [
  { key: 0, label: 'Mọi mức giá' },
  { key: 2, label: 'Dưới 2 triệu' },
  { key: 3, label: 'Dưới 3 triệu' },
  { key: 4, label: 'Dưới 4 triệu' },
]

export const amenityOptions = ['Điều hòa', 'Nóng lạnh', 'Máy giặt riêng', 'Thang máy', 'Bếp riêng', 'Wifi miễn phí']

export const getListing = (id) => listings.find((r) => r.id === Number(id))

export const MO_SCHOOL = { name: 'ĐH Mỏ Địa Chất', lat: 21.0734, lng: 105.7738 }
