import initialState from '../initial-state.jsx';
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

const filmGalleryReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_IN_BLACKLIST:
      return {
        ...state,
        blacklist: [
          ...state.blacklist,
          action.payload
        ]
      };
    case ADD_BLACKLIST:
      return {
        ...state,
        blacklist: action.payload
      };
    case ADD_USER:
      return {
        ...state,
        users: [
          ...state.users,
          action.payload
        ]
      };
    case ADD_USERS:
      return {
        ...state,
        users: action.payload
      };
    case ADD_CURRENT_USER:
      return {
        ...state,
        appStatus: {
          ...state.appStatus,
          currentUser: action.payload
        }
      };
    case ADD_FILM:
      return {
        ...state,
        refreshState: action.payload
      };
    case ADD_FILMS:
      return {
        ...state,
        filmsList: action.payload
      };
    case ADD_GENRES:
      return {
        ...state,
        filmGenres: action.payload
      };
    case SORT_CHANGE:
      return {
        ...state,
        appStatus: {
          ...state.appStatus,
          sortingType: action.payload
        }
      };
    case SHOW_MODAL_WINDOW:
      return {
        ...state,
        appStatus: {
          ...state.appStatus,
          showModWin: action.payload
        }
      };
    default:
      return state;
  }
};

export default filmGalleryReducer;