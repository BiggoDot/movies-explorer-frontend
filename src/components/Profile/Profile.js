import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import '../Greeting/Greeting.css';
import './Profile.css';
import {useFormWithValidation} from '../../hooks/hookForFrom';
import {CurrentUserContext} from "../../context/CurrentUserContext";
import Error from '../Error/Error';

const Profile = ({handleLogout, handleEditProfile}) => {
    const {handleChange, resetForm, setValues, values, errors, isValid} = useFormWithValidation();
    const currentUser = React.useContext(CurrentUserContext);
//     const [buttonDisabled, setButtonDisabled] = useState(false);

// console.log(isValid)
    React.useEffect(() => {
        setValues(currentUser);
    }, [currentUser]);

    // useEffect(() => {
    //     // setLogError(false);
    //     if(values === currentUser){
    //         setButtonDisabled(true)
    //         console.log(values === currentUser)
    //     }
    //     else {
    //         setButtonDisabled(false);
    //     }
    // }, [values])

    function handleSubmit(e) {
        e.preventDefault();
        handleEditProfile(
            values.name,
            values.email
        )
    }

    return (
        <main className='profile'>
            <h2 className='greeting__title  profile__title'>Привет, {currentUser.name}!</h2>
            <form className='profile__form' name='edit' onSubmit={handleSubmit} noValidate>
                <label className='profile__container'>
                    <p className='profile__input-text'>Имя</p>
                    <input className='profile__input' dir='rtl' type='text' id='edit-name' value={values.name || ''}
                    onChange={handleChange} name='name' pattern={'^[а-яА-ЯёЁa-zA-Z\- \s]*$'}/>
                    {!isValid && <Error errors={errors.name}/>}
                </label>
                <label className='profile__container'>
                    <p className='profile__input-text'>E-mail</p>
                    <input className='profile__input' dir='rtl' name='email' type='email' id='edit-email' value={values.email || ''}
                    onChange={handleChange} pattern={'^([a-z]){1,}[a-z0-9]*([.+_-]){0,1}[0-9a-z]+(@){1}([0-9a-z]+)(\\.([a-z]){2,}){1}(\\.[a-z]{2,})?$'}/>
                    {!isValid && <Error errors={errors.email}/>}
                </label>
                <button className='profile__button' type='submit' disabled={isValid ? false : 'disabled'}>Редактировать</button>
            </form>
            <button className='profile__link' onClick={handleLogout}>Выйти из аккаунта</button>
        </main>
    );
};

export default Profile;
