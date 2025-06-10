import { Component, Input } from '@angular/core';
import { Job } from '../job.model';

@Component({
  selector: 'app-job-table',
  templateUrl: './job-table.component.html',
  styleUrls: ['./job-table.component.css']
})
export class JobTableComponent {
  @Input() jobs: Job[] = [];

  displayedColumns = ['title', 'client', 'location', 'roleLevel', 'skills', 'workMode', 'actions'];
}
