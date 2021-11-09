const initialState = {
  filmsList: null,
  blacklist: null,
  filmGenres: undefined,
  users: null,
  appStatus: {
    language: 'ru-RU',
    sortingType: 'original_order.desc',
    page: 1,
    currentUser: {
      name: undefined,
      access: undefined
    },
    showModWin: false
  },
  refreshState: 0
};

export default initialState;