import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Database, Check, AlertCircle } from 'lucide-react';
import { ProjectData } from '../sections/ProjectsSection';
import { getApiUrl } from '../config/api';

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProjectAdded: (newProject: ProjectData) => void;
  nextId: string;
}

export const AddProjectModal: React.FC<AddProjectModalProps> = ({
  isOpen,
  onClose,
  onProjectAdded,
  nextId,
}) => {
  const [formData, setFormData] = useState({
    id: nextId,
    title: '',
    category: '(Client)',
    col1Img1: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1280&q=80',
    col1Img2: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1280&q=80',
    col2Img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1280&q=80',
    link: '#',
    order: 4,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(getApiUrl('/api/projects'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Lỗi khi thêm dự án vào MongoDB Atlas');
      }

      setSuccess(true);
      onProjectAdded(data.data);

      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 1500);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Đã xảy ra lỗi không xác định');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 280 }}
            className="relative w-full max-w-xl bg-[#111215] border border-[#00ED64]/30 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 my-8 text-white max-h-[90vh] overflow-y-auto"
          >
            {/* Header glow */}
            <div className="absolute -top-20 -right-20 w-44 h-44 bg-[#00ED64]/15 rounded-full blur-3xl pointer-events-none" />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 text-white/50 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <X size={20} />
            </button>

            {/* Title */}
            <div className="flex items-center gap-2 mb-2 text-[#00ED64]">
              <Database size={18} />
              <span className="text-xs uppercase font-mono tracking-wider">MongoDB Atlas API</span>
            </div>
            <h3 className="text-2xl font-bold uppercase tracking-tight mb-6">Thêm dự án mới</h3>

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm flex items-center gap-2">
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            {success ? (
              <div className="py-12 flex flex-col items-center justify-center text-center gap-3">
                <div className="w-14 h-14 rounded-full bg-[#00ED64]/20 border border-[#00ED64] flex items-center justify-center text-[#00ED64]">
                  <Check size={28} />
                </div>
                <h4 className="text-xl font-bold">Thêm thành công!</h4>
                <p className="text-sm text-white/60">Dự án đã được lưu vào cluster MongoDB Atlas.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-white/70 uppercase mb-1">
                      Mã ID (VD: 04)
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.id}
                      onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:border-[#00ED64]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-white/70 uppercase mb-1">
                      Phân loại
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#1c1d22] border border-white/15 text-white text-sm focus:outline-none focus:border-[#00ED64]"
                    >
                      <option value="(Client)">(Client)</option>
                      <option value="(Personal)">(Personal)</option>
                      <option value="(Experimental)">(Experimental)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/70 uppercase mb-1">
                    Tên dự án
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="VD: Metaverse Studio"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:border-[#00ED64]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/70 uppercase mb-1">
                    Ảnh 1 (Cột trái trên - URL)
                  </label>
                  <input
                    type="url"
                    required
                    value={formData.col1Img1}
                    onChange={(e) => setFormData({ ...formData, col1Img1: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:border-[#00ED64]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/70 uppercase mb-1">
                    Ảnh 2 (Cột trái dưới - URL)
                  </label>
                  <input
                    type="url"
                    required
                    value={formData.col1Img2}
                    onChange={(e) => setFormData({ ...formData, col1Img2: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:border-[#00ED64]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/70 uppercase mb-1">
                    Ảnh 3 (Cột phải chính - URL)
                  </label>
                  <input
                    type="url"
                    required
                    value={formData.col2Img}
                    onChange={(e) => setFormData({ ...formData, col2Img: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:border-[#00ED64]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/70 uppercase mb-1">
                    Đường dẫn / Live Link (tùy chọn)
                  </label>
                  <input
                    type="text"
                    value={formData.link}
                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:border-[#00ED64]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-xl bg-[#00ED64] hover:bg-[#00c553] text-[#0C0C0C] font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
                  >
                    {loading ? (
                      <span className="animate-spin inline-block w-4 h-4 border-2 border-black border-t-transparent rounded-full" />
                    ) : (
                      <Plus size={16} />
                    )}
                    {loading ? 'Đang lưu vào Atlas...' : 'Lưu dự án vào MongoDB Atlas'}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AddProjectModal;
