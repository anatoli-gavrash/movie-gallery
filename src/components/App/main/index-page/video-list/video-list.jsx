import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import './video-list.scss';
import Item from './item/item.jsx';

const VideoList = () => {
  const { filmsList } = useSelector((state) => state.filmsGalleryStore);
  const params = useParams();
  const length = filmsList ? filmsList.length : 1;
  const page = params.number && params.number <= length ? params.number : 1;
  

  const createElements = (films) => {
    return films.map((film) => {
      return (
        <Item 
          key={film.id}
          id={film.id}
          title={film.title}
          poster={film.poster_path}
          rating={film.vote_average}
          release={film.release_date}
          new={film.new}
        />
      );
    });
  };

  return (
    <ul className="gallery__video-list video-list">
      {filmsList ? createElements(filmsList[page - 1]) : null}
    </ul>
  );
};

export default VideoList;