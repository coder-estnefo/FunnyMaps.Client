import { KEYS } from 'api_keys';

export const environment = {
  production: false,
  authBaseUrl: 'https://localhost:7081/api/Auth/',
  jokesBaseUrl: 'https://localhost:7081/api/Jokes/',
  mapboxGeocodeBaseUrl: 'https://api.mapbox.com/search/geocode/v6/',
  mapbox_access_token: KEYS.mapbox_key,
};
