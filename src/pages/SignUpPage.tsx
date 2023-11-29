// needs some finsihing
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { signup } from '../apis';

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


function SignUpPage() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordMatchError, setPasswordMatchError] = useState('');
  
  useEffect(() => {
    if (password == confirmPassword) {
      setPasswordMatchError('');
    } else {
      setPasswordMatchError('Passwords do not match');
    }
  },[confirmPassword]);
  const isFormComplete = () => {
    return (
      userName.trim() !== '' &&
      password.trim() !== '' &&
      confirmPassword.trim() !== ''
    );
  };
  
  const handleSignUp = async () => {
    if (isFormComplete()){
      setEmailError('');
      setPasswordMatchError('');
      const payload = {
        'username': userName,
        'password': password
      };

      const response = await signup(payload);

      const data = await response.json();

      if (response.status == 200) {
        window.sessionStorage.setItem('token', data.token);
        navigate('/');
      }
    }
    else {
      alert('Please fill in all the fields!');
    }
  };

  return (
    <Container>
      <Form>
        <Heading>Sign Up</Heading>
        {emailError && <Error>{emailError}</Error>}
        <br />
        <Label>Username:
          <Input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
        </Label>
        <br />
        <Label>Create Password:
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </Label>
        <br />
        <Label>Confirm Password:
          <Input 
            type="password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Label>
        {passwordMatchError && <Error>{passwordMatchError}</Error>}
        <br />
        <Button type="button" onClick={handleSignUp}>Done</Button>
      </Form>
    </Container>  
  );
}
  
export default SignUpPage;