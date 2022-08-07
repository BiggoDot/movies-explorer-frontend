import React from 'react';
import './Portfolio.css';
import arrow from '../../images/arrow.svg';

const Portfolio = () => {
    return (
        <section className='portfolio'>
            <h2 className='portfolio__header'>Портфолио</h2>
            <div className='portfolio__container'>
                <a className='portfolio__link' href='https://github.com/BiggoDot/how-to-learn' target='_blank'>
                    <h3 className='portfolio__link-header'>Статичный сайт</h3>
                    <img className='portfolio__link-img' src={arrow} alt='link icon for redirection'/>
                </a>
                <a className='portfolio__link' href='https://github.com/BiggoDot/russian-travel' target='_blank'>
                    <h3 className='portfolio__link-header'>Адаптивный сайт</h3>
                    <img className='portfolio__link-img' src={arrow} alt='link icon for redirection'/>
                </a>
                <a className='portfolio__link' href='https://github.com/BiggoDot/react-mesto-api-full' target='_blank'>
                    <h3 className='portfolio__link-header'>Одностраничное приложение</h3>
                    <img className='portfolio__link-img' src={arrow} alt='link icon for redirection'/>
                </a>
            </div>
        </section>
    );
};

export default Portfolio;
