// Ảnh phòng minh họa (ảnh miễn phí từ Unsplash, dùng trực tiếp qua link).
// Muốn dùng ảnh thật của từng phòng: thay link trong danh sách bên dưới bằng ảnh của bạn.
const IDS = [
  '1646148707098-a27b818d5c95', '1646490577169-2be2bba96c86', '1646743742987-cf69915d21cf',
  '1646572961739-58557003b037', '1646838116343-1fd356d7e4e8', '1647521088714-a9952b135c1e',
  '1647949849240-143a5da605ca', '1648125700798-d3233f118ec6', '1648668425549-84b695d2ec2a',
  '1648690979774-a36ae455bacd', '1648949416036-cf80a1335cce', '1649265825072-f7dd6942baed',
  '1650637472771-16fedc3c6668', '1652363499754-ec1ef28f88ac', '1649817018876-c05473c7e5a4',
  '1647870988181-5298e3b9036e', '1647705722868-3ff8e93b73b2', '1648726660921-7413e1b0f93b',
]

const url = (i, w) => `https://images.unsplash.com/photo-${IDS[i % IDS.length]}?auto=format&fit=crop&w=${w}&q=70`

// Ảnh của phòng số `id`, ảnh thứ `n` (0 = ảnh bìa)
export function roomPhoto(id, n = 0, w = 800) {
  return url(id * 3 + n * 5, w)
}

// Style nền ảnh để gắn vào thẻ div
export function roomBg(id, n = 0, w = 800) {
  return { backgroundImage: `url(${roomPhoto(id, n, w)})`, backgroundSize: 'cover', backgroundPosition: 'center' }
}
