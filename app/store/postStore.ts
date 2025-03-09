"use client";

import { create } from "zustand";
import api from "@/app/utils/api";
import { testContact, rewardFormatting } from "../utils/Formmating";
import MissingAnimalPost from "../Interface/post";

type MissingAnimalStore = {
  lostPets: any[];
  foundPets: any[];
  createPost: (post: MissingAnimalPost) => Promise<any>;
  getLostAnimalPosts: () => void;
  getFoundAnimalPosts: () => void;
};

const missingAnimalStore = create<MissingAnimalStore>((set) => ({
  lostPets: [],
  foundPets: [],

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
  getLostAnimalPosts: async () => {
    try {
      const response = await api.get("/post/missing-animal", {
        params: {
          postType: "lost",
        },
      });
      set({ lostPets: response.data.data });
    } catch (error: any) {
      console.error("Error getting posts:", error);
    }
  },
  getFoundAnimalPosts: async () => {
    try {
      const response = await api.get("/post/missing-animal", {
        params: {
          postType: "found",
        },
      });
      set({ foundPets: response.data.data });
    } catch (error: any) {
      console.error("Error getting posts:", error);
    }
  },
}));

export default missingAnimalStore;
