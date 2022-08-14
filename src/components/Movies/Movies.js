import React, {useEffect} from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './Movies.css';
import { saveMovie } from '../../utils/MainApi'; 
import { getMovies } from '../../utils/MoviesApi';

const Movies = ({setSavedMovie, savedMovie, deleteMovieCard}) => {
    const [movie, setMovie] = React.useState([]);
    const [film, setFilm] = React.useState(getSearchStoreValue());
    const [width, setWidth] = React.useState(window.innerWidth);
    const [visibleMoviesCount, setVisibleMoviesCount] = React.useState(getFirstRows(width));
    const moviesInLocal = JSON.parse(localStorage.getItem('allMovies'));
    const filteredMoviesInLocal = JSON.parse(localStorage.getItem('filteredMovies'))|| [];
    const [checkShorts, setCheckShorts] = React.useState(JSON.parse(localStorage.getItem('checkBox')) || false);
    const [allMovies, setAllMovies] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] =React.useState(false);
    const [errorText, setErrorText] = React.useState('');
    const [firstSearch, setFirstSearch] = React.useState(false);
    // const [startSearch, setStartSearch] = React.useState(false);
    // console.log(moviesInLocal)

    function showShortMovies() {
        setCheckShorts(!checkShorts)
        movieFilter()
        localStorage.setItem('filmSearch', film);

    }
    //  useEffect(() => {
    //     if(!moviesInLocal){
    //         console.log('moviesInLocal')
    //     getMovies()
    //         .then((res) => {
    //             setIsLoading(false);
    //                 setAllMovies(res);
    //                 localStorage.setItem('allMovies', JSON.stringify(res));
    //                 movieFilter()
    //         })
    //         .catch(() => {
    //             setError(true);
    //             setErrorText('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз')
    //         })
    //         .finally(() => {setIsLoading(false)
    //             })
    //         }
    // }, [film])

//    console.log(allMovies)

    function saveMovies(movie) {
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
        .catch((err) => console.log(err))
    }


    useEffect(() => {
        function handleWindowSize() {
            setWidth(window.innerWidth);
        }
        window.addEventListener('resize', handleWindowSize) 
        return () => window.removeEventListener('resize', handleWindowSize)
    }, [width])

    function getFirstRows (width) {
        if (width >= 1280) {
           return 12;
        }
        if(width >= 768) {
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

//    localStorage.setItem('shortFilteredMovies', filteredMoviesInLocal.filter((movieCard)=>{
//     return movieCard.duration <= 40;
//    }))
function movieFilter() {
    // console.log(1)
     localStorage.setItem('filteredMovies', JSON.stringify(allMovies.filter((movieCard) => {
       return movieCard.nameRU.toLowerCase().includes(film.toLowerCase()) && (checkShorts ? movieCard.duration <= 40 : movieCard.duration > 40)})));
return JSON.parse(localStorage.getItem('filteredMovies'))
}
// console.log(allMovies)
useEffect(() => {
    movieFilter()
    setMovie(filteredMoviesInLocal); 
    // console.log(filteredMoviesInLocal)

}, [firstSearch])

    useEffect(() => {
        localStorage.setItem('checkBox', checkShorts)
        // movieFilter()
        setMovie(filteredMoviesInLocal); 
        // console.log(2)
    
        // showShortMovies()
    // console.log(filteredMoviesInLocal.length)

        if(filteredMoviesInLocal.length === 0 && film.length > 0) {
            setIsLoading(false);
            setErrorText('Ничего не найдено');
            return setError(true);
        }    
       
    }, [allMovies, checkShorts])
    

    // useEffect(() => {
        // localStorage.setItem('checkBox', checkShorts)
        // movieFilter()
        // setMovie(filteredMoviesInLocal)

    // },[checkShorts])

    
//    console.log(checkSorts)


    function getSearchStoreValue () {
        const searchStoreValue = localStorage.getItem('filmSearch');
        if(!searchStoreValue) {
            return '';
        }
        return searchStoreValue;
    }

    function handleFilmChange (e) {
        setFilm(e.target.value)
    }
    
    
    

    function handleFilmSearch (e) {
        e.preventDefault();
        setError(false);
        setIsLoading(true);
          
        if (film === '') {
            setIsLoading(false);
            setErrorText('Нужно ввести ключевое слово');
            return setError(true);
        }
        if(!moviesInLocal){
        getMovies()
            .then((res) => {
                setIsLoading(false);
                    localStorage.setItem('allMovies', JSON.stringify(res));
                    setAllMovies(res);
                    setFirstSearch(true)
                    // movieFilter()
                    // setMovie(filteredMoviesInLocal)
                    // console.log(localStorage.getItem('allMovies'))
            })
            .catch(() => {
                setError(true);
                setErrorText('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз')
            })
            .finally(() => {setIsLoading(false)
                // movieFilter()
                // setAllMovies(JSON.parse(localStorage.getItem('allMovies')));
                })
            }
        else{
            setFirstSearch(false)
            setAllMovies(moviesInLocal);
            movieFilter()
            setIsLoading(false);
            localStorage.setItem('filmSearch', film);
        }
    
    }
    // localStorage.clear()

    function handleLoadMore () {
        return setVisibleMoviesCount((prevCount) => prevCount + getLoad(width))
    }

    return (
        <main className='movies'>
            <SearchForm handleFilmSearch={handleFilmSearch} handleFilmChange={handleFilmChange} 
            film={film} showShortMovies={showShortMovies} checkShorts={checkShorts}/>
            <MoviesCardList cards={movie} isLoading={isLoading} error={error} 
            visibleMoviesCount={visibleMoviesCount} deleteMovieCard={deleteMovieCard} handleLoadMore={handleLoadMore}
            errorText={errorText} saveMovies={saveMovies} savedMovie={savedMovie}/>
        </main>
    );
};

export default Movies;
