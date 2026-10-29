import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Chips, PageHead, Stat } from '../components/ui.jsx'
import { HomeIcon } from '../components/Icons.jsx'
import { initialRooms } from '../data/landlord.js'

export default function Dashboard() {
  const [rooms, setRooms] = useState(initialRooms)
  const [filter, setFilter] = useState('all')

  const update = (id, patch) =>
    setRooms((list) => list.map((r) => (r.id === id ? { ...r, ...patch } : r)))

  const available = rooms.filter((r) => r.status === 'available').length
  const rented = rooms.filter((r) => r.status === 'rented').length
  const shown = rooms.filter((r) => filter === 'all' || r.status === filter)

  return (
    <div className="page">
      <PageHead
        eyebrow="Bảng điều khiển chủ nhà"
        title="Chào anh Tuấn, quản lý phòng trọ của bạn"
        sub="Kiểm soát tình trạng phòng trống, khách thuê tiềm năng và cập nhật thông tin minh bạch."
        action={
          <Link to="/chu-tro/dang-tin" className="btn btn-primary btn-lg">
            + Đăng tin phòng mới
          </Link>
        }
      />

      <div className="stats">
        <Stat label="Tổng tin đăng" value={rooms.length} unit="tin đang hoạt động" note="Đã xác minh đầy đủ giấy tờ" tone="green" />
        <Stat label="Lượt xem tháng này" value="1,420" unit="+18.4%" note="Cao điểm tìm phòng mùa tuyển sinh đại học" />
        <Stat label="Lượt liên hệ xem phòng" value="28" unit="sinh viên liên hệ" note="4 tin nhắn chưa phản hồi" tone="red" />
      </div>

      <div className="section-head">
        <div>
          <h2>Danh sách phòng đang quản lý</h2>
          <p>Các cơ sở trọ quanh Bách Khoa, Kinh Tế Quốc Dân và Xây Dựng</p>
        </div>
        <Chips
          value={filter}
          onChange={setFilter}
          items={[
            { key: 'all', label: `Tất cả (${rooms.length})` },
            { key: 'available', label: `Còn phòng (${available})` },
            { key: 'rented', label: `Đã thuê (${rented})` },
          ]}
        />
      </div>

      <div className="listings">
        {shown.map((r) => (
          <article key={r.id} className={'listing' + (r.hidden ? ' listing--hidden' : '')}>
            <div className="listing__photo">
              <HomeIcon width={40} height={40} />
              <span className={'tag ' + (r.status === 'available' ? 'tag--ok' : 'tag--muted')}>
                {r.status === 'available' ? 'Còn phòng' : 'Đã cho thuê'}
              </span>
              <span className="listing__floor">{r.floor}</span>
            </div>

            <div className="listing__body">
              <div className="listing__top">
                <h3>{r.title}</h3>
                <p className="listing__price">
                  {r.price} <span>/tháng</span>
                </p>
              </div>
              <ul className="listing__near">
                {r.near.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
              <p className="listing__desc">{r.desc}</p>

              <div className="listing__foot">
                <p className="listing__meta">
                  <span>{r.views}</span>
                  <span>{r.extra}</span>
                  <span className="listing__updated">• {r.hidden ? 'Đang tạm ẩn' : r.updated}</span>
                </p>
                <div className="listing__actions">
                  <button className="btn btn-outline">Chỉnh sửa</button>
                  {r.status === 'available' ? (
                    <>
                      <button className="btn btn-outline" onClick={() => update(r.id, { hidden: !r.hidden })}>
                        {r.hidden ? 'Hiện tin' : 'Tạm ẩn tin'}
                      </button>
                      <button className="btn btn-outline" onClick={() => update(r.id, { status: 'rented' })}>
                        Đổi trạng thái
                      </button>
                    </>
                  ) : (
                    <button className="btn btn-outline" onClick={() => update(r.id, { status: 'available' })}>
                      Mở lại phòng
                    </button>
                  )}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="banner">
        <div>
          <p className="banner__title">Cần hỗ trợ chụp ảnh phòng chuẩn 4K hoặc quay video thực tế?</p>
          <p className="banner__sub">
            Đội ngũ sinh viên cộng tác viên TroGanTruong.vn hỗ trợ chủ nhà hoàn toàn miễn phí tại nội thành.
          </p>
        </div>
        <button className="btn btn-outline">Hotline 1900 6868</button>
      </div>
    </div>
  )
}
