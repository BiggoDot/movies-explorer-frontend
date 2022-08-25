import React from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

const SearchForm = ({ handleFilmSearch, handleFilmChange, film, showShortMovies, checkShorts }) => {
    return (
        <section className='search'>
            <form className='search__form' name='search-bar' onSubmit={handleFilmSearch} noValidate>
                <div className='search__container'>
                    <input className='search__input' type='text' value={film || ''}
                        onChange={handleFilmChange} placeholder='Фильм' required />
                    <button className='search__button' type='submit'></button>
                </div>
                <FilterCheckbox showShortMovies={showShortMovies} checkShorts={checkShorts} />
            </form>
        </section>
    );
};

export default SearchForm;
