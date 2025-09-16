export type PlaceType = {
    id: string;
    name: string;
  };
  
  export type Place = {
    id: string;
    title: string;
    latitude: number;
    longitude: number;
    typeId?: string | null;
    createdAt: string;
  };