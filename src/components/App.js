import { Container, Form } from "react-bootstrap";
import Signup from "./Signup";
import { AuthProvider } from "../contexts/AuthContexts";
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from "./Login";
import React, { useState } from 'react';
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import Clock from "./Clock";
import "./styles/App.css";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  const getBackgroundColor = () => {
    return isDarkMode ? "black" : "white";
  };

  const getTextColor = () => {
    return isDarkMode ? "white" : "black";
  };

  return (
    <AuthProvider>
      <div style={{ backgroundColor: getBackgroundColor(), color: getTextColor(), minHeight: "100vh" }}>
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
          <div className="w-100" style={{ maxWidth: "400px" }}>
            <Form>
              <Form.Check 
                type="switch"
                id="dark-mode-switch"
                checked={isDarkMode}
                onChange={toggleTheme}
                style={{ marginBottom: "7px" }}
              />
              <p>{`Toggle ${isDarkMode ? "Light" : "Dark"} Mode`}</p>
            </Form>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Login isDarkMode={isDarkMode} />} />
                <Route exact path="/clock" element={<PrivateRoute><Clock /></PrivateRoute>} />
                <Route path="/signup" element={<Signup isDarkMode={isDarkMode} />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
              </Routes>
            </BrowserRouter>
          </div>
        </Container>
      </div>
    </AuthProvider>
  );
}

export default App;
