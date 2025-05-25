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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private demandService: DemandService
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.demand = this.demandService.getDemandById(id);
    // If mode is not view, check if demandData is provided
    if (this.mode !== 'view' &&  this.demandData) {
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
}
