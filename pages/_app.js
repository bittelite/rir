import { ApolloProvider } from '@apollo/client'
import client from '../constants/client'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
  )
}

export default MyApp
