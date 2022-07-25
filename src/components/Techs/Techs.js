import React from 'react';
import '../extraStyles/headerStyle.css';
import './Techs.css';

const Techs = () => {
    return (
        <section className='techs' id='techs-section'>
            <div className='techs__container'>
                <h2 className='header-style header-style_change_margin'>Технологии</h2>
                <h2 className='techs__title'>7 технологий</h2>
                <p className='techs__text'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном
                    проекте.</p>
                <ul className='techs__ul'>
                    <li className='techs__list'><p className='techs__list-text'>HTML</p></li>
                    <li className='techs__list'><p className='techs__list-text'>CSS</p></li>
                    <li className='techs__list'><p className='techs__list-text'>JS</p></li>
                    <li className='techs__list'><p className='techs__list-text'>React</p></li>
                    <li className='techs__list'><p className='techs__list-text'>Git</p></li>
                    <li className='techs__list'><p className='techs__list-text'>Express.js</p></li>
                    <li className='techs__list'><p className='techs__list-text'>mongoDB</p></li>
                </ul>
            </div>
        </section>
    );
};

export default Techs;
