import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, addCurrentUser } from 'storage/actions/actions.jsx';

import './registration.scss';
import Form from './form/form.jsx';

const Registration = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.filmsGalleryStore);
  let history = useHistory();

  const addingUser = (values) => {
    const user = {
      name: values.name,
      surname: values.surname,
      password: values.password,
      email: values.email,
      access: 'normal'
    };

    dispatch(addUser(user));
    dispatch(addCurrentUser({ name: user.name, access: user.access }));
    history.push('/');
  };

  return (
    <section className="registration">
      <h2 className="registration__title">Registration</h2>
      <hr className="registration__delimeter"/>
      <Form users={users} getSubmit={(values) => addingUser(values)}/>
    </section>
  );
};

export default Registration;