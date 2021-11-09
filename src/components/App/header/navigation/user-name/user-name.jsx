import React from 'react';

import './user-name.scss';
import accountIcon from 'assets/images/account__icon.svg';

const UserName = (props) => {

  return (
    <span className="navigation__user-name">
      <img className="navigation__user-picture" src={accountIcon} alt="Иконка пользователя"/>
      {props.userName}
    </span>
  );
};

export default UserName;