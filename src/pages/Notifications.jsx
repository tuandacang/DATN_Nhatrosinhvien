import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Chips, PageHead, Switch } from '../components/ui.jsx'
import { initialNotifications } from '../data/landlord.js'

const prefLabels = ['Thông báo qua email', 'Thông báo đẩy', 'Nhắc lịch xem phòng', 'Yêu cầu liên hệ mới']

export default function Notifications() {
  const [items, setItems] = useState(initialNotifications)
  const [tab, setTab] = useState('all')
  const [prefs, setPrefs] = useState([true, true, true, false])

  const unread = items.filter((n) => n.unread).length
  const shown = items.filter((n) =>
    tab === 'all' ? true : tab === 'unread' ? n.unread : n.type === tab,
  )
  const markAll = () => setItems((l) => l.map((n) => ({ ...n, unread: false })))
  const markOne = (id) => setItems((l) => l.map((n) => (n.id === id ? { ...n, unread: false } : n)))

  return (
    <div className="page">
      <PageHead
        eyebrow="Thông báo"
        title="Thông báo"
        sub="Cập nhật mới nhất về lịch xem phòng, tin nhắn và tin đăng của bạn."
        action={<button className="link-btn" onClick={markAll}>Đánh dấu đã đọc tất cả</button>}
      />

      <Chips
        value={tab}
        onChange={setTab}
        items={[
          { key: 'all', label: 'Tất cả' },
          { key: 'unread', label: `Chưa đọc (${unread})` },
          { key: 'visit', label: 'Lịch xem phòng' },
          { key: 'message', label: 'Tin nhắn' },
          { key: 'system', label: 'Hệ thống' },
        ]}
      />

      <div className="split split--noti">
        <div className="card noti-list">
          {shown.length === 0 && <p className="empty">Không có thông báo nào.</p>}
          {shown.map((n) => (
            <button key={n.id} className={'noti' + (n.unread ? ' noti--unread' : '')} onClick={() => markOne(n.id)}>
              <span className="noti__dot" />
              <span className="noti__text">
                <strong>{n.title}</strong>
                <span>{n.body}</span>
                <em>{n.time}</em>
              </span>
            </button>
          ))}
        </div>

        <aside className="card side">
          <h3>Cài đặt thông báo</h3>
          {prefLabels.map((label, i) => (
            <div key={label} className="pref">
              <span>{label}</span>
              <Switch label={label} checked={prefs[i]} onChange={(v) => setPrefs((p) => p.map((x, j) => (j === i ? v : x)))} />
            </div>
          ))}
          <Link to="/cai-dat" className="link-red">Mở cài đặt tài khoản →</Link>
        </aside>
      </div>
    </div>
  )
}
