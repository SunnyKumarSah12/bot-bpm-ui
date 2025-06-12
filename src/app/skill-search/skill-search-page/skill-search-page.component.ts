import { Component } from '@angular/core';
import { Demand, DemandService } from '../../demand-management/demand.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SkillSearchService } from '../services/skill-search.service';
import { ReplaySubject, switchMap } from 'rxjs';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Profile } from '../profile.model';

@Component({
  selector: 'app-skill-search-page',
  templateUrl: './skill-search-page.component.html',
  styleUrls: ['./skill-search-page.component.css']
})
export class SkillSearchPageComponent {
  selectedDemand: Demand | null = null;
  filterForm!: FormGroup;
  roles = ['Analyst', 'Senior', 'Lead'];
  skills = ['Angular', 'Java', 'Spring Boot', 'React', 'Python'];
  locations = ['Bangalore', 'Hyderabad', 'Pune', 'Chennai', 'Remote'];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private demandService: DemandService,
    private skillSearchService: SkillSearchService
  ) { }


  ngOnInit() {
    this.selectedDemand = this.demandService.getSelectedDemand();

    const demandId = this.route.snapshot.queryParamMap.get('demandId');

    // Fallback: Fetch demand from backend using demandId
    if (!this.selectedDemand && demandId) {
      this.skillSearchService.getDemandById(demandId).subscribe((demand) => {
        this.selectedDemand = demand;
        this.demandService.setSelectedDemand(demand); // Store again
        this.initForm();
      });
    } else {
      this.initForm();
    }
    this.initializeSkillSearch();
  }

  initForm() {
    this.filterForm = this.fb.group({
      skill: [[this.selectedDemand?.primarySkillset || '']],
      role: [this.selectedDemand?.role || ''],
      roleLevel: [this.selectedDemand?.roleLevel || ''],
      yoeMin: [this.selectedDemand?.yoeMin || ''],
      yoeMax: [this.selectedDemand?.yoeMax || ''],
      location: [[this.selectedDemand?.location || '']]
    });

    // If no demand is selected, fetch all active profiles
    if (!this.selectedDemand) {
      this.skillSearchService.getAllActiveProfiles().subscribe((profiles) => {
        this.profileResults = profiles;
      });
    }

  }

  initializeSkillSearch() {
    this.filteredSkills.next(this.skills);
    // Listen for search box changes
    this.skillSearchCtrl.valueChanges.subscribe(() => {
      this.filterSkills();
    });
  }

  filteredSkills: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);
  skillSearchCtrl: FormControl = new FormControl();

  filterSkills(): void {
    const search = this.skillSearchCtrl.value?.toLowerCase() || '';
    const filtered = this.skills.filter(skill =>
      skill.toLowerCase().includes(search)
    );
    this.filteredSkills.next(filtered);
  }

  profileResults: Profile[] = [];

  onSearch(): void {
    const filters = this.filterForm.value;
    this.skillSearchService.getFilteredProfiles(filters).subscribe({
      next: (results) => {
        this.profileResults = results;
      },
      error: (error) => {
        console.error('Error fetching profiles:', error);
      }
    });
  }

  onReset(): void {
    this.selectedDemand = null; // Reset selected demand
    this.filterForm.reset();
    this.profileResults = []; // Clear previous search results
    this.skillSearchService.getAllActiveProfiles().subscribe((profiles) => {
      this.profileResults = profiles;
    });
  }
}
