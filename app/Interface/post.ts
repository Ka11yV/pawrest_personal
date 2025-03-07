interface MissingAnimalPost {
    title: string;
    body: string;
    image: string;
    species:"dog" | "cat" | "rabbit" | "bird" | "other";
    breed: string;
    location: string;
    date: string;
    reward: number;
    contact: string;
    postType: "lost" | "found"
    gender: "male" | "female" | "unknown"
}

export default MissingAnimalPost;