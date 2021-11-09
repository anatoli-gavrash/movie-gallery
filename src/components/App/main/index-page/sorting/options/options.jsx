import React from 'react';

import './options.scss';

const Options = () => {
  const sortItems = [
    {
      value: 'original_order.desc',
      name: 'По добавлению в БД (\u{1F817})'
    },
    {
      value: 'primary_release_date.desc',
      name: 'По дате (\u{1F817})'
    },
    {
      value: 'primary_release_date.asc',
      name: 'По дате (\u{1F815})'
    },
    {
      value: 'vote_average.desc',
      name: 'По рейтингу (\u{1F817})'
    },
    {
      value: 'vote_average.asc',
      name: 'По рейтингу (\u{1F815})'
    },
  ];
  
  const creatingItems = (items) => {
    return items.map((item, index) => {
      return (
        <option className="sorting__item" value={item.value} key={`si-${index}`}>{item.name}</option>
      );
    });
  };
  
  return (
    creatingItems(sortItems)
  );
};

export default Options;