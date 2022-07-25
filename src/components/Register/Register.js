import React from 'react';
import Greeting from "../Greeting/Greeting";

const Register = () => {
    return (
        <Greeting title={'Добро пожаловать!'} here={'/signin'}
                  text={'Уже зарегистрированы?'} link={'Войти'}
                  writing={'Зарегистрироваться'}>
            <label className='greeting__container'>
                <p className='greeting__input-text'>Имя</p>
                <input className='greeting__input' type='text' id='name' required/>
            </label>

        </Greeting>
    );
};

export default Register;
