import fs from 'fs';
import path from 'path';
import connectDB from './db';
import Project, { ProjectData } from './models/Project';

function getPngBase64(relativeFilePath: string): string {
  const fullPath = path.resolve(process.cwd(), relativeFilePath);
  if (fs.existsSync(fullPath)) {
    const buffer = fs.readFileSync(fullPath);
    return `data:image/png;base64,${buffer.toString('base64')}`;
  }
  console.warn(`⚠️ Không tìm thấy file PNG tại: ${fullPath}`);
  return '';
}

function getHtmlBase64(relativeFilePath: string): string {
  const fullPath = path.resolve(process.cwd(), relativeFilePath);
  if (fs.existsSync(fullPath)) {
    const buffer = fs.readFileSync(fullPath);
    return buffer.toString('base64');
  }
  console.warn(`⚠️ Không tìm thấy file HTML tại: ${fullPath}`);
  return '';
}

export const seedDatabase = async () => {
  console.log('🚀 Đang bắt đầu khởi tạo dữ liệu mẫu lên MongoDB Atlas...');
  const conn = await connectDB();

  if (!conn) {
    console.error('❌ Không thể kết nối tới MongoDB Atlas. Hãy kiểm tra MONGODB_URI trong file .env');
    process.exit(1);
  }

  try {
    console.log('📦 Đang mã hóa file PNG và HTML sang Base64...');

    const projectsWithBase64: ProjectData[] = [
      {
        id: '01',
        title: 'The Lost Forest Puzzle',
        category: '',
        description:
          '🌲 Bước vào một thế giới bí ẩn… nơi những câu chuyện được giấu kín sâu trong rừng!\n' +
          'Thư giãn đầu óc với những thử thách hóc búa trong Trò chơi giải đố Rừng Mất Tích; di chuyển các vật thể, kết hợp chúng và giải các câu đố 🔍💎\n' +
          '🗝️ Không chỉ là một trò chơi, Trò chơi giải đố Rừng Mất Tích sẽ hướng dẫn bạn khám phá những ký ức bị lãng quên của cô bé...',
        role: 'PA',
        year: '2026 — Present',
        tags: ['Puzzle', 'Adr', 'Ios', 'Game 2D', '1M Downloads'],
        col1Img1: getPngBase64('src/asset/icon/tree.png'),
        col1Img2: '',
        col2Img: '',
        htmlBase64: getHtmlBase64('src/asset/html/tree.html'),
        link: '/tree.html',
        order: 1,
      },
      {
        id: '02',
        title: 'Pixel by Color: Pixel Art',
        category: '',
        description:
          'Pixel by Color: Pixel Art" là một trò chơi thu thập nhiều tác phẩm nghệ thuật pixel khổng lồ từ khắp nơi trên thế giới hoặc cho phép bạn nhập hình ảnh của riêng mình để tạo ra trải nghiệm tô màu theo số cá nhân hóa.\n',
        role: 'PA',
        year: '2024 — Present',
        tags: ['Puzzle', 'Adr', 'Game 2D', '1M Downloads'],
        col1Img1: getPngBase64('src/asset/icon/pixe.png'),
        col1Img2: '',
        col2Img: '',
        htmlBase64: getHtmlBase64('src/asset/html/pixe.html'),
        link: '/pixe.html',
        order: 2,
      },
      {
        id: '03',
        title: 'Wood Cube Out 3D',
        category: '',
        description:
          'Wood Cube Out 3D là một trò chơi giải đố hấp dẫn, trong đó người chơi phải tháo rời các khối gỗ được kết nối bằng ốc vít trong không gian 3D. Mỗi cấp độ sẽ đưa ra cho người chơi những tình huống đòi hỏi sự chính xác và tư duy thông minh để tháo rời các thành phần theo cách hợp lý. Các ốc vít cần được tháo rời theo màu sắc phù hợp để giải phóng các khối gỗ và tiến tới cấp độ tiếp theo. Mục tiêu chính của trò chơi là tháo rời các vật thể bằng cách sắp xếp và tháo ốc vít cùng màu. Trò chơi không chỉ đòi hỏi tư duy chiến lược mà còn đòi hỏi sự tập trung để tránh bị tắc nghẽn và hoàn thành nhiệm vụ một cách nhanh chóng và hiệu quả!!!',
        role: 'PA',
        year: '2025 — Present',
        tags: ['Puzzle', 'Adr', 'Ios', 'Game 3D', '1M Downloads'],
        col1Img1: getPngBase64('src/asset/icon/cube.png'),
        col1Img2: '',
        col2Img: '',
        htmlBase64: getHtmlBase64('src/asset/html/cube.html'),
        link: '/cube.html',
        order: 3,
      },
      {
        id: '04',
        title: 'Annoying Puzzle Game',
        category: '',
        description:
          'Bạn sẽ được tham gia những câu đố vui nhộn, mang tính giải trí đầy trí tuệ!\n' +
          'Câu Đố Đa Dạng: Giữ người chơi luôn hứng thú với các mức độ khó khác nhau.\n' +
          'Thử Thách Logic: Khuyến khích giải quyết vấn đề một cách sáng tạo và hiệu quả.\n' +
          'Thiết Kế Thân Thiện: Đơn giản và dễ tiếp cận với tất cả người chơi...',
        role: 'PA',
        year: '2024 — Present',
        tags: ['Puzzle', 'Adr', 'Ios', 'Game 2D', '50M Downloads'],
        col1Img1: getPngBase64('src/asset/icon/anoy.png'),
        col1Img2: '',
        col2Img: '',
        htmlBase64: getHtmlBase64('src/asset/html/anoy.html'),
        link: '/anoy.html',
        order: 4,
      },
      {
        id: '05',
        title: 'Annoying Puzzle Game 2',
        category: '',
        description:
          'Bây giờ hãy sẵn sàng chào đón những câu đố vui nhộn và những thử thách thú vị trong Annoying Puzzle Game 2! Đây là một trò chơi trí tuệ. Hãy tận hưởng những trò chơi trí tuệ được thiết kế dành cho những người đam mê những trải nghiệm khó khăn và những thử thách trí tuệ khác!🧩✨',
        role: 'PA',
        year: '2025 — Present',
        tags: ['Puzzle', 'Adr', 'Ios', 'Game 2D', '1M Downloads'],
        col1Img1: getPngBase64('src/asset/icon/anoy2.png'),
        col1Img2: '',
        col2Img: '',
        htmlBase64: getHtmlBase64('src/asset/html/anoy2.html'),
        link: '/anoy2.html',
        order: 5,
      },
    ];

    // Xóa các dự án cũ nếu có
    await Project.deleteMany({});
    console.log('🧹 Đã dọn dẹp các dự án cũ trong database.');

    // Chèn dữ liệu mẫu có chứa Base64 của PNG và HTML
    const inserted = await Project.insertMany(projectsWithBase64);
    console.log(`✨ Đã lưu thành công ${inserted.length} dự án (kèm ảnh PNG và game HTML dạng Base64) vào MongoDB Atlas!`);

    inserted.forEach((p) => {
      console.log(`  - [${p.id}] ${p.title}: PNG Base64 (${Math.round((p.col1Img1?.length || 0) / 1024)} KB) | HTML Base64 (${Math.round((p.htmlBase64?.length || 0) / 1024)} KB)`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Lỗi khi nạp dữ liệu mẫu lên MongoDB Atlas:', error);
    process.exit(1);
  }
};

// Chạy trực tiếp nếu file được gọi bằng node/tsx
seedDatabase();
