import mongoose, { Document, Model, Schema, model } from 'mongoose';
import { IComment } from '../dto/comment.dto';

const CommentSchema = new Schema<IComment>(
    {
        content: {
            type: String,
            required: true
        },
        likeCount: {
            type: Number,
            default: 0
        },
        disCount:  {
            type: Number,
            default: 0
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    { timestamps: true }
);

export interface ICommentDocument extends IComment, Document { }

export const Comment: Model<ICommentDocument> =
    mongoose.models.Comment ||
    model<ICommentDocument>('Comment', CommentSchema);
