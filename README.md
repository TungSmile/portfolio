# 🎨 Portfolio CV Website (Vite + React + Vercel + MongoDB Atlas)

Dự án Portfolio cá nhân toàn diện được xây dựng với **Frontend React Vite**, **Backend API**, kết nối trực tiếp đến **MongoDB Atlas** trên cloud và sẵn sàng triển khai (deploy) lên **Vercel**.

---

## 🏗️ Cấu trúc dự án (Architecture)

```
d:\cv/
├── api/                           # ⚡ Serverless API cho Vercel
│   └── index.ts                   # Entry point Vercel Serverless Function
│
├── server/                        # 🖥️ Backend API Node.js / Express
│   ├── db.ts                      # Kết nối Mongoose tối ưu (có Cache cho Serverless)
│   ├── index.ts                   # Express server & API routes
│   ├── seed.ts                    # Script nạp dữ liệu mẫu lên MongoDB Atlas
│   └── models/
│       ├── Project.ts             # Schema Mongoose cho Projects
│       └── Contact.ts             # Schema Mongoose cho Form liên hệ
│
├── src/                           # 🌐 Frontend React + Vite + TailwindCSS
│   ├── config/
│   │   └── api.ts                 # Cấu hình API endpoint linh hoạt (Vercel / Render / Local)
│   ├── components/
│   │   ├── AddProjectModal.tsx    # Modal thêm dự án trực tiếp vào MongoDB Atlas
│   │   ├── ContactModal.tsx       # Modal gửi liên hệ lưu vào MongoDB Atlas
│   │   └── ...                    # Các components giao diện khác
│   ├── sections/
│   │   └── ProjectsSection.tsx    # Danh mục dự án lấy dữ liệu động từ Atlas
│   └── App.tsx
│
├── vercel.json                    # ⚙️ Cấu hình định tuyến & rewrites khi deploy Vercel
├── vite.config.ts                 # Cấu hình proxy /api khi chạy dev local
├── .env                           # Biến môi trường local (MONGODB_URI, PORT)
├── .env.example                   # Mẫu cấu hình môi trường
└── package.json                   # Dependencies và npm scripts
```

---

## 🌟 2 Phương thức triển khai (Deployment Options)

### 🥇 Cách 1: Fullstack 1-Click trên Vercel (Khuyên dùng)
Toàn bộ Frontend và Backend chạy chung trên Vercel:
- **Frontend**: Được Vercel build tự động (`dist/`).
- **Backend API**: Chạy dưới dạng **Vercel Serverless Functions** (`api/index.ts`).
- **Database**: Kết nối trực tiếp đến **MongoDB Atlas**.
- **Ưu điểm**: Không tốn thêm chi phí hosting, không lo lỗi CORS, quản lý chung 1 Git repo.

### 🥈 Cách 2: Tách rời (Decoupled)
- **Frontend**: Chạy trên Vercel (`dist/`).
- **Backend**: Chạy trên Render / Railway / Fly.io (`server/index.ts`).
- **Database**: MongoDB Atlas.
- Cấu hình biến môi trường trên Vercel: `VITE_API_URL=https://your-backend.onrender.com`.

---

## 🚀 Hướng dẫn Deploy lên Vercel từng bước

### Bước 1: Đẩy mã nguồn lên GitHub
1. Tạo một repository mới trên GitHub (ví dụ: `my-portfolio`).
2. Khởi tạo git và đẩy code lên:
   ```bash
   git init
   git add .
   git commit -m "feat: complete project with MongoDB Atlas & Vercel configuration"
   git branch -M main
   git remote add origin https://github.com/<your-username>/my-portfolio.git
   git push -u origin main
   ```

### Bước 2: Cấp quyền IP trên MongoDB Atlas
Vercel sử dụng các địa chỉ IP động cho các Serverless Function, do đó bạn cần cho phép truy cập từ mọi nơi:
1. Đăng nhập [MongoDB Atlas](https://cloud.mongodb.com/).
2. Vào mục **Network Access** (ở menu bên trái).
3. Bấm **Add IP Address** -> Chọn **Allow Access from Anywhere** (`0.0.0.0/0`).
4. Bấm **Confirm**.

### Bước 3: Import dự án vào Vercel
1. Đăng nhập vào [Vercel](https://vercel.com/) và bấm **Add New...** -> **Project**.
2. Chọn repository GitHub bạn vừa đẩy lên.
3. Trong mục **Configure Project**:
   - **Framework Preset**: Chọn `Vite` (Vercel thường tự nhận diện).
   - **Root Directory**: `./` (để mặc định).
4. Mở rộng mục **Environment Variables** và thêm biến sau:
   - **Key**: `MONGODB_URI`
   - **Value**: `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/jack_portfolio?retryWrites=true&w=majority`
   *(Thay bằng chuỗi kết nối từ file `.env` của bạn)*
5. Bấm **Deploy**.
6. Sau khoảng 1 phút, dự án sẽ hoàn tất và bạn có URL công khai (ví dụ: `https://my-portfolio.vercel.app`)!

---

## 💻 Chạy và phát triển ở máy cục bộ (Local Development)

### 1. Nạp dữ liệu mẫu lên MongoDB Atlas
```bash
npm run seed
```

### 2. Chạy cả Backend & Frontend cùng lúc
```bash
npm run dev:all
```
Hoặc mở 2 terminal:
- **Terminal 1 (Backend)**: `npm run server` (Cổng 5000)
- **Terminal 2 (Frontend)**: `npm run dev` (Cổng 5173)

Mở trình duyệt: [http://localhost:5173](http://localhost:5173)

---

## 📡 Danh sách API Endpoints

| Method | Endpoint | Mô tả |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Kiểm tra trạng thái server & môi trường (local / Vercel) |
| `GET` | `/api/projects` | Lấy danh sách dự án động từ MongoDB Atlas |
| `POST` | `/api/projects` | Thêm dự án mới vào MongoDB Atlas |
| `DELETE` | `/api/projects/:id` | Xóa dự án khỏi MongoDB Atlas theo ID |
| `POST` | `/api/contact` | Lưu tin nhắn biểu mẫu liên hệ vào MongoDB Atlas |
| `GET` | `/api/contact` | Lấy danh sách các tin nhắn liên hệ từ Atlas |
