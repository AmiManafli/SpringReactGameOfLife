import React from 'react';

import classes from './Logo.module.css';

const logo = (props) => {
    return(
        <h1 className={classes.Logo}>
            Game of Life
        </h1>
    );
}

export default logo;