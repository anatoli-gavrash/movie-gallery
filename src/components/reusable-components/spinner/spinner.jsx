import React from 'react';

import './spinner.scss';

const Spinner = (props) => {
  return (
    <div className="spinner" 
      style={{
        width: props.width + 'px', 
        height: props.height + 'px'
      }}>
    </div>
  );
};

export default Spinner;