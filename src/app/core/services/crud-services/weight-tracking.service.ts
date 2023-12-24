import { Injectable, Injector } from '@angular/core';
import { CrudService } from 'src/app/shared/services/crud.service';
import { WeightTracking } from 'src/app/core/models/weight-tracking.model';

@Injectable({
  providedIn: 'root'
})
export class WeightTrackingService extends CrudService<WeightTracking> {

  constructor(protected override injector: Injector) {
    super("api/weight", injector, WeightTracking.fromJson);
  }
}
