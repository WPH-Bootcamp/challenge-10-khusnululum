export type UserProfile = {
  id: number;
  name: string;
  role?: string;
  avatar?: string;
};

export type UserPost = {
  id: number;
  title: string;
  excerpt: string;
  tags: string[];
  createdAt: string;
  likes: number;
  comments: number;
};
