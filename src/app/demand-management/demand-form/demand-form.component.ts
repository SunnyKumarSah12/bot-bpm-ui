import { Component, EventEmitter, Output, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Demand, DemandService } from '../demand.service';

@Component({
  selector: 'app-demand-form',
  templateUrl: './demand-form.component.html',
  styleUrls: ['./demand-form.component.css']
})
export class DemandFormComponent implements OnInit {

  @Input() mode: 'add' | 'edit' = 'add';
  @Output() formSubmit = new EventEmitter<Demand>();
  @Input() demand: Demand | null = null;

  generalInfoForm!: FormGroup;
  roleAndJobDescriptionForm!: FormGroup;
  eyGdsContactForm!: FormGroup;
  clientContactForm!: FormGroup;

  // Dropdown option holders
  taSpocOptions: { name: string; email: string }[] = [];
  evaluationSpocOptions: { name: string; email: string }[] = [];
  competencyHeadOptions: { name: string; email: string }[] = [];
  clientEvaluationSpocOptions: { name: string; email: string }[] = [];
  clientCalibrationSpocOptions: { name: string; email: string }[] = [];
  clientHiringManagerOptions: { name: string; email: string }[] = [];


  roleLevels = [
    { label: 'Associate', value: 'Associate', yoe: { min: 3, max: 5 } },
    { label: 'Senior Associate', value: 'Senior Associate', yoe: { min: 5, max: 8 } },
    { label: 'Manager', value: 'Manager', yoe: { min: 8, max: 12 } },
    { label: 'Senior Manager', value: 'Senior Manager', yoe: { min: 12, max: 15 } }
  ];


  onRoleLevelChange(event: any): void {
    const selected = this.roleLevels.find(l => l.value === event.value);
    if (selected) {
      this.roleAndJobDescriptionForm.patchValue({
        yoeMin: selected.yoe.min,
        yoeMax: selected.yoe.max,
        roleLevel: selected.value,
        yoe: `${selected.yoe.min}-${selected.yoe.max}`
      });
    }
  }

  constructor(private fb: FormBuilder, private demandService: DemandService) { }

  ngOnInit() {
    this.initForm();
    this.loadDropdowns();
    // Initialize form with existing demand data if in edit mode 
    if (this.mode === 'edit' && this.demand) {
      this.patchGeneralInfoForm(this.demand);
      this.patchRoleAndJobDescriptionForm(this.demand);
      this.patchEyGdsContactForm(this.demand);
      this.patchClientContactForm(this.demand);
    }
  }

  initForm() {
    console.log(this.demand);
    this.generalInfoForm = this.fb.group({
      clientName: ['', Validators.required],
      accountName: ['', Validators.required],
      divisionName: ['', Validators.required],
      subdivisionName: [''],
      primarySkillset: ['', Validators.required],
      priority: ['', Validators.required],
      location: ['', Validators.required],
      shiftStartTime: [''],
      shiftEndTime: [''],
      isDemandActive: ['Y'],
      agingDays: [''],
      demandStatus: ['Open'],
      demandCreationDate: [new Date(), Validators.required],
      demandEndDate: [null],
      createdBy: ['']
    });

    this.roleAndJobDescriptionForm = this.fb.group({
      role: ['', Validators.required],
      roleLevel: ['', Validators.required],
      yoeMin: [0, Validators.required],
      yoeMax: [0, Validators.required],
      calibrationInput: ['', Validators.required],
      jobDescription: ['', Validators.required],
    });

    this.eyGdsContactForm = this.fb.group({
      eyGdsTaSpoc: ['', Validators.required],
      eyGdsEvaluationSpoc: ['', Validators.required],
      eyGdsCompetencyHead: ['', Validators.required]
    });

    this.clientContactForm = this.fb.group({
      clientEvaluationSpoc: [''],
      clientCalibrationSpoc: [''],
      clientHiringManagerName: [''],
      clientHiringManagerEmail: ['']
    });
  }


