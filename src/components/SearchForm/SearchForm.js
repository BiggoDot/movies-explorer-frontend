import React from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

const SearchForm = () => {
    return (
        <section className='search'>
            <form className='search__form' name='search-bar'>
                <div className='search__container'>
                    <input className='search__input' type='text' placeholder='Фильм'/>
                    <button className='search__button' type='submit'></button>
                </div>
                <FilterCheckbox/>
            </form>
        </section>
    );
};

export default SearchForm;
