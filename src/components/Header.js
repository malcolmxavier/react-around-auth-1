import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../images/around_the_us.svg';

function Header(props) {
    return (<header className="header">
        <img className="header__logo" src={logo} alt="around the USA" />
        <div className="header__content"><p className="header__text">{props.email}</p><Link className="header__text header__text_link" to={props.link}>{props.linkText}</Link></div>
    </header>
    )
}
export default Header