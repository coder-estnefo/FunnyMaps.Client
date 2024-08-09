export interface IGeocoding {
  features: {
    properties: {
      coordinates: {
        longitude: number;
        latitude: number;
      };
      place_formatted: string;
      context: {
        place: {
          name: string;
        };
      };
    };
  }[];
}
