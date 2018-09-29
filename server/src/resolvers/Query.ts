import { forwardTo } from 'prisma-binding'
import { getUserId, Context } from '../utils'
import { me } from './auth'

async function feed(parent, args: any, ctx: Context, info: any) {
  return ctx.db.query.posts({
    where: {
      isPublished: true
    }
  }, info)
}
async function drafts(parent, args: any, ctx: Context, info: any) {

  const id = getUserId(ctx)
  const where = {
    isPublished: false,
    author: {
      id
    }
  }

  return ctx.db.query.posts({
    where
  }, info)
}



async function post (parent, {id}, ctx, info) {
  const userId = getUserId(ctx)
  const requestingUserIsAuthor = await ctx.db.exists.Post({
    id,
    author: {
      id: userId
    }
  })
  const requestingUserIsAdmin = await ctx.db.exists.User({id: userId, role: 'ADMIN'})
  if (requestingUserIsAdmin || requestingUserIsAuthor) {
    return ctx.db.query.post({
      where: {
        id
      }
    }, info)
  }
  throw new Error('Invalid permissions, you must be an admin or the author of this post to retrieve it.',)

}
const Query = {
  me,
  user: (parent, args: any, ctx: Context, info: any) => {
    // getUserId(ctx)
    return forwardTo('db')(parent, args, ctx, info)
  },
  feed,
  drafts,
  post,
  // cars: forwardTo('db'),
  chatsConnection: forwardTo('db'),
  car: forwardTo('db'),
  carsConnection: (parent, args: any, ctx: Context, info: any) => {
    getUserId(ctx)
    return forwardTo('db')(parent, args, ctx, info)
  },
  usersConnection: (parent, args: any, ctx: Context, info: any) => {
   // getUserId(ctx)
    return forwardTo('db')(parent, args, ctx, info)
  }
}

export { Query }
