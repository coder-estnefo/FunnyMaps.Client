import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FunnyMapComponent } from './funny-map.component';

const routes: Routes = [{ path: '', component: FunnyMapComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FunnyMapRoutingModule { }
