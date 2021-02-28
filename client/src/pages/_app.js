import { ApolloProvider } from '@apollo/client'
import { Container } from 'react-bootstrap'

import { client } from '../lib/Apollo'
import { AuthProvider } from '../context/auth'
import '../styles/globals.scss'

import Nav from '../components/Nav'

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ApolloProvider client={client}>
        <Nav />
        <Container className="pt-5">
          <Component {...pageProps} />
        </Container>
      </ApolloProvider>
    </AuthProvider>
  )
}

export default MyApp
