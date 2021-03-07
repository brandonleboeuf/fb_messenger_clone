import Link from 'next/link'
import Router from 'next/router'
import Image from 'next/image'

// import logo from './chat_logo.png'
import { Button } from 'react-bootstrap'

import { useAuthDispatch, useAuthState } from '../context/auth'

export default function Nav() {
  const { user } = useAuthState()
  const dispatch = useAuthDispatch()

  const logout = () => {
    dispatch({ type: 'LOGOUT' })
    Router.push('/')
  }

  return (
    <nav className="bg-white d-flex px-4 justify-content-between">
      <Image src="/chat_logo.png" alt="Chat logo" width={100} height={100} />

      {user ? (
        <Button variant="link" onClick={logout}>
          Logout
        </Button>
      ) : (
        <div className="d-flex">
          <Link href="/login">
            <Button variant="link">Login</Button>
          </Link>
          <Link href="/register">
            <Button variant="link">Register</Button>
          </Link>
        </div>
      )}
    </nav>
  )
}
