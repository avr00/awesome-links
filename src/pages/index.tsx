import Head from 'next/head';
import { addApolloState, initializeApollo } from '../../lib/apollo';
import { AwesomeLink } from '../components/AwesomeLink';
import { LinksDocument, useLinksQuery } from '../generated/graphql';

export default function Home() {
  const { data, loading, error, fetchMore, previousData } = useLinksQuery({
    variables: {
      first: 2
    },
    notifyOnNetworkStatusChange: true
  });

  if (loading && !previousData) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  const { endCursor, hasNextPage } = data.links.pageInfo;

  return (
    <div>
      <Head>
        <title>Awesome Links</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='container mx-auto max-w-5xl my-20'>
        <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
          {data?.links.edges.map(({ node }) => (
            <AwesomeLink
              key={node.id}
              imageUrl={node.imageUrl}
              url={node.url}
              title={node.title}
              category={node.category}
              description={node.description}
              id={node.id}
            />
          ))}
        </ul>
        {hasNextPage ? (
          <button
            disabled={loading}
            className='px-4 py-2 bg-blue-500 text-white rounded my-10 flex items-center gap-2'
            onClick={() => {
              fetchMore({
                variables: { after: endCursor },
                updateQuery: (prevResult, { fetchMoreResult }) => {
                  fetchMoreResult.links.edges = [
                    ...prevResult.links.edges,
                    ...fetchMoreResult.links.edges
                  ];
                  return fetchMoreResult;
                }
              });
            }}
          >
            more{' '}
            {loading && (
              <svg
                className='animate-spin 
                    h-4 w-4 rounded-full 
                    bg-transparent 
                    border-2 border-transparent 
                  border-t-white 
                  border-r-white border-opacity-50'
                viewBox='0 0 24 24'
           />
            )}
          </button>
        ) : (
          <p className='my-10 text-center font-medium'>
            You've reached the end!{' '}
          </p>
        )}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: LinksDocument,
    variables: {
      first: 2
    }
  });

  return addApolloState(apolloClient, {
    props: {}
  });
}
