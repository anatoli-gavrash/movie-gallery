import React from 'react';
import { Formik } from 'formik';

import './form.scss';
import Buttons from 'components/reusable-components/buttons/buttons.jsx';

const Form = (props) => {
  const { users, getSubmit } = props;

  const validate = (values) => {
    const errors = {};

    if (!values.name) {
      errors.name = 'Обязательное поле.';
    } else if (values.name.length < 7) {
      errors.name = 'Имя должно быть больше 6 символов.';
    } else if (users.find((user) => values.name === user.name)) {
      errors.name = 'Такое имя уже есть в базе.';
    }

    if (!values.surname) {
      errors.surname = 'Обязательное поле.';
    } else if (values.surname.length < 7) {
      errors.surname = 'Фамилия должна быть больше 6 символов';
    }

    if (!values.password) {
      errors.password = 'Обязательное поле.';
    } else if (values.password.length < 7) {
      errors.password = 'Пароль должен быть больше 6 символов.';
    }

    if (!values.checkPassword) {
      errors.checkPassword = 'Обязательное поле.';
    } else if (values.checkPassword.length < 7) {
      errors.checkPassword = 'Пароль должен быть больше 6 символов.';
    } else if (values.password !== values.checkPassword) {
      errors.checkPassword = 'Пароли не совпадают.';
    }

    if (!values.email) {
      errors.email = 'Обязательное поле.';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Шаблон e-mail: <examlpe@mail.ru>';
    } else if (users.find((user) => values.email === user.email)) {
      errors.email = 'Такой e-mail уже есть.';
    }

    return errors;
  };

  return (
    <Formik
      initialValues={{
        name: '',
        surname: '',
        password: '',
        checkPassword: '',
        email: ''
      }}
      validate={validate}
      onSubmit={(values) => getSubmit(values)}
    >
      {(formik) => (
        <form className="registration__form form-registration" 
              autoComplete="off"
              noValidate
              onSubmit={formik.handleSubmit}
              onReset={formik.handleReset}>
          <div className="form-registration__item-wrapper">
            <label className="form-registration__label" htmlFor="name">Имя</label>
            <input className="form-registration__input"
              type="text"
              id="name"
              { ...formik.getFieldProps('name') }
            />
            {formik.errors.name && formik.touched.name
              ? <label className="form-registration__label-error" 
                        htmlFor="name">{formik.errors.name}</label> 
              : null}
          </div>
          <div className="form-registration__item-wrapper">
            <label className="form-registration__label" htmlFor="surname">Фамилия</label>
            <input className="form-registration__input"
              type="text"
              id="surname"
              { ...formik.getFieldProps('surname') }
            />
            {formik.errors.surname && formik.touched.surname
              ? <label className="form-registration__label-error" 
                        htmlFor="surname">{formik.errors.surname}</label> 
              : null}
          </div>
          <div className="form-registration__item-wrapper">
            <label className="form-registration__label" htmlFor="password">Пароль</label>
            <input className="form-registration__input"
              type="password"
              id="password"
              { ...formik.getFieldProps('password') }
            />
            {formik.errors.password && formik.touched.password
              ? <label className="form-registration__label-error" 
                        htmlFor="password">{formik.errors.password}</label> 
              : null}
          </div>
          <div className="form-registration__item-wrapper">
            <label className="form-registration__label" htmlFor="checkPassword">Повторите пароль</label>
            <input className="form-registration__input"
              type="password"
              id="checkPassword"
              { ...formik.getFieldProps('checkPassword') }
            />
            {formik.errors.checkPassword && formik.touched.checkPassword
              ? <label className="form-registration__label-error" 
                        htmlFor="checkPassword">{formik.errors.checkPassword}</label> 
              : null}
          </div>
          <div className="form-registration__item-wrapper">
            <label className="form-registration__label" htmlFor="email">E-Mail</label>
            <input className="form-registration__input"
              type="email"
              id="email"
              { ...formik.getFieldProps('email') }
            />
            {formik.errors.email && formik.touched.email
              ? <label className="form-registration__label-error" 
                        htmlFor="email">{formik.errors.email}</label> 
              : null}
          </div>
          <div className="form-registration__button-wrapper">
            <Buttons 
              className="button"
              type="submit"
              name="Submit"
            />
            <Buttons 
              className="button-alt"
              type="reset"
              name="Clear"
            />
          </div>
        </form>
      )}
    </Formik>
  );
};

export default Form;