import React from 'react';
import { Link } from 'react-router-dom';

import './buttons.scss';

export default function Buttons(props) {
  if (props.className === 'button-link') {
    return (
      <Link className={props.className} to={props.url}>{props.name}</Link>
    );
  }

  return (
    <button className={props.className} type={props.type} onClick={props.click}>{props.name}</button>
  );
}