import { create } from "zustand";
import api from "@/app/utils/api";
import { testContact, rewardFormatting } from "../utils/Formmating";

interface Post {
  title: string;
  body: string;
  image: string;
  species: string;
  breed: string;
  location: string;
  date: string;
  reward: number;
  contact: string;
  postType: string;
  gender: string;
}

type MissingAnimalStore = {
  createPost: (post: Post) => Promise<any>;
};

const missingAnimalStore = create<MissingAnimalStore>(() => ({
  createPost: async (post) => {
    try {
      const formattedReward = rewardFormatting(post.reward);
      testContact(post.contact);
      const postData = {
        ...post,
        reward: formattedReward,
      };
      const response = await api.post("/post/missing-animal", postData);
      return response.data;
    } catch (error: any) {
      console.error("Error creating post:", error);
      throw error.response?.data || "An error occurred";
    }
  },
}));

export default missingAnimalStore;
