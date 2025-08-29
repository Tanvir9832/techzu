/* eslint-disable @typescript-eslint/no-explicit-any */
export type AuthorPopulated = { _id: string; email: string };

export function getAuthorEmail(author: any, user: any) {
  if (!author) return "Unknown";
  if (typeof author === "string") {
    return user && author === user._id ? user.email : "Unknown";
  }
  return author.email ?? "Unknown";
}