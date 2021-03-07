import { useEffect } from 'react'
import Head from 'next/head'
import Router from 'next/router'
import Image from 'next/image'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { gql, useQuery } from '@apollo/client'

import { useAuthState } from '../context/auth'

const GET_USERS = gql`
  query getUsers {
    getUsers {
      username
      email
      createdAt
    }
  }
`

export default function Home() {
  const { user } = useAuthState()
  const { loading, data, error } = useQuery(GET_USERS)
  if (error) {
    console.log(error)
  }
  if (data) {
    console.log(data)
  }

  useEffect(() => {
    if (!user) {
      Router.push('/login')
    }
  }, [])

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Row>
        <Col className="d-flex justify-content-center">
          {/* {user ? (
            <h1>Home Page</h1>
          ) : (
            <Image
              src="/chat_logo.png"
              alt="Chat logo"
              width={300}
              height={300}
            />
          )} */}
        </Col>
      </Row>
    </>
  )
}
