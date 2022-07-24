import React, {useEffect} from 'react';
import {Link, Route, Routes, NavLink, useLocation} from 'react-router-dom';
import './Navigation.css';
import profile from '../../images/profile.svg';

const Navigation = () => {
    let location = useLocation();
    const [menu, setMenu] = React.useState(false);
    const [widthSize, setWidthSize] = React.useState(window.innerWidth);

    function handleWindowSize() {
        setWidthSize(window.innerWidth);
    }

    useEffect(() => {
        window.addEventListener('resize', handleWindowSize)
        if (widthSize >= 600) {
            setMenu(false);
        }
        return () => window.removeEventListener('resize', handleWindowSize)
    }, [widthSize])

    function handleMenu() {
        setMenu(!menu);
    }

    useEffect(() => {
        setMenu(false);
    }, [location]);

    useEffect(() => {
        if (menu) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'visible';
        }
    }, [menu]);

    return (<>
            <Routes>
                <Route exact path='/' element={<>
                    <div className='navigation'>
                        <Link className='navigation__link' to='/signup'>Регистрация</Link>
                        <Link className='navigation__link navigation__link_box' to='/signin'>Войти</Link>
                    </div>
                </>}>
                </Route>
                {['/movies', '/saved-movies', '/profile'].map((path, index) => {
                    return (
                        <Route path={path} element={<>
                            <div className='navigation navigation_margin navigation_none'>
                                <NavLink
                                    className={({isActive}) => isActive ? 'navigation__web-link navigation__web-link_active' : 'navigation__web-link'}
                                    to='/movies'>Фильмы</NavLink>
                                <NavLink
                                    className={({isActive}) => isActive ? 'navigation__web-link navigation__web-link_active' : 'navigation__web-link'}
                                    to='/saved-movies'>Сохранённые фильмы</NavLink>
                                <NavLink
                                    className={({isActive}) => isActive ? 'navigation__web-link navigation__web-link_active' : 'navigation__web-link'}
                                    to='/profile'><p className='navigation__text'>Аккаунт</p><img
                                    className='navigation__icon' alt='profile icon' src={profile}/></NavLink>
                            </div>
                            <button onClick={handleMenu} className={"navigation__burger-menu"}>
                                <span
                                    className={`navigation__burger-line ${menu && "navigation__burger-line_active"}`}></span>
                                <span
                                    className={`navigation__burger-line ${menu && "navigation__burger-line_active"}`}></span>
                                <span
                                    className={`navigation__burger-line ${menu && "navigation__burger-line_active"}`}></span>
                            </button>

                            {menu && <>
                                <div className='navigation__burger-shadow'></div>
                                <div className='navigation__burger-container'>
                                    <div className='navigation__link-holder'>
                                        <NavLink
                                            className={({isActive}) => isActive ? 'navigation__site-link navigation__site-link_margin_top navigation__site-link_active' : 'navigation__site-link navigation__site-link_margin_top'}
                                            to='/'>Главная</NavLink>
                                        <NavLink
                                            className={({isActive}) => isActive ? 'navigation__site-link navigation__site-link_active' : 'navigation__site-link'}
                                            to='/movies'>Фильмы</NavLink>
                                        <NavLink
                                            className={({isActive}) => isActive ? 'navigation__site-link navigation__site-link_active' : 'navigation__site-link'}
                                            to='/saved-movies'>Сохранённые фильмы</NavLink>
                                    </div>
                                    <NavLink
                                        className={({isActive}) => isActive ? 'navigation__site-link navigation__site-link_margin_bottom navigation__site-link_active' : 'navigation__site-link navigation__site-link_margin_bottom'}
                                        to='/profile'><p className='navigation__text'>Аккаунт</p><img
                                        className='navigation__icon' alt='profile icon' src={profile}/></NavLink>
                                </div>
                            </>}
                        </>} key={index}></Route>
                    )
                })}
            </Routes>
        </>
    );
};

export default Navigation;

