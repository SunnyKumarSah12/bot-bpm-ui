import { Component, Input } from '@angular/core';
import { Demand } from '../../demand-management/demand.service';

@Component({
  selector: 'app-demand-summary',
  templateUrl: './demand-summary.component.html',
  styleUrls: ['./demand-summary.component.css']
})
export class DemandSummaryComponent {
  @Input() selectedDemand!: Demand;
}
