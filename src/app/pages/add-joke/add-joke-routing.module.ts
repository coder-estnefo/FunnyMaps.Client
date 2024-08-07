import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddJokeComponent } from './add-joke.component';

const routes: Routes = [{ path: '', component: AddJokeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddJokeRoutingModule { }
