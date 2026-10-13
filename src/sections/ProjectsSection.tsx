import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Calendar } from 'lucide-react';
import FadeIn from '../components/FadeIn';
import LiveProjectButton from '../components/LiveProjectButton';
import { getApiUrl } from '../config/api';

export interface ProjectData {
  id: string;
  title: string;
  category: string;
  description?: string;
  role?: string;
  year?: string;
  tags?: string[];
  col1Img1: string;
  col1Img2: string;
  col2Img: string;
  link?: string;
  order?: number;
}

export const PROJECTS: ProjectData[] = [
  {
    id: '01',
    title: 'The Lost Forest Puzzle',
    category: '',
    description:
      '🌲 Bước vào một thế giới bí ẩn… nơi những câu chuyện được giấu kín sâu trong rừng!  \n'
      + 'Thư giãn đầu óc với những thử thách hóc búa trong Trò chơi giải đố Rừng Mất Tích; di chuyển các vật thể, kết hợp chúng và giải các câu đố 🔍💎 \n'
      + '🗝️ Không chỉ là một trò chơi, Trò chơi giải đố Rừng Mất Tích sẽ hướng dẫn bạn khám phá những ký ức bị lãng quên của cô bé...',
    role: 'PA',
    year: '2026 — Present',
    tags: ['Puzzle', 'Adr', 'Ios', 'Game 2D', '1M Downloads'],
    col1Img1: '/icon/tree.png',
    col1Img2: '',
    col2Img: '',
    link: '/tree.html',
  },
  {
    id: '02',
    title: 'Pixel by Color: Pixel Art',
    category: '',
    description:
      'Pixel by Color: Pixel Art" là một trò chơi thu thập nhiều tác phẩm nghệ thuật pixel khổng lồ từ khắp nơi trên thế giới hoặc cho phép bạn nhập hình ảnh của riêng mình để tạo ra trải nghiệm tô màu theo số cá nhân hóa.\n'
    ,
    role: 'PA', year: '2024 — Present',
    tags: ['Puzzle', 'Adr', 'Game 2D', '1M Downloads'],
    col1Img1: '/icon/pixe.png',
    col1Img2: '',
    col2Img: '',
    link: '/pixe.html',
  },
  {
    id: '03',
    title: 'Wood Cube Out 3D',
    category: '',
    description:
      'Wood Cube Out 3D là một trò chơi giải đố hấp dẫn, trong đó người chơi phải tháo rời các khối gỗ được kết nối bằng ốc vít trong không gian 3D. Mỗi cấp độ sẽ đưa ra cho người chơi những tình huống đòi hỏi sự chính xác và tư duy thông minh để tháo rời các thành phần theo cách hợp lý. Các ốc vít cần được tháo rời theo màu sắc phù hợp để giải phóng các khối gỗ và tiến tới cấp độ tiếp theo. Mục tiêu chính của trò chơi là tháo rời các vật thể bằng cách sắp xếp và tháo ốc vít cùng màu. Trò chơi không chỉ đòi hỏi tư duy chiến lược mà còn đòi hỏi sự tập trung để tránh bị tắc nghẽn và hoàn thành nhiệm vụ một cách nhanh chóng và hiệu quả!!!',
    role: 'PA', year: '2025 — Present',
    tags: ['Puzzle', 'Adr', 'Ios', 'Game 3D', '1M Downloads'],
    col1Img1: '/icon/cube.png',
    col1Img2: '',
    col2Img: '',
    link: '/cube.html',
  },
  {
    id: '04',
    title: 'Annoying Puzzle Game',
    category: '',
    description:
      'Bạn sẽ được tham gia những câu đố vui nhộn, mang tính giải trí đầy trí tuệ! \n'
      + 'Câu Đố Đa Dạng: Giữ người chơi luôn hứng thú với các mức độ khó khác nhau.\n'
      + 'Thử Thách Logic: Khuyến khích giải quyết vấn đề một cách sáng tạo và hiệu quả.\n'
      + 'Thiết Kế Thân Thiện: Đơn giản và dễ tiếp cận với tất cả người chơi...',
    role: 'PA', year: '2024 — Present',
    tags: ['Puzzle', 'Adr', 'Ios', 'Game 2D', '50M Downloads'],
    col1Img1: '/icon/anoy.png',
    col1Img2: '',
    col2Img: '',
    link: '/anoy.html',
  },
  {
    id: '05',
    title: 'Annoying Puzzle Game 2',
    category: '',
    description:
      'Bây giờ hãy sẵn sàng chào đón những câu đố vui nhộn và những thử thách thú vị trong Annoying Puzzle Game 2! Đây là một trò chơi trí tuệ. Hãy tận hưởng những trò chơi trí tuệ được thiết kế dành cho những người đam mê những trải nghiệm khó khăn và những thử thách trí tuệ khác!🧩✨',
    role: 'PA', year: '2025 — Present',
    tags: ['Puzzle', 'Adr', 'Ios', 'Game 2D', '1M Downloads'],
    col1Img1: '/icon/anoy2.png',
    col1Img2: '',
    col2Img: '',
    link: '/anoy2.html',
  }
];

