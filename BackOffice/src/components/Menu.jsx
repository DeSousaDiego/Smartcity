import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../stylesheet/backoffice.css';


function Menu() {
  const [activeButton, setActiveButton] = useState(null);
  const navigate = useNavigate();

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);

        switch(buttonName) {
          case 'USER':
            navigate('/v1.0.0/users/add');
            break;
          case 'BOOK':
            navigate('/v1.0.0/books/add');
            break;
          case 'REVIEW':
            navigate('/v1.0.0/reviews/add');
            break;
          case 'ROLE':
            navigate('/v1.0.0/roles/add');
            break;
          case 'BEST':
            navigate('/v1.0.0/best');
            break;
          case 'ACTOR' :
            navigate('/v1.0.0/actors');
    }
  };

  const getButtonStyle = (buttonName) => {
    return {
      backgroundColor: activeButton === buttonName ? '#F5F5ED' : 'white',
    };
  };

  return (
    <>
        <div className="menubar">
          <button style={getButtonStyle('USER')} onClick={() => handleButtonClick('USER')} disabled ={activeButton === 'USER'}>
            USER
          </button>
          <button style={getButtonStyle('BOOK')} onClick={() => handleButtonClick('BOOK')}disabled ={activeButton === 'BOOK'}>
            BOOK
          </button>
          <button style={getButtonStyle('REVIEW')} onClick={() => handleButtonClick('REVIEW')}disabled ={activeButton === 'REVIEW'}>
            REVIEW
          </button>
          <button style={getButtonStyle('ROLE')} onClick={() => handleButtonClick('ROLE')}disabled ={activeButton === 'ROLE'}>
            ROLE
          </button>
          <button style={getButtonStyle('ACTOR')} onClick={() => handleButtonClick('ACTOR')}disabled ={activeButton === 'ACTOR'}>
            ACTOR
          </button>
          <button style={getButtonStyle('BEST')} onClick={() => handleButtonClick('BEST')}disabled ={activeButton === 'BEST'}>
            BEST
          </button>
        </div>
    </>
  );
}

export default Menu;
