import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-job-filter',
  templateUrl: './job-filter.component.html',
  styleUrls: ['./job-filter.component.css']
})
export class JobFilterComponent {
  @Output() filterChanged = new EventEmitter<any>();

  form: FormGroup = this.fb.group({
    skill: [''],
    location: [''],
    roleLevel: [''],
    yoeMin: [''],
    yoeMax: [''],
    workMode: [''],
    shiftOptions: [[]]
  });

  roles = ['Analyst', 'Senior', 'Lead'];
  skills = ['Angular', 'Java', 'Spring Boot', 'React', 'Python'];
  locations = ['Bangalore', 'Hyderabad', 'Pune', 'Chennai', 'Remote'];
  shiftOptionsList = ['Yes', 'No', 'WeekendOnCall'];

  private filterLabels: Record<string, string> = {
    skill: 'Skill',
    location: 'Location',
    roleLevel: 'Role',
    yoeMin: 'Min YOE',
    yoeMax: 'Max YOE',
    workMode: 'Work Mode',
    shiftOptions: 'Shift'
  };

  activeChips: { key: string, label: string, value: string }[] = [];


  constructor(private fb: FormBuilder) { }

  applyFilters() {
    const filters = this.form.value;

    // 🔄 Build chip data
    this.activeChips = [];
    for (const key in filters) {
      const val = filters[key];
      if (val && (Array.isArray(val) ? val.length : val !== '')) {
        const label = this.filterLabels[key] || key;
        if (Array.isArray(val)) {
          val.forEach((v: string) =>
            this.activeChips.push({ key, label, value: v })
          );
        } else {
          this.activeChips.push({ key, label, value: val });
        }
      }
    }
    this.filterChanged.emit(filters);
  }

  clearFilters() {
    this.form.reset();
    this.filterChanged.emit({});
  }

  removeFilter(keyToRemove: string) {
    if (this.form.controls[keyToRemove]) {
      const isArray = Array.isArray(this.form.value[keyToRemove]);
      this.form.patchValue({
        [keyToRemove]: isArray ? [] : ''
      });
      this.applyFilters();
    }
  }

}
