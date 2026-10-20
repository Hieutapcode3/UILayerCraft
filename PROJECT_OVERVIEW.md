# Tổng quan Dự án UILayerCraft

## 1. Giới thiệu tổng quan
**UILayerCraft** là một công cụ và plugin Figma chuyên sâu (hỗ trợ cả **Figma Desktop Plugin** và **chế độ Web độc lập - Standalone Web**) ứng dụng AI để **phân rã (decompose), cắt ghép (slice) và tái tạo (reconstruct)** các ảnh giao diện người dùng (UI mockup / flat image) thành các thành phần có cấu trúc, có thể chỉnh sửa và lập trình được.

Dự án đặc biệt giải quyết bài toán của các ảnh thiết kế UI được sinh từ mô hình AI (như GPT Image2, Midjourney, Stable Diffusion...): biến một bức ảnh phẳng nguyên khối thành file thiết kế Figma có thể chỉnh sửa layer, hoặc bộ mã nguồn HTML/CSS kèm tài nguyên ảnh đã được cắt tách hợp lý.

---

## 2. Dự án này giải quyết bài toán gì?
Hầu hết các công cụ AI hiện nay chỉ dừng lại ở hai mục đích:
1. **Tách layer đồ họa (Graphic Separation):** Dành cho poster, banner (chủ yếu xuất ra PSD để sửa ảnh).
2. **Xóa phông (Background Removal):** Chỉ bóc tách chủ thể người hoặc vật thể đơn lẻ.

**Sự khác biệt cốt lõi của UILayerCraft:**
Dự án định nghĩa khái niệm **"AI UI Slicing"** phục vụ trực tiếp cho quy trình phát triển giao diện (UI Development):
* **Phân loại thông minh giữa Code và Asset:** Tự động nhận diện những gì nên chuyển hóa thành code/node Figma (như văn bản, nút bấm, khung thẻ card, bố cục layout) và những gì cần giữ nguyên làm asset ảnh tĩnh/vector (hình minh họa phức tạp, chữ nghệ thuật, icon độc quyền, ảnh chụp sản phẩm).
* **AI Inpainting khôi phục nền:** Tự động nhận diện các phần tử tiền cảnh (nút, text) che khuất phần nền, sau đó dùng AI xóa tiền cảnh và vẽ bù (inpaint) để có được tấm ảnh nền hoàn chỉnh, sạch sẽ.
* **Tái tạo thiết kế có cấu trúc:** Chuyển đổi DOM hoặc layout nhận diện được thành Figma Native Nodes hoặc xuất gói mã nguồn HTML/CSS/JS kèm assets.

---

## 3. Các tính năng chính

### 3.1. Tạo và nạp ảnh UI
* **Văn sinh ảnh (Text-to-Image) & Ảnh sinh ảnh (Image-to-Image):** Kết nối các mô hình AI để tạo bản thiết kế UI theo mô tả hoặc ảnh tham khảo.
* **Tải ảnh cục bộ:** Nạp ảnh chụp màn hình hoặc file thiết kế có sẵn (`PNG`, `JPEG`, `WebP`).

### 3.2. AI Bóc tách giao diện (AI UI Decomposition) & Sửa chữa
* **Tự động khoanh vùng:** Phân loại thành phần thành cut-out assets, background và code layers.
* **Background Inpainting & Compositing (Local Inpaint):** Tự động bù vùng ảnh bị che khuất với hai cơ chế:
  * *AI Bù - Ảnh gốc:* Kết quả inpaint toàn diện từ mô hình AI.
  * *AI Bù - Ghép cục bộ:* Chỉ ghép phần bù vào vùng bị che, giữ nguyên 100% pixel gốc ở các vùng khác.
* **Slice Editor:** Công cụ bút vẽ (Brush) và tẩy (Eraser) thủ công để người dùng tinh chỉnh vùng mask cần AI vẽ lại.

### 3.3. Tái tạo mã và thiết kế Figma
* **AI Layer Preview & Elements Inspector:** Sinh mã HTML/CSS và cho phép duyệt cây cấu trúc DOM của giao diện ngay trong plugin.
* **Figma Native Import:** Chuyển đổi HTML/DOM thành các Figma Nodes có thể chỉnh sửa trực tiếp trên canvas.
* **High-Fidelity Capture (Playwright / CDP):** Sử dụng headless Chromium qua giao thức Chrome DevTools Protocol để bắt chính xác các hiệu ứng phức tạp (pseudo-elements, shadow, gradient phức tạp, filter, clip-path) và chuyển thành layer chuẩn xác.
* **Xuất độc lập:**
  * Xuất trực tiếp file `.fig` (không cần mở Figma, thông qua `openfig-core`).
  * Xuất gói mã nguồn HTML/CSS/JS (ZIP) sẵn sàng chạy trên trình duyệt.
  * Xuất gói ảnh cắt (Slice Package ZIP).

