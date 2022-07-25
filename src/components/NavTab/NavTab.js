import React from 'react';
import './NavTab.css';

const NavTab = () => {
    return (
        <section className='navtab'>
            <div className='navtab__container'>
                <a className='navtab__link' href='#about-section'>О проекте</a>
                <a className='navtab__link' href='#techs-section'>Технологии</a>
                <a className='navtab__link' href='#me-section'>Студент</a>
            </div>
        </section>
    );
};

export default NavTab;
