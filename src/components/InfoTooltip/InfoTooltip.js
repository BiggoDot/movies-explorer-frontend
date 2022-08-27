import React from 'react';
import './InfoTooltip.css';
import fail from '../../images/fail.svg';

function InfoTooltip({ toolTip, closeToolTip }) {
    return (
        <div className={`popup ${toolTip && 'popup_opened'}`}>
            <div className="popup__container">
                <button type="button" className="popup__close popup__close_for_profile"
                    onClick={closeToolTip}></button>
                <img className={"popup__img"} src={fail} alt='error cross' />
                <h2 className={`popup__title`}>Что-то пошло не так...</h2>
            </div>
        </div>
    );
};

export default InfoTooltip;