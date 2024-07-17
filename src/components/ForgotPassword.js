import React, {useRef, useState} from 'react'
import {Form,Button,Card,Alert} from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContexts'
import {Link} from "react-router-dom"


function ForgotPassword() {

    const emailRef = useRef()
    const {resetPassword} = useAuth();
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")


    async function handleSubmit(e){
        e.preventDefault()

        try{
            setMessage('')
            setError('')
            setLoading(true)
        await resetPassword(emailRef.current.value)
        setMessage('Check your inbox for further instructions')
    } catch{
        setError('Failed to reset password')
    }
    setLoading(false)
}
  return (
    <div>
      <Card>
        <Card.Body>
        <h2 className = "text-center mb-4">Password Reset</h2>
        {error && <Alert variant = "danger">{error}</Alert>}
        {message && <Alert variant = "success">{message}</Alert>}
        <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
           
            
            <Button disabled ={loading} className = "w-100 mt-3" type="submit"> Reset Password</Button>
        </Form>
        <div className='w-100 text-end    mt-3'>
          <Link to = "/login">Login</Link> 
        </div>
        </Card.Body>
      </Card>
      <div className='text-center'> Don't have an account? <Link to="/signup">Sign up </Link></div>

    </div>
  )
}

export default ForgotPassword
