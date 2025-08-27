import { IUserDocument, User } from "../models/users.model";

export const UserRepository = {

    findByEmail: (email: string): Promise<IUserDocument | null> =>
        User.findOne({ email: email.toLowerCase() }),

    findById: (id: string): Promise<IUserDocument | null> =>
        User.findById(id),

    create: (data: Partial<IUserDocument>): Promise<IUserDocument> => User.create(data),

    save: (user: IUserDocument): Promise<IUserDocument> => user.save(),
    
};
