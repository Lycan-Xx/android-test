import React, { createContext, useContext, useEffect, useState } from 'react';
import { Place, PlaceType } from '../types/models';
import { saveJSON, loadJSON } from '../utils/storage';
import { v4 as uuidv4 } from 'uuid';

type PlacesContextValue = {
  places: Place[];
  types: PlaceType[];
  addPlace: (p: Omit<Place, 'id' | 'createdAt'>) => Promise<void>;
  addType: (name: string) => Promise<PlaceType>;
  reload: () => Promise<void>;
};

const PlacesContext = createContext<PlacesContextValue | null>(null);

export const PlacesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [types, setTypes] = useState<PlaceType[]>([]);

  useEffect(() => { reload(); }, []);

  async function reload() {
    const p = (await loadJSON('@places', [])) || [];
    const t = (await loadJSON('@types', [])) || [];
    setPlaces(p);
    setTypes(t);
  }

  async function persist() {
    await saveJSON('@places', places);
    await saveJSON('@types', types);
  }

  async function addPlace(payload: Omit<Place, 'id' | 'createdAt'>) {
    const newPlace: Place = { ...payload, id: uuidv4(), createdAt: new Date().toISOString() };
    setPlaces((s) => { const next = [newPlace, ...s]; saveJSON('@places', next); return next; });
  }

  async function addType(name: string) {
    const newType: PlaceType = { id: uuidv4(), name };
    setTypes((s) => { const next = [newType, ...s]; saveJSON('@types', next); return next; });
    return newType;
  }

  return (
    <PlacesContext.Provider value={{ places, types, addPlace, addType, reload }}>
      {children}
    </PlacesContext.Provider>
  );
};

export function usePlaces() {
  const ctx = useContext(PlacesContext);
  if (!ctx) throw new Error('usePlaces must be used inside PlacesProvider');
  return ctx;
}