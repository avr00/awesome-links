// /graphql/context.ts
import { PrismaClient } from '@prisma/client'
import { getSession } from 'next-auth/react'
import prisma from '../lib/prisma'

interface User {
  name: string
  email: string
  image: string
}

export type Context = {
  user?: User
  prisma: PrismaClient
}

export async function createContext({ req, res }): Promise<Context> {

  const session = await getSession({ req });

  // if the user is not logged in, omit returning the user and accessToken 
  if (!session) return { prisma }
  const user = session.user as User;

  return {
    user, 
    prisma,
  }
}