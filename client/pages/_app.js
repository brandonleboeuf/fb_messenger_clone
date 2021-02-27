import { ApolloProvider } from '@apollo/client'
import { Container } from 'react-bootstrap'

import { client } from '../lib/Apollo'
import '../styles/globals.scss'

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Container className="pt-5">
        <Component {...pageProps} />
      </Container>
    </ApolloProvider>
  )
}

export default MyApp
