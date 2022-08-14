import React, {useEffect} from 'react';
import {Route, Routes, useNavigate, Navigate} from 'react-router-dom';
import './App.css';
import {register, authorize, checkToken} from '../../utils/MainApi';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import {useLocation} from 'react-router-dom';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from "../Register/Register";
import Login from "../Login/Login";
import PageNotFound from "../PageNotFound/PageNotFound";
import Profile from "../Profile/Profile";
import {getProfile, editProfile, deleteMovie, getSavedMovie} from "../../utils/MainApi";
import {CurrentUserContext} from "../../context/CurrentUserContext";
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import { getMovies } from '../../utils/MoviesApi';

function App() {
    const navigate = useNavigate();
    const [isHeader, setIsHeader] = React.useState(false);
    const [isFooter, setIsFooter] = React.useState(false);
    const [currentUser, setCurrentUser] = React.useState({});
    const [logError, setLogError] = React.useState(false);
    const [userInformation, setUserInformation] = React.useState({email: '', name: ''});
    let location = useLocation();
    // const [allMovies, setAllMovies] = React.useState([]);
    // const [isLoading, setIsLoading] = React.useState(false);
    // const [error, setError] =React.useState(false);
    // const [errorText, setErrorText] = React.useState('');
    const [savedMovie, setSavedMovie] = React.useState([]);

    useEffect(() => {
        if(localStorage.getItem('jwt')){
        getSavedMovie()
        .then((res) => {
            setSavedMovie(res.filter((i) => i.owner._id === currentUser._id))
        })
        .catch((err) => console.log(err))
    }
    }, [currentUser])
    
    // PATHS
    useEffect(() => {
        if (location.pathname === '/' || location.pathname === '/movies' || location.pathname === '/profile'
            || location.pathname === '/saved-movies' || location.pathname === '/signin' || location.pathname === '/signup') {
            setIsHeader(true);
        } else {
            setIsHeader(false);
        }
    }, [location, isHeader]);

    useEffect(() => {
        if (location.pathname === '/' || location.pathname === '/movies' || location.pathname === '/saved-movies') {
            setIsFooter(true);
        } else {
            setIsFooter(false);
        }
    }, [location, isHeader]);

    // LOGIIN
    // React.useEffect(() => {
    //     handleCheckToken();
    //     if (localStorage.getItem('jwt')) {
    //         // navigate('/');
    //         console.log(1)
    //         Promise.all([getProfile(), getMovies()])
    //             .then(([userInformation, movieInformation]) => {
    //                 setCurrentUser(userInformation);
    //                 setIsLoading(false);
    //                 setAllMovies(movieInformation);
    //                 localStorage.setItem('allMovies', JSON.stringify(movieInformation));
    //             })
    //             .catch((err) => {
    //                 console.log(err)
    //                 setError(true);
    //                 setErrorText('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз')
    //             })
    //             .finally(() => {setIsLoading(false)
    //             })
    //     }
    // }, [localStorage.getItem('jwt')])

    React.useEffect(() => {
        handleCheckToken();
        if (localStorage.getItem('jwt')) {
            // navigate('/');
            Promise.all([getProfile()])
                .then(([userInformation]) => {
                    setCurrentUser(userInformation);
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }, [localStorage.getItem('jwt')])

    function handleEditProfile (name, email) {
        editProfile(name, email)
        .then((res) => {
            setCurrentUser(res)
        })
        .catch((err) => console.log(err))
        }

        function deleteMovieCard(movie) {
            deleteMovie(movie._id)
            .then((res) =>{
                setSavedMovie((state) => state.filter((c) => c._id !== movie._id))
               
            })
            .catch((err) => console.log(err))

        }

    // useEffect(() => {
        // getMovies()
    //         .then((res) => {
    //             setIsLoading(false);
    //                 setAllMovies(res);
    //                 localStorage.setItem('allMovies', JSON.stringify(res));
    //         })
    //         .catch(() => {
    //             setError(true);
    //             setErrorText('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз')
    //         })
    //         .finally(() => {setIsLoading(false)
    //             })
    // }, [localStorage.getItem('jwt')])

    function handleRegisterSubmit(password, email, name) {
        register(password, email, name)
            .then((res) => {
                if (res) {
                    navigate('/signin');
                    setLogError(false);
                }
            })
            .catch(() => setLogError(true))
    }


    function handleLoginSubmit(email, password) {
        // console.log(email)
        authorize(email, password)
            .then((res) => {
                if (res) {
                    localStorage.setItem('jwt', res.token);
                    navigate('/movies');
                }
            })
            .catch(() => {
                setLogError(true);
            })
    }

    function handleCheckToken() {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            checkToken(jwt)
                .then((res) => {
                    if (res) {
                        console.log('success')
                    }
                })
                .catch((err) => console.log(err))
        }
    }

    function handleLogout() {
        localStorage.clear();
        navigate('/signin');
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
        <div className='app'>
            {isHeader && <Header/>}
            <Routes>
            <Route path='/signup' element={!localStorage.getItem('jwt') ? <Register handleRegisterSubmit={handleRegisterSubmit} logError={logError}/> : <Navigate replace to='/movies'/>}/>
                <Route path='/signin' element={!localStorage.getItem('jwt') ? <Login handleLoginSubmit={handleLoginSubmit} logError={logError} setLogError={setLogError}/> : <Navigate replace to='/movies'/>}/>
                <Route path='/' element={<Main/>}/>
            <Route element={<ProtectedRoute
                    ></ProtectedRoute>}>
                         <Route path='/movies' element={<Movies setSavedMovie={setSavedMovie} 
                        savedMovie={savedMovie} deleteMovieCard={deleteMovieCard}/>}/>
                         <Route path='/saved-movies' element={<SavedMovies savedMovie={savedMovie} deleteMovieCard={deleteMovieCard}/>}/>
                         <Route path='/profile' element={<Profile handleLogout={handleLogout} handleEditProfile={handleEditProfile}/>}/>
                    </Route>
                <Route path='*' element={<PageNotFound/>}/>
            </Routes>
            {isFooter && <Footer/>}
        </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
