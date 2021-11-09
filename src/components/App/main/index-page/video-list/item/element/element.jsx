import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addInBlacklist } from 'storage/actions/actions.jsx';

import './element.scss';
import notFound from 'assets/images/error__icon.svg';

const Element = (props) => {
  const dispatch = useDispatch();
  const { access } = useSelector((state) => state.filmsGalleryStore.appStatus.currentUser);
  const { id, title, release } = props;
  const rating = props.rating * 10;
  const posterPath = props.poster ? `https://image.tmdb.org/t/p/w500${props.poster}` : notFound;

  let ratingClassNames = 'video-list__rating';
  if (rating >= 70) ratingClassNames += ' video-list__rating--green'
  else if (rating >= 50) ratingClassNames += ' video-list__rating--yellow'
  else if (rating >= 1) ratingClassNames += ' video-list__rating--red'

  const deleteFilm = () => {
    dispatch(addInBlacklist(props.id));
  };

  return (
    <div className="video-list__details-wrapper" tabIndex="0">
      <Link className="video-list__link" to={`/filmdetails/${props.id}`}>
        <img className="video-list__film-poster" src={posterPath} id={id} alt={`Постер фильма: ${title}`}/>
      </Link>
      <span className={ratingClassNames}>{`${rating}%`}</span>
      <span className={props.new ? 'video-list__new-icon video-list__new-icon--show' : 'video-list__new-icon'}>New</span>
      <button className={access === 'admin' ? 'video-list__button-delete show-button-delete' : 'video-list__button-delete'} onClick={deleteFilm}></button>
      <span className={props.new === true || props.new === false ? 'video-list__admin-film-icon video-list__admin-film-icon--show' : 'video-list__admin-film-icon'}>A</span>
      <time className="video-list__release-date" dateTime={release}>{release}</time>
    </div>
  );
};

export default Element;