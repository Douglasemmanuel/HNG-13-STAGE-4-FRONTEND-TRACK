// convex/mutations/createProfile.ts
import { internalMutation, mutation , query } from './_generated/server';
import { v } from "convex/values";


export  const getAllUsers = query ({
  args :{},
  handler:async(ctx, args) =>{
    return await ctx.db.query('users').collect();
    
  },
});

export const createUser = internalMutation({
  args:{
      email: v.string(),
  clerkId: v.string(),
  imageUrl: v.optional(v.string()),
  first_name: v.optional(v.string()),
  last_name: v.optional(v.string()),
  username: v.union(v.string(),v.null()),
  },
  handler:async(ctx,args)=>{
    console.log('createdUser', args);
    const userId = await ctx.db.insert('users',{
        ...args,
        username: args.username || `${args.first_name}${args.last_name}`
    });
    return userId
  }
})



export const getUserByClerkId = query({
  args: {
    clerkId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query('users')
      .filter((q) => q.eq(q.field('clerkId'), args.clerkId))
      .unique();

    // if (!user?.imageUrl || user.imageUrl.startsWith('http')) {
    //   return user;
    // }

    // const url = await ctx.storage.getUrl(user.imageUrl as Id<'_storage'>);

    return {
      ...user,
      // imageUrl: url,
    };
  },
});