import React from 'react';
import { ErrorMessage, Field, Formik } from 'formik';

import './form.scss';
import Options from './options/options.jsx';
import Buttons from 'components/reusable-components/buttons/buttons.jsx';

const Form = (props) => {
  const { getSubmit, film } = props;

  let initialValues = {
    title: '',
    overview: '',
    poster: '',
    popularity: '',
    releaseDate: '',
    voteAverage: '',
    voteCount: '',
    genres: [],
    adult: false
  }

  if (film) {
    console.log(film);
    initialValues = {
      title: film.title,
      overview: film.overview,
      poster: film.poster_path.split('/').pop(),
      popularity: film.popularity,
      releaseDate: film.release_date,
      voteAverage: film.vote_average,
      voteCount: film.vote_count,
      genres: film.genre_ids,
      adult: film.adult
    }
  }
  
  const validate = (values) => {
    const errors = {};

    if (!values.title) {
      errors.title = 'Обязательное поле';
    } else if (values.title.length < 3) {
      errors.title = 'Минимум 3 символа';
    }

    if (!values.overview) {
      errors.overview = 'Обязательное поле';
    } else if (values.overview.length < 6 || values.overview.length > 150) {
      errors.overview = 'От 6 до 150 символов';
    }

    if (!values.poster) {
      errors.poster = 'Обязательное поле';
    }

    if (!values.popularity) {
      errors.popularity = 'Обязательное поле';
    } else if (isNaN(values.popularity)) {
      errors.popularity = 'Должно быть число';
    }

    if (!values.releaseDate) {
      errors.releaseDate = 'Обязательное поле';
    }

    if (!values.voteAverage) {
      errors.voteAverage = 'Обязательное поле';
    } else if (isNaN(values.voteAverage)) {
      errors.voteAverage = 'Должно быть число';
    }

    if (!values.voteCount) {
      errors.voteCount = 'Обязательное поле';
    } else if (isNaN(values.voteCount)) {
      errors.voteCount = 'Должно быть число';
    }

    if (values.genres.length === 0) {
      errors.genres = 'Обязательное поле';
    }

    return errors;
  }

  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={(values, { resetForm }) => {
        getSubmit(values);
        resetForm({});
      }}
    >
      {(formik) => (
        <form className="add-film__form form-add-film"
              autoComplete="off"
              noValidate
              onSubmit={formik.handleSubmit}
              onReset={formik.handleReset}>
          <div className="form-add-film__item-wrapper">
            <label className="form-add-film__label" htmlFor="title">Заголовок</label>
            <Field 
              className="form-add-film__input"
              type="text"
              name="title"
            />
            <ErrorMessage 
              component="label"
              className="form-add-film__label-error"
              name="title"
              htmlFor="title"
            />
          </div>
          <div className="form-add-film__item-wrapper">
            <label className="form-add-film__label" htmlFor="overview">Описание</label>
            <Field 
              className="form-add-film__textarea"
              as="textarea"
              name="overview"
            />
            <ErrorMessage 
              component="label" 
              className="form-add-film__label-error" 
              name="overview"
              htmlFor="overview" 
            />
          </div>
          <div className="form-add-film__item-wrapper">
            <label className="form-add-film__label" htmlFor="poster">Постер</label>
            <Field 
              className="form-add-film__input"
              type="text"
              name="poster"
            />
            <ErrorMessage 
              component="label" 
              className="form-add-film__label-error" 
              name="poster"
              htmlFor="poster" 
            />
          </div>
          <div className="form-add-film__item-wrapper">
            <label className="form-add-film__label" htmlFor="popularity">Популярность</label>
            <Field 
              className="form-add-film__input"
              type="text"
              name="popularity"
            />
            <ErrorMessage 
              component="label" 
              className="form-add-film__label-error" 
              name="popularity"
              htmlFor="popularity" 
            />
          </div>
          <div className="form-add-film__item-wrapper">
            <label className="form-add-film__label" htmlFor="release-date">Дата релиза</label>
            <Field 
              className="form-add-film__input"
              type="date"
              name="releaseDate"
            />
            <ErrorMessage 
              component="label" 
              className="form-add-film__label-error" 
              name="releaseDate"
              htmlFor="releaseDate" 
            />
          </div>
          <div className="form-add-film__item-wrapper">
            <label className="form-add-film__label" htmlFor="voteAverage">Средний рейтинг</label>
            <Field 
              className="form-add-film__input"
              type="text"
              name="voteAverage"
            />
            <ErrorMessage 
              component="label" 
              className="form-add-film__label-error" 
              name="voteAverage"
              htmlFor="voteAverage" 
            />
          </div>
          <div className="form-add-film__item-wrapper">
            <label className="form-add-film__label" htmlFor="voteCount">Количество голосов</label>
            <Field 
              className="form-add-film__input"
              type="text"
              name="voteCount"
            />
            <ErrorMessage 
              component="label" 
              className="form-add-film__label-error" 
              name="voteCount"
              htmlFor="voteCount" 
            />
          </div>
          <div className="form-add-film__item-wrapper">
            <label className="form-add-film__label" htmlFor="genres">Жанры</label>
            <Field 
              className="form-add-film__select-list"
              as="select"
              name="genres"
              multiple
            >
              <Options />
            </Field>
            <ErrorMessage 
              component="label" 
              className="form-add-film__label-error" 
              name="genres"
              htmlFor="genres" 
            />
          </div>
          <div className="form-add-film__item-wrapper">
            <label className="form-add-film__label" htmlFor="adult">18+:</label>
            <Field 
              className="form-add-film__checkbox"
              type="checkbox"
              name="adult"
            />
          </div>
          <div className="form-add-film__button-wrapper">
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