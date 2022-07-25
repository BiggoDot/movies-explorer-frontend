import React, {useEffect} from 'react';
import {Route, Routes} from 'react-router-dom';
import './App.css';
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

function App() {
    const [isHeader, setIsHeader] = React.useState(false);
    const [isFooter, setIsFooter] = React.useState(false);
    let location = useLocation();

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

    return (
        <div className='app'>
            {isHeader && <Header/>}
            <Routes>
                <Route path='/' element={<Main/>}/>
                <Route path='/movies' element={<Movies/>}/>
                <Route path='/saved-movies' element={<SavedMovies/>}/>
                <Route path='/profile' element={<Profile name={'Виталий'} email={'pochta@yandex.ru'}/>}/>
                <Route path='/signup' element={<Register/>}/>
                <Route path='/signin' element={<Login/>}/>
                <Route path='*' element={<PageNotFound/>}/>
            </Routes>
            {isFooter && <Footer/>}
        </div>
    );
}

export default App;
