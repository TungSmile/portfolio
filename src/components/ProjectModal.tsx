import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Sparkles } from 'lucide-react';
import { ProjectData } from '../sections/ProjectsSection';

interface ProjectModalProps {
  project: ProjectData | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

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
            <span className="text-xs uppercase tracking-widest text-[#D7E2EA]/60 px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
              {project.category}
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black uppercase text-white mb-6">
            {project.title}
          </h2>

          {/* Gallery showcase */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8">
            <img
              src={project.col2Img}
              alt={project.title}
              className="w-full h-64 sm:h-80 object-cover rounded-2xl bg-[#161618] border border-white/10"
            />
            <div className="flex flex-col gap-4">
              <img
                src={project.col1Img1}
                alt={`${project.title} detail 1`}
                className="w-full h-32 sm:h-38 object-cover rounded-2xl bg-[#161618] border border-white/10"
              />
              <img
                src={project.col1Img2}
                alt={`${project.title} detail 2`}
                className="w-full h-32 sm:h-38 object-cover rounded-2xl bg-[#161618] border border-white/10"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10">
            <div className="flex items-center gap-2 text-sm text-[#D7E2EA]/70">
              <Sparkles size={16} className="text-[#B600A8]" />
              <span>Full 3D modeling, lighting, and rendering portfolio piece</span>
            </div>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-full border border-[#D7E2EA]/40 text-[#D7E2EA] font-medium uppercase text-xs tracking-wider hover:bg-white/10 transition-colors flex items-center gap-2 cursor-pointer"
            >
              Close Preview <ExternalLink size={14} />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProjectModal;
