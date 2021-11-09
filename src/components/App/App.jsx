import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBlacklist, addUsers, addCurrentUser, addFilms, addGenres } from 'storage/actions/actions.jsx';

import 'assets/stylesheets/normalize.css';
import 'assets/stylesheets/fonts.scss';
import './App.scss';

import FilmGalleryApiService from 'services';
import Header from './header/header.jsx';
import Main from './main/main.jsx';

const filmGalleryApi = new FilmGalleryApiService();

const App = () => {
  const dispatch = useDispatch();
  const { language, sortingType, currentUser } = useSelector((state) => state.filmsGalleryStore.appStatus);
  const { blacklist, users, refreshState } = useSelector((state) => state.filmsGalleryStore);

  useEffect(() => {
    filmGalleryApi.getFilmPages(language, sortingType)
      .then((body) => dispatch(addFilms(body)));
  }, [dispatch, blacklist, refreshState, language, sortingType, currentUser]);

  useEffect(() => {
    if (!blacklist) {
      dispatch(addBlacklist(filmGalleryApi.getBlacklist()));
    } else {
      localStorage.setItem('blacklist', JSON.stringify(blacklist));
    }
  }, [dispatch, blacklist]);

  useEffect(() => {
    filmGalleryApi.getGenres(language)
      .then((body) => dispatch(addGenres(body.genres)));
  }, [dispatch, language]);

  useEffect(() => {
    if (!users) {
      dispatch(addUsers(filmGalleryApi.getUsers()));
    } else {
      localStorage.setItem('users', JSON.stringify(users));
    }
  }, [dispatch, users]);

  useEffect(() => {
    if (currentUser.name === undefined) {
      dispatch(addCurrentUser(filmGalleryApi.getCurrentUser()));
    } else {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
  }, [dispatch, currentUser]);  

  return (
    <React.Fragment>
      <Header />
      <Main />
    </React.Fragment>
  );
}

export default App;