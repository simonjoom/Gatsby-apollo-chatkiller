import { getUserId, Context } from './utils'

async function user(parent, { id }, ctx: Context, info: any) {
  console.log('id', id)
  const requestingUserId = getUserId(ctx)
  return await ctx.db.query.user({ where: { id } }, info)
}

export { user }
