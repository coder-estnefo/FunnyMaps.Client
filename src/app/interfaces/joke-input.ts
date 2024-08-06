export interface JokeInput {
  description: string;
  location: {
    place: string;
    latitude: number;
    longitude: number;
  };
}
