import { useEffect, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Avatar from '../components/Avatar.jsx'
import { initialChats, quickReplies, roommates } from '../data/social.js'

const tabs = [
  ['all', 'Tất cả'],
  ['landlord', 'Chủ trọ'],
  ['mate', 'Ở ghép'],
]

const nowTime = () => new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })

function startedChat(mateId) {
  const r = roommates.find((x) => x.id === mateId)
  if (!r) return null
  return {
    id: 'rm-' + r.id, name: r.name, kind: 'mate', online: true, verified: true, mateId: r.id,
    sub: 'Tìm ở ghép · ' + r.badge.split(' ')[0], unread: 0, messages: [], last: 'Bắt đầu cuộc trò chuyện', lastTime: 'Vừa xong',
  }
}

export default function Messages() {
  const [params] = useSearchParams()
  const withId = Number(params.get('with')) || null
  const [chats, setChats] = useState(() => {
    if (withId && !initialChats.some((c) => c.mateId === withId)) {
      const c = startedChat(withId)
      return c ? [c, ...initialChats] : initialChats
    }
    return initialChats
  })
  const [activeId, setActiveId] = useState(() => {
    const hit = withId && (initialChats.find((c) => c.mateId === withId) || startedChat(withId))
    return hit ? hit.id : initialChats[0].id
  })
  const [tab, setTab] = useState('all')
  const [query, setQuery] = useState('')
  const [draft, setDraft] = useState('')
  const endRef = useRef(null)

  const active = chats.find((c) => c.id === activeId)
  const unreadTotal = chats.reduce((n, c) => n + c.unread, 0)
  const shown = chats.filter(
    (c) => (tab === 'all' || c.kind === tab) && c.name.toLowerCase().includes(query.trim().toLowerCase()),
  )

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'end' })
  }, [activeId, active?.messages.length])

  const open = (id) => {
    setActiveId(id)
    setChats((cs) => cs.map((c) => (c.id === id ? { ...c, unread: 0 } : c)))
  }

  const send = (text) => {
    const value = text.trim()
    if (!value) return
    setChats((cs) =>
      cs.map((c) =>
        c.id === activeId
          ? {
              ...c,
              messages: [...c.messages, { id: c.messages.length + 1, from: 'me', time: nowTime(), text: value }],
              last: value,
              lastTime: 'Vừa xong',
            }
          : c,
      ),
    )
    setDraft('')
  }

  return (
    <div className="page msg">
      <div className="msg__top">
        <div className="msg__top-left">
          <span className="msg__top-icon">✉</span>
          <div>
            <h1>
              Tin nhắn trực tiếp
              {unreadTotal > 0 && <span className="msg__unread">{unreadTotal} chưa đọc</span>}
            </h1>
            <p>Trao đổi an toàn, kiểm chứng phòng trọ &amp; tìm bạn ở ghép thời gian thực</p>
          </div>
        </div>
        <span className="msg__trust">🔒 Hệ thống mã hoá bảo vệ sinh viên trước lừa đảo cọc ảo</span>
      </div>

      <div className="msg__box">
        <aside className="msg__side">
          <div className="msg__tools">
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Tìm theo tên hoặc số phòng..." />
            <div className="msg__tabs">
              {tabs.map(([k, label]) => (
                <button key={k} type="button" className={tab === k ? 'on' : ''} onClick={() => setTab(k)}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="msg__list">
            {shown.map((c) => (
              <button
                key={c.id}
                type="button"
                className={'msg__item' + (c.id === activeId ? ' msg__item--on' : '')}
                onClick={() => open(c.id)}
              >
                <Avatar name={c.name} online={c.online} />
                <span className="msg__item-body">
                  <span className="msg__item-row">
                    <strong>{c.name}{c.kind === 'landlord' && c.verified && <i className="msg__ok">✓</i>}</strong>
                    <small className={c.unread ? 'hot' : ''}>{c.lastTime}</small>
                  </span>
                  <span className={'msg__item-sub' + (c.kind === 'mate' ? ' msg__item-sub--mate' : '')}>{c.sub}</span>
                  <span className="msg__item-row">
                    <span className={'msg__item-last' + (c.unread ? ' hot' : '')}>{c.last}</span>
                    {c.unread > 0 && <b className="msg__badge">{c.unread}</b>}
                  </span>
                </span>
              </button>
            ))}
            {shown.length === 0 && <p className="msg__none">Không có cuộc trò chuyện nào.</p>}
          </div>

          <p className="msg__tip">🛡 Chỉ đặt cọc khi đã xem phòng trực tiếp và có biên lai rõ ràng.</p>
        </aside>

        <section className="msg__chat">
          <header className="msg__head">
            <Avatar name={active.name} size={44} online={active.online} />
            <div className="msg__head-info">
              <h2>
                {active.name}
                {active.verified && (
                  <span className="tag tag--ok">{active.kind === 'landlord' ? 'Chủ nhà đã xác minh' : 'Sinh viên đã xác minh'}</span>
                )}
              </h2>
              <p>{active.online ? 'Đang trực tuyến · Phản hồi trong 5 phút' : 'Ngoại tuyến'}</p>
            </div>
            {active.phone && (
              <a className="btn btn-outline" href={`tel:${active.phone}`}>📞 Gọi điện</a>
            )}
          </header>

          {active.room && (
            <div className="msg__room">
              <div className="msg__room-pic">🏠</div>
              <div className="msg__room-info">
                <p><strong>{active.room.title}</strong><b>{active.room.price}</b></p>
                <small>{active.room.meta}</small>
              </div>
              <Link to="/tim-kiem" className="msg__room-link">Chi tiết phòng →</Link>
            </div>
          )}

          <div className="msg__stream">
            {active.messages.length === 0 ? (
              <p className="msg__none">Hãy gửi lời chào đầu tiên tới {active.name}.</p>
            ) : (
              <>
                <span className="msg__date">Hôm nay</span>
                {active.messages.map((m) => (
                  <div key={m.id} className={'msg__row msg__row--' + m.from}>
                    {m.from === 'them' && <Avatar name={active.name} size={32} />}
                    <div className="msg__col">
                      <div className="msg__bubble">
                        <p>{m.text}</p>
                        {m.photos && (
                          <div className="msg__photos">
                            {m.photos.map((p, i) => (
                              <span key={p} className={'msg__photo msg__photo--' + i}><em>{p}</em></span>
                            ))}
                          </div>
                        )}
                      </div>
                      <small className="msg__time">
                        {m.time}
                        {m.from === 'me' && ' ✓✓'}
                        {m.badge && <span className="tag tag--ok">{m.badge}</span>}
                      </small>
                    </div>
                  </div>
                ))}
              </>
            )}
            <div ref={endRef} />
          </div>

          <div className="msg__quick">
            <small>Hỏi nhanh:</small>
            {quickReplies.map((q) => (
              <button key={q} type="button" onClick={() => send(q)}>{q}</button>
            ))}
          </div>

          <form className="msg__input" onSubmit={(e) => { e.preventDefault(); send(draft) }}>
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder={`Nhập nội dung tin nhắn hoặc câu hỏi cho ${active.name}...`}
            />
            <button type="submit" className="btn btn-primary">Gửi ➤</button>
          </form>
        </section>
      </div>
    </div>
  )
}
