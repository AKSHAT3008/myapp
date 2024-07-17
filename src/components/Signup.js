import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContexts';
import { Link, useNavigate } from 'react-router-dom';
import GoogleSVG from './styles/GoogleSVG';

function Signup({ isDarkMode }) {
  const emailRef = useRef();
  const passwordRef = useRef();
  const userRef = useRef();
  const navigate = useNavigate();
  const passwordConfirmRef = useRef();
  const { signup, googleSignIn } = useAuth();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);

  function handleChange() {
    setChecked(!checked);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!checked) {
      return setError('Please agree to terms and conditions');
    }

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match');
    }

    try {
      setError('');
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      navigate('/clock');
    } catch {
      setError('Failed to create an account');
    }
    setLoading(false);
  }

  async function handleGoogleSubmit(e) {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await googleSignIn();
      navigate('/clock');
    } catch {
      setError('Failed to create an account');
    }
    setLoading(false);
  }

  const cardStyles = {
    backgroundColor: isDarkMode ? '#333' : '#fff',
    color: isDarkMode ? '#fff' : '#000',
    borderColor: isDarkMode ? '#FE8C00' : '#000'
  };

  return (
    <div className={isDarkMode ? 'dark-mode' : ''}>
      <Card style={cardStyles}>
        <Card.Body >
          <h2 className="text-center fw-semibold">Create your new account</h2>
          <p style={{ fontSize: '20px', fontWeight: 'normal', color: '#878787', textAlign: 'left' }}>
            Create an account to start looking for the food you like
          </p>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <br />
            <Form.Group id="username">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" ref={userRef} required />
            </Form.Group>
            <br />
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <br />
            <Form.Group id="password-confirm">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>

            <label>
              <input type="checkbox" checked={checked} onChange={handleChange} />
              I agree with terms of service and privacy policies
            </label>
            <Button
              disabled={loading}
              className="w-100 mt-3"
              type="submit"
              style={{ backgroundColor: '#FE8C00', borderColor: 'orange', borderRadius: '100px' }}
            >
              Register
            </Button>
          </Form>
          <p style={{ fontWeight: '500', fontSize: '14px', color: '#878787', marginTop: '10px' }}>
            -------Or sign in with-------
          </p>
          <Button
            disabled={loading}
            className="w-100"
            type="button"
            onClick={handleGoogleSubmit}
            style={{ backgroundColor: 'transparent', borderColor: 'transparent' }}
          >
            <GoogleSVG disabled={loading} className="w-100" onClick={handleGoogleSubmit} />
          </Button>
          <div className="text-center">
            Already have an account?{' '}
            <Link
              to="/"
              style={{
                color: '#FE8C00',
                textDecoration: 'none',
                fontFamily: 'sans-serif',
                fontWeight: '400',
                fontSize: '16px',
              }}
            >
              Log in
            </Link>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Signup;
