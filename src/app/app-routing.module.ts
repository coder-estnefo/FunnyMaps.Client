import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/funny-map',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./pages/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'funny-map',
    loadChildren: () =>
      import('./pages/funny-map/funny-map.module').then(
        (m) => m.FunnyMapModule
      ),
    canActivate: [authGuard],
  },
  {
    path: 'add-joke',
    loadChildren: () =>
      import('./pages/add-joke/add-joke.module').then((m) => m.AddJokeModule),
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
