const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
import { getUserId, Context } from '../utils'
import emailGenerator from '../emailGenerator'

const AuthPayload = {
  user: async ({ user: { id } }, args: any, ctx: Context, info: any) => {
    return ctx.db.query.user({ where: { id } }, info)
  },
}
// query the currently logged in user
async function me(parent: any, args: any, ctx: Context, info: any) {
  const id = getUserId(ctx)
  console.log("id",id)
  const userExists= ctx.db.query.user({ where: { id } }, info)
  if (!userExists) {
    throw new Error(`Post not found`)
  }
return userExists
}

// register a new user
async function signup(parent, args, ctx: Context, info: any) {
  const password = await bcrypt.hash(args.password, 10)

  const role = args.admin ? 'ADMIN' : 'CUSTOMER'
  const resetPasswordToken = crypto.randomBytes(64).toString('hex')
  const validateEmailToken = crypto.randomBytes(64).toString('hex')
  console.log('validateEmailToken', validateEmailToken)
  const { admin, ...data } = args

  const user = await ctx.db.mutation.createUser({
    data: { ...data, role, resetPasswordToken, validateEmailToken, password },
  })

  emailGenerator.sendWelcomeEmail(user, ctx)
  return {
    token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
    user,
  }
}
async function sendLinkValidateEmail(parent, args, ctx: Context, info: any) {
  const id = getUserId(ctx)
  let userMe = await ctx.db.query.user({ where: { id } })
  return emailGenerator
    .sendWelcomeEmail(userMe, ctx)
    .then(data => {
      return userMe
    })
    .catch(data => {
      throw new Error(`Error. cannot send email to: ${userMe.email}`)
    })
}

async function resetPassword(parent, args, ctx: Context, info: any) {
  const userCheck = await ctx.db.query.user({
    where: { resetPasswordToken: args.resetPasswordToken },
  })
  if (!userCheck) {
    throw new Error(`Link is not valid`)
  } else {
    if (userCheck.resetPasswordExpires < new Date().getTime()) {
      throw new Error(`Link expired`)
    }
    const password = await bcrypt.hash(args.password, 10)
    const user = await ctx.db.mutation.updateUser({
      where: { resetPasswordToken: args.resetPasswordToken },
      data: {
        password: password,
        resetPasswordExpires: new Date().getTime(),
      },
    })
    return {
      token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
      user,
    }
  }
}

async function validateEmail(parent, args, ctx: Context, info: any) {
  const userCheck = await ctx.db.query.user({
    where: {
      validateEmailToken: args.validateEmailToken,
    },
  })
  if (!userCheck) {
    throw new Error(`No such user found.`)
  } else {
    if (userCheck.emailvalidated) {
      throw new Error(`User Already validated`)
    }
  }

  // try {
  const user = await ctx.db.mutation.updateUser({
    // Must check resetPasswordExpires
    where: { validateEmailToken: args.validateEmailToken },
    data: {
      emailvalidated: true,
    },
  })
  // return user
  return {
    token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
    user,
  }
}

// log in an existing user
async function login(parent, { email, password }, ctx: Context, info: any) {
  const user = await ctx.db.query.user({ where: { email } })
  if (!user) {
    throw new Error(`No such user found for email: ${email}`)
  }

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) {
    throw new Error('Invalid password')
  }

  return {
    token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
    user,
  }
}
// log in an existing user
async function forgetPassword(parent, { email }, ctx: Context, info: any) {
  const user = await ctx.db.query.user({ where: { email } })
  if (!user) {
    throw new Error(`No such user found for email: ${email}`)
  }
  try {
    let uniqueId = crypto.randomBytes(64).toString('hex')
    await ctx.db.mutation.updateUser({
      where: { id: user.id },
      data: {
        resetPasswordExpires: new Date().getTime() + 1000 * 60 * 60 * 5, // 5 hours
        resetPasswordToken: uniqueId,
      },
    })
    emailGenerator.sendForgetPassword(uniqueId, email, ctx)
  } catch (e) {
    return e
  }
  return user
}

// update the password of an existing user
async function updatePassword(
  parent,
  { oldPassword, newPassword },
  ctx: Context,
  info: any,
) {
  let userId = getUserId(ctx)
  console.log(userId)
  const user = await ctx.db.query.user({ where: { id: userId } })
  const oldPasswordValid = await bcrypt.compare(oldPassword, user.password)
  if (!oldPasswordValid) {
    console.log('old Password not Valid')
    throw new Error('Old password is wrong, please try again.')
  }
  const newPasswordHash = await bcrypt.hash(newPassword, 10)
  try {
    await ctx.db.mutation.updateUser({
      where: { id: userId },
      data: { password: newPasswordHash },
    })
  } catch (e) {
    return e
  }
  return user
}

export {
  me,
  signup,
  validateEmail,
  resetPassword,
  login,
  updatePassword,
  sendLinkValidateEmail,
  forgetPassword,
  AuthPayload,
}
