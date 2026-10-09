import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Database, Plus, RefreshCw } from 'lucide-react';
import FadeIn from '../components/FadeIn';
import LiveProjectButton from '../components/LiveProjectButton';
import AddProjectModal from '../components/AddProjectModal';
import { getApiUrl } from '../config/api';

export interface ProjectData {
  id: string;
  title: string;
  category: string;
  col1Img1: string;
  col1Img2: string;
  col2Img: string;
  link?: string;
  order?: number;
}

export const PROJECTS: ProjectData[] = [
  {
    id: '01',
    title: 'Nextlevel Studio',
    category: '(Client)',
    col1Img1:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85',
    col1Img2:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85',
    col2Img:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85',
    link: '#',
  },
  {
    id: '02',
    title: 'Aura Brand Identity',
    category: '(Personal)',
    col1Img1:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85',
    col1Img2:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85',
    col2Img:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85',
    link: '#',
  },
  {
    id: '03',
    title: 'Solaris Digital',
    category: '(Client)',
    col1Img1:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85',
    col1Img2:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85',
    col2Img:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85',
    link: '#',
  },
];

interface ProjectCardProps {
  project: ProjectData;
  index: number;
  totalCards: number;
  onLiveClick?: (project: ProjectData) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  totalCards,
  onLiveClick,
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

  return (
    <div
      ref={containerRef}
      className="h-[85vh] flex items-center justify-center sticky top-24 md:top-32 [--top-offset:6rem] md:[--top-offset:8rem]"
      style={{
        top: `calc(var(--top-offset) + ${index * 28}px)`,
      }}
    >
      <motion.div
        style={{ scale }}
        className="w-full max-w-6xl rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 shadow-[0_30px_70px_rgba(0,0,0,0.95)] flex flex-col justify-between"
      >
        {/* Top row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 sm:mb-6">
          <div className="flex items-center gap-4 sm:gap-6 md:gap-8 flex-wrap">
            <span className="font-black text-[clamp(2.5rem,7vw,90px)] leading-none text-[#D7E2EA] select-none">
              {project.id}
            </span>
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
              <h3 className="font-medium uppercase text-lg sm:text-2xl md:text-3xl text-[#D7E2EA] m-0">
                {project.title}
              </h3>
              <span className="text-sm sm:text-base font-light text-[#D7E2EA]/60 uppercase">
                {project.category}
              </span>
            </div>
          </div>

          <LiveProjectButton onClick={() => onLiveClick?.(project)} />
        </div>

        {/* Bottom row: Two-column image grid */}
        <div className="grid grid-cols-1 md:grid-cols-10 gap-3 sm:gap-5 md:gap-6 flex-1">
          {/* Left Column (40% width approx 4/10) with 2 stacked images */}
          <div className="md:col-span-4 flex flex-col gap-3 sm:gap-4 md:gap-5 justify-between">
            <img
              src={project.col1Img1}
              alt={`${project.title} Preview 1`}
              loading="lazy"
              className="w-full object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px] bg-[#161618] h-[clamp(130px,16vw,230px)]"
            />
            <img
              src={project.col1Img2}
              alt={`${project.title} Preview 2`}
              loading="lazy"
              className="w-full object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px] bg-[#161618] h-[clamp(160px,22vw,340px)]"
            />
          </div>

          {/* Right Column (60% width approx 6/10) with 1 tall image */}
          <div className="md:col-span-6 flex">
            <img
              src={project.col2Img}
              alt={`${project.title} Preview Main`}
              loading="lazy"
              className="w-full h-full min-h-[260px] sm:min-h-[320px] md:min-h-full object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px] bg-[#161618]"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

interface ProjectsSectionProps {
  onLiveClick?: (project: ProjectData) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onLiveClick }) => {
  const [projects, setProjects] = useState<ProjectData[]>(PROJECTS);
  const [isLiveAtlas, setIsLiveAtlas] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const fetchProjects = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch(getApiUrl('/api/projects'));
      const data = await res.json();
      if (data.success && Array.isArray(data.data) && data.data.length > 0) {
        setProjects(data.data);
        setIsLiveAtlas(true);
      }
    } catch (err) {
      console.info('API backend chưa khởi động hoặc dùng fallback cache:', err);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleProjectAdded = (newProject: ProjectData) => {
    setProjects((prev) => [...prev, newProject]);
    setIsLiveAtlas(true);
  };

  const nextId = String(projects.length + 1).padStart(2, '0');

  return (
    <section
      id="projects"
      className="bg-[#0C0C0C] relative z-10 pt-20 sm:pt-28 md:pt-36 pb-32 px-5 sm:px-8 md:px-10"
    >
      {/* Section Heading */}
      <FadeIn delay={0} y={40} className="mb-10 sm:mb-14 md:mb-16 text-center">
        <h2 className="hero-heading font-black uppercase text-center text-[clamp(3rem,12vw,160px)] leading-none tracking-tight m-0">
          Project
        </h2>

        {/* MongoDB Atlas Status and Quick Actions */}
        <div className="mt-6 flex items-center justify-center gap-3 flex-wrap">
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all border ${
              isLiveAtlas
                ? 'bg-[#00ED64]/10 border-[#00ED64]/40 text-[#00ED64]'
                : 'bg-white/5 border-white/10 text-white/60'
            }`}
          >
            <Database size={13} className={isLiveAtlas ? 'text-[#00ED64]' : 'text-white/40'} />
            <span
              className={`w-2 h-2 rounded-full ${
                isLiveAtlas ? 'bg-[#00ED64] animate-pulse' : 'bg-amber-400'
              }`}
            />
            <span>
              {isLiveAtlas
                ? `MongoDB Atlas: Connected (${projects.length} Projects)`
                : `Local Offline Cache (${projects.length} Projects)`}
            </span>
            <button
              onClick={fetchProjects}
              title="Làm mới dữ liệu từ MongoDB Atlas"
              className="ml-1 hover:rotate-180 transition-transform duration-300 text-white/70 hover:text-white"
            >
              <RefreshCw size={12} className={isRefreshing ? 'animate-spin' : ''} />
            </button>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium uppercase tracking-wider bg-white/10 hover:bg-white/20 text-[#D7E2EA] border border-white/20 transition-all cursor-pointer hover:border-[#00ED64]/50 hover:text-[#00ED64]"
          >
            <Plus size={13} />
            <span>Thêm dự án vào Atlas</span>
          </button>
        </div>
      </FadeIn>

      {/* Sticky Stacking Project Cards Container */}
      <div className="flex flex-col gap-6 sm:gap-10 pb-20">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            totalCards={projects.length}
            onLiveClick={onLiveClick}
          />
        ))}
      </div>

      {/* Add Project Modal */}
      <AddProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onProjectAdded={handleProjectAdded}
        nextId={nextId}
      />
    </section>
  );
};

export default ProjectsSection;
