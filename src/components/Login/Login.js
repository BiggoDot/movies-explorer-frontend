import React, { useEffect } from 'react';
import Greeting from "../Greeting/Greeting";
import { useFormWithValidation } from '../../hooks/hookForFrom';

const Login = ({ handleLoginSubmit, logError, setLogError, logErrText, submitButtonDisabled }) => {
    const { handleChange, values, errors, isValid } = useFormWithValidation();

    useEffect(() => {
        setLogError(false);
    }, [values])

    function handleSubmit(e) {
        e.preventDefault();
        handleLoginSubmit(
            values.email,
            values.password
        )
    }

    return (
        <Greeting title={'Рады видеть!'} here={'/signup'}
            text={'Ещё не зарегистрированы?'} link={'Регистрация'}
            writing={'Войти'} handleSubmit={handleSubmit}
            handleChange={handleChange}
            values={values} isValid={isValid} errors={errors}
            logError={logError} logErrText={logErrText} submitButtonDisabled={submitButtonDisabled}></Greeting>
    );
};

export default Login;
