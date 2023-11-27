// needs some finsihing
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import validator from 'validator';
import { getProfile, updateProfile } from '../apis';

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



function UpdateProfilePage() {
  const navigate = useNavigate();
  const [github, setGithub] = useState('');
  const [username, setUserName] = useState('');
  
  const handleUpdateClick = async () => {
    const response = await updateProfile({github, username});
    if (response.ok) {
      navigate('/my-profile');
    }
  };

  const loadProfile = async () => {
    const response = await getProfile();
    const json_data = await response.json();
    if (response.ok) {
      setGithub(json_data.github);
      setUserName(json_data.displayName);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  return (
    <Container>
      <Form>
        <Heading>Update Profile</Heading>
        <Label>Username:
          <Input 
            type="text" 
            value={username} 
            onChange={(e) => setUserName(e.target.value)} 
          />
        </Label>
        <br />
        <Label>Github:
          <Input 
            type="text" 
            value={github} 
            onChange={(e) => setGithub(e.target.value)}
          />
        </Label>
        <br />
        <Button type="button" onClick={handleUpdateClick}>Update</Button>
      </Form>
    </Container>  
  );
}
  
export default UpdateProfilePage;