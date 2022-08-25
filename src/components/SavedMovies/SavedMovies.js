import React, { useEffect } from 'react';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import '../Movies/Movies.css';
import { movieFilter } from '../../utils/filterMovies';


const SavedMovies = ({ savedMovie, deleteMovieCard, isLoading, submitButtonDisabled }) => {
    const [film, setFilm] = React.useState('');
    const [searchResult, setSearchResult] = React.useState([]);
    const [checkShorts, setCheckShorts] = React.useState(false);
    const [doSearch, setDoSearch] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [errorText, setErrorText] = React.useState('');

    useEffect(() => {
        if (savedMovie.length > 0) {
            setSearchResult(savedMovie)
        }
    }, [savedMovie])

    useEffect(() => {
        if (savedMovie.length === 0) {
            setSearchResult(savedMovie)
        }
    }, [deleteMovieCard])

    useEffect(() => {
        const filteredMovies = movieFilter(savedMovie, film, checkShorts)
        setSearchResult(filteredMovies)
        setDoSearch(false)
        setError(false)

        if (filteredMovies.length === 0 && film.length > 0) {
            setErrorText('Ничего не найдено');
            return setError(true);
        }
    }, [doSearch, checkShorts])

    function showShortMovies() {
        setCheckShorts(!checkShorts)
    }

    function handleFilmSearch(e) {
        e.preventDefault();
        if (film === '') {
            setErrorText('Нужно ввести ключевое слово');
            return setError(true);
        }
        else {
            setDoSearch(true)
        }
    }

    function handleFilmChange(e) {
        setFilm(e.target.value)
    }

    return (
        <main className='movies'>
            <SearchForm film={film} handleFilmChange={handleFilmChange} showShortMovies={showShortMovies}
                handleFilmSearch={handleFilmSearch} checkShorts={checkShorts} />
            <MoviesCardList cards={searchResult} deleteMovieCard={deleteMovieCard} isLoading={isLoading}
                error={error} errorText={errorText} submitButtonDisabled={submitButtonDisabled} />
        </main>
    );
};

export default SavedMovies;
