import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addCurrentUser } from 'storage/actions/actions.jsx';

import './sign-in.scss';
import Form from './form/form.jsx';

const SignIn = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.filmsGalleryStore);
  let history = useHistory();

  const addingCurrentUser = (users, { email }) => {
    const { name, access } = users.find((user) => email === user.email);
    
    dispatch(addCurrentUser({ name, access }));
    history.push('/');
  };

  return (
    <section className="sign-in">
      <h2 className="sign-in__title">Sign-In</h2>
      <hr className="sign-in__delimeter"/>
      <Form users={users} getSubmit={(values) => addingCurrentUser(users, values)}/>
    </section>
  );
};

export default SignIn;