import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Demand, DemandService } from '../demand.service';

@Component({
  selector: 'app-view-demand',
  templateUrl: './view-demand.component.html',
  styleUrls: ['./view-demand.component.css']
})
export class ViewDemandComponent implements OnInit {
  demand!: Demand | undefined;
  @Input() mode: 'add' | 'edit' | 'view' = 'view';
  @Input() demandData: Demand | null = null;

  currrentClient: string = 'DTCC'; // Default client, can be changed based on requirements

  formLabels: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private demandService: DemandService
  ) { }

  ngOnInit(): void {
    this.formLabels = this.demandService.getLabelsForClient(this.currrentClient);
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.demand = this.demandService.getDemandById(id);
    // If mode is not view, check if demandData is provided
    if (this.mode !== 'view' && this.demandData) {
      this.demand = this.demandData;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['demandData'] && changes['demandData'].currentValue) {
      this.demand = changes['demandData'].currentValue;
    }
  }

  goToEdit(): void {
    if (this.demand) {
      this.demandService.setSelectedDemand(this.demand);
      this.router.navigate(['/demand/edit']);
    }
  }

  editJDMode = false;
  originalJD = '';
  originalCalib = '';

  toggleJDMode() {
    this.editJDMode = !this.editJDMode;

    if (this.editJDMode) {
      this.originalJD = this.demand?.jobDescription || '';
      this.originalCalib = this.demand?.calibrationInput || '';
    }
  }

  saveJDChanges() {
    this.editJDMode = false;
    // You can emit this or save to backend here
  }

  cancelJDChanges() {
    if (this.demand) {
      this.demand.jobDescription = this.originalJD;
      this.demand.calibrationInput = this.originalCalib;
    }
    this.editJDMode = false;
  }


  downloadJD() {
    if (!this.demand || !this.demand.jobDescription) {
      console.error('No job description available to download.');
      return;
    }
    const content = this.demand?.jobDescription || '';
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const fileName = `${this.demand?.role || 'JD'}-${this.demand?.id}-${new Date().toISOString().slice(0, 10)}.txt`;

    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
