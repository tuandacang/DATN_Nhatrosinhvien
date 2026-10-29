import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Field, PageHead } from '../components/ui.jsx'
import { amenities as allAmenities } from '../data/landlord.js'
import { schools } from '../data/rooms.js'

const empty = { title: '', school: '', address: '', walk: '', price: '', area: '', electric: '', water: '' }

export default function PostRoom() {
  const [form, setForm] = useState(empty)
  const [files, setFiles] = useState([])
  const [picked, setPicked] = useState([])
  const [agree, setAgree] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value })
  const toggle = (name) =>
    setPicked((p) => (p.includes(name) ? p.filter((x) => x !== name) : [...p, name]))

  const submit = (e) => {
    e.preventDefault()
    if (!form.title || !form.school || !form.address || !form.price || !form.area) {
      setError('Vui lòng điền đầy đủ các mục có dấu *.')
    } else if (files.length < 3) {
      setError('Vui lòng tải lên tối thiểu 3 ảnh phòng.')
    } else if (!agree) {
      setError('Bạn cần xác nhận thông tin trước khi đăng tin.')
    } else {
      setError('')
      setDone(true)
    }
  }

  if (done) {
    return (
      <div className="page page--narrow">
        <div className="card done">
          <h1>Đăng tin thành công</h1>
          <p>Tin đăng sẽ được duyệt và hiển thị ưu tiên trên bản đồ trường học trong vòng 15 phút.</p>
          <div className="done__actions">
            <Link to="/chu-tro" className="btn btn-primary btn-lg">Về bảng điều khiển</Link>
            <button className="btn btn-outline btn-lg" onClick={() => { setForm(empty); setFiles([]); setPicked([]); setAgree(false); setDone(false) }}>
              Đăng thêm tin
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="page page--narrow">
      <PageHead
        eyebrow="Dành riêng cho chủ nhà & ban quản lý"
        title="Đăng tin phòng trọ mới"
        sub="Tiếp cận hàng nghìn sinh viên tìm trọ văn minh tại các cụm trường đại học trọng điểm Hà Nội."
      />

      <form className="card form" onSubmit={submit}>
        <section>
          <div className="form__row-head">
            <h3>Hình ảnh phòng thực tế</h3>
            <span>Tối thiểu 3 ảnh (Tối đa 10 ảnh)</span>
          </div>
          <label className="drop">
            <input
              type="file"
              accept="image/*"
              multiple
              hidden
              onChange={(e) => setFiles([...e.target.files].slice(0, 10))}
            />
            <strong>Nhấn để tải ảnh hoặc kéo thả vào đây</strong>
            <span>Hỗ trợ JPG, PNG, WEBP (Phòng ngủ, WC, lối đi, mặt tiền)</span>
            {files.length > 0 && <em>Đã chọn {files.length} ảnh</em>}
          </label>
        </section>

        <Field label="Tiêu đề tin đăng *">
          <input value={form.title} onChange={set('title')} placeholder="VD: Phòng khép kín có gác xép, full đồ gần ngõ 10 Tạ Quang Bửu" />
        </Field>

        <Field label="Cụm trường đại học gần nhất *">
          <select value={form.school} onChange={set('school')}>
            <option value="">Chọn trường trọng điểm lân cận</option>
            {schools.map((s) => <option key={s}>{s}</option>)}
          </select>
        </Field>

        <div className="form__grid form__grid--2-1">
          <Field label="Địa chỉ cụ thể *">
            <input value={form.address} onChange={set('address')} placeholder="VD: Số 18 ngách 27 ngõ Đại Cồ Việt, Hai Bà Trưng" />
          </Field>
          <Field label="Khoảng cách đi bộ">
            <input value={form.walk} onChange={set('walk')} placeholder="VD: 350m (4 phút)" />
          </Field>
        </div>

        <div className="form__grid">
          <Field label="Giá thuê niêm yết *">
            <div className="input-unit">
              <input inputMode="numeric" value={form.price} onChange={set('price')} placeholder="3.500.000" />
              <span>VNĐ / tháng</span>
            </div>
          </Field>
          <Field label="Diện tích phòng *">
            <div className="input-unit">
              <input inputMode="numeric" value={form.area} onChange={set('area')} placeholder="25" />
              <span>m²</span>
            </div>
          </Field>
        </div>

        <section>
          <div className="form__row-head">
            <h3>Biểu phí điện & nước (Minh bạch sinh viên)</h3>
            <span className="tag tag--ok">Cam kết không phụ phí</span>
          </div>
          <div className="form__grid">
            <Field label="Giá tiền điện">
              <div className="input-unit">
                <input inputMode="decimal" value={form.electric} onChange={set('electric')} placeholder="3.8" />
                <span>k / kWh</span>
              </div>
            </Field>
            <Field label="Giá tiền nước sinh hoạt">
              <div className="input-unit">
                <input inputMode="numeric" value={form.water} onChange={set('water')} placeholder="100" />
                <span>k / người / tháng</span>
              </div>
            </Field>
          </div>
        </section>

        <section>
          <div className="form__row-head">
            <h3>Tiện ích sẵn có trong phòng</h3>
            <span>Bấm chọn để kích hoạt</span>
          </div>
          <div className="pills">
            {allAmenities.map((a) => (
              <button
                key={a}
                type="button"
                className={'pill-btn' + (picked.includes(a) ? ' pill-btn--on' : '')}
                onClick={() => toggle(a)}
              >
                {a}
              </button>
            ))}
          </div>
        </section>

        <label className="check">
          <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
          <span>
            Bằng việc đăng tin, bạn xác nhận phòng trọ có thực tế, thông tin giá thuê và biểu phí điện nước là chính xác.
          </span>
        </label>

        {error && <p className="form__error">{error}</p>}

        <button type="submit" className="btn btn-primary btn-xl">Đăng tin ngay</button>
        <p className="form__hint">Tin đăng sẽ được duyệt và hiển thị ưu tiên trên bản đồ trường học trong vòng 15 phút.</p>
      </form>

      <div className="trust">
        <div><strong>120,000+ Sinh viên</strong><span>Truy cập tìm trọ mỗi tháng</span></div>
        <div><strong>Xác thực chính chủ</strong><span>Không cò mồi, không mất phí ảo</span></div>
        <div><strong>Lấp phòng siêu tốc</strong><span>Trung bình 3-5 ngày chốt cọc</span></div>
      </div>
    </div>
  )
}
