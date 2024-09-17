import React, { createContext, useReducer, useEffect } from 'react';


const initialState = {
  currentLight: 'green', 
  pedestrianRequest: false, 
  pedestrianCrossing: false, 
  timer: 10,  
};


const CHANGE_LIGHT = 'CHANGE_LIGHT';
const REQUEST_CROSSING = 'REQUEST_CROSSING';
const START_PEDESTRIAN_CROSSING = 'START_PEDESTRIAN_CROSSING';
const END_PEDESTRIAN_CROSSING = 'END_PEDESTRIAN_CROSSING';


export const TrafficLightContext = createContext();


const trafficLightReducer = (state, action) => {
  switch (action.type) {
    case CHANGE_LIGHT:
      return { ...state, currentLight: action.payload.light, timer: action.payload.timer };
    case REQUEST_CROSSING:
      return { ...state, pedestrianRequest: true };
    case START_PEDESTRIAN_CROSSING:
      return { ...state, pedestrianCrossing: true, pedestrianRequest: false };
    case END_PEDESTRIAN_CROSSING:
      return { ...state, pedestrianCrossing: false };
    default:
      return state;
  }
};


export const TrafficLightProvider = ({ children }) => {
  const [state, dispatch] = useReducer(trafficLightReducer, initialState);

  
  useEffect(() => {
    let timeout;

    const handleLightChange = () => {
      if (state.pedestrianCrossing) {
        timeout = setTimeout(() => {
          dispatch({ type: CHANGE_LIGHT, payload: { light: 'red', timer: 5 } }); // Extra 5 seconds for pedestrians
          setTimeout(() => {
            dispatch({ type: CHANGE_LIGHT, payload: { light: 'green', timer: 10 } });
            dispatch({ type: END_PEDESTRIAN_CROSSING });
          }, 5000); 
        }, state.timer * 1000);
      } else {
        switch (state.currentLight) {
          case 'green':
            timeout = setTimeout(() => {
              if (state.pedestrianRequest) {
                dispatch({ type: CHANGE_LIGHT, payload: { light: 'yellow', timer: 3 } });
              } else {
                dispatch({ type: CHANGE_LIGHT, payload: { light: 'yellow', timer: 3 } });
              }
            }, state.timer * 1000); 
            break;
          case 'yellow':
            timeout = setTimeout(() => {
              if (state.pedestrianRequest) {
                dispatch({ type: CHANGE_LIGHT, payload: { light: 'red', timer: 7 } });
                dispatch({ type: START_PEDESTRIAN_CROSSING });
              } else {
                dispatch({ type: CHANGE_LIGHT, payload: { light: 'red', timer: 7 } });
              }
            }, state.timer * 1000);
            break;
          case 'red':
            timeout = setTimeout(() => {
              dispatch({ type: CHANGE_LIGHT, payload: { light: 'green', timer: 10 } });
            }, state.timer * 1000); 
            break;
          default:
            break;
        }
      }
    };

    handleLightChange();

    return () => clearTimeout(timeout);
  }, [state.currentLight, state.pedestrianRequest, state.pedestrianCrossing, state.timer]);

  
  const requestCrossing = () => {
    if (!state.pedestrianCrossing && !state.pedestrianRequest) {
      dispatch({ type: REQUEST_CROSSING });
    }
  };

  return (
    <TrafficLightContext.Provider value={{ state, requestCrossing }}>
      {children}
    </TrafficLightContext.Provider>
  );
};
