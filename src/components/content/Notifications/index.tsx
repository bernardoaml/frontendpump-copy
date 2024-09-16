import React from 'react';
import { AiOutlineBell } from "react-icons/ai";

const Notifications = () => {
  return (
    <div className="header-buttons">
      <button className="notifications">
        <AiOutlineBell className='h-10 w-10' />
 
      </button>
      
      <button className="avatar mr-1">
        <img src="https://assets.codepen.io/285131/pexels-photo-838875.jpeg" />
      </button>
    </div>
  );
};

export default Notifications;
