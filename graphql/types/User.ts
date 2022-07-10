import { enumType, objectType } from 'nexus';
import { Link } from './Link';

export const User = objectType({
  name: 'User',
  definition(t) {
    t.string('id');
    t.string('name');
    t.string('email');
    t.string('image');
    t.field('role', { type: Role });
    t.list.field('bookmarks', {
      type: Link,
      async resolve(parent, _args, ctx) {
        return await ctx.prisma.user
          .findUnique({
            where: {
              id: parent.id
            }
          })
          .bookmarks();
      }
    });
  }
});

const Role = enumType({
  name: 'Role',
  members: ['USER', 'ADMIN']
});

export const Me = objectType({
  name: 'Query',
  definition(t) {
    t.nullable.field('me', {
      type: User,
      resolve: (_, _args, ctx) => {
        console.log({ ctx, USER: ctx.user });
        // find the user by the id in the context
        const user = ctx.prisma.user.findUnique({
          where: {
            email: ctx.user.email
          }
        });

        return user;
      }
    });
  }
});
