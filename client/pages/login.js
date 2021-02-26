import Head from 'next/head'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'

export default function Register() {
  return (
    <>
      <Head>
        z<title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <Row>
          <Col>
            <h1>Login</h1>
            <Form>
              <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control type="username"></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password"></Form.Control>
              </Form.Group>
              <div className="text-center">
                <Button variant="success" type="submit">
                  Login
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  )
}
