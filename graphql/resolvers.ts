import prisma from '../lib/prisma';

export const resolvers = {
  Query: {
    links: async (_parent, args, ctx) =>
      await ctx.prisma.link.findMany()
  }
};
