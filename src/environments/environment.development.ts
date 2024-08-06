import { KEYS } from 'api_keys';

export const environment = {
  production: false,
  jokesBaseUrl: 'https://localhost:7081/api/Jokes/',
  mapboxGeocodeBaseUrl: 'https://api.mapbox.com/search/geocode/v6/',
  mapbox_access_token: KEYS.mapbox_key,
};
