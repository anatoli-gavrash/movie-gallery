import React from 'react';

import './header.scss';
import Navigation from './navigation/navigation.jsx';

const Header = () => {
  return (
    <header className="header">
      <h1 className="header__title">Video Gallery</h1>
      <Navigation />
    </header>
  );
}

export default Header;