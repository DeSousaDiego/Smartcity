import React, { useState } from 'react';


function FormButton({ type, name, form }) {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <>
        <button id = "formButton" onClick={toggleFormVisibility}>{type}</button>
        {isFormVisible && <div className="formLabelContainer">{form}</div>}
    </>
  );
}

export default FormButton;
