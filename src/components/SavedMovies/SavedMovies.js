import React, { useEffect } from 'react';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import '../Movies/Movies.css';
import { getSavedMovie } from '../../utils/MainApi';


const SavedMovies = ({savedMovie, deleteMovieCard}) => {
    const [film, setFilm] = React.useState('');
    // const [savedMovie, setSavedMovie] = React.useState([]);

    // useEffect(() => {
    //     getSavedMovie()
    //     .then((res) => {
    //         setSavedMovie(res)
    //     })
    //     .catch((err) => console.log(err))

    // }, [])

    function handleFilmChange (e) {
        setFilm(e.target.value)
    }

    return (
        <main className='movies'>
            <SearchForm film={film} handleFilmChange={handleFilmChange}/>
            <MoviesCardList cards={savedMovie} deleteMovieCard={deleteMovieCard}/>
        </main>
    );
};

export default SavedMovies;
