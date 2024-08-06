// features[0].properties.place_formatted
export interface ReverseGeocoding {
  features: [
    {
      properties: {
        place_formatted: string;
        context: {
          place: {
            name: string;
          };
        };
      };
    }
  ];
}
