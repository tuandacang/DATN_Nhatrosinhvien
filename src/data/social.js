export const roommates = [
  {
    id: 1, name: 'Nguyễn Thùy Linh', gender: 'Nữ', year: 2, school: 'ĐH Kinh tế Quốc dân', badge: 'NEU Verified',
    area: 'Cầu Giấy / Giải Phóng', budget: 1.8, hasRoom: false, flags: ['nosmoke', 'clean', 'early'],
    tags: ['🚭 Không hút thuốc', '✨ Sạch sẽ, ngăn nắp', '🌙 Ngủ trước 23h'],
    bio: 'Mình học kiểm toán, tính tình nhẹ nhàng, thích không gian yên tĩnh để ôn thi chứng chỉ.',
  },
  {
    id: 2, name: 'Trần Minh Hoàng', gender: 'Nam', year: 3, school: 'ĐH Bách Khoa HN', badge: 'HUST Verified',
    area: 'Tạ Quang Bửu', budget: 2.2, hasRoom: true, flags: [],
    tags: ['💻 Sinh viên IT', '🤫 Không ồn ào', '⚡ Máy giặt, điều hoà riêng'],
    bio: 'Phòng 32m2 ngõ Tạ Quang Bửu, đủ full đồ giường tủ điều hòa máy giặt. Cần 1 bạn nam gọn gàng.',
  },
  {
    id: 3, name: 'Lê Phương Anh', gender: 'Nữ', year: 1, school: 'ĐH Ngoại Thương', badge: 'FTU Verified',
    area: 'Chùa Láng / Đống Đa', budget: 2.5, hasRoom: false, flags: ['pet'],
    tags: ['🍳 Nấu ăn tại nhà', '🐱 Thích nuôi mèo hiền', '☀️ Thân thiện, hòa đồng'],
    bio: 'Mình là K62 Ngoại Thương, thích nấu ăn và có bé mèo Anh lông ngắn rất ngoan.',
  },
  {
    id: 4, name: 'Vũ Đức Anh', gender: 'Nam', year: 2, school: 'ĐH Giao Thông Vận Tải', badge: 'UTC Verified',
    area: 'Cầu Giấy / Đống Đa', budget: 1.5, hasRoom: false, flags: ['nosmoke', 'clean'],
    tags: ['🧹 Gọn gàng ngăn nắp', '💼 Đi làm thêm tối', '🚭 Tuyệt đối không thuốc'],
    bio: 'Mình tự lập, buổi tối đi làm thêm nên về muộn yên tĩnh, không làm phiền bạn trọ.',
  },
  {
    id: 5, name: 'Hoàng Mai Trang', gender: 'Nữ', year: 4, school: 'ĐH Ngoại Ngữ - ĐHQG', badge: 'ULIS Verified',
    area: 'Xuân Thủy / Cầu Giấy', budget: 2.0, hasRoom: false, flags: ['clean'],
    tags: ['📚 Ôn thi tốt nghiệp', '🛡️ Tôn trọng riêng tư', '🪴 Có cây cảnh nhỏ'],
    bio: 'Mình đang hoàn thành khóa luận và làm thực tập sinh tiếng Nhật, cần môi trường yên tĩnh.',
  },
  {
    id: 6, name: 'Đặng Tuấn Nam', gender: 'Nam', year: 1, school: 'ĐH Xây Dựng', badge: 'HUCE Verified',
    area: 'Hai Bà Trưng / NEU - HUST', budget: 1.6, hasRoom: false, flags: [],
    tags: ['🏀 Thích thể thao', '🤝 Hòa đồng, thẳng thắn', '⚡ Cần ở ghép ngay'],
    bio: 'Tân sinh viên khoa Kiến trúc, tính tình hòa đồng, thích đá bóng. Cần tìm phòng khu Trần Đại Nghĩa.',
  },
]

export const lifestyleFilters = [
  { key: 'nosmoke', label: 'Không hút thuốc' },
  { key: 'clean', label: 'Giữ gìn vệ sinh' },
  { key: 'early', label: 'Ngủ sớm trước 23h' },
  { key: 'pet', label: 'Thân thiện thú cưng' },
]

export const budgetOptions = [
  { key: 'all', label: 'Mọi mức giá', test: () => true },
  { key: 'low', label: 'Dưới 2.0 triệu / người / tháng', test: (b) => b < 2 },
  { key: 'mid', label: '2.0 - 3.0 triệu / người / tháng', test: (b) => b >= 2 && b <= 3 },
  { key: 'high', label: 'Trên 3.0 triệu / người / tháng', test: (b) => b > 3 },
]

