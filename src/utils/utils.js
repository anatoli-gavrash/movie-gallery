export default class Utils {
  static findFilmInStore = (id, filmsArrayList) => {
    let result = false;

    filmsArrayList.forEach((filmsArray) => {
      filmsArray.forEach((film) => {
        if (film.id === id) {
          result = film;
        }
      });
    });
    
    return result;
  };

  static findGenresInStore = (idArray, genresList) => {
    let result = [];

    idArray.forEach((id) => {
      genresList.forEach((listId) => {
        if (id === listId.id) {
          result.push(listId.name);
        }
      });
    });

    return result.map((element) => element[0].toUpperCase() + element.slice(1)).join(', ');
  };
}