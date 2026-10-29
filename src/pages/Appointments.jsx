import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Chips, PageHead, Stat } from '../components/ui.jsx'
import { initialAppointments } from '../data/landlord.js'

const tagOf = { pending: ['tag--wait', 'Chờ xác nhận'], confirmed: ['tag--ok', 'Đã xác nhận'], done: ['tag--muted', 'Đã hoàn thành'], cancelled: ['tag--muted', 'Đã hủy'] }

export default function Appointments() {
  const [items, setItems] = useState(initialAppointments)
  const [tab, setTab] = useState('pending')

  const update = (id, patch) =>
    setItems((list) => list.map((i) => (i.id === id ? { ...i, ...patch } : i)))
  const count = (s) => items.filter((i) => i.status === s).length
  const shown = items.filter((i) => i.status === tab)

  return (
    <div className="page">
      <PageHead
        eyebrow="Lịch hẹn xem phòng"
        title="Lịch hẹn xem phòng"
        sub="Xác nhận, dời hoặc từ chối các lịch xem phòng do sinh viên đặt."
      />

      <div className="stats">
        <Stat label="Chờ xác nhận" value={count('pending')} unit="lịch hẹn" note={`${count('pending')} lịch cần phản hồi hôm nay`} tone="green" />
        <Stat label="Đã xác nhận" value={count('confirmed')} unit="lịch hẹn" note="Lịch gần nhất: 28/10, 16:00" tone="green" />
        <Stat label="Hôm nay" value="1" unit="lịch hẹn" note="Cập nhật 5 phút trước" tone="green" />
      </div>

      <Chips
        value={tab}
        onChange={setTab}
        items={[
          { key: 'pending', label: `Chờ xác nhận (${count('pending')})` },
          { key: 'confirmed', label: `Đã xác nhận (${count('confirmed')})` },
          { key: 'done', label: 'Đã hoàn thành' },
          { key: 'cancelled', label: 'Đã hủy' },
        ]}
      />

      <div className="appts">
        {shown.length === 0 && <p className="empty">Chưa có lịch hẹn nào trong mục này.</p>}
        {shown.map((a) => (
          <article key={a.id} className="card appt">
            <div className="appt__date">
              <span>{a.dow}</span>
              <strong>{a.day}</strong>
              <em>{a.month}</em>
            </div>

            <div className="appt__main">
              <div className="appt__top">
                <h3>{a.name}</h3>
                <span className={'tag ' + tagOf[a.status][0]}>{tagOf[a.status][1]}</span>
              </div>
              <p>{a.room}</p>
              <p className="appt__time">{a.time}</p>
              {a.note && <p className="appt__note">{a.note}</p>}
              {a.proposed && <p className="appt__proposed">Đã gửi đề xuất giờ khác cho sinh viên.</p>}
            </div>

            <div className="appt__actions">
              {a.status === 'pending' && (
                <>
                  <button className="btn btn-primary" onClick={() => update(a.id, { status: 'confirmed' })}>Xác nhận</button>
                  <button className="btn btn-outline" onClick={() => update(a.id, { proposed: true })}>Đề xuất giờ khác</button>
                  <button className="btn btn-danger" onClick={() => update(a.id, { status: 'cancelled' })}>Từ chối</button>
                </>
              )}
              {a.status === 'confirmed' && (
                <>
                  <Link to="/tin-nhan" className="btn btn-outline">Nhắn tin</Link>
                  <button className="btn btn-outline" onClick={() => update(a.id, { proposed: true })}>Dời lịch</button>
                  <button className="btn btn-danger" onClick={() => update(a.id, { status: 'cancelled' })}>Hủy lịch</button>
                </>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