---

## 4. Công nghệ và Ngôn ngữ sử dụng

### 4.1. Ngôn ngữ lập trình
* **JavaScript (Node.js & Modern Browser Vanilla JS):** Toàn bộ dự án được viết hoàn toàn bằng JavaScript hiện đại (ES Modules).

### 4.2. Kiến trúc & Công nghệ chi tiết

| Phân hệ | Thư mục nguồn | Công nghệ / Thư viện chính | Vai trò |
| :--- | :--- | :--- | :--- |
| **Giao diện Plugin & Web UI** | `src/ui/` | **Vanilla JS, HTML5, CSS3** (không dùng framework nặng như React/Vue để tối ưu độ nhẹ và tương thích tốt nhất với Figma iframe). | Quản lý canvas chỉnh sửa, khung xem trước, state management, renderers, giao tiếp API. |
| **Figma Plugin Main Thread** | `src/plugin/` | **Figma Plugin API** | Chạy trong runtime của Figma, tạo node, frame, import ảnh, vector và đồng bộ canvas. |
| **Build System** | `scripts/`, configs | **Vite**, `scripts/build-ui-html.js` | Đóng gói mã nguồn UI thành 1 file duy nhất `dist/ui.html` (inline CSS/JS) và bundle main plugin thành `dist/code.js`. |
| **Backend API Server** | `server.js`, `src/server/` | **Node.js (>= 20.19.0)**, HTTP server tích hợp | Cổng giao tiếp local (mặc định port `18787`), điều phối AI request, lưu cache, quản lý draft. |
| **Xử lý hình ảnh & Vector** | `src/core/`, `src/server/services/` | **Sharp**, `@neplex/vectorizer`, `fast-xml-parser`, `svgpath`, `makerjs` | Cắt ảnh, xử lý độ trong suốt (transparency), resize, nén ảnh, xử lý SVG và chuyển đổi vector. |
| **Tạo file Figma `.fig` độc lập** | `src/fig-export/` | **openfig-core**, `zstd-codec` | Chuyển đổi định dạng node của Figma thành file `.fig` chuẩn mà không phụ thuộc vào Figma Desktop. |
| **Bắt giao diện độ trung thực cao** | `src/server/services/` | **Playwright (Chromium)** | Khởi chạy trình duyệt ngầm và dùng CDP đọc layout, render styles phục vụ chuyển đổi Figma chính xác. |
| **Kết nối AI (LLM / VLM)** | `src/server/providers/` | Giao thức chuẩn **OpenAI-compatible API** | Kết nối linh hoạt tới OpenAI, GPT-4o, Claude hoặc bất kỳ nhà cung cấp proxy tương thích nào (`/v1/chat/completions`, `/v1/images/generations`, `/v1/images/edits`). |
| **Testing** | `tests/` | **Node.js Native Test Runner** (`node --test`) | Hơn 40 bộ test bao phủ toàn bộ logic xử lý ảnh, parsing, chuyển đổi Figma, export HTML và UI helpers. |

---

## 5. Quy trình hoạt động (Workflow tóm tắt)

```text
[ Ảnh chụp UI / Ảnh AI ]
          │
          ▼
   [ AI Phân rã UI ] ── (Phát hiện Cut-out Assets, Nền, Code Layers)
          │
          ▼
[ AI Bù nền / Sửa Mask ] ── (Xóa nút/chữ che khuất, inpaint hoàn thiện nền)
          │
          ▼
 [ AI Phân tích cấu trúc ] ── (Sinh HTML/CSS Preview + Elements Inspector)
          │
          ├─────────────────────────┬─────────────────────────┐
          ▼                         ▼                         ▼
   [ Nhập vào Figma ]        [ Tải file .fig ]       [ Tải gói HTML / ZIP ]
(Tạo node chỉnh sửa trực tiếp)  (Dùng cho chế độ Web)      (Mã nguồn sẵn sàng code)
```
