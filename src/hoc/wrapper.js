import React, { Fragment } from 'react';

const Wrapper = (props) => {
  return (
      <Fragment>
          {props.children}
      </Fragment>
  );
}

export default Wrapper;
