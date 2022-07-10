import '../../styles/tailwind.css';
import { SessionProvider } from 'next-auth/react';
import Layout from '../components/Layout';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../../lib/apollo';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const apolloClient = useApollo(pageProps);

  return (
    <SessionProvider session={session}>
      <ApolloProvider client={apolloClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </SessionProvider>
  );
}

export default MyApp;
