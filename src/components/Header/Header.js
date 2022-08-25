import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../images/logo.svg';
import Navigation from "../Navigation/Navigation";
import './Header.css';

const Header = () => {
    let location = useLocation();

    return (
        <header className={location.pathname === '/' ? "header" : 'header header_color'}>
            <div className={location.pathname === '/signin' ? 'header__container header__container_size_s'
                : location.pathname === '/signup' ? 'header__container header__container_size_s'
                    : 'header__container'}>
                <Link className={location.pathname === '/signin' ? 'header__link header__link_margin_remove'
                    : location.pathname === '/signup' ? 'header__link header__link_margin_remove' : 'header__link'}
                    to='/'>
                    <img src={logo}
                        className='header__logo'
                        alt='logo' />
                </Link>
                <Navigation />
            </div>
        </header>
    );
};

export default Header;
