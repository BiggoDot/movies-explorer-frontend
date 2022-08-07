import React from 'react';
import {Link} from "react-router-dom";
import '../Greeting/Greeting.css';
import './Profile.css';

const Profile = ({name, email}) => {
    return (
        <main className='profile'>
            <h2 className='greeting__title  profile__title'>Привет, {name}!</h2>
            <form className='profile__form' name='edit'>
                <label className='profile__container'>
                    <p className='profile__input-text'>Имя</p>
                    <input className='profile__input' type='text' id='edit-name' value={name}/>
                </label>
                <label className='profile__container'>
                    <p className='profile__input-text'>E-mail</p>
                    <input className='profile__input' type='email' id='edit-email' value={email}/>
                </label>
                <button className='profile__button' type='submiit'>Редактировать</button>
            </form>
            <Link className='profile__link' replace to='/signin'>Выйти из аккаунта</Link>
        </main>
    );
};

export default Profile;
