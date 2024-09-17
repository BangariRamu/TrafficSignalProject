import React from 'react';
import TrafficLight from './components/TrafficLight';
import PedestrianButton from './components/PedestrianButton';
import { TrafficLightProvider } from './context/TrafficLightContext';
import './App.css';

const App = () => {
  return (
    <TrafficLightProvider>
      <div className="app">
        <h1>Traffic Light Simulator</h1>
        <TrafficLight />
        <PedestrianButton />
      </div>
    </TrafficLightProvider>
  );
};

export default App;
