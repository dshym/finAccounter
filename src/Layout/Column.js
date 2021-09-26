import React from 'react';
import classes from './Column.module.css';

const Column = (props) => {
  return(
      <div className={classes.container}>
          {props.children}
      </div>
  );
}

export default Column;