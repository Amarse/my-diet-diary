import './render-days.modules.scss';
import React from "react";

const RenderDays = () => {
  const days = [];
  const date = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  for (let i = 0; i < 7; i++) {
    days.push(
      <div className='col' key={i}>
        {date[i]}
      </div>
    );
  }

  return <div className='days-container'>{days}</div>;
};

export default RenderDays;