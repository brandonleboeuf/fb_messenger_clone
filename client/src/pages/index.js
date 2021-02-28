import { useEffect } from 'react'
import Head from 'next/head'
import Router from 'next/router'
import Image from 'next/image'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'

import { useAuthState } from '../context/auth'

export default function Home() {
  const { user } = useAuthState()
  useEffect(() => {
    if (!user) {
      Router.push('/login')
    }
  }, [])

  return (
    <>
      <Head>
        z<title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Row>
        <Col className="d-flex justify-content-center">
          {user ? (
            <h1>Home Page</h1>
          ) : (
            <Image
              src="/chat_logo.png"
              alt="Chat logo"
              width={300}
              height={300}
            />
          )}
        </Col>
      </Row>
    </>
  )
}
