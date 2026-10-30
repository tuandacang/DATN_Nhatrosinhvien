import { useState } from 'react'
import { Field, PageHead } from '../components/ui.jsx'
import { amenities } from '../data/landlord.js'
import { radiusOptions, schools } from '../data/rooms.js'

const sections = [
  ['info', 'Thông tin sinh viên'],
  ['need', 'Nhu cầu thuê trọ'],
  ['roommate', 'Sở thích ở ghép'],
]

const years = ['Năm 1', 'Năm 2', 'Năm 3', 'Năm 4', 'Năm 5']
const habits = [
  ['sleep', 'Giờ giấc', ['Ngủ sớm', 'Linh hoạt', 'Thức khuya']],
  ['smoke', 'Hút thuốc', ['Không', 'Ngoài ban công', 'Có']],
  ['pet', 'Thú cưng', ['Không nuôi', 'Chấp nhận', 'Có nuôi']],
]

export default function Profile() {
  const [info, setInfo] = useState({
    name: '', studentId: '', school: schools[0], faculty: '', year: years[0],
    gender: 'Nam', email: '', phone: '',
  })
  const [need, setNeed] = useState({ min: 2, max: 4, radius: radiusOptions[0], picked: [] })
  const [mate, setMate] = useState({ sleep: 'Linh hoạt', smoke: 'Không', pet: 'Không nuôi', about: '' })
  const [msg, setMsg] = useState('')

  const setI = (k) => (e) => setInfo({ ...info, [k]: e.target.value })
  const setN = (k) => (e) => setNeed({ ...need, [k]: e.target.value })
  const toggle = (a) =>
    setNeed((n) => ({
      ...n,
      picked: n.picked.includes(a) ? n.picked.filter((x) => x !== a) : [...n.picked, a],
    }))

  const filled = [info.name, info.studentId, info.faculty, info.email, info.phone].filter(Boolean).length
  const percent = Math.round(((filled + (need.picked.length ? 1 : 0)) / 6) * 100)

  const save = () => {
    if (Number(need.min) > Number(need.max)) return setMsg('Ngân sách tối thiểu phải nhỏ hơn tối đa.')
    setMsg('Đã lưu hồ sơ.')
  }

  return (
    <div className="page">
      <PageHead
        eyebrow="Tài khoản"
        title="Hồ sơ cá nhân"
        sub="Hoàn thiện hồ sơ để chủ trọ và bạn ở ghép hiểu rõ hơn về bạn."
      />

      <div className="settings">
        <nav className="card settings__nav">
          {sections.map(([id, label]) => (
            <a key={id} href={`#${id}`}>{label}</a>
          ))}
        </nav>

        <div className="settings__body">
          {msg && <p className="form__ok">{msg}</p>}

          <section className="card form">
            <div className="avatar-row">
              <span className="avatar">{info.name ? info.name.trim()[0].toUpperCase() : 'S'}</span>
              <div>
                <strong>{info.name || 'Chưa có tên'}</strong>
                <p className="form__hint">Hồ sơ đã hoàn thiện {percent}%</p>
              </div>
              <button type="button" className="btn btn-outline">Đổi ảnh</button>
            </div>
          </section>

          <section id="info" className="card form">
            <h2>Thông tin sinh viên</h2>
            <div className="form__grid">
              <Field label="Họ và tên"><input value={info.name} onChange={setI('name')} placeholder="Vũ Tuấn Anh" /></Field>
              <Field label="Mã sinh viên"><input value={info.studentId} onChange={setI('studentId')} placeholder="2121050396" /></Field>
              <Field label="Trường đại học">
                <select value={info.school} onChange={setI('school')}>
                  {schools.map((s) => <option key={s}>{s}</option>)}
                </select>
              </Field>
              <Field label="Khoa / Ngành"><input value={info.faculty} onChange={setI('faculty')} /></Field>
              <Field label="Năm học">
                <select value={info.year} onChange={setI('year')}>
                  {years.map((y) => <option key={y}>{y}</option>)}
                </select>
              </Field>
              <Field label="Giới tính">
                <select value={info.gender} onChange={setI('gender')}>
                  <option>Nam</option><option>Nữ</option><option>Khác</option>
                </select>
              </Field>
              <Field label="Email"><input type="email" value={info.email} onChange={setI('email')} /></Field>
              <Field label="Số điện thoại"><input value={info.phone} onChange={setI('phone')} /></Field>
            </div>
          </section>

          <section id="need" className="card form">
            <h2>Nhu cầu thuê trọ</h2>
            <div className="form__grid">
              <Field label="Ngân sách từ (triệu/tháng)">
                <input type="number" min="0" step="0.5" value={need.min} onChange={setN('min')} />
              </Field>
              <Field label="Đến (triệu/tháng)">
                <input type="number" min="0" step="0.5" value={need.max} onChange={setN('max')} />
              </Field>
              <Field label="Bán kính đi bộ tới trường">
                <select value={need.radius} onChange={setN('radius')}>
                  {radiusOptions.map((r) => <option key={r}>{r}</option>)}
                </select>
              </Field>
            </div>
            <p className="form__hint">Tiện nghi mong muốn</p>
            <div className="pills">
              {amenities.map((a) => (
                <button
                  key={a}
                  type="button"
                  className={'pill-btn' + (need.picked.includes(a) ? ' pill-btn--on' : '')}
                  onClick={() => toggle(a)}
                >
                  {a}
                </button>
              ))}
            </div>
          </section>

          <section id="roommate" className="card form">
            <h2>Sở thích ở ghép</h2>
            <div className="form__grid">
              {habits.map(([key, label, opts]) => (
                <Field key={key} label={label}>
                  <select value={mate[key]} onChange={(e) => setMate({ ...mate, [key]: e.target.value })}>
                    {opts.map((o) => <option key={o}>{o}</option>)}
                  </select>
                </Field>
              ))}
            </div>
            <Field label="Giới thiệu bản thân">
              <textarea
                rows="3"
                value={mate.about}
                onChange={(e) => setMate({ ...mate, about: e.target.value })}
                placeholder="Sở thích, thói quen sinh hoạt..."
              />
            </Field>
            <div className="form__actions">
              <button type="button" className="btn btn-primary btn-lg" onClick={save}>Lưu hồ sơ</button>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
