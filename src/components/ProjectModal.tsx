import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Sparkles, Tag, Calendar, User } from 'lucide-react';
import { ProjectData } from '../sections/ProjectsSection';

interface ProjectModalProps {
  project: ProjectData | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  const hasDetailImages = Boolean(project.col1Img1 || project.col1Img2);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          transition={{ type: 'spring', damping: 25, stiffness: 280 }}
          className="relative w-full max-w-4xl bg-[#111215] border border-[#D7E2EA]/20 rounded-3xl sm:rounded-[40px] p-6 sm:p-8 md:p-10 shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-[#D7E2EA]/60 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X size={22} />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3 mb-2">
            <span className="font-black text-2xl text-[#BBCCD7]">{project.id}</span>
            {project.category && project.category.trim() !== '' && (
              <span className="text-xs uppercase tracking-widest text-[#D7E2EA]/60 px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
                {project.category}
              </span>
            )}
          </div>
          <h2 className="text-2xl sm:text-4xl font-black uppercase text-white mb-6">
            {project.title}
          </h2>

          {/* Gallery showcase / Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8">
            <img
              src={project.col2Img}
              alt={project.title}
              className="w-full h-64 sm:h-80 object-cover rounded-2xl bg-[#161618] border border-white/10"
            />

            {hasDetailImages ? (
              <div className="flex flex-col gap-4">
                {project.col1Img1 && (
                  <img
                    src={project.col1Img1}
                    alt={`${project.title} detail 1`}
                    className="w-full h-32 sm:h-38 object-cover rounded-2xl bg-[#161618] border border-white/10"
                  />
                )}
                {project.col1Img2 && (
                  <img
                    src={project.col1Img2}
                    alt={`${project.title} detail 2`}
                    className="w-full h-32 sm:h-38 object-cover rounded-2xl bg-[#161618] border border-white/10"
                  />
                )}
              </div>
            ) : (
              <div className="flex flex-col justify-between bg-white/[0.03] border border-white/10 rounded-2xl p-6">
                <div className="space-y-4">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-[#B600A8] flex items-center gap-2">
                    <Sparkles size={14} /> Project Overview
                  </h4>
                  <p className="text-sm text-[#D7E2EA]/85 leading-relaxed font-light">
                    {project.description ||
                      'Atmospheric 3D piece created with precision lighting, advanced texturing, and realistic spatial depth.'}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-white/10 text-xs text-[#D7E2EA]/70">
                    {project.role && (
                      <div className="flex items-center gap-2">
                        <User size={13} className="text-[#B600A8]" />
                        <span>Role: {project.role}</span>
                      </div>
                    )}
                    {project.year && (
                      <div className="flex items-center gap-2">
                        <Calendar size={13} className="text-[#B600A8]" />
                        <span>Timeline: {project.year}</span>
                      </div>
                    )}
                  </div>
                </div>

                {project.tags && project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-4">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-[11px] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/60 flex items-center gap-1"
                      >
                        <Tag size={10} /> {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10">
            <div className="flex items-center gap-2 text-sm text-[#D7E2EA]/70">
              <Sparkles size={16} className="text-[#B600A8]" />
              <span>Full 3D modeling, lighting, and rendering portfolio piece</span>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={project.link && project.link !== '#' ? project.link : '/tree.html'}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 rounded-full bg-[#D7E2EA] text-[#0C0C0C] font-semibold uppercase text-xs tracking-wider hover:bg-white transition-colors flex items-center gap-2 cursor-pointer no-underline"
              >
                Chơi thử Live <ExternalLink size={14} />
              </a>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-full border border-[#D7E2EA]/40 text-[#D7E2EA] font-medium uppercase text-xs tracking-wider hover:bg-white/10 transition-colors flex items-center gap-2 cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProjectModal;
