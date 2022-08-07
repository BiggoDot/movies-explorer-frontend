import React from 'react';
import './AboutProject.css';
import '../extraStyles/headerStyle.css';

const AboutProject = () => {
    return (
        <section className='about' id='about-section'>
            <h2 className='header-style'>О проекте</h2>
            <ul className='about__ul about__ul_for_width'>
                <li className='about__list'>
                    <h3 className='about__list-header'>Дипломный проект включал 5 этапов</h3>
                    <p className='about__text'>Составление плана, работу над бэкендом, вёрстку, добавление
                        функциональности и финальные доработки.</p>
                </li>
                <li className='about__list'>
                    <h3 className='about__list-header'>На выполнение диплома ушло 5 недель</h3>
                    <p className='about__text'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
                        соблюдать, чтобы успешно защититься.</p>
                </li>
            </ul>
            <ul className='about__ul'>
                <li className='about__date'>
                    <h3 className='about__date-title'>1 неделя</h3>
                    <p className='about__date-text'>Back-end</p>
                </li>
                <li className='about__date about__date_length'>
                    <h3 className='about__date-title about__date-title_color'>4 недели</h3>
                    <p className='about__date-text'>Front-end</p>
                </li>
            </ul>

        </section>
    );
};

export default AboutProject;
