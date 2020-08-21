import React from 'react';

import classes from "./PropertiesPanel.module.css";

const PropertiesPanel = (props) => {
    return (
        <div className={classes.PropertiesPanel}>      
            {props.children}    
        </div>
    )
}

export default PropertiesPanel;