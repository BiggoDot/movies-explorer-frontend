import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className='footer'>
            <p className='footer__text'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <div className='footer__container'>
                <p className='footer__copyright'>&copy; 2020</p>
                <div className='footer__link-container'>
                    <a href='https://practicum.yandex.ru/' className='footer__link' target='_blank'>Яндекс.Практикум</a>
                    <a href='https://github.com/BiggoDot' className='footer__link' target='_blank'>Github</a>
                    <a href='https://www.facebook.com/' className='footer__link' target='_blank'>Facebook</a>
                </div>
            </div>

        </footer>
    );
};

export default Footer;
