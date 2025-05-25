// src/app/demand-management/demand-management.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatStepperModule } from '@angular/material/stepper';


import { DemandManagementRoutingModule } from './demand-management-routing.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { DemandListComponent } from './demand-list/demand-list.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HttpClientModule } from '@angular/common/http';
import { MatSortModule } from '@angular/material/sort';
import { DemandService } from './demand.service';
import { AddDemandComponent } from './add-demand/add-demand.component';
import { DemandFormComponent } from './demand-form/demand-form.component';
import { EditDemandComponent } from './edit-demand/edit-demand.component';
import { AssignDemandComponent } from './assign-demand/assign-demand.component';
import { ViewDemandComponent } from './view-demand/view-demand.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

@NgModule({
  declarations: [
    DemandListComponent,
    AddDemandComponent,
    EditDemandComponent,
    AssignDemandComponent,
    ViewDemandComponent,
    DemandFormComponent,
    ConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MatDividerModule,
    MatTooltipModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatCardModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatGridListModule,
    MatDatepickerModule,
    MatStepperModule,
    DemandManagementRoutingModule
  ],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true }
    },
    DemandService
  ]
})
export class DemandManagementModule { }
