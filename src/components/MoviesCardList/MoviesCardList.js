import React from 'react';
import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import './MoviesCardList.css';


const MoviesCardList = ({ cards, isLoading, error, handleLoadMore, visibleMoviesCount, errorText, saveMovies, deleteMovieCard, savedMovie, submitButtonDisabled }) => {
    const location = useLocation();

    return (
        <section className='movie-list'>
            {isLoading ? <Preloader /> : error ?
                <p className='movie-list__error'>{errorText}</p> : <>
                    <div className='movie-list__container'>
                        {location.pathname === '/movies' && cards.slice(0, visibleMoviesCount).map((card) => (
                            <MoviesCard key={card.id} card={card} savedMovie={savedMovie}
                                deleteMovieCard={deleteMovieCard} saveMovies={saveMovies}
                                submitButtonDisabled={submitButtonDisabled} />
                        ))}
                        {location.pathname === '/saved-movies' && cards.map((card) => (
                            <MoviesCard key={card.movieId} card={card} deleteMovieCard={deleteMovieCard}
                                saveMovies={saveMovies} submitButtonDisabled={submitButtonDisabled} />
                        ))
                        }
                    </div>
                    {location.pathname === '/movies' && visibleMoviesCount < cards.length &&
                        <button className='movie-list__button' onClick={handleLoadMore}>Ещё</button>
                    }
                </>}
        </section>
    );
};

export default MoviesCardList;
