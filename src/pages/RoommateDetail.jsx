import { Link, useNavigate, useParams } from 'react-router-dom'
import Avatar from '../components/Avatar.jsx'
import { useLoginPrompt } from '../context/LoginPrompt.jsx'
import useFavorites from '../hooks/useFavorites.js'
import RoomGallery from '../components/RoomGallery.jsx'
import { loadMyPosts } from '../data/myPosts.js'
import { roommatePhotos } from '../data/roomImages.js'
import { roommates, safetyTips } from '../data/social.js'

export default function RoommateDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isMate, toggleMate } = useFavorites()
  const { requireLogin } = useLoginPrompt()
  const m = [...loadMyPosts(), ...roommates].find((x) => x.id === Number(id))

  if (!m) {
    return <div className="page"><div className="card empty">Không tìm thấy hồ sơ. <Link className="link-red" to="/o-ghep">Quay lại danh sách</Link></div></div>
  }
  const saved = isMate(m.id)

  return (
    <div className="page">
      <p className="rd__crumb"><Link to="/o-ghep">← Tìm bạn ở ghép</Link></p>
      <div className="rd">
        <div className="rd__main">
          <div className="card rmd__head">
            <Avatar name={m.name} size={88} online />
            <div>
              <h1>{m.name}</h1>
              <p>{m.gender} · {m.year ? `Sinh viên năm ${m.year} · ` : ''}{m.school}</p>
              <div className="rd__tags">
                <span className="tag tag--ok">{m.badge}</span>
                <span className="tag tag--muted">{m.hasRoom ? 'Đã có phòng, tìm thêm bạn' : 'Đang tìm phòng'}</span>
              </div>
            </div>
          </div>

          {m.hasRoom && roommatePhotos(m).length > 0 && (
            <>
              <h2>Ảnh phòng</h2>
              <RoomGallery photos={roommatePhotos(m)} max={6} big />
            </>
          )}

          <h2>Giới thiệu</h2>
          <p className="rd__text">{m.bio}</p>

          <h2>Thói quen sinh hoạt</h2>
          <div className="lc__tags lc__tags--lg">
            {m.tags.map((t) => <span key={t}>{t}</span>)}
          </div>

          <h2>Nhu cầu ở ghép</h2>
          <div className="card rd__costs">
            <p><span>Khu vực</span><strong>{m.area}</strong></p>
            <p><span>Ngân sách</span><strong>~{m.budget} triệu/tháng</strong></p>
            <p><span>Tình trạng</span><strong>{m.hasRoom ? 'Đã có phòng' : 'Chưa có phòng'}</strong></p>
          </div>
        </div>

        <aside className="rd__side">
          <div className="card rd__book">
            {m.mine ? (
              <p className="rd__warn">Đây là tin do bạn đăng.</p>
            ) : (
              <button type="button" className="btn btn-primary btn-xl" onClick={() => !requireLogin('Đăng nhập để nhắn tin làm quen với bạn này.') && navigate(`/tin-nhan?with=${m.id}`)}>Nhắn tin làm quen</button>
            )}
            <button type="button" className="link-btn" onClick={() => !requireLogin('Đăng nhập để lưu hồ sơ vào mục Yêu thích.') && toggleMate(m.id)}>
              {saved ? 'Đã lưu hồ sơ' : 'Lưu hồ sơ'}
            </button>
          </div>
          <div className="card rmd__tips">
            <h3>Lưu ý an toàn</h3>
            <ul>{safetyTips.map(([title, body]) => <li key={title}><strong>{title}</strong><span>{body}</span></li>)}</ul>
          </div>
        </aside>
      </div>
    </div>
  )
}
