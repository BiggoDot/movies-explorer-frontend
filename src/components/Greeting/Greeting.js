import React from 'react';
import {Link} from "react-router-dom";
import './Greeting.css';
import Error from "../Error/Error";

const Greeting = ({title, text, writing, children, here, link}) => {
    return (
        <main className='greeting'>
            <h2 className='greeting__title'>{title}</h2>
            <form className='greeting__from' name='greet'>
                {children}
                <label className='greeting__container'>
                    <p className='greeting__input-text'>E-mail</p>
                    <input className='greeting__input' type='email' id='email' required/>
                </label>
                <label className='greeting__container'>
                    <p className='greeting__input-text'>Пароль</p>
                    <input className='greeting__input greeting__input_show_error' type='password' id='password' required/>
                    <Error/>
                </label>
                <button className='greeting__button' type='submit'>{writing}</button>
            </form>
            <p className='greeting__text'>{text}<Link className='greeting__link' replace to={here}>{link}</Link></p>
        </main>
    );
};

export default Greeting;
