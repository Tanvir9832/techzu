import api from "../auth/auth";

export interface AuthorRef { email: string }
export interface Comment {
  _id: string;
  content: string;
  likeCount: number;
  disCount: number;
  author?: AuthorRef | string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Reply {
  _id: string;
  content: string;
  commentId: string;
  userId: { email: string } | string;
  createdAt?: string;
}

export const fetchComments = async (page = 1, limit = 10, sort: "newest" | "liked" | "disliked" = "newest") => {
  const res = await api.get<Comment[]>(`/comments`, { params: { page, limit, sort } });
  return res.data;
};

export const createComment = async (content: string) => {
  const res = await api.post<Comment>(`/comments`, { content });
  return res.data;
};

export const updateComment = async (id: string, content: string) => {
  const res = await api.put<Comment>(`/comments/${id}`, { content });
  return res.data;
};

export const deleteComment = async (id: string) => {
  const res = await api.delete<{ message: string }>(`/comments/${id}`);
  return res.data;
};

export const toggleLike = async (commentId: string) => {
  const res = await api.post<{ message: string }>(`/reactions/like/${commentId}`);
  return res.data;
};

export const toggleDislike = async (commentId: string) => {
  const res = await api.post<{ message: string }>(`/reactions/dislike/${commentId}`);
  return res.data;
};

export const fetchReplies = async (commentId: string, page = 1, limit = 10) => {
  const res = await api.get<Reply[]>(`/replies/${commentId}`, { params: { page, limit } });
  return res.data;
};

export const createReply = async (commentId: string, content: string) => {
  const res = await api.post<Reply>(`/replies/${commentId}`, { content });
  return res.data;
};

export const updateReply = async (id: string, content: string) => {
  const res = await api.put<Reply>(`/replies/${id}`, { content });
  return res.data;
};

export const deleteReply = async (id: string) => {
  const res = await api.delete<{ message: string }>(`/replies/${id}`);
  return res.data;
};


