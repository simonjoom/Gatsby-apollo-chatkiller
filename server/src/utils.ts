import * as jwt from 'jsonwebtoken'
import { Prisma as PrismaClient } from './prisma-client'
import { Prisma } from './generated/prisma'

export interface ContextClient {
  db: PrismaClient
}
export interface Context {
  db: Prisma
  req?: any
}

export function getUserId(ctx: Context): string {
 // return "1"
 // console.log("token",ctx.req.token)
  const Authorization = ctx.req.get('Authorization')
  //const token=jwt.sign({ userId: "0" }, process.env.APP_SECRET);
  //console.log(token) 
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '')
    const { userId } = jwt.verify(token, process.env.APP_SECRET!) as {
      userId: string
    }
    return userId
  }

  throw new AuthError()
}

export class AuthError extends Error {
  constructor() {
    super('Not authorized')
  }
}
