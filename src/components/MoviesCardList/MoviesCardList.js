import React from 'react';
import {useLocation} from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import './MoviesCardList.css';
import {CurrentUserContext} from "../../context/CurrentUserContext";


const MoviesCardList = ({cards, isLoading, error, handleLoadMore, visibleMoviesCount, errorText, saveMovies, deleteMovieCard, savedMovie}) => {
    const location = useLocation();
    const currentUser = React.useContext(CurrentUserContext)
    // const isSaved = cards.forEach((i)=> i.id === i.movieId) || cards.some(i => i.owner._id === currentUser._id);
    // console.log(cards)
    // console.log(isSaved)
    // console.log(cards.forEach((i)=> console.log(i.id)))
    // console.log(isSaved)
    // console.log(savedMovie)
    return (
        <section className='movie-list'>
          {isLoading ? <Preloader/> : error ? 
          <p className='movie-list__error'>{errorText}</p> : <>
          <div className='movie-list__container'>
                {location.pathname==='/movies' && cards.slice(0, visibleMoviesCount).map((card) => (
                    <MoviesCard key={card.id} card={card} cards={cards} savedMovie={savedMovie} deleteMovieCard={deleteMovieCard} saveMovies={saveMovies}/>
                ))}
                {location.pathname==='/saved-movies' && cards.map((card) => (
                    <MoviesCard key={card.movieId} card={card} cards={cards} deleteMovieCard={deleteMovieCard} 
                     saveMovies={saveMovies} />
                ))
                }
            </div>
            {location.pathname==='/movies' &&  visibleMoviesCount < cards.length &&
            <button className='movie-list__button' onClick={handleLoadMore}>Ещё</button>
}
            </>}
        </section>
    );
};

export default MoviesCardList;
