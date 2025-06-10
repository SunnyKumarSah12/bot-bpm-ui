import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { JobSearchPageComponent } from './job-search-page/job-search-page.component';
import { JobService } from './job.service';
import { JobFilterComponent } from './job-filter/job-filter.component';
import { JobTableComponent } from './job-table/job-table.component';
import { MatChipsModule } from '@angular/material/chips';


@NgModule({
  declarations: [JobSearchPageComponent, JobFilterComponent, JobTableComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatRadioModule,
    MatAutocompleteModule,
    MatTableModule,
    MatChipsModule,
    RouterModule.forChild([{ path: '', component: JobSearchPageComponent }]),
  ],
  providers: [
    JobService
  ]
})
export class JobSearchModule { }
