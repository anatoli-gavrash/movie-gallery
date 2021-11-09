import { createStore, combineReducers } from 'redux';
import filmsGalleryReducer from './reducers/films-gallery-reducer.jsx';

const rootReducer = combineReducers({
  filmsGalleryStore: filmsGalleryReducer,
});

const storage = createStore(
  rootReducer
);

export default storage;