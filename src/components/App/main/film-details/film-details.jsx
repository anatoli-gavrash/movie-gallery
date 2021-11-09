import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import { addInBlacklist, showModalWindow } from 'storage/actions/actions';

import './film-details.scss';
import notFoundImage from 'assets/images/error__icon.svg';
import Utils from 'utils/utils.js';
import VoteForm from './vote-form/vote-form.jsx';
import ModalWindow from './modal-widow/modal-window.jsx';
import Spinner from 'components/reusable-components/spinner/spinner.jsx';

const FilmDetails = () => {
  const dispatch = useDispatch();
  let history = useHistory();
  const { pathname } = useLocation();
  const id = Number(pathname.split('/').pop());
  const { filmsList, filmGenres } = useSelector((state) => state.filmsGalleryStore);
  const { access } = useSelector((state) => state.filmsGalleryStore.appStatus.currentUser);

  const showModal = (show) => {
    dispatch(showModalWindow(show));
  };

  const deleteFilm = (id) => {
    dispatch(addInBlacklist(id));
    history.push('/');
  };

  const normalPage = (id, films, genresList) => {
    const film = Utils.findFilmInStore(Number(id), films);

    if (!film) {
      return (<Redirect to="/error404"/>);
    }

    const genres = Utils.findGenresInStore(film.genre_ids, genresList);
    const poster = film.poster_path ? `https://image.tmdb.org/t/p/w500${film.poster_path}` : notFoundImage;

    let ratingClassNames = 'film-details__text text-rating';
    if (film.vote_average * 10 >= 70) ratingClassNames += ' text-rating--green'
    else if (film.vote_average * 10 >= 50) ratingClassNames += ' text-rating--yellow'
    else if (film.vote_average * 10 >= 1) ratingClassNames += ' text-rating--red'

    return (
      <article className="film-details">
        <h2 className="film-details__title">Информация о фильме</h2>
          <div className="film-details__wrapper">
            <img className="film-details__poster" src={poster} alt={film.title}/>
            <button className={access === 'admin' 
                       ? 'film-details__button-edit show-button' 
                       : 'film-details__button-edit'}
                    onClick={() => showModal(true)}></button>
            <button className={access === 'admin' 
                               ? 'film-details__button-delete show-button' 
                               : 'film-details__button-delete'} 
                    onClick={() => deleteFilm(id)}></button>
          </div>
          <section className="film-details__block">
            <h3 className="film-details__title">{film.title}</h3>
            <div className="film-details__items-wrapper">
              <p className={ratingClassNames}>{`${film.vote_average * 10}%`}</p>
              <time className="film-details__date" dateTime={film.release_date}>{film.release_date}</time>
              <p className="film-details__text text-genres">{genres}</p>
            </div>
            <p className="film-details__text text-vote-count">Всего голосов: <span>{film.vote_count}</span></p>
            <p className="film-details__text text-popularity">Популярность: <span>{film.popularity}</span></p>
            <p className="film-details__text text-overview">Описание: <span>{film.overview}</span></p>
            <VoteForm film={film}/>
          </section>
          <ModalWindow
            showModal={(show) => showModal(show)}
            film={film}
          />
      </article>
    );
  };

  return (
    filmsList ? normalPage(id, filmsList, filmGenres) : <Spinner width="500" height="500"/>
  );
};

export default FilmDetails;