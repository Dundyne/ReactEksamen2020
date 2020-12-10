/* eslint-disable react/button-has-type */
import React, { useState } from 'react';

// eslint-disable-next-line react-hooks/rules-of-hooks

const Aggregering = () => {
  const [joke, setJoke] = useState('');
  const change = () => {
    setJoke(
      'Det er fordi de er redde for at noen skal kikke gjennom nøkkelhullet ;) '
    );
  };
  return (
    <>
      <p>Hvorfor går svenskene på do med døren åpen?</p>
      <button onClick={change}>Trykk meg for å se svar</button>
      <p>{joke}</p>
    </>
  );
};

export default Aggregering;
