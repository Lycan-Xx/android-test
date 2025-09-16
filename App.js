import React from 'react';
import { PlacesProvider } from './src/contexts/placesContext';
import { RootNavigator } from './src/navigation/RootNavigator';

export default function App() {
  return (
    <PlacesProvider>
      <RootNavigator />
    </PlacesProvider>
  );
}