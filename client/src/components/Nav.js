import Link from 'next/link'
import Router from 'next/router'

import { Row, Col, Button } from 'react-bootstrap'

import { useAuthDispatch } from '../context/auth'

export default function Nav() {
  const dispatch = useAuthDispatch()
  const logout = () => {
    dispatch({ type: 'LOGOUT' })
    Router.push('/')
  }

  return (
    <nav className="bg-white d-flex py-2 justify-content-around">
      <Link href="/login">
        <Button variant="link">Login</Button>
      </Link>
      <Link href="/register">
        <Button variant="link">Register</Button>
      </Link>
      <Button variant="link" onClick={logout}>
        Logout
      </Button>
    </nav>
  )
}
