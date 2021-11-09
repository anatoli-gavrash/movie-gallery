import React from 'react';
import { Link } from 'react-router-dom';

import './home-link.scss';
import homeIcon from 'assets/images/home__icon.svg';

const HomeLink = () => {
  return (
    <Link className="navigation__home-link" to="/" >
      <img className="navigation__home-image" src={homeIcon} alt="Иконка дома"/>
    </Link>
  );
};

export default HomeLink;