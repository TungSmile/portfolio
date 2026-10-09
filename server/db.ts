import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Biến lưu trữ cache kết nối (hữu ích cho môi trường Serverless như Vercel)
 */
let cachedPromise: Promise<typeof mongoose | null> | null = null;

/**
 * Hàm kết nối MongoDB Atlas (hỗ trợ cả Server truyền thống và Serverless trên Vercel)
 */
export const connectDB = async (): Promise<typeof mongoose | null> => {
  // Nếu đã có kết nối sẵn sàng (readyState = 1: connected)
  if (mongoose.connection.readyState >= 1) {
    return mongoose;
  }

  // Nếu đang trong tiến trình kết nối thì trả về promise đang chờ
  if (cachedPromise) {
    return cachedPromise;
  }

  const uri = process.env.MONGODB_URI;

  if (!uri || uri.includes('<username>') || uri.includes('<password>')) {
    console.warn(
      '\n⚠️ [MongoDB Atlas] Chưa cấu hình MONGODB_URI hợp lệ trong biến môi trường!\n' +
        '👉 Hãy kiểm tra file .env hoặc cấu hình MONGODB_URI trên Vercel / Render.\n' +
        'Ví dụ: MONGODB_URI=mongodb+srv://admin:matkhau@cluster0.abcde.mongodb.net/jack_portfolio?retryWrites=true&w=majority\n'
    );
    return null;
  }

  cachedPromise = mongoose
    .connect(uri, {
      bufferCommands: false,
    })
    .then((conn) => {
      console.log(`\n✅ [MongoDB Atlas] Kết nối thành công tới Database: ${conn.connection.name}`);
      console.log(`📡 Host: ${conn.connection.host}\n`);
      return conn;
    })
    .catch((error) => {
      console.error('❌ [MongoDB Atlas] Lỗi khi kết nối:', error);
      cachedPromise = null;
      return null;
    });

  return cachedPromise;
};

// Lắng nghe các sự kiện kết nối của Mongoose
mongoose.connection.on('connected', () => {
  console.log('🔗 [Mongoose] Event: Đã kết nối MongoDB Atlas.');
});

mongoose.connection.on('error', (err) => {
  console.error('⚠️ [Mongoose] Event: Lỗi kết nối:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('🔌 [Mongoose] Event: Mất kết nối MongoDB Atlas.');
});

export default connectDB;
