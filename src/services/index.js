import jsonFilms from 'dummy_data/films.json';
import jsonUsers from 'dummy_data/users.json';

export default class FilmGalleryApiService {
  #baseUrlOfMyList = 'https://api.themoviedb.org/4/list/7095546?';
  #genresUrl = 'https://api.themoviedb.org/3/genre/movie/list?';
  #imageUrl = 'https://image.tmdb.org/t/p/w500';
  #apiKey = 'api_key=96f5267da6e441141dfe8db15267079b';
  #language = '&language=';
  #sortBy = '&sort_by=';
  #page = '&page=';

  #getLocalData = (array, jsonArray, comparisonValue) => {    
    if (array) {
      let result = [ ...jsonArray ];

      array.forEach((arrayElement) => {
        const index = result.findIndex((resultElement) => resultElement[comparisonValue] === arrayElement[comparisonValue]);
        if (index !== -1) {
          result[index] = arrayElement;
        } else {
          result.push(arrayElement);
        }
      });

      return result;
    }

    return jsonArray;
  };

  getUsers = () => {
    const users = JSON.parse(localStorage.getItem('users'));
    return this.#getLocalData(users, jsonUsers.users, 'email');
  };

  getCurrentUser = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser ? currentUser : { name: '', access: '' };
  };

  #getFilms = () => {
    const films = JSON.parse(localStorage.getItem('films'));
    return this.#getLocalData(films, jsonFilms.filmsList, 'id');
  };

  getApiData = async (url) => {
    const request = await fetch(url);
    if (!request.ok) {
      throw new Error(`url: ${url}, error code: ${request.status}`);
    }

    return await request.json();
  };

  getBlacklist = () => {
    const blacklist = JSON.parse(localStorage.getItem('blacklist'));
    return blacklist ? [ ...new Set(blacklist) ] : [];
  };

  #checkInBlacklist = (filmsArray) => {
    const blacklist = this.getBlacklist();
    let newArray = [ ...filmsArray ];

    if (blacklist) {
      blacklist.forEach((id) => {
        newArray.forEach((film, index) => {
          if (film.id === id) {
            newArray.splice(index, 1);
          }
        });
      });
    }
    
    return newArray;
  };

  #getApiFilms = async (lang, sort, maxPage, firstPage = 1) => {
    const url = this.#baseUrlOfMyList +
                this.#apiKey +
                this.#language + lang +
                this.#sortBy + sort +
                this.#page;
    let filmsArray = [];
    let first = firstPage;
    let max = maxPage;
    
    do {
      let arrayOfRequest = [];
      for (let i = first; i <= max; i++) {
        arrayOfRequest.push(this.getApiData(url + i).then(resp => resp.results));
      }

      // Изначально делал декларативным способом через forEach
      // но реакт ругался на "небезопасное" использование массива fimsArray
      const pages = await Promise.all(arrayOfRequest);
      for (let i = 0; i < pages.length; i++) {
        for (let j = 0; j < pages[i].length; j++) {
          if (filmsArray.length < maxPage * 20) {
            filmsArray.push(pages[i][j]);
          }
        }
      }
      
      filmsArray = this.#checkInBlacklist(filmsArray);

      first = max + 1;
      max += 5;

    } while (filmsArray.length < maxPage * 20);

    return filmsArray;
  };

  #removeDuplicateFilms = (localFilms, apiFilms) => {
    let newLocalFilmsList = [];
    let newApiFilmsList = [ ...apiFilms ];

    for (let i = 0; i < localFilms.length; i++) {
      if (i === 0) {
        newLocalFilmsList.push(localFilms[i]);
      } else if (-1 === newLocalFilmsList.findIndex((film) => film.id === localFilms[i].id)) {
        newLocalFilmsList.push(localFilms[i]);
      }
    }

    newLocalFilmsList.forEach((localFilm) => 
      newApiFilmsList.forEach((apiFilm, index) => {
          if (apiFilm.id === localFilm.id) {
            newApiFilmsList.splice(index, 1);
          }
        })
      );

    return [ ...newLocalFilmsList, ...newApiFilmsList ];
  };

  #sortFilms = (localFilms, apiFilms, sortType, maxPage) => {
    let newFilms = this.#removeDuplicateFilms(localFilms, apiFilms);

    switch(sortType) {
      case 'original_order.desc':
        break;
      case 'primary_release_date.desc':
        newFilms.sort((filmA, filmB) => new Date(filmB.release_date) - new Date(filmA.release_date));
        break;
      case 'primary_release_date.asc':
        newFilms.sort((filmA, filmB) => new Date(filmA.release_date) - new Date(filmB.release_date));
        break;
      case 'vote_average.desc':
        newFilms.sort((filmA, filmB) => filmB.vote_average - filmA.vote_average);
        break;
      case 'vote_average.asc':
        newFilms.sort((filmA, filmB) => filmA.vote_average - filmB.vote_average);
        break;
      default:
    }

    newFilms.sort((filmA, filmB) => filmA.new ? -1 : filmB.new ? 1 : 0);

    if (newFilms.length > maxPage * 20) {
      newFilms = newFilms.slice(0, maxPage * 20);
    }

    return newFilms;
  };

  #paginateList = (list) => {
    let newList = [];
    let page = []
    
    list.forEach((film, index) => {
      page.push(film);

      if ((index + 1) % 20 === 0 || index + 1 === list.length) {
        newList.push(page);
        page = [];
      }
    });
    
    return newList;
  };

  getFilmPages = async (lang = 'ru-RU', sort = 'original_order.desc', maxPage = 15) => {
    const apiFilms = await this.#getApiFilms(lang, sort, maxPage);
    const localFilms = this.#checkInBlacklist(this.#getFilms());
    const sortFilmList = this.#sortFilms(localFilms, apiFilms, sort, maxPage);

    return this.#paginateList(sortFilmList);
  };

  getGenres = (lang = 'ru-RU') => {
    return this.getApiData(this.#genresUrl +
                           this.#apiKey +
                           this.#language + lang);
  };

  getImage = (posterName) => {
    return this.getApiData(this.#imageUrl + posterName);
  };
}