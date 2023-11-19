// needs some finsihing
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import validator from 'validator';

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


function UpdateProfilePage() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('first');
  const [lastName, setLastName] = useState('last');
  const [email, setEmail] = useState('email@email.com');
  const [userName, setUserName] = useState('username');
  const [emailError, setEmailError] = useState('');
  
  const getProfile = async () => {
    const userId = window.sessionStorage.getItem('userid');

    const response = await fetch('http://localhost:8000/api/get_user/'+userId, {
      method: 'GET',
      headers: {
        'Content-Type':  'application/json',
      },
      mode:'cors'
    });
    
    const res = await response.json();
    console.log(res);
    setFirstName(res.first_name);
    setLastName(res.last_name);
    setUserName(res.username);
    setEmail(res.email);
  };

  const updateProfile = async () => {
    const userId = window.sessionStorage.getItem('userid');

    const payload = {
      'first_name': firstName,
      'last_name': lastName,
      'username': userName,
      'email': email
    };
    
    const response = await fetch('http://localhost:8000/api/update_user/'+userId, {
      method: 'POST',
      headers: {
        'Content-Type':  'application/json',
      },
      body: JSON.stringify(payload),
      mode:'cors'
    });
    
    const data = await response.json();
    if (response.status == 200) {
      window.sessionStorage.setItem('token', data.token);
      navigate('/profile');
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const isFormComplete = () => {
    return (
      firstName.trim() !== '' &&
      lastName.trim() !== '' &&
      validator.isEmail(email) &&
      userName.trim() !== ''
    );
  };
  
  const handleUpdate = () => {
    if (isFormComplete()){
      setEmailError('');
      navigate('/');
    }
    else {
      alert('Please fill in all the fields!');
    }
  };

  return (
    <Container>
      <Form>
        <Heading>Update Profile</Heading>
        <Label>First Name:
          <Input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </Label>
        <br />
        <Label>Last Name:
          <Input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </Label>
        <br />
        <Label>Email:
          <Input 
            type="text" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            onBlur={() => {
              if (!validator.isEmail(email)) {
                setEmailError('Invalid Email');
              } else {
                setEmailError('');
              }
            }} />
        </Label>
        {emailError && <Error>{emailError}</Error>}
        <br />
        <Label>Username:
          <Input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
        </Label>
        <br />
        <Button type="button" onClick={updateProfile}>Update</Button>
      </Form>
    </Container>  
  );
}
  
export default UpdateProfilePage;