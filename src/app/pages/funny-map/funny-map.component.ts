import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

import * as turf from '@turf/turf';
import { environment } from 'src/environments/environment.development';
import { IGeocoding } from 'src/app/interfaces/igeocoding';
import { JokeService } from 'src/app/services/joke/joke.service';
import { Joke } from 'src/app/interfaces/joke';

@Component({
  selector: 'app-funny-map',
  templateUrl: './funny-map.component.html',
  styleUrls: ['./funny-map.component.scss'],
})
export class FunnyMapComponent implements OnInit, AfterViewInit {
  private token = environment.mapbox_access_token;

  jokeService = inject(JokeService);

  map!: mapboxgl.Map;
  marker?: mapboxgl.Marker;
  locationQuery!: string;
  currentLocation!: string;
  places?: IGeocoding;
  jokes: Joke[] = [];
  isLoading = false;

  constructor() {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.map?.jumpTo({ zoom: 9 });
    }, 3000);
  }

  ngOnInit(): void {
    this.initMap();
  }

  initMap() {
    (mapboxgl as any).accessToken = this.token;
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [28.14094120767747, -25.75542520300563],
      zoom: 4,
    });

    this.map.doubleClickZoom.disable();

    this.map?.on('dblclick', (e) => {
      const { lat, lng } = e.lngLat;

      this.addMarker(lng, lat);

      this.addCircle(lng, lat);
    });
  }

  searchForLocation() {
    if (this.locationQuery?.trim() != '') {
      this.jokeService.getLocations(this.locationQuery).subscribe((res) => {
        this.places = res;
      });
    } else {
      this.places = undefined;
    }
  }

  selectLocation(place: string, lng: number, lat: number) {
    this.isLoading = true;
    this.places = undefined;
    this.locationQuery = place;
    this.currentLocation = place;
    this.addMarker(lng, lat);
    this.addCircle(lng, lat);
    this.jokeService.getJokesByLocation(place).subscribe((jokes) => {
      this.isLoading = false;
      this.jokes = jokes;
    });
  }

  addMarker(lng: number, lat: number) {
    const point = mapboxgl.LngLat.convert([lng, lat]);
    this.marker?.remove();
    this.marker = new mapboxgl.Marker().setLngLat(point).addTo(this.map);
    this.map?.jumpTo({ zoom: 10, center: point });
  }

  addCircle(lng: number, lat: number) {
    if (this.map?.getLayer('circle-location-layer')) {
      this.map?.removeLayer('circle-location-layer');
    }

    if (this.map?.getSource('circle-location')) {
      this.map?.removeSource('circle-location');
    }

    var center = [lng, lat];
    var radius = 5;
    var circle = turf.circle(center, radius, {
      steps: 10,
      units: 'kilometers',
    });

    this.map?.addSource('circle-location', {
      type: 'geojson',
      data: circle,
    });

    this.map?.addLayer({
      id: 'circle-location-layer',
      type: 'fill',
      source: 'circle-location',
      paint: {
        'fill-color': 'rgba(0, 0, 255, 0.3)',
      },
    });
  }
}
