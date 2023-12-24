import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeightTrackingComponent } from './weight-tracking.component';
import { WeightTrackingService } from 'src/app/core/services/crud-services/weight-tracking.service';

@NgModule({
  declarations: [
    WeightTrackingComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    WeightTrackingService
  ],
  exports: [
    WeightTrackingComponent
  ]
})
export class WeightTrackingModule { }
