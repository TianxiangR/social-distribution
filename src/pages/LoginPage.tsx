import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import config from '../config';
import { setTokenToCookie } from '../apis';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  margin-right: 160px;
`;

const Form = styled.form`
  width: 300px;
  padding: 20px;
  margin: 0 auto;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  background-color: #fff;
`;

const Heading = styled.h1`
  text-align: center;
`;

const Label = styled.label`
  display: block;
  margin: 10px 0;
  font-weight: bold;
`;

const Input = styled.input`
  width: 90%;
  padding: 7px;
  margin: 0 auto;
  border: 2px solid #ccc;
  border-radius: 7px;
  font-size: 14px;
  margin-top: 5px;
`;

const Button = styled.button`
  width: 100%;
  padding: 11px;
  background-color: #0074d9;
  color: #fff;
  border: none;
  border-radius: 7px;
  cursor: pointer;
  transition: background-color 0.2s;
  font-size: 16px;

  &:hover {
    background-color: #0056b3;
  }
`;

const Error = styled.p`
  color: red;
  margin-top: 10px;
`;

const SignUpLink = styled.p`
  text-align: center;
  margin-top: 20px;
`;

const Span = styled.p`
  color: #0074d9; 
  text-decoration: underline;
  cursor: pointer;
`;


function LoginPage() {
  const baseUrl = config.backendUrl;

  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleLogin = async () => {
    // if (username === 'user@example.com' && password === 'password') {
    //   setUsernameError(''); 
    //   setPasswordError(''); 
    //   navigate('/home');
    // } else if(username === 'user@example.com' && password !== 'password'){
    //   setPasswordError('Invalid password. Please try again.');
    // } else if(username !== 'user@example.com' && password === 'password'){
    //   setUsernameError('Invalid email. Please try again.');
    // }
    const payload = {
      'username': username,
      'password': password
    };

    const response = await fetch(baseUrl + '/api/login/', {
      method: 'POST',
      headers: {
        'Content-Type':  'application/json'
      },
      body: JSON.stringify(payload),
    });
    
    const data =await response.json();
    
    if (response.status == 200) {
      setTokenToCookie(data.token);
      window.sessionStorage.setItem('userid', data.user_id);
      navigate('/');
    } else {
      setPasswordError('Invalid username or password. Please try again.');
    }
  };

  return (
    <Container>
      <Form>
        <Heading>Login</Heading>
        <Label>Username:
          <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} data-testid="input-username"/>
        </Label>
        {usernameError && <Error>{usernameError}</Error>}
        <br />
        <Label>Password:
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} data-testid="input-password"/>
        </Label>
        {passwordError && <Error>{passwordError}</Error>}
        <br />
        <Button type="button" onClick={handleLogin} data-testid="button-login">Login</Button>
      </Form>
      <SignUpLink>
        Do not have an account yet? <Span onClick={() => navigate('/signup')}>Create Now</Span>.
      </SignUpLink>
    </Container>  
  );
}
  
export default LoginPage;