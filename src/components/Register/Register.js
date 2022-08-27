import React, { useEffect } from 'react';
import Greeting from "../Greeting/Greeting";
import { useFormWithValidation } from '../../hooks/hookForFrom';
import Error from "../Error/Error";

const Register = ({ handleRegisterSubmit, logErrText, logError, setLogError, submitButtonDisabled }) => {
    const { handleChange, values, errors, isValid } = useFormWithValidation();

    function handleSubmit(e) {
        e.preventDefault();
        handleRegisterSubmit(
            values.password,
            values.email,
            values.name
        )
    }

    useEffect(() => {
        setLogError(false);
    }, [values])

    return (
        <Greeting title={'Добро пожаловать!'} here={'/signin'}
            text={'Уже зарегистрированы?'} link={'Войти'}
            writing={'Зарегистрироваться'} handleSubmit={handleSubmit}
            handleChange={handleChange} values={values}
            submitButtonDisabled={submitButtonDisabled} isValid={isValid} errors={errors} logErrText={logErrText} logError={logError}>
            <label className='greeting__container'>
                <p className='greeting__input-text'>Имя</p>
                <input className={!errors.name ? 'greeting__input' : 'greeting__input greeting__input_show_error'}
                    type='text' id='name' pattern={'^[а-яА-ЯёЁa-zA-Z\- \s]*$'} minLength='2' maxLength='30' name='name' value={values.name || ''}
                    onChange={handleChange} required />
                {!isValid && <Error errors={errors.name} />}
            </label>
        </Greeting>
    );
};

export default Register;
