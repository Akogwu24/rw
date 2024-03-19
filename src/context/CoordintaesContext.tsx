import React from 'react';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

type TCoordinate = {};

const CoordintesContext = createContext({});

export const CoordintesContextProvider = ({ children }: { children: ReactNode }) => {
  const [currentLocation, setCurrentLocation] = useState('');

  const value = { currentLocation, setCurrentLocation };

  return <CoordintesContext.Provider value={value}>{children}</CoordintesContext.Provider>;
};

export const useCoordinateContext = () => {
  return useContext(CoordintesContext);
};
