import { Component, OnInit } from '@angular/core';
import { WeightTracking } from 'src/app/core/models/weight-tracking.model';
import { WeightTrackingService } from 'src/app/core/services/crud-services/weight-tracking.service';

@Component({
  selector: 'app-weight-tracking',
  templateUrl: './weight-tracking.component.html',
  styleUrls: ['./weight-tracking.component.scss']
})
export class WeightTrackingComponent implements OnInit {
  weightLogs: WeightTracking[] = [];

  constructor(private service: WeightTrackingService) { }

  ngOnInit() {
    this.service.getAll().subscribe({
      next: resources => this.weightLogs = resources,
      error: error => alert('Erro ao carregar a lista: ' + error)
    });
  }
}
