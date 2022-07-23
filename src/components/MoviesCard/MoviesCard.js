import React from 'react';
import {useLocation} from 'react-router-dom';
import './MoviesCard.css';
import done from '../../images/done.svg';
import cross from '../../images/cross.svg';


const MoviesCard = ({card}) => {
    const location = useLocation();
    const [isSaved, setIsSaved] = React.useState(false);


    function handleSave() {
        setIsSaved(!isSaved);
    }

    return (
        <div className='movie-card'>
            <div className='movie-card__text-container'>
                <h2 className='movie-card__title'>{card.name}</h2>
                <p className='movie-card__time'>{card.time}</p>
            </div>
            <img className='movie-card__image' src={card.image}/>
            {location.pathname === '/saved-movies' &&
                <button className='movie-card__button' onClick={handleSave}><img className='movie-card__button-img'
                                                                                 src={cross}/></button>}
            {location.pathname === '/movies' &&
                <button className={isSaved ? 'movie-card__button movie-card__button_red' : 'movie-card__button'}
                        onClick={handleSave}>{isSaved ? <img className='movie-card__button-img' src={done}/> :
                    <p className='movie-card__button-text'>Сохранить</p>}</button>}
        </div>
    );
};

export default MoviesCard;

