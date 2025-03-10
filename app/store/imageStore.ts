import { create } from "zustand";
import api from "@/app/utils/api";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

interface ImageStore {
  file: File | null;
  imagePreview: string | null;
  imageUrl: string | null;
  fileName: string | null;
  setFile: (file: File) => void;
  setImageUrl: (file: File) => void;
  setFileName: (fileName: string) => void;
  clearImage: () => void;
  setImagePreview: (image: string) => void;
  checkFile: (file: File) => void;
  uploadImage: (image: File) => Promise<void>;
}

export const useImageStore = create<ImageStore>((set) => ({
  file: null,
  imagePreview: null,
  imageUrl: null,
  fileName: null,

  setFile: (file: File) => set({ file }),
  setFileName: (fileName: string) => set({ fileName }),
  clearImage: () => set({ file: null, imageUrl: null }),
  setImagePreview: (image: string) => set({ imagePreview: image }),

  setImageUrl: (file: File) =>
    set({
      imageUrl: `${process.env.NEXT_PUBLIC_AWS_IMAGE_URL}/${file.name}`,
    }),

  checkFile: async (file: File) => {
    try {
      //파일 크기 체크
      if (file && file.size > 5 * 1024 * 1024) {
        alert("파일 크기는 5MB 이하로 업로드해주세요.");
      }
      //이미지 미리보기
      set({ imagePreview: URL.createObjectURL(file) });
      set({
        imageUrl: `${process.env.NEXT_PUBLIC_AWS_IMAGE_URL}/${file.name}`,
      });

      set({ imagePreview: URL.createObjectURL(file) });

      //파일 이름 설정
      set({ fileName: file.name });
    } catch (error) {
      console.error("이미지 업로드 실패:", error);
    }
  },

  uploadImage: async (file: File) => {
    const s3Client = new S3Client({
      forcePathStyle: true,
      region: process.env.NEXT_PUBLIC_AWS_REGION as string,
      endpoint: process.env.NEXT_PUBLIC_AWS_S3_ENDPOINT as string,
      credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env
          .NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY as string,
      },
    });

    const command = new PutObjectCommand({
      Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME as string,
      Key: file.name,
      Body: file,
    });

    const imageUrl = `${process.env.NEXT_PUBLIC_AWS_IMAGE_URL}/${file.name}`;

    const response = await s3Client.send(command);
    console.log("이미지 업로드 성공:", response);
  },

  checkImageSupabase: async (file: File) => {
    try {
      if (file && file.size > 5 * 1024 * 1024) {
        alert("파일 크기는 5MB 이하로 업로드해주세요.");

        return;
      }

      set({ imagePreview: URL.createObjectURL(file) });
    } catch (error) {
      console.error("이미지 확인 실패:", error);
    }
  },
}));

function uuidv4(): string {
  return crypto.randomUUID();
}
