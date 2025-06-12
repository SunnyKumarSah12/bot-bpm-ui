import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatGridListModule } from '@angular/material/grid-list';
import { SkillSearchService } from './services/skill-search.service';
import { DemandSummaryComponent } from './demand-summary/demand-summary.component';
import { DemandTableComponent } from './demand-table/demand-table.component';
import { ProfileTableComponent } from './profile-table/profile-table.component';
import { SkillSearchPageComponent } from './skill-search-page/skill-search-page.component';




@NgModule({
  declarations: [DemandSummaryComponent, DemandTableComponent, SkillSearchPageComponent, ProfileTableComponent,],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDividerModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatRadioModule,
    MatAutocompleteModule,
    NgxMatSelectSearchModule,
    MatTableModule,
    MatChipsModule,
    MatGridListModule,
    RouterModule.forChild([{ path: '', component: SkillSearchPageComponent }]),
  ],
  providers: [
    SkillSearchService
  ]
})
export class SkillSearchModule { }
