export interface Joke {
  id: string;
  description: string;
  location: {
    place: string;
    latitude: number;
    longitude: number;
  };
}
