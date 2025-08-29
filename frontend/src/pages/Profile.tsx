/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import type { Comment } from "../api/comments";

import {
  fetchComments,
  createComment,
  updateComment,
  deleteComment,
} from "../api/comments";
import CommentItem from "../components/Comment";

const Profile: React.FC = () => {
  const { logout, user } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [sort, setSort] = useState<"newest" | "liked" | "disliked">("newest");

  const [composerText, setComposerText] = useState("");
  const [saving, setSaving] = useState(false);

  const loadComments = async () => {
    setLoading(true);
    try {
      setError("");
      const data = await fetchComments(page, limit, sort);
      setComments(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load comments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadComments();
  }, [page, sort]);

  const handlePost = async () => {
    if (!composerText.trim()) return;
    setSaving(true);
    try {
      const created = await createComment(composerText.trim());
      if (user) {
        (created as any).author = { _id: user._id, email: user.email };
      }
      setComments((prev) => [created, ...prev]);
      setComposerText("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to post comment");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = async (id: string, content: string) => {
    try {
      const updated = await updateComment(id, content);
      setComments((prev) => prev.map((c) => (c._id === id ? updated : c)));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to edit comment");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteComment(id);
      setComments((prev) => prev.filter((c) => c._id !== id));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to delete comment");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between bg-white shadow-md rounded-lg p-4">
          <h1 className="text-2xl font-bold text-gray-900">Home</h1>
          <button
            onClick={logout}
            className="px-4 py-2 rounded-md text-white bg-red-600 hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>

        {/* Composer */}
        <div className="bg-white shadow-md rounded-lg p-6 space-y-3">
          <textarea
            className="w-full border border-gray-300 rounded-md px-3 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none"
            placeholder="What's on your mind?"
            rows={4}
            value={composerText}
            onChange={(e) => setComposerText(e.target.value)}
          />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <span>Sort by:</span>
              <select
                className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                value={sort}
                onChange={(e) => setSort(e.target.value as any)}
              >
                <option value="newest">Newest</option>
                <option value="liked">Most Liked</option>
                <option value="disliked">Most Disliked</option>
              </select>
            </div>
            <button
              onClick={handlePost}
              disabled={saving || !composerText.trim()}
              className="px-4 py-2 bg-black text-white rounded-md disabled:opacity-50 hover:bg-gray-900 transition"
            >
              {saving ? "Posting..." : "Post"}
            </button>
          </div>
        </div>

        {/* Feed */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden divide-y divide-gray-200">
          {loading ? (
            <div className="p-6 text-center text-gray-500">Loading...</div>
          ) : error ? (
            <div className="p-6 text-center text-red-600">{error}</div>
          ) : comments.length === 0 ? (
            <div className="p-6 text-center text-gray-500">No comments yet.</div>
          ) : (
            comments.map((c) => (
              <CommentItem
                key={c._id}
                item={c}
                user={user}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))
          )}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 border rounded-md disabled:opacity-50 hover:bg-gray-200 transition"
          >
            Previous
          </button>
          <span className="text-gray-700 font-medium">Page {page}</span>
          <button
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 border rounded-md hover:bg-gray-200 transition"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