export const safetyTips = [
  ['1. Gặp mặt trực tiếp tại trường', 'Hãy hẹn gặp tại căn tin trường hoặc quán cafe gần trường trước để trao đổi kỹ về nếp sống, giờ giấc, và bạn bè ghé chơi.'],
  ['2. Kiểm tra thẻ sinh viên & CCCD', 'Ưu tiên những bạn có huy hiệu Verified trên hệ thống TroGanTruong đã được đối chiếu email nội bộ trường đại học.'],
  ['3. Thỏa thuận chia tiền rõ ràng', 'Lập thỏa thuận văn bản về tiền cọc, chia tiền điện/nước/mạng và thông báo chủ trọ làm hợp đồng bổ sung tên người lưu trú.'],
]

export const initialChats = [
  {
    id: 'll-1', name: 'Bác Tuấn', kind: 'landlord', online: true, verified: true, phone: '0982345678',
    sub: 'Chủ trọ ngõ 175 Xuân Thủy', unread: 1,
    room: { title: 'Phòng trọ ban công ngõ 175 Xuân Thủy', price: '2.800.000đ/tháng', meta: 'Cách ĐHQGHN 350m · Tầng 3/5 · Diện tích 22m²' },
    messages: [
      { id: 1, from: 'me', time: '09:45', text: 'Dạ cháu chào bác Tuấn ạ! Cháu là sinh viên năm nhất ĐH Sư Phạm. Bác cho cháu hỏi phòng tầng 3 này giờ giấc thế nào và khu mình an ninh có đảm bảo không ạ? Cháu hay có lịch tự học về muộn chút ạ.' },
      { id: 2, from: 'them', time: '09:50', text: 'Chào cháu, khu nhà bác toàn sinh viên Sư Phạm với Báo Chí ở thôi. Cửa tầng 1 lắp khóa vân tay tự do 24/7, không chung chủ nhé. Cả ngõ và sảnh đều có camera an ninh 24/7 nên rất an tâm cháu nhé.' },
      { id: 3, from: 'them', time: '09:52', text: 'Bác gửi cháu thêm ảnh thực tế ban công và phòng tắm khép kín hôm qua vừa dọn sạch nhé:', photos: ['Ban công thoáng', 'Vệ sinh khép kín'] },
      { id: 4, from: 'me', time: '10:15', text: 'Dạ phòng đẹp và sáng quá bác ạ! Chiều nay tầm 17h tan học cháu có thể qua xem trực tiếp phòng được không ạ? Bác có ở nhà lúc đó không?' },
      { id: 5, from: 'them', time: '10:30', text: 'Em qua xem phòng lúc 17h chiều nay được nhé, đến đầu ngõ 175 gọi số 0982 345 678 bác đón vào xem trực tiếp. Nhớ mang theo thẻ sinh viên nếu muốn giữ phòng ưu đãi nhé cháu!', badge: 'Đã hẹn lịch xem' },
    ],
    last: '"Em qua xem phòng lúc 17h chiều nay..."', lastTime: '10:30',
  },
  {
    id: 'rm-1', name: 'Nguyễn Thùy Linh', kind: 'mate', online: false, verified: true, mateId: 1,
    sub: 'Tìm ở ghép · NEU', unread: 0,
    messages: [{ id: 1, from: 'them', time: '20:10', text: 'Phòng mình có nóng lạnh và máy giặt riêng bạn nhé, bạn qua xem lúc nào tiện cũng được.' }],
    last: 'Phòng mình có nóng lạnh và máy giặt riêng bạn nhé...', lastTime: 'Hôm qua',
  },
  {
    id: 'll-2', name: 'Chị Hương', kind: 'landlord', online: true, verified: true, phone: '0912000111',
    sub: 'Ngõ Tự Do · Bách Khoa', unread: 0,
    room: { title: 'Phòng khép kín ngõ Tự Do', price: '3.200.000đ/tháng', meta: 'Cách ĐH Bách Khoa 450m · Tầng 2/4 · Diện tích 25m²' },
    messages: [{ id: 1, from: 'them', time: '19:00', text: 'Phòng đó cọc 1 tháng, điện 3.5k/số nha em' }],
    last: 'Phòng đó cọc 1 tháng, điện 3.5k/số nha em', lastTime: '2 ngày',
  },
  {
    id: 'rm-2', name: 'Trần Minh Hoàng', kind: 'mate', online: false, verified: true, mateId: 2,
    sub: 'Tìm ở ghép · HUST', unread: 0,
    messages: [{ id: 1, from: 'them', time: '18:20', text: 'Ok hẹn bạn chiều mai cafe trao đổi chi tiết' }],
    last: 'Ok hẹn bạn chiều mai cafe trao đổi chi tiết', lastTime: '3 ngày',
  },
]

export const quickReplies = [
  'Phòng còn không ạ?',
  'Cho em xin thêm ảnh phòng tắm',
  'Giá điện nước cụ thể thế nào ạ?',
  'Dạ vâng 17h cháu có mặt ạ!',
]
