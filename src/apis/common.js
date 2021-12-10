import { uploadPost } from '@/http/request.js';

export function uploadFile(url, formData) {
  return uploadPost(url, formData, {});
}
