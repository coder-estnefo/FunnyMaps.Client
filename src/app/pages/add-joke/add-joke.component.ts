import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatChipListboxChange } from '@angular/material/chips';
import { Router } from '@angular/router';
import { map, take } from 'rxjs';
import { IGeocoding } from 'src/app/interfaces/igeocoding';
import { Joke } from 'src/app/interfaces/joke';
import { JokeInput } from 'src/app/interfaces/joke-input';
import { JokeService } from 'src/app/services/joke/joke.service';

enum AddressSearchTypes {
  SearchForLocation,
  CurrentLocation,
}

interface SearchTypes {
  icon: string;
  label: string;
  type: AddressSearchTypes;
}

const SEARCH_TYPES: SearchTypes[] = [
  {
    icon: 'search',
    label: 'Search Location',
    type: AddressSearchTypes.SearchForLocation,
  },
  {
    icon: 'location_on',
    label: 'Current Location',
    type: AddressSearchTypes.CurrentLocation,
  },
];

@Component({
  selector: 'app-add-joke',
  templateUrl: './add-joke.component.html',
  styleUrls: ['./add-joke.component.scss'],
})
export class AddJokeComponent {
  lat!: number;
  lng!: number;
  isLoading = false;
  searchTypes = SEARCH_TYPES;
  currentSearchType: SearchTypes = this.searchTypes[0];
  locations: IGeocoding | undefined;

  formBuilder = inject(FormBuilder);
  jokeService = inject(JokeService);
  router = inject(Router);

  jokeForm = this.formBuilder.nonNullable.group({
    location: new FormControl('', [Validators.required]),
    latitude: new FormControl<number | undefined>(undefined, [
      Validators.required,
    ]),
    longitude: new FormControl<number | undefined>(undefined, [
      Validators.required,
    ]),
    description: new FormControl('', [Validators.required]),
  });

  getCurrentLocation() {
    navigator.permissions
      .query({ name: 'geolocation' })
      .then((permissions) => {
        if (permissions.state == 'granted') {
          this.getLocation();
        } else if (permissions.state == 'prompt') {
          this.getLocation();
        } else if (permissions.state == 'denied') {
          alert('Location Permission needed!');
        }
      })
      .catch((error) => {
        alert(error);
      });
  }

  private getLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      const {
        coords: { latitude, longitude },
      } = position;
      this.lat = latitude;
      this.lng = longitude;
      this.jokeForm.controls.latitude.setValue(latitude);
      this.jokeForm.controls.longitude.setValue(longitude);

      this.jokeService.getLocation(this.lat, this.lng).subscribe((place) => {
        const placeName = place.features[0].properties.place_formatted;
        this.jokeForm.controls.location.setValue(placeName);
      });

      this.jokeForm.controls.location.setValue;
    });
  }

  searchLocation() {
    const location = this.jokeForm.controls.location.value;
    if (location != '') {
      this.jokeService.getLocations(location!).subscribe((locations) => {
        this.locations = locations;
      });
    } else {
      this.locations = undefined;
    }
  }

  selectLocation(location: string, latitude: number, longitude: number) {
    this.jokeForm.controls.location.setValue(location);
    this.jokeForm.controls.latitude.setValue(latitude);
    this.jokeForm.controls.longitude.setValue(longitude);
  }

  setLocationMethod(e: MatChipListboxChange) {
    switch (e.value) {
      case AddressSearchTypes.CurrentLocation:
        this.currentSearchType = e.value;
        this.jokeForm.controls.location?.disable();
        this.getCurrentLocation();
        break;
      case AddressSearchTypes.SearchForLocation:
        this.jokeForm.controls.location.setValue('');
        this.jokeForm.controls.location?.enable();
        this.currentSearchType = e.value;
        break;
      default:
        break;
    }
  }

  onSubmit() {
    this.isLoading = true;
    if (this.jokeForm.valid) {
      this.jokeForm.controls.location?.enable();
      const { location, latitude, longitude, description } =
        this.jokeForm.value;
      var jokeInput: JokeInput = {
        description: description!,
        location: {
          place: location!,
          latitude: latitude!,
          longitude: longitude!,
        },
      };

      this.jokeService.addJoke(jokeInput).subscribe({
        next: (value) => {
          this.isLoading = false;
          this.router.navigate(['/funny-map']);
        },
        error: (error) => {
          this.isLoading = false;
        },
      });
    }
  }
}
