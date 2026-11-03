import { useEffect, useState } from 'react'

const KEY = 'favorites'
const SEEDED = 'favoritesSeeded'

// Mục yêu thích mẫu (hiện lần đầu để xem trang Yêu thích có dữ liệu)
const SAMPLE = { rooms: [1, 4, 10], mates: [1, 2] }

const parse = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || { rooms: [], mates: [] }
  } catch {
    return { rooms: [], mates: [] }
  }
}

const read = () => {
  const cur = parse()
  try {
    if (localStorage.getItem(SEEDED) !== '1') {
      const merged = {
        rooms: [...new Set([...cur.rooms, ...SAMPLE.rooms])],
        mates: [...new Set([...cur.mates, ...SAMPLE.mates])],
      }
      localStorage.setItem(KEY, JSON.stringify(merged))
      localStorage.setItem(SEEDED, '1')
      return merged
    }
  } catch {
    /* bỏ qua nếu trình duyệt chặn lưu trữ */
  }
  return cur
}

// Lưu phòng/bạn ở ghép yêu thích vào localStorage, đồng bộ giữa các trang
export default function useFavorites() {
  const [fav, setFav] = useState(read)

  useEffect(() => {
    const sync = () => setFav(read())
    window.addEventListener('favorites-changed', sync)
    return () => window.removeEventListener('favorites-changed', sync)
  }, [])

  const toggle = (kind, id) => {
    const cur = read()
    const list = cur[kind].includes(id) ? cur[kind].filter((x) => x !== id) : [...cur[kind], id]
    const next = { ...cur, [kind]: list }
    try {
      localStorage.setItem(KEY, JSON.stringify(next))
    } catch {
      /* bỏ qua nếu trình duyệt chặn lưu trữ */
    }
    setFav(next)
    window.dispatchEvent(new Event('favorites-changed'))
  }

  return {
    rooms: fav.rooms,
    mates: fav.mates,
    isRoom: (id) => fav.rooms.includes(id),
    isMate: (id) => fav.mates.includes(id),
    toggleRoom: (id) => toggle('rooms', id),
    toggleMate: (id) => toggle('mates', id),
  }
}
