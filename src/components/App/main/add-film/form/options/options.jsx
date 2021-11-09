import React from 'react';
import { useSelector } from 'react-redux';

import './options.scss';

const Options = () => {
  const genres = useSelector((state) => state.filmsGalleryStore.filmGenres);

  const creatingGenresList = (genres) => {
    return genres.map((genre) => {
      return (
        <option className="form-add-film__select-item" key={genre.id} value={genre.id}>{genre.name}</option>
      );
    });
  };

  return ( genres !== undefined ? creatingGenresList(genres) : null );
};

export default Options;