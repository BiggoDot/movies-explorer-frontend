import React, { useEffect } from 'react';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import './App.css';
import { register, authorize, checkToken } from '../../utils/MainApi';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import { useLocation } from 'react-router-dom';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from "../Register/Register";
import Login from "../Login/Login";
import PageNotFound from "../PageNotFound/PageNotFound";
import Profile from "../Profile/Profile";
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import { getProfile, editProfile, deleteMovie, getSavedMovie } from "../../utils/MainApi";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

function App() {
    const navigate = useNavigate();
    const [isHeader, setIsHeader] = React.useState(false);
    const [isFooter, setIsFooter] = React.useState(false);
    const [currentUser, setCurrentUser] = React.useState({});
    const [logError, setLogError] = React.useState(false);
    const [logErrText, setLogErrText] = React.useState('');
    const [profileError, setProfileError] = React.useState(false);
    const [profileErrText, setProfileErrText] = React.useState('');
    let location = useLocation();
    const [savedMovie, setSavedMovie] = React.useState([]);
    const [submitButtonDisabled, setSubmitButtonDisabled] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [toolTip, setToolTip] = React.useState(false);

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

    // LOGIIN EFFECT
    React.useEffect(() => {
        handleCheckToken();
        if (localStorage.getItem('jwt')) {
            Promise.all([getProfile()])
                .then(([userInformation]) => {
                    setCurrentUser(userInformation);
                })
                .catch((err) => {
                    setToolTip(true)
                })
        }
    }, [localStorage.getItem('jwt')])

    // GETTING SAVED MOVIES EFFECT
    useEffect(() => {
        setIsLoading(true)
        if (localStorage.getItem('jwt')) {
            getSavedMovie()
                .then((res) => {
                    setSavedMovie(res.filter((i) => i.owner._id === currentUser._id))
                })
                .catch((err) => console.log(err))
                .finally(() => { setIsLoading(false) })
        }
    }, [currentUser])

    function handleEditProfile(name, email) {
        setSubmitButtonDisabled(true)
        editProfile(name, email)
            .then((res) => {
                setCurrentUser(res)
                setProfileError(true);
                setProfileErrText('Ваши данные успешно изменены');
            })
            .catch((err) => {
                if (err === 409) {
                    setProfileError(true);
                    setProfileErrText('Юзер с таким имейлом уже существует');
                }
                if (err === 500) {
                    setProfileError(true);
                    setProfileErrText('Ошибка сервера');
                }
            })
            .finally(() => setSubmitButtonDisabled(false))
    }

    function deleteMovieCard(movie) {
        setSubmitButtonDisabled(true)
        deleteMovie(movie._id)
            .then((res) => {
                setSavedMovie((state) => state.filter((c) => c._id !== movie._id))
            })
            .catch((err) => setToolTip(true))
            .finally(() => setSubmitButtonDisabled(false))
    }

    function handleRegisterSubmit(password, email, name) {
        setSubmitButtonDisabled(true);
        register(password, email, name)
            .then((res) => {
                if (res) {
                    setLogError(false);
                    setCurrentUser(res)
                    handleLoginSubmit(email, password);
                }
            })
            .catch((err) => {
                if (err === 401) {
                    setLogError(true);
                    setLogErrText('не верный email или пароль');
                }
                if (err === 409) {
                    setLogError(true);
                    setLogErrText('Юзер с таким имейлом уже существует');
                }
                if (err === 500) {
                    setLogError(true);
                    setLogErrText('Ошибка сервера');
                }
            })
    }


    function handleLoginSubmit(email, password) {
        setSubmitButtonDisabled(true);
        authorize(email, password)
            .then((res) => {
                if (res) {
                    localStorage.setItem('jwt', res.token);
                    navigate('/movies')
                }
            })
            .catch((err) => {
                if (err === 401) {
                    setLogError(true)
                    setLogErrText('не верный email или пароль')
                }
                if (err === 500) {
                    setLogError(true)
                    setLogErrText('Ошибка сервера')
                }
            })
            .finally(() => setSubmitButtonDisabled(false))
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
                .catch((err) => setToolTip(true))
        }
    }

    function handleLogout() {
        localStorage.clear();
        navigate('/');
    }

    function closeToolTip() {
        setToolTip(false)
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className='app'>
                {isHeader && <Header />}
                <Routes>
                    <Route path='/signup' element={!localStorage.getItem('jwt') ? <Register handleRegisterSubmit={handleRegisterSubmit} submitButtonDisabled={submitButtonDisabled} logError={logError} logErrText={logErrText} setLogError={setLogError} /> : <Navigate replace to='/movies' />} />
                    <Route path='/signin' element={!localStorage.getItem('jwt') ? <Login handleLoginSubmit={handleLoginSubmit} submitButtonDisabled={submitButtonDisabled} logError={logError} setLogError={setLogError} logErrText={logErrText} /> : <Navigate replace to='/movies' />} />
                    <Route path='/' element={<Main />} />
                    <Route element={<ProtectedRoute
                    ></ProtectedRoute>}>
                        <Route path='/movies' element={<Movies setSavedMovie={setSavedMovie}
                            savedMovie={savedMovie} deleteMovieCard={deleteMovieCard} setToolTip={setToolTip}
                            setSubmitButtonDisabled={setSubmitButtonDisabled} submitButtonDisabled={submitButtonDisabled} />} />
                        <Route path='/saved-movies' element={<SavedMovies savedMovie={savedMovie}
                            isLoading={isLoading} deleteMovieCard={deleteMovieCard}
                            submitButtonDisabled={submitButtonDisabled} />} />
                        <Route path='/profile' element={<Profile handleLogout={handleLogout}
                            profileErrText={profileErrText} setProfileError={setProfileError}
                            profileError={profileError} submitButtonDisabled={submitButtonDisabled}
                            handleEditProfile={handleEditProfile} />} />
                    </Route>
                    <Route path='*' element={<PageNotFound />} />
                </Routes>
                {isFooter && <Footer />}
                <InfoTooltip closeToolTip={closeToolTip} toolTip={toolTip} />
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
