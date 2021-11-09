import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './add-film-button.scss';
import addIcon from 'assets/images/add__icon.svg';

const AddFilmButton = () => {
  const { access } = useSelector((state) => state.filmsGalleryStore.appStatus.currentUser);

  return (
    <Link className={access === 'admin' ? "sorting__add-link" : "sorting__add-link sorting__add-link-disable"} to="/addfilm">
      <img className="sorting__image" src={addIcon} alt="Кнопка добавления фильма"/>
    </Link>
  );
};

export default AddFilmButton;