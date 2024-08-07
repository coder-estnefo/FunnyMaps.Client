import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddJokeRoutingModule } from './add-joke-routing.module';
import { AddJokeComponent } from './add-joke.component';
import { MatModules } from 'src/app/app.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AddJokeComponent],
  imports: [
    CommonModule,
    AddJokeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatModules,
  ],
})
export class AddJokeModule {}
