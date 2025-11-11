import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import {internal} from '../convex/_generated/api';

const http = httpRouter();
export const handleClerkWebhook = httpAction(async (ctx, request) => {
    const {data , type} = await request.json();
    console.log('DO DOMETHIND-DATA:',data)

    switch(type){
        case 'user.created':
            await ctx.runMutation(internal.users.createUser,{
                  clerkId: data.id,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email_addresses[0].email_address,
        imageUrl: data.image_url,
        username: data.username,
            });
        break;
        case 'user.deleted':
            console.log()
        break;
          default:
      break;
    }

  // implementation will be here

// https://youthful-warthog-456.convex.site/clerk-users-webhook
// https://youthful-warthog-456.convex.cloud

  return new Response(null , {status:200});

});
http.route({
  path: '/clerk-users-webhook',
  method: 'POST',
  handler: handleClerkWebhook,
});

export default http;