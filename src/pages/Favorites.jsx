import { Link } from 'react-router-dom'
import ListingCard from '../components/ListingCard.jsx'
import { PageHead } from '../components/ui.jsx'
import Avatar from '../components/Avatar.jsx'
import useFavorites from '../hooks/useFavorites.js'
import { listings } from '../data/listings.js'
import { loadMyPosts } from '../data/myPosts.js'
import { roommates } from '../data/social.js'

export default function Favorites() {
  const { rooms, mates } = useFavorites()
  const savedRooms = listings.filter((r) => rooms.includes(r.id))
  const savedMates = [...loadMyPosts(), ...roommates].filter((m) => mates.includes(m.id))

  return (
    <div className="page">
      <PageHead eyebrow="Yêu thích" title="Phòng & bạn ở ghép đã lưu" sub="Những lựa chọn bạn đã đánh dấu để so sánh sau." />

      <h2 className="fav__h">Phòng trọ đã lưu ({savedRooms.length})</h2>
      {savedRooms.length === 0 ? (
        <div className="card empty">Bạn chưa lưu phòng nào. <Link className="link-red" to="/tim-kiem">Tìm phòng ngay →</Link></div>
      ) : (
        <div className="srch__grid srch__grid--3">
          {savedRooms.map((r) => <ListingCard key={r.id} room={r} />)}
        </div>
      )}

      <h2 className="fav__h">Bạn ở ghép đã lưu ({savedMates.length})</h2>
      {savedMates.length === 0 ? (
        <div className="card empty">Chưa lưu bạn ở ghép nào. <Link className="link-red" to="/o-ghep">Xem danh sách →</Link></div>
      ) : (
        <div className="fav__mates">
          {savedMates.map((m) => (
            <Link key={m.id} to={`/o-ghep/${m.id}`} className="card fav__mate">
              <Avatar name={m.name} size={48} />
              <div><strong>{m.name}</strong><p>{m.school} · Ngân sách {m.budget} tr</p></div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
