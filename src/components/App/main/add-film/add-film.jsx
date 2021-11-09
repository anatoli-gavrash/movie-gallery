import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { customAlphabet } from 'nanoid';
import { addFilm } from 'storage/actions/actions';

import './add-film.scss';
import Spinner from 'components/reusable-components/spinner/spinner.jsx';
import Form from './form/form.jsx';

const AddFilm = () => {
  const dispatch = useDispatch();
  const { refreshState } = useSelector((state) => state.filmsGalleryStore);
  const { access } = useSelector((state) => state.filmsGalleryStore.appStatus.currentUser);
  const nanoid = customAlphabet('1234567890', 10);

  const addingFilm = (values) => {
    const newFilm = {
      id: Number(nanoid()),
      title: values.title,
      overview: values.overview,
      poster_path: `/${values.poster}`,
      popularity: Number(values.popularity),
      release_date: values.releaseDate,
      genre_ids: values.genres.map((genre) => Number(genre)),
      vote_average: Number(values.voteAverage),
      vote_count: Number(values.voteCount),
      adult: values.adult,
      new: true
    };

    let filmList = JSON.parse(localStorage.getItem('films'));
    filmList ? filmList.push(newFilm) : filmList = [newFilm];
    localStorage.setItem('films', JSON.stringify(filmList));

    dispatch(addFilm(refreshState + 1));
  };

  return (
    access !== undefined
    ? access === 'admin'
      ? <section className="add-film">
          <h2 className="add-film__title">Add Film</h2>
          <hr className="add-film__delimeter"/>
          <Form getSubmit={(values) => addingFilm(values)}/>
        </section>
      : <Redirect to="/error404" />
    : <Spinner width="300" height="300"/>
  );
};

export default AddFilm;