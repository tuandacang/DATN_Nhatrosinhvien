import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import RoomCard from '../components/RoomCard.jsx'
import { featuredRooms, radiusOptions, schools } from '../data/rooms.js'

export default function Home() {
  const navigate = useNavigate()
  const [school, setSchool] = useState(schools[0])
  const [radius, setRadius] = useState(radiusOptions[0])

  const onSubmit = (e) => {
    e.preventDefault()
    const query = new URLSearchParams({ truong: school, bankinh: radius })
    navigate(`/tim-kiem?${query.toString()}`)
  }

  return (
    <>
      <section className="hero">
        <div className="hero__content">
          <span className="pill">Cộng đồng sinh viên Thủ đô</span>
          <h1 className="hero__title">Tìm phòng gần trường đại học</h1>
          <p className="hero__sub">
            Phòng sạch, minh bạch chi phí điện nước và an toàn an ninh, chỉ cách
            cổng giảng đường vài bước chân.
          </p>

          <form className="search" onSubmit={onSubmit}>
            <label className="search__field">
              <span className="search__label">Trường đại học</span>
              <select value={school} onChange={(e) => setSchool(e.target.value)}>
                {schools.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </label>

            <label className="search__field">
              <span className="search__label">Bán kính đi bộ</span>
              <select value={radius} onChange={(e) => setRadius(e.target.value)}>
                {radiusOptions.map((r) => (
                  <option key={r}>{r}</option>
                ))}
              </select>
            </label>

            <button type="submit" className="btn btn-primary search__btn">
              Tìm kiếm
            </button>
          </form>
        </div>
      </section>

      <section className="featured container">
        <div className="featured__head">
          <div>
            <p className="eyebrow featured__eyebrow">Tuyển chọn hàng ngày</p>
            <h2 className="featured__title">Phòng trọ nổi bật</h2>
          </div>
          <p className="featured__desc">
            Khảo sát trực tiếp, không phụ phí ẩn, môi trường yên tĩnh học tập
            quanh khu vực Bách - Kinh - Xây.
          </p>
        </div>

        <div className="featured__grid">
          {featuredRooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </section>
    </>
  )
}
