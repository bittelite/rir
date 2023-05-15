import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/link-context';

const httpLink = new HttpLink({
  uri: 'https://skjermkontroll.no/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token') || process.env.GRAPHQL_JWT_AUTH_SECRET_KEY;
  const authHeader = token ? `Bearer ${token}` : '';
  const defaultHeader = headers;
  return {
    headers: {
      ...defaultHeader,
      authorization: authHeader,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;