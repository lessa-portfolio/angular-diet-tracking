import { TestBed } from '@angular/core/testing';

import { CoreModule } from 'src/app/core/core.module';
import { WeightTrackingService } from './weight-tracking.service';

describe('WeightTrackingService', () => {
  let service: WeightTrackingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ CoreModule ]
    });
    service = TestBed.inject(WeightTrackingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
