import { useState } from 'react'
import Head from 'next/head'
import Router from 'next/router'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { gql, useLazyQuery } from '@apollo/client'
import Link from 'next/link'

import { useAuthDispatch, useAuthState } from '../context/auth'

const LOGIN_USER = gql`
  query login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      username
      email
      createdAt
      token
    }
  }
`

export default function Login() {
  const { user } = useAuthState()
  if (user) {
    Router.push('/')
  }
  const [variables, setVariables] = useState({
    username: '',
    password: '',
  })

  const [errors, setErrors] = useState({})

  const dispatch = useAuthDispatch()

  const [loginUser, { loading }] = useLazyQuery(LOGIN_USER, {
    onError(err) {
      setErrors({ ...err.graphQLErrors[0]?.extensions.errors }),
        console.log({ err })
    },
    onCompleted(data) {
      dispatch({ type: 'LOGIN', payload: data.login })
      Router.push('/')
    },
  })

  const submitLoginForm = (e) => {
    e.preventDefault()
    loginUser({ variables })
  }

  return (
    <>
      <Head>
        <title>CHAT App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Row className="bg-white py-5 justify-content-center">
        <Col sm={8} md={6} lg={4}>
          <h1 className="text-center">Login</h1>
          <Form onSubmit={submitLoginForm}>
            <Form.Group>
              <Form.Label className={errors.username && 'text-danger'}>
                {errors.username ?? 'Username'}
              </Form.Label>
              <Form.Control
                type="username"
                value={variables.username}
                className={errors.username && 'is-invalid'}
                onChange={(e) =>
                  setVariables({ ...variables, username: e.target.value })
                }
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label className={errors.password && 'text-danger'}>
                {errors.password ?? 'Password'}
              </Form.Label>
              <Form.Control
                type="password"
                value={variables.password}
                className={errors.password && 'is-invalid'}
                onChange={(e) =>
                  setVariables({ ...variables, password: e.target.value })
                }
              ></Form.Control>
            </Form.Group>
            <div className="text-center">
              <Button variant="success" type="submit" disabled={loading}>
                {loading ? 'loading..' : 'Login'}
              </Button>
            </div>
          </Form>
          <div className="bg-white py-3 text-center">
            <small>
              Don't have an account?{' '}
              <Link href="/register">
                <a style={{ color: 'blue' }}>Register</a>
              </Link>
            </small>
          </div>
        </Col>
      </Row>
    </>
  )
}
