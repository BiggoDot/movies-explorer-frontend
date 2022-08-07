import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';


const MoviesCardList = ({cards}) => {
    return (
        <section className='movie-list'>
            <div className='movie-list__container'>
                {cards.map((card) => (
                    <MoviesCard key={card.id} card={card}/>
                ))}
            </div>
            <button className='movie-list__button'>Ещё</button>
        </section>
    );
};

export default MoviesCardList;
