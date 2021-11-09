import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFilm } from 'storage/actions/actions';
import { Formik, Field, ErrorMessage } from 'formik';

import './vote-form.scss';
import Buttons from 'components/reusable-components/buttons/buttons.jsx';

const VoteForm = ({ film }) => {
  const dispatch = useDispatch();
  const { access } = useSelector((state) => state.filmsGalleryStore.appStatus.currentUser);
  const { refreshState } = useSelector((state) => state.filmsGalleryStore);

  const validate = (values) => {
    const errors = {};

    if (!values.idVote) {
      errors.idVote = 'Обязательное поле';
    } else if (isNaN(values.idVote)) {
      errors.idVote = 'Должно быть число';
    } else if (values.idVote < 0.1 || values.idVote > 10) {
      errors.idVote = 'От 0.1 до 10';
    }

    return errors;
  };

  const votes = (values, film) => {
    const voteAverage = Number(film.vote_average);
    const voteCount = Number(film.vote_count);
    const voteValue = Number(values.idVote);

    const newVoteAverage = Number(((voteAverage * voteCount + voteValue) / (voteCount + 1)).toFixed(1));

    const newFilm = {
      id: film.id,
      title: film.title,
      overview: film.overview,
      poster_path: film.poster_path,
      popularity: Number(film.popularity),
      release_date: film.release_date,
      genre_ids: film.genre_ids.map((genre) => Number(genre)),
      vote_average: newVoteAverage,
      vote_count: voteCount + 1,
      adult: film.adult,
      new: false
    };
    
    let filmList = JSON.parse(localStorage.getItem('films'));    
    if (filmList) {
      if (film.new === undefined) {
        filmList.push(newFilm);
      } else {
        const index = filmList.findIndex((film) => film.id === newFilm.id);
        index !== -1 ? filmList[index] = newFilm : filmList.push(newFilm);
      }
    } else {
      filmList = [newFilm];
    }

    localStorage.setItem('films', JSON.stringify(filmList));
    dispatch(addFilm(refreshState + 1));
  };

  return (
    <Formik
      initialValues={{
        idVote: ''
      }}
      validate={validate}
      onSubmit={(values, { resetForm }) => {
        votes(values, film);
        resetForm({});
      }}
    >
      {(formik) => (
        <form className={access === 'admin' || access === 'normal' 
                         ? 'film-details__form form-vote film-details__form--show' 
                         : 'film-details__form form-vote'}
              autoComplete="off"
              noValidate
              onSubmit={formik.handleSubmit}>
          <div className="form-vote__item-wrapper">
            <label className="form-vote__label" htmlFor="idVote">Оцените фильм:</label>
            <Field 
              className="form-vote__input"
              type="text"
              name="idVote"
            />
            <ErrorMessage 
              component="label"
              className="form-vote__label-error"
              name="idVote"
              htmlFor="idVote"
            />
          </div>
          <Buttons 
            className={'button'}
            type='submit'
            name='Оценить'
          />
        </form>
      )}
    </Formik>
  );
};

export default VoteForm;