import React, { useEffect, useMemo, useState } from "react";
import { useAuth } from "../context/authContext";
import type { Comment, Reply } from "../api/comments";

type AuthorPopulated = { _id: string; email: string };
import {
  fetchComments,
  createComment,
  updateComment,
  deleteComment,
  toggleLike,
  toggleDislike,
  fetchReplies,
  createReply,
} from "../api/comments";

const Profile: React.FC = () => {
  const { logout, user } = useAuth();

  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);
  const [sort, setSort] = useState<"newest" | "liked" | "disliked">("newest");

  const [composerText, setComposerText] = useState<string>("");
  const [saving, setSaving] = useState<boolean>(false);

  const load = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await fetchComments(page, limit, sort);
      setComments(data);
    } catch (e) {
      const message = e instanceof Error ? e.message : "Failed to load comments";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, sort]);

  const handlePost = async () => {
    if (!composerText.trim()) return;
    try {
      setSaving(true);
      const created = await createComment(composerText.trim());
      // Ensure author email is present for immediate UI consistency
      if (user) {
        (created as unknown as { author?: AuthorPopulated }).author = {
          _id: user._id,
          email: user.email,
        };
      }
      setComposerText("");
      // Prepend newly created comment
      setComments((prev) => [created, ...prev]);
    } catch (e) {
      const message = e instanceof Error ? e.message : "Failed to post comment";
      setError(message);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = async (id: string, content: string) => {
    const newContent = window.prompt("Edit your comment:", content);
    if (newContent === null) return;
    try {
      const updated = await updateComment(id, newContent);
      setComments((prev) => prev.map((c) => (c._id === id ? updated : c)));
    } catch (e) {
      const message = e instanceof Error ? e.message : "Failed to edit comment";
      setError(message);
    }
  };

  const handleDelete = async (id: string) => {
    const ok = window.confirm("Delete this comment?");
    if (!ok) return;
    try {
      await deleteComment(id);
      setComments((prev) => prev.filter((c) => c._id !== id));
    } catch (e) {
      const message = e instanceof Error ? e.message : "Failed to delete comment";
      setError(message);
    }
  };

  const handleLike = async (id: string) => {
    try {
      await toggleLike(id);
      // Re-fetch current page to sync counts
      await load();
    } catch (e) {
      const message = e instanceof Error ? e.message : "Failed to like comment";
      setError(message);
    }
  };

  const handleDislike = async (id: string) => {
    try {
      await toggleDislike(id);
      await load();
    } catch (e) {
      const message = e instanceof Error ? e.message : "Failed to dislike comment";
      setError(message);
    }
  };

  const CommentItem: React.FC<{ item: Comment }> = ({ item }) => {
    const [replies, setReplies] = useState<Reply[] | null>(null);
    const [replying, setReplying] = useState<boolean>(false);
    const [replyText, setReplyText] = useState<string>("");
    const [loadingReplies, setLoadingReplies] = useState<boolean>(false);

    const loadReplies = async () => {
      try {
        setLoadingReplies(true);
        const data = await fetchReplies(item._id, 1, 10);
        setReplies(data);
      } catch {
        // no-op basic
      } finally {
        setLoadingReplies(false);
      }
    };

    const postReply = async () => {
      if (!replyText.trim()) return;
      try {
        const created = await createReply(item._id, replyText.trim());
        setReplyText("");
        setReplies((prev) => (prev ? [created, ...prev] : [created]));
      } catch {
        // no-op basic
      }
    };

    const authorEmail = useMemo(() => {
      if (!item.author) return "Unknown";
      if (typeof item.author === "string") {
        if (user && item.author === user._id) return user.email;
        return "Unknown";
      }
      const populated = item.author as AuthorPopulated;
      return populated.email ?? "Unknown";
    }, [item.author]);

    const isAuthor = useMemo(() => {
      if (!user) return false;
      if (!item.author) return false;
      // item.author may be populated object or string id
      if (typeof item.author === "string") {
        return item.author === user._id;
      }
      const authorObj = item.author as Partial<AuthorPopulated>;
      if (authorObj._id) return authorObj._id === user._id;
      if (authorObj.email && user.email) return authorObj.email === user.email;
      return false;
    }, [item.author]);

    console.log(isAuthor)
    console.log(user)

    return (
      <div className="border-b border-gray-200 p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="text-sm text-gray-500">{authorEmail}</div>
            <div className="mt-1 text-gray-900">{item.content}</div>
            <div className="mt-3 flex items-center gap-3 text-sm text-gray-600">
              <button onClick={() => handleLike(item._id)} className="hover:text-gray-900">👍 {item.likeCount}</button>
              <button onClick={() => handleDislike(item._id)} className="hover:text-gray-900">👎 {item.disCount}</button>
              <button onClick={() => setReplying((v) => !v)} className="hover:text-gray-900">Reply</button>
              {isAuthor && (
                <>
                  <button onClick={() => handleEdit(item._id, item.content)} className="hover:text-gray-900">Edit</button>
                  <button onClick={() => handleDelete(item._id)} className="text-red-600 hover:text-red-700">Delete</button>
                </>
              )}
            </div>
            {replying && (
              <div className="mt-3">
                <div className="flex gap-2">
                  <input
                    className="flex-1 border border-gray-300 rounded-md px-3 py-2"
                    placeholder="Write a reply..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                  />
                  <button
                    onClick={postReply}
                    className="px-3 py-2 bg-black text-white rounded-md"
                  >
                    Reply
                  </button>
                </div>
              </div>
            )}
            <div className="mt-3">
              <button onClick={loadReplies} className="text-sm text-black hover:underline">
                {loadingReplies ? "Loading..." : replies ? "Refresh replies" : "View replies"}
              </button>
              {replies && (
                <div className="mt-3 space-y-2">
                  {replies.map((r) => (
                    <div key={r._id} className="pl-4 border-l border-gray-200">
                      <div className="text-sm text-gray-500">
                        {typeof r.userId === "string" ? r.userId : r.userId?.email}
                      </div>
                      <div className="text-gray-800">{r.content}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900">Home</h1>
          <button
            onClick={logout}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Logout
          </button>
        </div>

        {/* Composer */}
        <div className="bg-white shadow rounded-lg p-4 mb-6">
          <textarea
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            placeholder="What's on your mind?"
            rows={3}
            value={composerText}
            onChange={(e) => setComposerText(e.target.value)}
          />
          <div className="mt-3 flex items-center justify-between">
            <div className="flex gap-2 text-sm text-gray-600">
              <label className="flex items-center gap-2">
                <span>Sort:</span>
                <select
                  className="border border-gray-300 rounded-md px-2 py-1"
                  value={sort}
                  onChange={(e) => setSort(e.target.value as "newest" | "liked" | "disliked")}
                >
                  <option value="newest">Newest</option>
                  <option value="liked">Most Liked</option>
                  <option value="disliked">Most Disliked</option>
                </select>
              </label>
            </div>
            <button
              onClick={handlePost}
              disabled={saving || !composerText.trim()}
              className="px-4 py-2 bg-black text-white rounded-md disabled:opacity-50"
            >
              {saving ? "Posting..." : "Post"}
            </button>
          </div>
        </div>

        {/* Feed */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {loading ? (
            <div className="p-6 text-center text-gray-500">Loading...</div>
          ) : error ? (
            <div className="p-6 text-center text-red-600">{error}</div>
          ) : comments.length === 0 ? (
            <div className="p-6 text-center text-gray-500">No comments yet.</div>
          ) : (
            comments.map((c) => <CommentItem key={c._id} item={c} />)
          )}
        </div>

        {/* Pagination */}
        <div className="mt-4 flex items-center justify-between">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-2 border rounded-md disabled:opacity-50"
          >
            Previous
          </button>
          <div className="text-sm text-gray-600">Page {page}</div>
          <button
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-2 border rounded-md"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
