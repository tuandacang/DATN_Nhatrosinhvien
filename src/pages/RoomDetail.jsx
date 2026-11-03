import { Link, useNavigate, useParams } from 'react-router-dom'
import Avatar from '../components/Avatar.jsx'
import ListingCard from '../components/ListingCard.jsx'
import { useLoginPrompt } from '../context/LoginPrompt.jsx'
import useFavorites from '../hooks/useFavorites.js'
import { getListing, listings } from '../data/listings.js'

export default function RoomDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isRoom, toggleRoom } = useFavorites()
  const { requireLogin } = useLoginPrompt()
  const room = getListing(id)

  if (!room) {
    return (
      <div className="page">
        <div className="card empty">Không tìm thấy phòng này. <Link className="link-red" to="/tim-kiem">Quay lại tìm kiếm</Link></div>
      </div>
    )
  }

  const saved = isRoom(room.id)
  const similar = listings.filter((r) => r.id !== room.id && r.school === room.school).slice(0, 3)
  const costs = [
    ['Tiền phòng', `${room.price} triệu/tháng`],
    ['Đặt cọc', `${room.deposit} triệu (1 tháng)`],
    ['Điện', `${room.electric}k/số`],
    ['Nước', `${room.water}k/người`],
    ['Internet', 'Miễn phí'],
  ]

  return (
    <div className="page">
      <p className="rd__crumb"><Link to="/tim-kiem">← Tìm kiếm phòng</Link></p>

      <div className="rd__gallery">
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className={'rd__img lc__photo--' + ((room.id + i) % 4)}>{i === 4 && <span>+ 12 ảnh</span>}</div>
        ))}
      </div>

      <div className="rd">
        <div className="rd__main">
          <div className="rd__tags">
            <span className="tag tag--ok">Còn phòng</span>
            <span className="tag tag--muted">Đã xác thực</span>
          </div>
          <h1>{room.title}</h1>
          <p className="rd__addr">{room.address} · Cách {room.school} {room.distance}m</p>
          <p className="rd__facts">{room.area}m² · ★ {room.rating} · {room.owner}</p>

          <h2>Mô tả</h2>
          <p className="rd__text">{room.desc} Phòng được chủ nhà cam kết đúng ảnh, đúng giá, không phát sinh phụ phí ngoài bảng chi phí bên dưới.</p>

          <h2>Tiện nghi</h2>
          <ul className="rd__amen">
            {room.amenities.map((a) => <li key={a}>{a}</li>)}
          </ul>

          <h2>Chi phí hàng tháng</h2>
          <div className="card rd__costs">
            {costs.map(([k, v]) => (
              <p key={k}><span>{k}</span><strong>{v}</strong></p>
            ))}
          </div>

          <h2>Nội quy</h2>
          <ul className="rd__rules">
            <li>Giờ giấc tự do, có khóa riêng.</li>
            <li>Không nuôi thú cưng lớn, không hút thuốc trong phòng.</li>
            <li>Giữ vệ sinh chung, để xe đúng nơi quy định.</li>
          </ul>
        </div>

        <aside className="rd__side">
          <div className="card rd__book">
            <p className="rd__price"><strong>{room.price}</strong> triệu/tháng</p>
            <button type="button" className="btn btn-primary btn-xl" onClick={() => !requireLogin('Đăng nhập để đặt lịch xem phòng.') && navigate(`/dat-lich/${room.id}`)}>Đặt lịch xem phòng</button>
            <button type="button" className="btn btn-outline btn-xl" onClick={() => !requireLogin('Đăng nhập để nhắn tin cho chủ trọ.') && navigate('/tin-nhan')}>Nhắn tin cho chủ trọ</button>
            <button type="button" className="link-btn" onClick={() => !requireLogin('Đăng nhập để lưu phòng vào mục Yêu thích.') && toggleRoom(room.id)}>
              {saved ? 'Đã lưu vào yêu thích' : 'Lưu vào yêu thích'}
            </button>
            <p className="rd__warn">Chỉ đặt cọc sau khi đã xem phòng trực tiếp và có biên lai rõ ràng.</p>
          </div>

          <div className="card rd__owner">
            <Avatar name={room.ownerName} size={52} online />
            <div>
              <strong>{room.ownerName}</strong>
              <p>Chủ nhà đã xác minh · Phản hồi trong 5 phút</p>
            </div>
          </div>
        </aside>
      </div>

      {similar.length > 0 && (
        <>
          <h2 className="rd__h2">Phòng khác quanh {room.school}</h2>
          <div className="srch__grid srch__grid--3">
            {similar.map((r) => <ListingCard key={r.id} room={r} />)}
          </div>
        </>
      )}
    </div>
  )
}
