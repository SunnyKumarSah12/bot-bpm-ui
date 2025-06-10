
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Job } from '../job.model';
import { JobService } from '../job.service';
@Component({
   selector: 'app-job-search-page',
   templateUrl: './job-search-page.component.html',
   styleUrls: ['./job-search-page.component.css']
})
export class JobSearchPageComponent {
  jobs$: Observable<Job[]> = this.jobService.jobs$;

  constructor(private jobService: JobService) {}

  onFilterChange(criteria: any) {
    this.jobService.filterJobs(criteria);
  }
}








// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup } from '@angular/forms';

// interface Job {
//   title: string;
//   location: string;
//   skill: string;
//   roleLevel: string;
// }

// @Component({
//   selector: 'app-job-search-page',
//   templateUrl: './job-search-page.component.html',
//   styleUrls: ['./job-search-page.component.css']
// })
// export class JobSearchPageComponent implements OnInit {
//   searchForm!: FormGroup;
//   jobs: Job[] = [];
//   filteredJobs: Job[] = [];

//   locations = ['Bangalore', 'Mumbai', 'Hyderabad'];
//   skills = ['Angular', 'Java', 'Python'];
//   roleLevels = ['Junior', 'Mid', 'Senior'];

//   constructor(private fb: FormBuilder) {}

//   ngOnInit(): void {
//     this.jobs = [
//       { title: 'Angular Developer', location: 'Bangalore', skill: 'Angular', roleLevel: 'Junior' },
//       { title: 'Java Backend', location: 'Mumbai', skill: 'Java', roleLevel: 'Mid' },
//       { title: 'Python Engineer', location: 'Hyderabad', skill: 'Python', roleLevel: 'Senior' }
//     ];

//     this.searchForm = this.fb.group({
//       skill: [''],
//       location: [''],
//       roleLevel: ['']
//     });

//     this.filteredJobs = this.jobs;
//   }

//   onSearch(): void {
//     const { skill, location, roleLevel } = this.searchForm.value;
//     this.filteredJobs = this.jobs.filter(job =>
//       (!skill || job.skill === skill) &&
//       (!location || job.location === location) &&
//       (!roleLevel || job.roleLevel === roleLevel)
//     );
//   }

//   onReset(): void {
//     this.searchForm.reset();
//     this.filteredJobs = this.jobs;
//   }
// }
