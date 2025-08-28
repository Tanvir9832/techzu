import { useMemo, useState } from "react";
import {
  createReply,
  fetchReplies,
  toggleLike,
  toggleDislike,
  type Comment,
  type Reply,
} from "../api/comments";
import { getAuthorEmail } from "../utils/helpers";
import ReplyItem from "./Reply";

interface CommentItemProps {
  item: Comment;
  user: any;
  onEdit: (id: string, content: string) => void;
  onDelete: (id: string) => void;
}

const CommentItem: React.FC<CommentItemProps> = ({
  item,
  user,
  onEdit,
  onDelete,
}) => {
  const [replies, setReplies] = useState<Reply[] | null>(null);
  const [replying, setReplying] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [loadingReplies, setLoadingReplies] = useState(false);

  // Local like/dislike state
  const [likeCount, setLikeCount] = useState(item.likeCount || 0);
  const [disCount, setDisCount] = useState(item.disCount || 0);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);

  // Edit state
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(item.content);

  // Delete modal state
  const [confirmDelete, setConfirmDelete] = useState(false);

  const authorEmail = useMemo(
    () => getAuthorEmail(item.author, user),
    [item.author, user]
  );

  const isAuthor = useMemo(() => {
    if (!user || !item.author) return false;
    return typeof item.author === "string"
      ? item.author === user._id
      : item.author._id === user._id || item.author.email === user.email;
  }, [item.author, user]);

  const loadReplies = async () => {
    setLoadingReplies(true);
    try {
      const data = await fetchReplies(item._id, 1, 10);
      setReplies(data);
    } finally {
      setLoadingReplies(false);
    }
  };

  const postReply = async () => {
    if (!replyText.trim()) return;
    try {
      const created = await createReply(item._id, replyText.trim());
      if (user) {
        (created as any).userId = { _id: user._id, email: user.email };
      }
      setReplies((prev) => (prev ? [created, ...prev] : [created]));
      setReplyText("");
    } catch (e) {
      console.error(e);
    }
  };

  const handleLike = async () => {
    try {
      await toggleLike(item._id);
      setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
      setIsLiked((prev) => !prev);
    } catch (e) {
      console.error("Failed to like", e);
    }
  };

  const handleDislike = async () => {
    try {
      await toggleDislike(item._id);
      setDisCount((prev) => (isDisliked ? prev - 1 : prev + 1));
      setIsDisliked((prev) => !prev);
    } catch (e) {
      console.error("Failed to dislike", e);
    }
  };

  const handleSaveEdit = async () => {
    if (!editText.trim()) return;
    try {
      onEdit(item._id, editText.trim());
      setEditing(false);
    } catch (e) {
      console.error("Failed to edit", e);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      onDelete(item._id);
      setConfirmDelete(false);
    } catch (e) {
      console.error("Failed to delete", e);
    }
  };

  return (
    <div className="border-b border-gray-200 p-4">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="text-sm text-gray-500">{authorEmail}</div>

          {/* Content or editing input */}
          {editing ? (
            <div className="mt-2 flex gap-2">
              <input
                className="flex-1 border border-gray-300 rounded-md px-3 py-2"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
              <button
                onClick={handleSaveEdit}
                className="px-3 py-2 bg-black text-white rounded-md cursor-pointer"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setEditing(false);
                  setEditText(item.content);
                }}
                className="px-3 py-2 bg-gray-300 rounded-md cursor-pointer"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="mt-1 text-gray-900">{item.content}</div>
          )}

          {/* Actions */}
          <div className="mt-3 flex items-center gap-3 text-sm text-gray-600">
            <button onClick={handleLike} className="hover:text-gray-900 cursor-pointer">
              👍 {likeCount}
            </button>
            <button onClick={handleDislike} className="hover:text-gray-900 cursor-pointer">
              👎 {disCount}
            </button>
            <button
              onClick={() => setReplying((v) => !v)}
              className="hover:text-gray-900 cursor-pointer"
            >
              Reply
            </button>
            {isAuthor && !editing && (
              <>
                <button
                  onClick={() => setEditing(true)}
                  className="hover:text-gray-900 cursor-pointer"
                >
                  Edit
                </button>
                <button
                  onClick={() => setConfirmDelete(true)}
                  className="text-red-600 hover:text-red-700 cursor-pointer"
                >
                  Delete
                </button>
              </>
            )}
          </div>

          {/* Reply input */}
          {replying && (
            <div className="mt-3 flex gap-2">
              <input
                className="flex-1 border border-gray-300 rounded-md px-3 py-2"
                placeholder="Write a reply..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
              />
              <button
                onClick={postReply}
                className="px-3 py-2 bg-black text-white rounded-md cursor-pointer"
              >
                Reply
              </button>
            </div>
          )}

          {/* Replies */}
          <div className="mt-3">
            <button
              onClick={loadReplies}
              className="text-sm text-black hover:underline cursor-pointer"
            >
              {loadingReplies
                ? "Loading..."
                : replies
                ? "Refresh replies"
                : "View replies"}
            </button>
            {replies && (
              <div className="mt-3 space-y-2">
                {replies.map((r) => (
                  <ReplyItem key={r._id} reply={r} user={user} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete confirmation modal */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <p className="mb-4 text-gray-800">
              Are you sure you want to delete this comment?
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-red-600 text-white rounded-md cursor-pointer"
              >
                Delete
              </button>
              <button
                onClick={() => setConfirmDelete(false)}
                className="px-4 py-2 bg-gray-300 rounded-md cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentItem;
