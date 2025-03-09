import { create } from "zustand";
import api from "@/app/utils/api";

interface ImageStore {
  file: File | null;
  imagePreview: string | null;
  imageUrl: string | null;
  fileName: string | null;
  setFile: (file: File) => void;
  setImageUrl: (image: string) => void;
  setFileName: (fileName: string) => void;
  clearImage: () => void;
  setImagePreview: (image: string) => void;
  checkImage: (image: File) => Promise<string | null>;
  saveImage: (image: File, imageFileName: string) => Promise<void>;
}

export const useImageStore = create<ImageStore>((set) => ({
  file: null,
  imagePreview: null,
  imageUrl: null,
  fileName: null,
  setFile: (file) => set({ file }),
  setImageUrl: (image) => set({ imageUrl: image }),
  setFileName: (fileName) => set({ fileName }),
  clearImage: () => set({ file: null, imageUrl: null }),
  setImagePreview: (image) => set({ imagePreview: image }),

  checkImage: async (file: File) => {
    try {
      if (file && file.size > 5 * 1024 * 1024) {
        alert("파일 크기는 5MB 이하로 업로드해주세요.");
        return;
      }

      set({ imagePreview: URL.createObjectURL(file) });

      const formData = new FormData();
      formData.append("file", file);

      const response = await api.post("/images/check", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        set({
          imageUrl: response.data.data.imageUrl,
          fileName: response.data.data.fileName,
          file: file,
        });

        const state = useImageStore.getState();
        console.log(state.file, state.fileName);

        return response.data.data.imageUrl;
      }
    } catch (error) {
      console.error("이미지 업로드 실패:", error);
    }
  },

  saveImage: async (file: File, fileName: string) => {
    try {
      const formData = new FormData();

      formData.append("file", file as File);
      formData.append("fileName", fileName as string);

      const response = await api.post("/images", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data.imageUrl;
    } catch (error) {
      console.error("이미지 업로드 실패:", error);
    }
  },
}));
