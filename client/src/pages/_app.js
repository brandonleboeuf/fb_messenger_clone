import { ApolloProvider } from '@apollo/client'
import { Container } from 'react-bootstrap'

import { client } from '../lib/Apollo'
import { AuthProvider } from '../context/auth'
import '../styles/globals.scss'

import Nav from '../components/Nav'

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <Nav />
        <Container className="pt-5">
          <Component {...pageProps} />
        </Container>
      </AuthProvider>
    </ApolloProvider>
  )
}

export default MyApp
