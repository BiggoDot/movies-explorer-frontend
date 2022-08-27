import React, { useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './Movies.css';
import { saveMovie } from '../../utils/MainApi';
import { getMovies } from '../../utils/MoviesApi';
import { movieFilter } from '../../utils/filterMovies';

const Movies = ({ setSavedMovie, savedMovie, deleteMovieCard, setToolTip, submitButtonDisabled, setSubmitButtonDisabled }) => {
    const [movie, setMovie] = React.useState([]);
    const [film, setFilm] = React.useState(getSearchStoreValue());
    const [width, setWidth] = React.useState(window.innerWidth);
    const [visibleMoviesCount, setVisibleMoviesCount] = React.useState(getFirstRows(width));
    const moviesInLocal = JSON.parse(localStorage.getItem('allMovies'));
    const [checkShorts, setCheckShorts] = React.useState(JSON.parse(localStorage.getItem('checkBox')) || false);
    const [allMovies, setAllMovies] = React.useState(JSON.parse(localStorage.getItem('allMovies')) || []);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [errorText, setErrorText] = React.useState('');

    function saveMovies(movie) {
        setSubmitButtonDisabled(true)
        saveMovie(movie.country,
            movie.director,
            movie.duration,
            movie.year,
            movie.description,
            movie.image,
            movie.trailerLink,
            movie.nameRU,
            movie.nameEN,
            movie.thumbnail,
            movie.movieId)
            .then((res) => {
                setSavedMovie([res, ...savedMovie])
            })
            .catch((err) => setToolTip(true))
            .finally(() => setSubmitButtonDisabled(false))
    }

    useEffect(() => {
        function handleWindowSize() {
            setWidth(window.innerWidth);
        }
        window.addEventListener('resize', handleWindowSize)
        return () => window.removeEventListener('resize', handleWindowSize)
    }, [width])

    function getFirstRows(width) {
        if (width >= 1280) {
            return 12;
        }
        if (width >= 768) {
            return 8;
        }
        else {
            return 5;
        }
    }

    const getLoad = (width) => {
        if (width >= 1280) {
            return 3;
        }
        return 2;
    }

    function handleLoadMore() {
        return setVisibleMoviesCount((prevCount) => prevCount + getLoad(width))
    }

    useEffect(() => {
        setError(false)
        const moviesToDisplay = movieFilter(allMovies, film, checkShorts)
        localStorage.setItem('filteredMovies', JSON.stringify(moviesToDisplay))
        localStorage.setItem('checkBox', checkShorts);
        const filteredMoviesInLocal = JSON.parse(localStorage.getItem('filteredMovies')) || [];

        setMovie(filteredMoviesInLocal);
        if (filteredMoviesInLocal.length === 0 && film.length > 0) {
            setIsLoading(false);
            setErrorText('Ничего не найдено');
            return setError(true);
        }
    }, [allMovies, checkShorts])

    function showShortMovies() {
        setCheckShorts(!checkShorts)
    }

    function getSearchStoreValue() {
        const searchStoreValue = localStorage.getItem('filmSearch');
        if (!searchStoreValue) {
            return '';
        }
        return searchStoreValue;
    }

    function handleFilmChange(e) {
        setFilm(e.target.value)
    }

    function handleFilmSearch(e) {
        e.preventDefault();
        setError(false);
        setIsLoading(true);

        if (film === '') {
            setIsLoading(false);
            setErrorText('Нужно ввести ключевое слово');
            return setError(true);
        }
        if (!moviesInLocal) {
            getMovies()
                .then((res) => {
                    setIsLoading(false);
                    localStorage.setItem('allMovies', JSON.stringify(res));
                    setAllMovies(res);
                    localStorage.setItem('filmSearch', film);
                })
                .catch(() => {
                    setError(true);
                    setErrorText('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз')
                })
                .finally(() => {
                    setIsLoading(false)
                })
        }
        else {
            setAllMovies(moviesInLocal);
            setIsLoading(false);
            localStorage.setItem('filmSearch', film);
        }
    }

    return (
        <main className='movies'>
            <SearchForm handleFilmSearch={handleFilmSearch} handleFilmChange={handleFilmChange}
                film={film} showShortMovies={showShortMovies} checkShorts={checkShorts} />
            <MoviesCardList cards={movie} isLoading={isLoading} error={error}
                visibleMoviesCount={visibleMoviesCount} deleteMovieCard={deleteMovieCard} handleLoadMore={handleLoadMore}
                errorText={errorText} saveMovies={saveMovies} savedMovie={savedMovie}
                submitButtonDisabled={submitButtonDisabled} />
        </main>
    );
};

export default Movies;
