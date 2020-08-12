import React from 'react';

import classes from './Header.module.css';
import Logo from '../../elements/Logo/Logo';

const Header = (props) => {
    return (
        <header className={classes.Header}>
            <Logo />
        </header>
    )
}

export default Header; 