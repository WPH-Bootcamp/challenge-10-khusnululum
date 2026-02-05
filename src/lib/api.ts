import { getToken } from "@/lib/token";

const BASE_URL = "https://be-blg-production.up.railway.app";

/* =========================
   POSTS
========================= */

export async function getPosts() {
  const res = await fetch(`${BASE_URL}/posts/recommended`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  return res.json();
}

export async function getPostDetail(id: number | string) {
  const res = await fetch(`${BASE_URL}/posts/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Post not found");
  }

  return res.json();
}

// Recommended posts with pagination
export async function getRecommendedPosts(page = 1, limit = 5) {
  const res = await fetch(
    `${BASE_URL}/posts/recommended?page=${page}&limit=${limit}`,
    { cache: "no-store" },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch recommended posts");
  }

  return res.json();
}

// Most liked posts
export async function getMostLikedPosts(limit = 5) {
  const res = await fetch(`${BASE_URL}/posts/most-liked?limit=${limit}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch most liked posts");
  }

  return res.json();
}

/* =========================
   COMMENTS
========================= */

// GET comments by post ID
export async function getCommentsByPostId(postId: number | string) {
  const res = await fetch(`${BASE_URL}/comments/${postId}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch comments");
  }

  return res.json();
}

// POST new comment
export async function postComment(postId: number, content: string) {
  if (typeof window === "undefined") {
    throw new Error("postComment must be called on client");
  }

  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Unauthorized");
  }

  const res = await fetch(`${BASE_URL}/comments/${postId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ content }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to post comment");
  }

  return res.json();
}

/* =========================
   AUTH
========================= */

export async function loginUser(payload: { email: string; password: string }) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Login failed");
  }

  return res.json(); // { token, user }
}

export async function registerUser(payload: {
  name: string;
  username: string;
  email: string;
  password: string;
}) {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Register failed");
  }

  return res.json();
}

export async function getMe(token: string) {
  const res = await fetch(`${BASE_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch user");
  }

  return res.json();
}

export async function getPublicProfileByUsername(username: string) {
  const res = await fetch(`${BASE_URL}/users/by-username/${username}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("User not found");
  }

  return res.json();
}

export async function getMyProfile() {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  if (!token) throw new Error("Unauthorized");

  const res = await fetch(`${BASE_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch profile");
  }

  return res.json();
}

export async function getMyPosts() {
  const token = getToken();

  const res = await fetch(`${BASE_URL}/posts/my-posts`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch my posts");
  }

  return res.json();
}

export async function changePassword(payload: {
  currentPassword: string;
  newPassword: string;
}) {
  const res = await fetch(
    "https://be-blg-production.up.railway.app/users/password",
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(payload),
    },
  );

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || "Failed to change password");
  }

  return res.json();
}

export async function createPost(formData: FormData) {
  const token = getToken();

  const res = await fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to create post");
  }

  return res.json();
}

export async function deletePost(postId: number) {
  const token = getToken();

  if (!token) {
    throw new Error("Unauthorized");
  }

  const res = await fetch(`${BASE_URL}/posts/${postId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to delete post");
  }

  return true;
}

export async function searchPosts(keyword: string) {
  const res = await fetch(
    `${BASE_URL}/posts/search?query=${encodeURIComponent(keyword)}`,
    { cache: "no-store" },
  );

  if (!res.ok) throw new Error("Search failed");

  return res.json();
}
