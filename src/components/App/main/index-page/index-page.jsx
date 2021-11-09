import React from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './index-page.scss';
import Sorting from './sorting/sorting.jsx';
import Pagination from './pagination/pagination.jsx';
import VideoList from './video-list/video-list.jsx';
import Spinner from 'components/reusable-components/spinner/spinner.jsx';

const IndexPage = () => {
  const { filmsList } = useSelector((state) => state.filmsGalleryStore);
  const { pathname } = useLocation();
  const currentPage = pathname.split('/').pop();

  const normalPage = () => {
    return (
      <section className="gallery">
        <h2 className="gallery__title">Video List</h2>
        <Sorting />
        <Pagination />
        <VideoList />
        <Pagination />
      </section>
    );
  };

  const pageSelection = (filmList, currentPage) => {
    if (filmList) {
      return currentPage > 0 && currentPage <= filmList.length ? normalPage() : <Redirect to='/error404' />
    }

    return <Spinner width="500" height="500"/>;
  }

  return (
    pageSelection(filmsList, currentPage)
  );
};

export default IndexPage;