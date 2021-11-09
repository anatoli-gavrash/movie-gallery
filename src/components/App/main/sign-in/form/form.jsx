import React from 'react';
import { Formik } from 'formik';

import './form.scss';
import Buttons from 'components/reusable-components/buttons/buttons.jsx';

const Form = (props) => {
  const { users, getSubmit } = props;

  const validate = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = 'Обязательное поле';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Шаблон e-mail: <examlpe@mail.ru>';
    } else if (!users.find((user) => values.email === user.email)) {
      errors.email = 'Такого пользователя нет в базе.';
    }

    if (!values.password) {
      errors.password = 'Обязательное поле';
    } else if (-1 !== users.findIndex((user) => values.email === user.email)) {
      if (values.password !== users[users.findIndex((user) => values.email === user.email)].password) {
        errors.password = 'Не верный пароль.';
      }
    }

    return errors;
  };

  return (
    <Formik
      initialValues={{email: '', password: ''}}
      validate={validate}
      onSubmit={(values) => getSubmit(values)}
    >
      {(formik) => (
        <form className="sign-in__form form-sign-in" 
                noValidate 
                onSubmit={formik.handleSubmit}>
          <div className="form-sign-in__item-wrapper">
            <label className="form-sign-in__label" htmlFor="email">E-Mail:</label>
            <input className="form-sign-in__input"
              type="email"
              id="email"
              { ...formik.getFieldProps('email') }
            />
            {formik.errors.email && formik.touched.email
              ? <label className="form-sign-in__label-error" 
                        htmlFor="email">{formik.errors.email}</label> 
              : null}
          </div>
          <div className="form-sign-in__item-wrapper">
            <label className="form-sign-in__label" htmlFor="password">Пароль:</label>
            <input className="form-sign-in__input"
              type="password"
              id="password"
              { ...formik.getFieldProps('password') }
            />
            {formik.errors.password && formik.touched.password
              ? <label className="form-sign-in__label-error" 
                        htmlFor="password">{formik.errors.password}</label> 
              : null}
          </div>
          <div className="form-sign-in__button-wrapper">
            <Buttons 
              className="button"
              type="submit"
              name="Submit"
            />
            <Buttons
              className="button-link"
              url="/registration"
              name="Registration"
            />
          </div>
        </form>
      )}
    </Formik>
  );
};

export default Form;