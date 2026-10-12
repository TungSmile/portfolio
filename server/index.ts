import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db';
import Project from './models/Project';
import Contact from './models/Contact';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Đảm bảo MongoDB Atlas được kết nối trước khi xử lý request
app.use(async (_req, _res, next) => {
  try {
    await connectDB();
  } catch (err) {
    console.error('Lỗi kết nối DB middleware:', err);
  }
  next();
});

// Router chính chứa các API endpoints
const router = express.Router();

/**
 * Health check endpoint
 */
router.get('/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    message: 'Backend server is running with MongoDB Atlas',
    environment: process.env.VERCEL ? 'vercel-serverless' : 'standalone-server',
    timestamp: new Date().toISOString(),
  });
});

/**
 * Lấy danh sách toàn bộ dự án từ MongoDB Atlas
 */
router.get('/projects', async (req: Request, res: Response) => {
  try {
    const query = Project.find().sort({ order: 1, id: 1 });
    if (!req.query.includeHtml) {
      query.select('-htmlBase64');
    }
    const projects = await query.lean();

    if (!projects || projects.length === 0) {
      return res.json({
        success: true,
        count: 0,
        data: [],
        message: 'Chưa có dự án nào trong database. Hãy chạy "npm run seed" để nạp dữ liệu mẫu.',
      });
    }

    return res.json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    console.error('Lỗi khi lấy danh sách dự án:', error);
    return res.status(500).json({
      success: false,
      message: 'Không thể truy vấn dự án từ MongoDB Atlas',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

/**
 * Chơi game trực tiếp từ MongoDB (giải mã file HTML từ base64)
 */
router.get('/projects/:id/play', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const project = await Project.findOne({ id }).select('htmlBase64 title id link').lean();

    if (!project) {
      return res.status(404).send('<h1>Không tìm thấy dự án</h1>');
    }

    if (project.htmlBase64) {
      const html = Buffer.from(project.htmlBase64, 'base64').toString('utf-8');
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      return res.send(html);
    }

    if (project.link && (project.link.endsWith('.html') || project.link.startsWith('/'))) {
      return res.redirect(project.link);
    }

    return res.status(404).send('<h1>Dự án chưa có dữ liệu HTML Game</h1>');
  } catch (error) {
    console.error('Lỗi khi mở game:', error);
    return res.status(500).send('<h1>Lỗi server khi mở game</h1>');
  }
});

/**
 * Lấy chi tiết 1 dự án theo ID (bao gồm cả htmlBase64 nếu có)
 */
router.get('/projects/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const project = await Project.findOne({ id }).lean();
    if (!project) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy dự án' });
    }
    return res.json({ success: true, data: project });
  } catch (error) {
    return res.status(500).json({ success: false, error: (error as Error).message });
  }
});


/**
 * Thêm một dự án mới vào MongoDB Atlas
 */
router.post('/projects', async (req: Request, res: Response) => {
  try {
    const {
      id,
      title,
      category,
      description,
      role,
      year,
      tags,
      col1Img1,
      col1Img2,
      col2Img,
      link,
      order,
    } = req.body;

    if (!id || !title || !col2Img) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng cung cấp tối thiểu mã dự án (id), tên dự án (title) và ảnh chính (col2Img)',
      });
    }

    const newProject = new Project({
      id,
      title,
      category: category || '',
      description: description || '',
      role: role || '',
      year: year || '',
      tags: Array.isArray(tags) ? tags : [],
      col1Img1: col1Img1 || '',
      col1Img2: col1Img2 || '',
      col2Img,
      link: link || '#',
      order: order || 0,
    });

    const saved = await newProject.save();
    return res.status(201).json({
      success: true,
      data: saved,
      message: 'Đã thêm dự án thành công vào MongoDB Atlas!',
    });
  } catch (error) {
    console.error('Lỗi khi thêm dự án:', error);
    return res.status(500).json({
      success: false,
      message: 'Lỗi server khi lưu dự án vào MongoDB Atlas',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

/**
 * Xóa dự án khỏi MongoDB Atlas theo id
 */
router.delete('/projects/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await Project.findOneAndDelete({ id });
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: `Không tìm thấy dự án có id: ${id}`,
      });
    }
    return res.json({
      success: true,
      message: `Đã xóa dự án ${id} thành công khỏi MongoDB Atlas`,
    });
  } catch (error) {
    console.error('Lỗi khi xóa dự án:', error);
    return res.status(500).json({
      success: false,
      message: 'Lỗi server khi xóa dự án',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

/**
 * Gửi liên hệ (lưu vào MongoDB Atlas)
 */
router.post('/contact', async (req: Request, res: Response) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng nhập đầy đủ tên, email và tin nhắn',
      });
    }

    const newContact = new Contact({
      name,
      email,
      message,
    });

    const saved = await newContact.save();
    return res.status(201).json({
      success: true,
      data: saved,
      message: 'Cảm ơn bạn! Tin nhắn đã được lưu vào MongoDB Atlas.',
    });
  } catch (error) {
    console.error('Lỗi khi lưu tin nhắn liên hệ:', error);
    return res.status(500).json({
      success: false,
      message: 'Lỗi server khi gửi liên hệ',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

/**
 * Lấy danh sách liên hệ từ MongoDB Atlas
 */
router.get('/contact', async (_req: Request, res: Response) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 }).lean();
    return res.json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    console.error('Lỗi khi lấy danh sách liên hệ:', error);
    return res.status(500).json({
      success: false,
      message: 'Lỗi server khi lấy tin nhắn',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.resolve(__dirname, '../dist');

// Gắn router vào '/api'
app.use('/api', router);

// Phục vụ frontend tĩnh trong môi trường Standalone / VPS / Local Production nếu dist đã được build
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.use((req: Request, res: Response, next) => {
    if (req.method === 'GET' && !req.path.startsWith('/api')) {
      return res.sendFile(path.join(distPath, 'index.html'));
    }
    next();
  });
} else {
  app.use('/', router);
}

// Khởi chạy server nếu chạy cục bộ hoặc trên máy chủ độc lập (không phải Vercel Serverless)
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 [Production Server] Đang chạy tại: http://localhost:${PORT}`);
    console.log(`📦 [API] Lấy danh sách dự án: http://localhost:${PORT}/api/projects`);
  });
}

export default app;

