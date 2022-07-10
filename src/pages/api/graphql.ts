import { ApolloServer } from 'apollo-server-micro';
import { resolvers } from '../../../graphql/resolvers';
import { schema } from '../../../graphql/schema';
import Cors from 'micro-cors';
import { createContext } from '../../../graphql/context';


const cors = Cors();

const apolloServer = new ApolloServer({
  schema,
  resolvers,
  context: createContext
});

const startServer = apolloServer.start();

export default cors(async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    return res.end();
  }

  await startServer;
  return apolloServer.createHandler({ path: '/api/graphql' })(req, res);
});

export const config = {
  api: {
    bodyParser: false
  }
};
