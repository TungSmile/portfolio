import React, { useState } from 'react';
import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import ProjectsSection, { ProjectData } from './sections/ProjectsSection';
import ProjectModal from './components/ProjectModal';
import Footer from './components/Footer';

export const App: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  const handleOpenProject = (project: ProjectData) => setSelectedProject(project);
  const handleCloseProject = () => setSelectedProject(null);

  return (
    <div
      className="bg-[#0C0C0C] text-[#D7E2EA] font-kanit min-h-screen selection:bg-[#B600A8]/30 selection:text-white"
      style={{ overflowX: 'clip' }}
    >
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. About Section */}
      <AboutSection />

      {/* 3. Projects Section */}
      <ProjectsSection onLiveClick={handleOpenProject} />

      {/* 4. Footer */}
      <Footer />

      {/* Live Project Modal */}
      <ProjectModal project={selectedProject} onClose={handleCloseProject} />
    </div>
  );
};

export default App;
