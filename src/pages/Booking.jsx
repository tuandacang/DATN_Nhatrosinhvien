import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Field } from '../components/ui.jsx'
import { getListing } from '../data/listings.js'

const slots = ['08:00', '09:30', '14:00', '16:00', '17:00', '19:00']

const days = Array.from({ length: 7 }, (_, i) => {
  const d = new Date()
  d.setDate(d.getDate() + i + 1)
  return {
    key: d.toISOString().slice(0, 10),
    label: d.toLocaleDateString('vi-VN', { weekday: 'short' }),
    date: d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' }),
  }
})

export default function Booking() {
  const { id } = useParams()
  const room = getListing(id)
  const [day, setDay] = useState(days[0].key)
  const [slot, setSlot] = useState(slots[2])
  const [form, setForm] = useState({ name: '', phone: '', people: '1', note: '' })
  const [done, setDone] = useState(false)

  if (!room) {
    return <div className="page"><div className="card empty">Không tìm thấy phòng. <Link className="link-red" to="/tim-kiem">Tìm phòng khác</Link></div></div>
  }

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))
  const valid = form.name.trim() && /^0\d{9}$/.test(form.phone.trim())
  const picked = days.find((d) => d.key === day)

  if (done) {
    return (
      <div className="page page--narrow">
        <div className="card bk__done">
          <span className="bk__tick">✓</span>
          <h1>Đã gửi yêu cầu xem phòng</h1>
          <p>
            {room.ownerName} sẽ xác nhận lịch <strong>{slot}, {picked.label} {picked.date}</strong> cho phòng
            “{room.title}” trong ít phút.
          </p>
          <div className="bk__actions">
            <Link className="btn btn-primary" to="/tin-nhan">Nhắn tin cho chủ trọ</Link>
            <Link className="btn btn-outline" to="/tim-kiem">Tiếp tục tìm phòng</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <p className="rd__crumb"><Link to={`/phong/${room.id}`}>← Quay lại chi tiết phòng</Link></p>
      <div className="bk">
        <form className="card bk__form" onSubmit={(e) => { e.preventDefault(); if (valid) setDone(true) }}>
          <h1>Đặt lịch xem phòng</h1>
          <p className="bk__sub">Chọn thời gian thuận tiện, chủ trọ sẽ xác nhận lại với bạn.</p>

          <div className="field">
            <span className="field__label">Chọn ngày</span>
            <div className="bk__days">
              {days.map((d) => (
                <button key={d.key} type="button" className={day === d.key ? 'on' : ''} onClick={() => setDay(d.key)}>
                  <small>{d.label}</small><strong>{d.date}</strong>
                </button>
              ))}
            </div>
          </div>

          <div className="field">
            <span className="field__label">Chọn giờ</span>
            <div className="chips">
              {slots.map((s) => (
                <button key={s} type="button" className={'chip' + (slot === s ? ' chip--active' : '')} onClick={() => setSlot(s)}>{s}</button>
              ))}
            </div>
          </div>

          <div className="bk__row">
            <Field label="Họ và tên"><input value={form.name} onChange={set('name')} placeholder="Nguyễn Văn A" /></Field>
            <Field label="Số điện thoại"><input value={form.phone} onChange={set('phone')} placeholder="09xxxxxxxx" inputMode="tel" /></Field>
          </div>
          <Field label="Số người đi xem">
            <select value={form.people} onChange={set('people')}>
              {[1, 2, 3, 4].map((n) => <option key={n}>{n}</option>)}
            </select>
          </Field>
          <Field label="Ghi chú cho chủ trọ">
            <textarea rows={3} value={form.note} onChange={set('note')} placeholder="Ví dụ: em muốn xem cả khu vực để xe..." />
          </Field>

          <button type="submit" className="btn btn-primary btn-lg" disabled={!valid}>Gửi yêu cầu xem phòng</button>
          {!valid && <small className="bk__hint">Nhập họ tên và số điện thoại 10 số để tiếp tục.</small>}
        </form>

        <aside className="card bk__room">
          <div className={'bk__pic lc__photo--' + (room.id % 4)} />
          <h3>{room.title}</h3>
          <p>{room.address}</p>
          <p><strong>{room.price} triệu/tháng</strong> · {room.area}m²</p>
          <p className="rd__warn">Không chuyển tiền cọc trước khi xem phòng.</p>
        </aside>
      </div>
    </div>
  )
}