interface ProjectCardProps {
  project: ProjectData;
  index: number;
  totalCards: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  totalCards,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // useScroll targeting the card container to scale down as scrolled past
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Target scale calculation: targetScale = 1 - (totalCards - 1 - index) * 0.03
  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  // Determine active displayed image (fallback to /icon/tree.png)
  const initialImg = project.col1Img1 || project.col2Img || '/icon/tree.png';
  const [activeImage, setActiveImage] = useState<string>(initialImg);

  useEffect(() => {
    setActiveImage(project.col1Img1 || project.col2Img || '/icon/tree.png');
  }, [project.col1Img1, project.col2Img]);

  // Valid gallery images for thumbnail strip
  const galleryImages = Array.from(
    new Set(
      [project.col2Img, project.col1Img1, project.col1Img2].filter(
        (img): img is string => Boolean(img && typeof img === 'string' && img.trim() !== '')
      )
    )
  );

  const projectLink = project.link && project.link !== '#' ? project.link : '/tree.html';

  const handleCardClick = () => {
    window.open(projectLink, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      ref={containerRef}
      className="min-h-[85vh] flex items-center justify-center sticky top-20 md:top-28 [--top-offset:5rem] md:[--top-offset:7rem] py-6"
      style={{
        top: `calc(var(--top-offset) + ${index * 28}px)`,
      }}
    >
      <motion.div
        style={{ scale }}
        onClick={handleCardClick}
        role="button"
        tabIndex={0}
        aria-label={`Xem dự án ${project.title}`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleCardClick();
          }
        }}
        className="group w-full max-w-6xl rounded-[36px] sm:rounded-[48px] md:rounded-[56px] border-2 border-[#D7E2EA] bg-[#0C0C0C]/95 backdrop-blur-xl p-6 sm:p-8 md:p-10 shadow-[0_30px_70px_rgba(0,0,0,0.95)] flex flex-col justify-between cursor-pointer transition-all duration-300 hover:border-white hover:shadow-[0_35px_80px_rgba(215,226,234,0.12)] focus:outline-none focus:ring-2 focus:ring-[#D7E2EA]/50"
      >
        {/* Main 2-column layout: LEFT = Image (Square), RIGHT = Text info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-center">
          {/* BÊN TRÁI: ẢNH DỰ ÁN (HÌNH VUÔNG) */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center gap-4 w-full">
            {/* Ảnh chính hình vuông */}
            <div className="relative w-full aspect-square max-w-[420px] sm:max-w-[450px] lg:max-w-[480px] rounded-[24px] sm:rounded-[32px] md:rounded-[40px] overflow-hidden bg-[#161618] border border-[#D7E2EA]/20 shadow-lg">
              <img
                src={activeImage}
                alt={project.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>

            {/* Dải thumbnail hình vuông nếu có nhiều ảnh */}
            {galleryImages.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto py-1 scrollbar-none w-full max-w-[420px] sm:max-w-[450px] lg:max-w-[480px]">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveImage(img);
                    }}
                    className={`relative w-14 h-14 sm:w-16 sm:h-16 aspect-square rounded-xl overflow-hidden border-2 transition-all duration-200 cursor-pointer flex-shrink-0 ${activeImage === img
                      ? 'border-[#D7E2EA] scale-105 shadow-md shadow-black'
                      : 'border-white/10 opacity-50 hover:opacity-90 hover:border-white/30'
                      }`}
                    title={`Ảnh ${idx + 1}`}
                  >
                    <img
                      src={img}
                      alt={`${project.title} thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* BÊN PHẢI: PHẦN GIỚI THIỆU BẰNG TEXT */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-6 h-full py-1">
            <div>
              {/* Header: Số thứ tự & Phân loại / Năm */}
              <div className="flex items-center justify-between gap-4 mb-3 sm:mb-4">
                <span className="font-black text-4xl sm:text-5xl lg:text-6xl text-[#D7E2EA] select-none leading-none tracking-tight">
                  {project.id}
                </span>

                <div className="flex items-center gap-2 flex-wrap justify-end">
                  {project.category && (
                    <span className="text-xs sm:text-sm font-medium uppercase tracking-wider text-[#D7E2EA] px-3.5 py-1 rounded-full bg-white/5 border border-[#D7E2EA]/20">
                      {project.category}
                    </span>
                  )}
                  {project.year && (
                    <span className="text-xs sm:text-sm font-light text-[#D7E2EA]/60 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.02] border border-white/5">
                      <Calendar size={13} className="text-[#D7E2EA]/60" />
                      {project.year}
                    </span>
                  )}
                </div>
              </div>

              {/* Tên dự án */}
              <h3 className="font-extrabold uppercase text-2xl sm:text-3xl lg:text-4xl text-white m-0 tracking-tight leading-tight group-hover:text-[#D7E2EA] transition-colors">
                {project.title}
              </h3>

              {/* Vị trí / Vai trò (Role) */}
              {project.role && (
                <div className="flex items-center gap-2 mt-3 text-xs sm:text-sm text-[#D7E2EA]/75">
                  <span className="text-[#BBCCD7] font-semibold uppercase tracking-wider">Role:</span>
                  <span className="text-[#D7E2EA]">{project.role}</span>
                </div>
              )}

              {/* Giới thiệu chi tiết bằng text */}
              <p className="mt-4 text-sm sm:text-base text-[#D7E2EA]/80 font-light leading-relaxed">
                {project.description ||
                  'Dự án được thực hiện với độ chi tiết cao, kết hợp giữa tư duy thiết kế mỹ thuật và tối ưu hiệu năng đồ họa.'}
              </p>

              {/* Danh sách Tags / Công nghệ */}
              {project.tags && project.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#D7E2EA]/80 font-mono tracking-wide"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Nút hành động xem dự án */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="pt-4 border-t border-white/10 flex items-center justify-start gap-4"
            >
              <LiveProjectButton
                href={projectLink}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

interface ProjectsSectionProps {
  onLiveClick?: (project: ProjectData) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = () => {
  const [projects, setProjects] = useState<ProjectData[]>(PROJECTS);

  useEffect(() => {
    let isMounted = true;
    fetch(getApiUrl('/api/projects'))
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && data.success && Array.isArray(data.data) && data.data.length > 0) {
          setProjects(data.data);
        }
      })
      .catch((err) => {
        console.info('Backend chưa sẵn sàng, đang hiển thị dữ liệu dự phòng:', err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section
      id="projects"
      className="bg-[#0C0C0C] relative z-10 pt-20 sm:pt-28 md:pt-36 pb-32 px-5 sm:px-8 md:px-10"
    >
      {/* Section Heading */}
      <FadeIn delay={0} y={40} className="mb-12 sm:mb-16 md:mb-20 text-center">
        <h2 className="hero-heading font-black uppercase text-center text-[clamp(3rem,12vw,160px)] leading-none tracking-tight m-0">
          Project
        </h2>
      </FadeIn>

      {/* Sticky Stacking Project Cards Container */}
      <div className="flex flex-col gap-6 sm:gap-10 pb-20">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            totalCards={projects.length}
          />
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
