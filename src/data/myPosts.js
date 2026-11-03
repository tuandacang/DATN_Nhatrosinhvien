// Tin tìm bạn ở ghép do chính người dùng đăng (lưu trong trình duyệt, thay bằng API khi có backend)
const KEY = 'roommatePosts'

export function loadMyPosts() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || []
  } catch {
    return []
  }
}

// Trả về true nếu lưu được (ảnh quá nặng có thể vượt dung lượng cho phép)
export function saveMyPost(post) {
  try {
    localStorage.setItem(KEY, JSON.stringify([post, ...loadMyPosts()]))
    return true
  } catch {
    return false
  }
}

// Thu nhỏ ảnh trước khi lưu để nhẹ và nhanh
export function readImage(file, maxW = 900) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = reject
    reader.onload = () => {
      const img = new Image()
      img.onerror = reject
      img.onload = () => {
        const scale = Math.min(1, maxW / img.width)
        const canvas = document.createElement('canvas')
        canvas.width = Math.round(img.width * scale)
        canvas.height = Math.round(img.height * scale)
        canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height)
        resolve(canvas.toDataURL('image/jpeg', 0.72))
      }
      img.src = reader.result
    }
    reader.readAsDataURL(file)
  })
}
