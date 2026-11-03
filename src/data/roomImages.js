// Ảnh phòng thật: bỏ file vào src/assets/rooms/ theo tên  roommate-<id>-<số thứ tự>.jpg
// Ví dụ: roommate-2-1.jpg, roommate-2-2.jpg ... (id bạn ở ghép xem trong src/data/social.js)
const files = import.meta.glob('../assets/rooms/*.{jpg,jpeg,png,webp}', { eager: true, import: 'default' })

export function imagesFor(prefix) {
  return Object.entries(files)
    .filter(([path]) => path.split('/').pop().startsWith(prefix + '-'))
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
    .map(([, url]) => url)
}

// Ảnh người dùng tải lên > ảnh thật trong thư mục assets > ảnh mẫu (khung màu)
export function roommatePhotos(m) {
  if (m.photos?.length) return m.photos
  const real = imagesFor('roommate-' + m.id)
  return real.length ? real : m.roomPhotos || []
}