  loadDropdowns() {
    this.demandService.getEyTaSpocOptions().subscribe(data => this.taSpocOptions = data);
    this.demandService.getEyEvaluationSpocOptions().subscribe(data => this.evaluationSpocOptions = data);
    this.demandService.getEyCompetencyHeads().subscribe(data => this.competencyHeadOptions = data);
    this.demandService.getClientEvaluationSpocOptions().subscribe(data => this.clientEvaluationSpocOptions = data);
    this.demandService.getClientCalibrationSpocOptions().subscribe(data => this.clientCalibrationSpocOptions = data);
    this.demandService.getClientHiringManagers().subscribe(data => this.clientHiringManagerOptions = data);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['demand'] && !changes['demand'].firstChange) {
      const newData = changes['demand'].currentValue;
      this.patchGeneralInfoForm(newData);
      this.patchRoleAndJobDescriptionForm(newData);
      this.patchEyGdsContactForm(newData);
      this.patchClientContactForm(newData);
    }
  }

  patchGeneralInfoForm(data: any): void {
    this.generalInfoForm.patchValue({
      demandId: data.demandId || '',
      clientName: data.clientName || '',
      accountName: data.accountName || '',
      divisionName: data.divisionName || '',
      subdivisionName: data.subdivisionName || '',
      yoeMin: data.yoeMin || 0,
      yoeMax: data.yoeMax || 0,
      yoe: `${data.yoeMin}-${data.yoeMax}` || '',
      role: data.role || '',
      roleLevel: data.roleLevel.value || '',
      priority: data.priority || '',
      primarySkillset: data.primarySkillset || '',
      location: data.location || '',
      shiftStartTime: data.shiftStartTime || '',
      shiftEndTime: data.shiftEndTime || '',
      shiftTime: `${data.shiftStartTime}-${data.shiftEndTime}` || '',
      isActive: data.isActive || 'Y',
      agingDays: data.agingDays || '',
      demandStatus: data.demandStatus || 'Open',
      demandCreationDate: data.demandCreationDate || '',
      demandEndDate: data.demandEndDate || '',
      createdBy: data.createdBy || '',
    });
  }

  patchRoleAndJobDescriptionForm(data: any): void {
    this.roleAndJobDescriptionForm.patchValue({
      role: data.role || '',
      roleLevel: data.roleLevel || '',
      yoeMin: data.yoeMin || '',
      yoeMax: data.yoeMax || '',
      calibrationInput: data.calibrationInput || '',
      jobDescription: data.jobDescription || '',
    });
  }

  patchEyGdsContactForm(data: any): void {
    this.eyGdsContactForm.patchValue({
      eyGdsTaSpoc: data.eyGdsTaSpoc || '',
      eyGdsEvaluationSpoc: data.eyGdsEvaluationSpoc || '',
      eyGdsCompetencyHead: data.eyGdsCompetencyHead || ''
    });
  }

  patchClientContactForm(data: any): void {
    this.clientContactForm.patchValue({
      clientEvaluationSpoc: data.clientEvaluationSpoc || '',
      clientCalibrationSpoc: data.clientCalibrationSpoc || '',
      clientHiringManagerName: data.clientHiringManagerName || '',
      clientHiringManagerEmail: data.clientHiringManagerEmail || ''
    });
  }


  getCombinedFormData(): Demand {
    return {
      ...this.generalInfoForm.value,
      ...this.roleAndJobDescriptionForm.value,
      ...this.eyGdsContactForm.value,
      ...this.clientContactForm.value,
      yoe: `${this.demand?.yoeMin}-${this.demand?.yoeMax}`,
      shiftTime: `${this.demand?.shiftStartTime}-${this.demand?.shiftEndTime}`,
      isDemandActive: this.demand?.isDemandActive || 'Y',
      isDemandExpired: this.demand?.isDemandExpired || 'N',
      demandStatus: this.demand?.demandStatus || 'Open',
      demandCreationDate: this.demand?.demandCreationDate || new Date(),
      demandEndDate: this.demand?.demandEndDate || new Date(),
      id: this.demand?.id || 0
    } as Demand;
  }


  onSubmit() {
    if (this.generalInfoForm.valid && this.roleAndJobDescriptionForm.valid
      && this.eyGdsContactForm.valid && this.clientContactForm.valid) {
      const formValue = this.getCombinedFormData();
      this.formSubmit.emit(formValue);
    } else {
      // show validation errors
      this.generalInfoForm.markAllAsTouched();
      this.roleAndJobDescriptionForm.markAllAsTouched();
      this.eyGdsContactForm.markAllAsTouched();
      this.clientContactForm.markAllAsTouched();
      console.error('Form is invalid');
    }
  }

  isFormValid(): boolean {
    return this.generalInfoForm.valid && this.roleAndJobDescriptionForm.valid
      && this.eyGdsContactForm.valid && this.clientContactForm.valid;
  }

  getGeneralInfoData(): any {
    const formValue = this.generalInfoForm.getRawValue();
    return {
      ...formValue
    };
  }

  getRoleAndJobDescriptionData(): any {
    const formValue = this.roleAndJobDescriptionForm.getRawValue();
    return {
      ...formValue,
      yoe: `${formValue.yoeMin}-${formValue.yoeMax}`
    };
  }

  getEyGdsContactData(): any {
    return {
      taSpoc: this.generalInfoForm.value.taSpoc || '',
      evaluationSpoc: this.generalInfoForm.value.evaluationSpoc || '',
      competencyHead: this.generalInfoForm.value.competencyHead || ''
    };
  }

  getClientContactData(): any {
    return {
      clientEvaluationSpoc: this.generalInfoForm.value.clientEvaluationSpoc || '',
      clientCalibrationSpoc: this.generalInfoForm.value.clientCalibrationSpoc || '',
      clientHiringManager: this.generalInfoForm.value.clientHiringManager || ''
    };
  }
}
