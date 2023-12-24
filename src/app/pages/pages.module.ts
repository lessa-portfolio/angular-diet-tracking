import { NgModule } from '@angular/core';
import { WeightTrackingModule } from './weight-tracking/weight-tracking.module';
import { CoreModule } from '../core/core.module';

@NgModule({
  imports: [
    CoreModule,
    WeightTrackingModule
  ],
  exports: [
    WeightTrackingModule
  ]
})
export class PagesModule { }
