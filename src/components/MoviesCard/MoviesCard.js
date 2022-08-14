import React from 'react';
import {useLocation} from 'react-router-dom';
import './MoviesCard.css';
import done from '../../images/done.svg';
import cross from '../../images/cross.svg';
import {CurrentUserContext} from "../../context/CurrentUserContext";

const MoviesCard = ({card, saveMovies, deleteMovieCard, cards, savedMovie}) => {
    const location = useLocation();
    const currentUser = React.useContext(CurrentUserContext)
    const filteredMoviesInLocal = JSON.parse(localStorage.getItem('filteredMovies'))|| [];
    const isSaved = card.id ?  savedMovie.map((i)=>i.movieId).includes(card.id) 
    : location.pathname==='/saved-movies' ? true : '';
    // const isSaved = savedMovie.map((i)=>i.movieId).includes(card.id) ? true : location.pathname==='/saved-movies' ? true : false;
    // console.log(isSaved)
    
function handleDelete() {
    if(location.pathname === '/saved-movies'){
        deleteMovieCard(card)
    }
    if(location.pathname === '/movies')
    deleteMovieCard(savedMovie.find((i) => i.movieId===card.id))
}

// console.log(savedMovie.find((i) => savedMovie.filter((i) => i.movieId===card.id)))
    function handleSave() {
        // setIsSaved(!isSaved);
        saveMovies({country: card.country,
            director: card.director,
            duration: card.duration,
            year: card.year,
            description: card.description,
            image: `https://api.nomoreparties.co/${card.image.url}`,
            trailerLink: card.trailerLink,
            nameRU: card.nameRU,
            nameEN: card.nameEN,
            thumbnail:  `https://api.nomoreparties.co/${card.image.formats.thumbnail.url}`,
            movieId: card.id,})
    }
    

    return (
        <div className='movie-card' key={card.id || card.movieId}>
            <div className='movie-card__text-container'>
                <h2 className='movie-card__title'>{card.nameRU}</h2>
                <p className='movie-card__time'>{card.duration} минут</p>
            </div>
            <a href={card.trailerLink} target='_blank'><img className='movie-card__image' src={location.pathname === '/saved-movies' ? `${card.image}` : `https://api.nomoreparties.co${card.image.url}`} alt='movie poster'/></a>
            {location.pathname === '/saved-movies' &&
                <button className='movie-card__button' onClick={isSaved ? handleDelete : handleSave}><img className='movie-card__button-img' alt='delete movie icon'
                                                                                 src={cross}/></button>}
            {location.pathname === '/movies' &&
                <button className={isSaved ? 'movie-card__button movie-card__button_red' : 'movie-card__button'}
                        onClick={isSaved ? handleDelete : handleSave}>{isSaved ? <img className='movie-card__button-img' alt='saved movie icon' src={done}/> :
                    <p className='movie-card__button-text'>Сохранить</p>}</button>}
        </div>
    );
};

export default MoviesCard;

