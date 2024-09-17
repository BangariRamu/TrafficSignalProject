import React, { useContext } from 'react';
import { TrafficLightContext } from '../context/TrafficLightContext';

const TrafficLight = () => {
  const { state } = useContext(TrafficLightContext);
  const { currentLight, timer } = state;

  return (
    <div className="traffic-light">
      <div className={`light ${currentLight === 'red' ? 'red' : ''}`}></div>
      <div className={`light ${currentLight === 'yellow' ? 'yellow' : ''}`}></div>
      <div className={`light ${currentLight === 'green' ? 'green' : ''}`}></div>
      <div className="timer">Timer: {timer}s</div>
    </div>
  );
};

export default TrafficLight;
