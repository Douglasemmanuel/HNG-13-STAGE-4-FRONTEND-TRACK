// convex/schema.ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

export const User = {
  email: v.string(),
  clerkId: v.string(),
  imageUrl: v.optional(v.string()),
  first_name: v.optional(v.string()),
  last_name: v.optional(v.string()),
  username: v.optional(v.string()),
};
export const Message = {
  userId: v.id('users'), 
  threadId: v.optional(v.string()),
  content: v.optional(v.string()),
  likeCount: v.number(), 
  commentCount: v.number(),
  mediaFiles: v.optional(v.array(v.string())), 
};
export default defineSchema({
  users: defineTable(User).index('byClerkId', ['clerkId']).searchIndex('searchUsers', {
    searchField: 'username',
  }),
  messages: defineTable(Message),
});