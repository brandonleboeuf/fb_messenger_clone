import { useState } from 'react'
import Head from 'next/head'
import Router from 'next/router'
import Link from 'next/link'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { useMutation, gql } from '@apollo/client'

import { useAuthState } from '../context/auth'

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      username: $username
      email: $email
      password: $password
      confirmPassword: $confirmPassword
    ) {
      username
      email
      createdAt
    }
  }
`

export default function Register() {
  const { user } = useAuthState()
  if (user) {
    Router.push('/')
  }
  const [variables, setVariables] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  })

  const [errors, setErrors] = useState({})

  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    // update(cache, res)
    update: (_, __) => Router.push('/login'),
    onError: (err) => setErrors({ ...err.graphQLErrors[0]?.extensions.errors }),
  })

  const submitRegisterForm = (e) => {
    e.preventDefault()
    registerUser({ variables })
  }

  return (
    <>
      <Head>
        <title>Register</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Row className="bg-white py-5 justify-content-center">
        <Col sm={8} md={6} lg={4}>
          <h1 className="text-center">Register</h1>
          <Form onSubmit={submitRegisterForm}>
            <Form.Group>
              <Form.Label className={errors.email && 'text-danger'}>
                {errors.email ?? 'Email Address'}
              </Form.Label>
              <Form.Control
                type="email"
                value={variables.email}
                className={errors.email && 'is-invalid'}
                onChange={(e) =>
                  setVariables({ ...variables, email: e.target.value })
                }
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label className={errors.username && 'text-danger'}>
                {errors.username ?? 'username'}
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
            <Form.Group>
              <Form.Label className={errors.confirmPassword && 'text-danger'}>
                {errors.confirmPassword ?? 'Confirm Password'}
              </Form.Label>
              <Form.Control
                type="password"
                value={variables.confirmPassword}
                className={errors.confirmPassword && 'is-invalid'}
                onChange={(e) =>
                  setVariables({
                    ...variables,
                    confirmPassword: e.target.value,
                  })
                }
              ></Form.Control>
            </Form.Group>
            <div className="text-center">
              <Button variant="success" type="submit" disabled={loading}>
                {loading ? 'loading..' : 'Register'}
              </Button>
            </div>
          </Form>
          <div className="bg-white py-3 text-center">
            <small>
              Already registered?{' '}
              <Link href="/login">
                <a style={{ color: 'blue' }}>Login</a>
              </Link>
            </small>
          </div>
        </Col>
      </Row>
    </>
  )
}
