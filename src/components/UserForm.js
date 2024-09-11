import React, { useContext, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { userContextApi } from '../context/UserContext';

const UserForm = () => {
  const { userState, dispatch, handleSubmit } = useContext(userContextApi);
  useEffect(() => {
    console.log('Useeffe', userState);
  }, [userState]);

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formName">
        <Form.Label>Full Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Your name"
          value={userState.userField.name}
          name="name"
          onChange={(e) =>
            dispatch({
              type: 'CHANGE_INPUT',
              payload: { name: e.target.name, value: e.target.value }
            })
          }
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          name="email"
          placeholder="Enter email"
          value={userState.userField.email}
          onChange={(e) =>
            dispatch({
              type: 'CHANGE_INPUT',
              payload: { name: e.target.name, value: e.target.value }
            })
          }
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPhone">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control
          type="text"
          name="phone"
          placeholder="Your phone number"
          value={userState.userField.phone}
          onChange={(e) =>
            dispatch({
              type: 'CHANGE_INPUT',
              payload: { name: e.target.name, value: e.target.value }
            })
          }
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default UserForm;
