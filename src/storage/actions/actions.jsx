import { ADD_IN_BLACKLIST,
         ADD_BLACKLIST,
         ADD_USER,
         ADD_USERS,
         ADD_CURRENT_USER,
         ADD_FILM, 
         ADD_FILMS, 
         ADD_GENRES, 
         SORT_CHANGE,
         SHOW_MODAL_WINDOW } from '../constants/constants.jsx';

export const addInBlacklist = (value) => {
  return {
    type: ADD_IN_BLACKLIST,
    payload: value
  };
};

export const addBlacklist = (value) => {
  return {
    type: ADD_BLACKLIST,
    payload: value
  };
};

export const addUser = (value) => {
  return {
    type: ADD_USER,
    payload: value
  };
};

export const addUsers = (value) => {
  return {
    type: ADD_USERS,
    payload: value
  };
};

export const addCurrentUser = (value) => {
  return {
    type: ADD_CURRENT_USER,
    payload: value
  };
};

export const addFilm = (value) => {
  return {
    type: ADD_FILM,
    payload: value
  };
};

export const addFilms = (value) => {
  return {
    type: ADD_FILMS,
    payload: value
  };
};

export const addGenres = (value) => {
  return {
    type: ADD_GENRES,
    payload: value
  };
};

export const sortChange = (value) => {
  return {
    type: SORT_CHANGE,
    payload: value
  };
};

export const showModalWindow = (value) => {
  return {
    type: SHOW_MODAL_WINDOW,
    payload: value
  };
};