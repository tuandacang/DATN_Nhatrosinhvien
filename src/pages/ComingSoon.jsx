import { Link } from 'react-router-dom'

export default function ComingSoon({ title }) {
  return (
    <div className="soon container">
      <p className="eyebrow soon__eyebrow">Đang phát triển</p>
      <h1 className="soon__title">{title}</h1>
      <p className="soon__desc">Trang này sẽ được thêm ở các bước tiếp theo.</p>
      <Link to="/trang-chu" className="btn btn-primary">
        Về trang chủ
      </Link>
    </div>
  )
}
