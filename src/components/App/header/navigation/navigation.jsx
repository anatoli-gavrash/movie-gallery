import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCurrentUser } from 'storage/actions/actions.jsx';

import './navigation.scss';
import Buttons from 'components/reusable-components/buttons/buttons.jsx';
import UserName from './user-name/user-name.jsx';
import HomeLink from './home-link/home-link.jsx';

const Navigation = () => {
  const dispatch = useDispatch();
  const { name , access } = useSelector((state) => state.filmsGalleryStore.appStatus.currentUser);
  
  function logout() {
    dispatch(addCurrentUser({ name: '', access: '' }));
  }

  return (
    <nav className="header__navigation navigation">
      <HomeLink />
      <UserName userName={name}/>
      <Buttons
        className={!access ? 'button-link' : 'button-link button-disable'}
        url='/signin'
        name='Sign In/Sign Up'
      />
      <Buttons 
        className={access ? 'button-alt' : 'button-link button-disable'}
        type='button'
        name='Log Out'
        click={logout}
      />
    </nav>
  );
}

export default Navigation;