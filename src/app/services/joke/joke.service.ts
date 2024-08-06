import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Joke } from 'src/app/interfaces/joke';
import { JokeInput } from 'src/app/interfaces/joke-input';
import { ReverseGeocoding } from 'src/app/interfaces/reverse-geocoding';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class JokeService implements IJokeService {
  private jokesBaseUrl = environment.jokesBaseUrl;
  private mapboxBaseUrl = environment.mapboxGeocodeBaseUrl;
  private mapboxToken = environment.mapbox_access_token;

  constructor(private http: HttpClient) {}
  addJoke(joke: JokeInput): Observable<any> {
    var url = new URL('AddJoke', this.jokesBaseUrl);
    return this.http.post(url.href, JSON.stringify(joke));
  }

  getJokesByLocation(location: string) {
    var url = new URL('GetJokesByLocation', this.jokesBaseUrl);
    url.searchParams.append('location', location);
    return this.http.get<Joke[]>(url.href);
  }

  getLocation(lat: number, lng: number): Observable<ReverseGeocoding> {
    var url = new URL('reverse', this.mapboxBaseUrl);
    url.searchParams.append('longitude', lng.toString());
    url.searchParams.append('latitude', lat.toString());
    url.searchParams.append('access_token', this.mapboxToken);
    return this.http.get<ReverseGeocoding>(url.href);
  }
}

interface IJokeService {
  addJoke(joke: JokeInput): Observable<any>;
  getJokesByLocation(location: string): Observable<Joke[]>;
  getLocation(lat: number, lng: number): Observable<ReverseGeocoding>;
}
