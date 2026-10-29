import { HomeIcon } from './Icons.jsx'

export default function RoomCard({ room }) {
  return (
    <article className="room-card">
      <div className="room-card__photo">
        {/* Thay bằng <img src={room.image} /> khi có ảnh thật */}
        <HomeIcon width={40} height={40} />
        {room.available && <span className="badge">Còn phòng</span>}
      </div>

      <div className="room-card__body">
        <p className="room-card__distance">
          Cách {room.school} {room.distance}m
        </p>
        <h3 className="room-card__title">{room.title}</h3>
        <p className="room-card__desc">{room.desc}</p>

        <div className="room-card__foot">
          <p className="room-card__price">
            <strong>{room.price}</strong> tr/tháng
          </p>
          <span className="room-card__owner">{room.owner}</span>
        </div>
      </div>
    </article>
  )
}
