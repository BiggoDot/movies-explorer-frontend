import React from 'react';
import { Link } from "react-router-dom";
import './Greeting.css';
import Error from "../Error/Error";
import '../MoviesCardList/MoviesCardList.css'

const Greeting = ({ logError, logErrText, title, text, writing, children, here, link, isValid, handleSubmit, handleChange, errors, values, submitButtonDisabled }) => {
    return (
        <main className='greeting'>
            <h2 className='greeting__title'>{title}</h2>
            <form className='greeting__from' name='greet' onSubmit={handleSubmit} noValidate>
                {children}
                <label className='greeting__container'>
                    <p className='greeting__input-text'>E-mail</p>
                    <input className={!errors.email ? 'greeting__input' :
                        'greeting__input greeting__input_show_error'}
                        pattern={'^([a-z]){1,}[a-z0-9]*([.+_-]){0,1}[0-9a-z]+(@){1}([0-9a-z]+)(\\.([a-z]){2,}){1}(\\.[a-z]{2,})?$'}
                        type='email' id='email' name='email' value={values.email || ''}
                        onChange={handleChange} required />
                    {!isValid && <Error errors={errors.email} />}
                </label>
                <label className='greeting__container'>
                    <p className='greeting__input-text'>Пароль</p>
                    <input className={!errors.password ? 'greeting__input' : 'greeting__input greeting__input_show_error'} type='password' id='password' name='password' value={values.password || ''} onChange={handleChange} required />
                    {!isValid && <Error errors={errors.password} />}
                </label>
                {logError ? <p className='greeting__error'>{logErrText}</p> : <p className='greeting__error'></p>}
                <button className={submitButtonDisabled ? 'greeting__button greeting__button_disabled' : isValid ? 'greeting__button' : 'greeting__button greeting__button_disabled'} type='submit' disabled={submitButtonDisabled ? "disabled" : isValid ? false : "disabled"}>{writing}</button>
            </form>
            <p className='greeting__text'>{text}<Link className='greeting__link' replace to={here}>{link}</Link></p>
        </main>
    );
};

export default Greeting;
