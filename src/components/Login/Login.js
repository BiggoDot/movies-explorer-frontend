import React from 'react';
import Greeting from "../Greeting/Greeting";

const Login = () => {
    return (
        <Greeting title={'Рады видеть!'} here={'/signup'}
                  text={'Ещё не зарегистрированы?'} link={'Регистрация'}
                  writing={'Войти'}></Greeting>
    );
};

export default Login;
