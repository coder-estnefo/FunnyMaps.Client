import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FunnyMapComponent } from './components/funny-map/funny-map.component';
import { AuthComponent } from './components/auth/auth.component';
import { AddJokeComponent } from './components/add-joke/add-joke.component';
import { authGuard } from './guards/auth/auth.guard';
import { AuthInterceptor } from './interceptors/auth/auth.interceptor';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/funny-map',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: 'funny-map',
    component: FunnyMapComponent,
    canActivate: [authGuard],
  },
  {
    path: 'add-joke',
    component: AddJokeComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
