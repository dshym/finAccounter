import React from 'react';
import classes from './ScreenLayout.module.css';

const ScreenLayout = (props) => {
  return(
      <div className={classes.container}>
        <div className={classes.content}>{props.leftContent}</div>
        <div className={classes.content}>{props.rightContent}</div>
      </div>
  );
}

export default ScreenLayout;
