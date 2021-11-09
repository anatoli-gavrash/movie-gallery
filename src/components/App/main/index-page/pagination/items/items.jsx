import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './items.scss';

const Items = () => {
  const { pathname } = useLocation();
  const { number: page } = useParams();
  const { filmsList } = useSelector((store) => store.filmsGalleryStore);
  const length = filmsList ? filmsList.length : 1;
  
  const createItemsArray = (page, length) => {
    let array;
    
    if (length > 5) {
      if (page <= 3) {
        array = [1, 2, 3, '...', length];
      } else if ((length - page) <= 2) {
        array = [1, '...', length - 2, length - 1, length];
      } else {
        array = [1, '...', page, '...', length];
      }
    } else {
      array = [1, 2, 3, 4, 5];
    }

    return array;
  };

  const createItems = (page, length) => {
    return createItemsArray(page, length).map((value, index) => {
      const itemClassName = value === page ? 'pagination__item active' : 'pagination__item';
      
      return (
        <li className={itemClassName} key={'pag' + index}>
          <Link className="pagination__link" to={!isNaN(value) ? `/page/${value}` : pathname}>{value}</Link>
        </li>
      );
    });
  };

  return (
    <React.Fragment>
      <li className="pagination__item">
          <Link className="pagination__link" to={`/page/${+page > 1 ? +page - 1 : +page}`}>Prev</Link>
      </li>
      {createItems(+page, length)}
      <li className="pagination__item">
        <Link className="pagination__link" to={`/page/${+page < length ? +page + 1 : +page}`}>Next</Link>
      </li>
    </React.Fragment>
  );
};

export default Items;