import React, { memo } from 'react';

import './item.scss';
import Element from './element/element.jsx';

const Item = (props) => {
  return (
    <li className="video-list__item">
      <Element 
        id={props.id}
        title={props.title}
        poster={props.poster}
        rating={props.rating}
        release={props.release}
        new={props.new}
      />
      <h3 className="video-list__title">{props.title}</h3>
    </li>
  );
};

export default memo(Item);