// const {forwardTo} = require('prisma-binding')
// const { getUserId } = require('../utils')
import { Context } from '../utils'

const Subscription = {
  chat: {
    subscribe: async (parent, args: any, ctx: Context, info: any) =>
    ctx.db.subscription.chat({}, info)
  }
}

export { Subscription }
