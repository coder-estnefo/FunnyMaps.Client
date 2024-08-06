import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

import * as turf from '@turf/turf';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-funny-map',
  templateUrl: './funny-map.component.html',
  styleUrls: ['./funny-map.component.scss'],
})
export class FunnyMapComponent implements OnInit, AfterViewInit {
  private token = environment.mapbox_access_token;

  map?: mapboxgl.Map;

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
  }
}
