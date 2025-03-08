import { create } from "zustand";
import api from "@/app/utils/api";

interface ImageStore {
  image: string | null;
  setimage: (imageUrl: string) => void;
}

export const useImageStore = create<ImageStore>((set) => ({
  image: null,
  setimage: (image) => set({ image }),

  saveImage: async (image: File, imageFileName: string) => {
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("imageFileName", imageFileName); // imageName을 FormData에 추가

      const response = await api.post("/images", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      set({ image: response.data.imageUrl });
    } catch (error) {
      console.error("이미지 업로드 실패:", error);
    }
  },

  checkImage: async (image: File) => {
    try {
      const formData = new FormData();
      formData.append("image", image);

      const response = await api.post("/images/check", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        return response.data.data;
      }
    } catch (error) {
      console.error("이미지 업로드 실패:", error);
    }
  },
}));
