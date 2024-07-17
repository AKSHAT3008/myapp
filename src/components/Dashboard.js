import React, { useState } from 'react'
import {Card,Button,Alert} from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContexts';
import { Link, useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [error,setError] = useState("");
  const {currentUser,logout} = useAuth();
  const navigate = useNavigate();

  async function handleLogout(){
    setError("");

    try{
      await logout()
      navigate('/')
    }catch{
      setError("Failed to LogOut")
    }
  }
  return (
    <div>
      <Card>
        <Card.Body>
        <h2 className = "text-center mb-4">Profile</h2>
        {error && <Alert variant = "danger">{error}</Alert>}
        <strong>Email: </strong>{currentUser.email}
        
        <Link to="/update-profile" className = "btn btn-primary w-100 mt-3" style={{backgroundColor:"#FE8C00", borderColor:'transparent'}}>Update Profile</Link>
        <div className='text-center'> 
        <Button variant="link" onClick={handleLogout} style={{ color:'#FE8C00',textDecoration: 'none', fontFamily:'sans-serif', fontWeight:'400', fontSize:'16px' }}>LogOut</Button>
      </div>
        </Card.Body>

      </Card>
      

    </div>
  )
}
