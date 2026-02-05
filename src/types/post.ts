export type PostDetailType = {
  id: number;
  title: string;
  content: string;
  tags: string[];
  imageUrl?: string;
  createdAt: string;
  likes: number;
  comments: number;
  author: {
    name: string;
  };
};

export type PostPreviewType = {
  id: number;
  title: string;
  excerpt: string;
  tags: string[];
  createdAt: string;
  likes: number;
  comments: number;
  author: {
    name: string;
  };
};

export type Post = {
  id: number;
  title: string;
  content: string;
  tags: string[];
  imageUrl?: string;
  createdAt: string;
  likes: number;
  comments: number;
  author: {
    id: number;
    name: string;
    username: string;
    avatarUrl?: string;
  };
};
