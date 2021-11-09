import React from 'react';

import './pagination.scss';
import Items from './items/items.jsx';

const Pagination = () => {
  return (
    <ul className="gallery__pagination pagination">
      <Items />
    </ul>
  );
};

export default Pagination;