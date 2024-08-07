import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FunnyMapRoutingModule } from './funny-map-routing.module';
import { FunnyMapComponent } from './funny-map.component';
import { MatModules } from 'src/app/app.module';

@NgModule({
  declarations: [FunnyMapComponent],
  imports: [CommonModule, FunnyMapRoutingModule, MatModules],
})
export class FunnyMapModule {}
