/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Reply } from "../api/comments";
import { getAuthorEmail } from "../utils/helpers";

const ReplyItem: React.FC<{ reply: Reply; user: any }> = ({ reply, user }) => (
  <div className="pl-4 border-l border-gray-200">
    <div className="text-sm text-gray-500">
      {getAuthorEmail(reply?.userId, user)}
    </div>
    <div className="text-gray-800">{reply.content}</div>
  </div>
);

export default ReplyItem