import React from 'react';
import '../extraStyles/headerStyle.css';
import './AboutMe.css';

const AboutMe = () => {
    return (
        <section className='about-me' id='me-section'>
            <h2 className='header-style'>Студент</h2>
            <div className='about-me__container'>
                <div className='about-me__text-container'>
                    <h3 className='about-me__name'>Виталий</h3>
                    <p className='about-me__profession'>Фронтенд-разработчик, 30 лет</p>
                    <p className='about-me__description'>Я родился и живу в Саратове, закончил факультет экономики СГУ.
                        У меня есть жена
                        и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал
                        в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься
                        фриланс-заказами и ушёл с постоянной работы.</p>
                    <div className='about-me__container-links'>
                        <a className='about-me__link' href='https://www.facebook.com/' target='_blank'><p
                            className='about-me__link-text'>Facebook</p></a>
                        <a className='about-me__link' href='https://github.com/BiggoDot' target='_blank'><p
                            className='about-me__link-text'>Github</p></a>
                    </div>
                </div>
                <img
                    src='https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGhvdG98ZW58MHx8MHx8&w=1000&q=80'
                    alt='photo of a person' className='about-me__photo'/>
            </div>
        </section>
    );
};

export default AboutMe;
