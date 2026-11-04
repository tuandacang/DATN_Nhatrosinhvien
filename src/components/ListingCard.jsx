import { Link } from 'react-router-dom'
import { roomBg } from '../data/roomPhotos.js'
import { useLoginPrompt } from '../context/LoginPrompt.jsx'
import useFavorites from '../hooks/useFavorites.js'

const typeName = { studio: 'Studio', gacxep: 'Gác xép', khepkin: 'Khép kín', ghep: 'Ở ghép' }

export default function ListingCard({ room, active, onHover }) {
  const { isRoom, toggleRoom } = useFavorites()
  const { requireLogin } = useLoginPrompt()
  const saved = isRoom(room.id)

  return (
    <article
      className={'lc' + (active ? ' lc--on' : '')}
      onMouseEnter={() => onHover?.(room.id)}
    >
      <Link to={`/phong/${room.id}`} className={'lc__photo lc__photo--' + (room.id % 4)} style={roomBg(room.id)}>
        {room.available && <span className="badge">Còn phòng</span>}
        <span className="lc__type">{typeName[room.type]}</span>
      </Link>
      <button
        type="button"
        className={'lc__heart' + (saved ? ' lc__heart--on' : '')}
        aria-label={saved ? 'Bỏ lưu phòng' : 'Lưu phòng'}
        onClick={() => {
          if (requireLogin('Đăng nhập để lưu phòng vào mục Yêu thích.')) return
          toggleRoom(room.id)
        }}
      >
        {saved ? '♥' : '♡'}
      </button>
      <div className="lc__body">
        <p className="lc__dist">Cách {room.school} {room.distance}m · {room.area}m²</p>
        <Link to={`/phong/${room.id}`} className="lc__title">{room.title}</Link>
        <p className="lc__addr">{room.address}</p>
        <div className="lc__tags">
          {room.amenities.slice(0, 3).map((a) => (
            <span key={a}>{a}</span>
          ))}
        </div>
        <div className="lc__foot">
          <p><strong>{room.price}</strong> tr/tháng</p>
          <small>★ {room.rating} · {room.owner}</small>
        </div>
      </div>
    </article>
  )
}
