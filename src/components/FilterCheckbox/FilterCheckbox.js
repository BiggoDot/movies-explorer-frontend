import './FilterCheckbox.css';
import React from 'react';

const FilterCheckbox = ({showShortMovies, checkShorts}) => {
    return (<>
            <div className='filter'>
                <label className="filter__container">
                    <input type='checkbox' name='checkbox' className="filter__checkbox" value={checkShorts} defaultChecked={checkShorts} onChange={showShortMovies}/>
                    <span className="filter__slider"></span>
                </label>
                <p className='filter__text'>Короткометражки</p>
            </div>
        </>
    );
};

export default FilterCheckbox;
