import Head from 'next/head'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'

export default function Home() {
  return (
    <>
      <Head>
        z<title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Row>
        <Col>
          <h1>Home Page</h1>
        </Col>
      </Row>
    </>
  )
}
