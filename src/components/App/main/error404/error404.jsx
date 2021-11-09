import React from 'react';
import './error404.scss';
import error404 from 'assets/images/error_404.png';

const Error404 = () => {
  return (
    <div className="error">
      <img className="error__404" src={error404} alt="Ошибка 404"/>
    </div>
  );
};

export default Error404;