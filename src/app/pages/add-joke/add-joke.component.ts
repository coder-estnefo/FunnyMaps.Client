import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, take } from 'rxjs';
import { Joke } from 'src/app/interfaces/joke';
import { JokeInput } from 'src/app/interfaces/joke-input';
import { JokeService } from 'src/app/services/joke/joke.service';

@Component({
  selector: 'app-add-joke',
  templateUrl: './add-joke.component.html',
  styleUrls: ['./add-joke.component.scss'],
})
export class AddJokeComponent {
  lat!: number;
  lng!: number;
  isLoading = false;

  formBuilder = inject(FormBuilder);
  jokeService = inject(JokeService);
  router = inject(Router);

  jokeForm = this.formBuilder.nonNullable.group({
    description: new FormControl('', [Validators.required]),
  });

  constructor() {
    navigator.geolocation.getCurrentPosition((position) => {
      const {
        coords: { latitude, longitude },
      } = position;
      this.lat = latitude;
      this.lng = longitude;
    });
  }

  onSubmit() {
    this.isLoading = true;
    if (this.jokeForm.valid) {
      const { description } = this.jokeForm.value;
      this.jokeService
        .getLocation(-25.7565723, 28.1913815)
        .pipe(map((value) => value.features[0].properties.context.place.name))
        .subscribe((place) => {
          var jokeInput: JokeInput = {
            description: description!,
            location: {
              place: place,
              latitude: 0.23,
              longitude: 0.1,
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
        });
    }
  }
}
