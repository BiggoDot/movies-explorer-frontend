import React from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';
import done from '../../images/done.svg';
import cross from '../../images/cross.svg';

const MoviesCard = ({ card, saveMovies, deleteMovieCard, savedMovie, submitButtonDisabled }) => {
    const location = useLocation();
    const isSaved = card.id ? savedMovie.map((i) => i.movieId).includes(card.id)
        : location.pathname === '/saved-movies' ? true : '';

    function handleDelete() {
        if (location.pathname === '/saved-movies') {
            deleteMovieCard(card)
        }
        if (location.pathname === '/movies')
            deleteMovieCard(savedMovie.find((i) => i.movieId === card.id))
    }

    function handleSave() {
        saveMovies({
            country: card.country,
            director: card.director,
            duration: card.duration,
            year: card.year,
            description: card.description,
            image: `https://api.nomoreparties.co/${card.image.url}`,
            trailerLink: card.trailerLink,
            nameRU: card.nameRU,
            nameEN: card.nameEN,
            thumbnail: `https://api.nomoreparties.co/${card.image.formats.thumbnail.url}`,
            movieId: card.id,
        })
    }

    function convertHoursAndMinutes() {
        const minutes = card.duration % 60;
        const hours = Math.floor(card.duration / 60);

        if (hours === 0) {
            return `${card.duration} минут`
        }
        return `${hours}ч ${minutes}м`;
    }

    return (
        <div className='movie-card' key={card.id || card.movieId}>
            <div className='movie-card__text-container'>
                <h2 className='movie-card__title'>{card.nameRU}</h2>
                <p className='movie-card__time'>{convertHoursAndMinutes()}</p>
            </div>
            <a href={card.trailerLink} className='movie-card__link' target='_blank'>
                <img className='movie-card__image' src={location.pathname === '/saved-movies' ? `${card.image}` : `https://api.nomoreparties.co${card.image.url}`} alt='movie poster' />
            </a>
            {location.pathname === '/saved-movies' &&
                <button className='movie-card__button' onClick={handleDelete} disabled={submitButtonDisabled ? true : false}>
                    <img className='movie-card__button-img' alt='delete movie icon' src={cross} />
                </button>}
            {location.pathname === '/movies' &&
                <button className={isSaved ? 'movie-card__button movie-card__button_red' : 'movie-card__button'}
                    onClick={isSaved ? handleDelete : handleSave} disabled={submitButtonDisabled ? true : false}>{isSaved ? <img className='movie-card__button-img' alt='saved movie icon' src={done} /> :
                        <p className='movie-card__button-text'>Сохранить</p>}</button>}
        </div>
    );
};

export default MoviesCard;
