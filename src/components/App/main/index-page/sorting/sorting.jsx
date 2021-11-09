import React from 'react';
import { useDispatch } from 'react-redux';
import { sortChange } from 'storage/actions/actions.jsx';
import { Formik, Field } from 'formik';

import './sorting.scss';
import Options from './options/options.jsx';
import AddFilmButton from './add-film-button/add-film-button.jsx';

const Sorting = () => {
  const dispatch = useDispatch();

  const sortMonitor = (event) => {
    dispatch(sortChange(event.target.value));
  };

  return (
    <Formik>
      {(formik) => (
        <form className="gallery__sorting sorting"
              onSubmit={formik.handleSubmit}>
          <Field 
              className="sorting__items"
              as="select"
              name="sorting"
              onChange={sortMonitor}
          >
            <Options />
          </Field>
          <AddFilmButton />
        </form>
      )}
    </Formik>
  );
};

export default Sorting;