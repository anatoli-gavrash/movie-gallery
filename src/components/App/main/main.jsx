import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import IndexPage from './index-page/index-page.jsx';
import AddFilm from './add-film/add-film.jsx';
import FilmDetails from './film-details/film-details.jsx';
import Registration from './registration/registration.jsx';
import SignIn from './sign-in/sign-in.jsx';
import Error404 from './error404/error404.jsx';

import './main.scss';

const Main = () => {
  return (
    <main className="main">
      <Switch>
        <Route path='/' exact>
          <Redirect to='/page/1' />
        </Route>
        <Route path='/page/:number' exact>
          <IndexPage />
        </Route>
        <Route path='/addfilm' exact>
          <AddFilm />
        </Route>
        <Route path='/filmdetails/:id' exact>
          <FilmDetails />
        </Route>
        <Route path='/registration' exact>
          <Registration />
        </Route>
        <Route path='/signin' exact>
          <SignIn />
        </Route>
        <Route path='/error404' exact>
          <Error404 />
        </Route>
        <Redirect to='/error404' />
      </Switch>
    </main>
  );
};

export default Main;