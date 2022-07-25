import React from 'react';
import {Link} from "react-router-dom";
import './PageNotFound.css';

const PageNotFound = () => {
    return (
        <section className='no-page'>
            <h2 className='no-page__title'>404</h2>
            <p className='no-page__text'>Страница не найдена</p>
            <Link className='no-page__link' replace to={-1}>Назад</Link>
        </section>
    );
};

export default PageNotFound;
