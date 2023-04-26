import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/link-context';

const httpLink = new HttpLink({
  uri: 'https://skjermkontroll.no/graphql', 
});

const authLink = setContext((_, { headers }) => {
  const token = process.env.GRAPHQL_JWT_AUTH_SECRET_KEY;
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
