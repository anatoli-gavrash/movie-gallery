import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFilm } from 'storage/actions/actions';

import './modal-window.scss';
import EditForm from 'components/App/main/add-film/form/form.jsx';

const ModalWindow = (props) => {
  const dispatch = useDispatch();
  const { showModal, film } = props;
  const { refreshState } = useSelector((state) => state.filmsGalleryStore);
  const { showModWin } = useSelector((state) => state.filmsGalleryStore.appStatus);

  const addingFilm = (values, id) => {
    const newFilm = {
      id: id,
      title: values.title,
      overview: values.overview,
      poster_path: `/${values.poster}`,
      popularity: Number(values.popularity),
      release_date: values.releaseDate,
      genre_ids: values.genres.map((genre) => Number(genre)),
      vote_average: Number(values.voteAverage),
      vote_count: Number(values.voteCount),
      adult: values.adult,
      new: false
    };

    let filmList = JSON.parse(localStorage.getItem('films'));
    if (filmList) {
      const index = filmList.findIndex((film) => film.id === newFilm.id);
      index !== -1 ? filmList[index] = newFilm : filmList.push(newFilm);
    } else {
      filmList = [newFilm];
    }
    localStorage.setItem('films', JSON.stringify(filmList));

    dispatch(addFilm(refreshState + 1));
    showModal(false);
  }

  return (
    <div className={showModWin ? "film-details__modal-window modal modal--show" : "film-details__modal-window modal"}>
      <div className="modal__form-wrapper">
        <h2 className="modal__title">Edit Film</h2>
        <button className="modal__close-button" onClick={() => showModal(false)}></button>
        <hr className="modal__delimeter"/>
        <EditForm 
          getSubmit={(values) => addingFilm(values, film.id)}
          film={film}
        />
      </div>
    </div>
  );
};

export default ModalWindow;