/**
 * Cấu hình đường dẫn API Backend
 * - Môi trường Vercel Fullstack: dùng URL tương đối ('') để gọi trực tiếp Serverless Function cùng domain
 * - Môi trường Backend riêng biệt (Render/Railway): dùng VITE_API_URL
 * - Môi trường Local: Vite Proxy chuyển tiếp tới http://localhost:5000
 */
export const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export const getApiUrl = (endpoint: string): string => {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${API_BASE_URL}${cleanEndpoint}`;
};

export default getApiUrl;
