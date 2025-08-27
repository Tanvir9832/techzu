import { Reply, IReplyDocument } from "../models/reply.model";

export const ReplyRepository = {
  create: (data: Partial<IReplyDocument>): Promise<IReplyDocument> =>
    Reply.create(data),

  findById: (id: string): Promise<IReplyDocument | null> =>
    Reply.findById(id).populate("userId", "email"),

  findByCommentId: (
    commentId: string,
    page: number,
    limit: number
  ): Promise<IReplyDocument[]> =>
    Reply.find({ commentId })
      .sort({ createdAt: -1 })
    //   .skip((page - 1) * limit)
    //   .limit(limit)
      .populate("userId", "email"),

  save: (reply: IReplyDocument): Promise<IReplyDocument> => reply.save(),

  deleteById: (id: string): Promise<IReplyDocument | null> =>
    Reply.findByIdAndDelete(id),
};
