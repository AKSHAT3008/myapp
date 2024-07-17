import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContexts'
import { Link, useNavigate } from "react-router-dom"
import GoogleSVG from './styles/GoogleSVG';

function Login({ isDarkMode }) {
  const emailRef = useRef()
  const passwordRef = useRef()
  const navigate = useNavigate();
  const { login, googleSignIn } = useAuth();
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError('')
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      navigate('/clock')
    } catch {
      setError('Failed to sign in')
    }
    setLoading(false)
  }

  async function handleGoogleSubmit(e) {
    e.preventDefault()

    try {
      setError('')
      setLoading(true)
      await googleSignIn()
      navigate('/clock')
    } catch {
      setError('Failed to create an account')
    }
    setLoading(false)
  }

  const cardStyles = {
    backgroundColor: isDarkMode ? "#333" : "#fff",
    color: isDarkMode ? "#fff" : "#000",
  };

  return (
    <div>
      <div>
        <Card style={cardStyles}>
          <Card.Body>
            <h2 className="text-center mb-4 fw-semibold">Login to your account</h2>

            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label style={{ marginRight: '320px', fontWeight: "500" }}>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>

              <Form.Group id="password">
                <Form.Label style={{ marginTop: '10px', marginRight: '320px', fontWeight: "500" }} >Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} required />
              </Form.Group>
              <div className='w-100 text-end mt-3'>
                <Link to="/forgot-password" style={{ textDecoration: 'none' }}><p style={{ color: '#FE8C00', fontStyle: 'normal' }}>Forgot Password?</p></Link>
              </div>
              <Button disabled={loading} className="w-100 mt-3" type="submit" style={{ backgroundColor: '#FE8C00', borderColor: 'orange', borderRadius: '100px' }}>Sign in</Button>
            </Form>
            <p style={{ fontWeight: '500', fontSize: '14px', color: "#878787", marginTop: '10px' }}>-------Or sign in with-------</p>
            <Button disabled={loading} className="w-100" type="submit" onClick={handleGoogleSubmit} style={{ backgroundColor: 'transparent', borderColor: 'transparent' }}> 
              <GoogleSVG disabled={loading} className="w-100" onClick={handleGoogleSubmit} />
            </Button>
            <div className='text-center mt-3'> Don't have an account? <Link to="/signup" style={{ color: '#FE8C00', textDecoration: 'none', fontFamily: 'sans-serif', fontWeight: '400', fontSize: '16px' }}>Register</Link></div>
          </Card.Body>
        </Card>
      </div>
    </div>
  )
}

export default Login;
