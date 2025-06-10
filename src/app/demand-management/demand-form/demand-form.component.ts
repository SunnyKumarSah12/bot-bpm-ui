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

  currrentClient: string = 'DTCC'; // Default client, can be changed based on requirements

  formLabels: any = {};
  generalInfoForm!: FormGroup;
  roleAndJobDescriptionForm!: FormGroup;
  eyContactForm!: FormGroup;
  clientContactForm!: FormGroup;

  // Dropdown option holders
  taSpocOptions: { name: string; email: string }[] = [];
  evaluationSpocOptions: { name: string; email: string }[] = [];
  competencyHeadOptions: { name: string; email: string }[] = [];
  clientEvaluationSpocOptions: { name: string; email: string }[] = [];
  clientCalibrationSpocOptions: { name: string; email: string }[] = [];
  clientHiringManagerOptions: { name: string; email: string }[] = [];

  competencyOptions = [
    { value: 'Java', label: 'Java' },
    { value: 'JavaScript', label: 'JavaScript' },
    { value: 'Angular', label: 'Angular' },
    { value: 'React', label: 'React' },
    { value: 'NodeJS', label: 'Node.js' },
    { value: 'SQL', label: 'SQL' },
    { value: 'Oracle', label: 'Oracle' },
    { value: 'C#', label: 'C#' },
    { value: 'PHP', label: 'PHP' },
    { value: 'Ruby', label: 'Ruby' },
    { value: 'Go', label: 'Go' },
    { value: 'Swift', label: 'Swift' },
    { value: 'Kotlin', label: 'Kotlin' },
    { value: 'C++', label: 'C++' },
    { value: 'C', label: 'C' },
    { value: 'HTML/CSS', label: 'HTML/CSS' },
    { value: 'Dotnet', label: '.NET' },
    { value: 'SAP', label: 'SAP' },
    { value: 'Python', label: 'Python' },
    { value: 'Data Engineering', label: 'Data Engineering' },
    { value: 'Data Science', label: 'Data Science' },
    { value: 'Cloud', label: 'Cloud' },
    { value: 'DevOps', label: 'DevOps' },
    { value: 'AI/ML', label: 'AI/ML' },
    { value: 'Cybersecurity', label: 'Cybersecurity' },
    { value: 'Java Full Stack Development', label: 'Java Full Stack Development' },
    { value: 'Mean Stack Development', label: 'Mean Stack Development' },
    { value: 'Mobile Development', label: 'Mobile Development' }
    // Add more as needed
  ];


  roleLevels = [
    // Analyst->Senior analyst- > associate consultant->consultant -> senior consultant -> manager -> senior manager -> director-> partner 
    { label: 'Analyst', value: 'Analyst', yoe: { min: 0, max: 1 } },
    { label: 'Senior Analyst', value: 'Senior Analyst', yoe: { min: 1, max: 2 } },
    { label: 'Associate Consultant', value: 'Associate Consultant', yoe: { min: 2, max: 4 } },
    { label: 'Consultant', value: 'Consultant', yoe: { min: 4, max: 6 } },
    { label: 'Senior Consultant', value: 'Senior Consultant', yoe: { min: 6, max: 8 } },
    { label: 'Manager', value: 'Manager', yoe: { min: 8, max: 12 } },
    { label: 'Senior Manager', value: 'Senior Manager', yoe: { min: 12, max: 15 } },
    { label: 'Director', value: 'Director', yoe: { min: 15, max: 20 } },
    { label: 'Partner', value: 'Partner', yoe: { min: 20, max: 25 } },
    // Uncomment and modify the following lines if you want to add more role levels
  ];

  // Dropdown options for role levels
  onRoleLevelChange(value: string): void {
    // Find the selected role level based on the value
    const selected = this.roleLevels.find(l => l.value === value);
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
    this.formLabels = this.demandService.getLabelsForClient(this.currrentClient);
    this.roleAndJobDescriptionForm.get('jobDescription')?.valueChanges.subscribe(value => {
      // This code runs every time the 'jobDescription' value changes
      if (!value || value.trim() === '') {
        this.clearUploadedFile();
      }
    });

    // Initialize form with existing demand data if in edit mode 
    if (this.mode === 'edit' && this.demand) {
      this.patchGeneralInfoForm(this.demand);
      this.patchRoleAndJobDescriptionForm(this.demand);
      this.patchEyGdsContactForm(this.demand);
      this.patchClientContactForm(this.demand);
    }
  }

  rtoOptions: string[] = ['Hybrid', 'WFO', 'WFH'];
  shiftOptions: string[] = ['Yes', 'No', 'WeekendOnCall'];

  initForm() {
    console.log(this.demand);
    this.generalInfoForm = this.fb.group({
      clientName: ['', Validators.required],
      accountName: ['', Validators.required],
      divisionName: ['', Validators.required],
      subdivisionName: [''],
      priority: ['', Validators.required],
      location: ['', Validators.required],
      shiftStartTime: [''],
      shiftEndTime: [''],
      isDemandActive: ['Y'],
      agingDays: [''],
      demandStatus: ['Open'],
      demandCreationDate: [new Date(), Validators.required],
      demandEndDate: [null],
      createdBy: [''],
      interviewDate: [new Date()],
      interviewTime: [''],
      rtoStatus: ['', Validators.required],
      rotationShifts: [[]], // default as empty array for multi-select
    });

    this.roleAndJobDescriptionForm = this.fb.group({
      role: ['', Validators.required],
      roleLevel: ['', Validators.required],
      yoeMin: [0, Validators.required],
      yoeMax: [0, Validators.required],
      secondarySkillset: [''],
      primarySkillset: ['', Validators.required],
      calibrationInput: ['', Validators.required],
      jobDescription: ['', Validators.required],
    });

    this.eyContactForm = this.fb.group({
      eyTaSpoc: [''],
      eyTaSpocEmail: ['', Validators.required],
      eyEvaluationSpoc: [''],
      eyEvaluationSpocEmail: ['', Validators.required],
      competency: ['', Validators.required],
      eyCompetencyHead: [''],
      eyCompetencyHeadEmail: ['', Validators.required]
    });

    this.clientContactForm = this.fb.group({
      clientEvaluationSpoc: [''],
      clientEvaluationSpocEmail: [''],
      clientCalibrationSpoc: [''],
      clientCalibrationSpocEmail: [''],
      clientHiringManager: [''],
      clientHiringManagerEmail: ['']
    });
  }

  getCombinedInterviewDateTime(): Date | null {
    const date = this.generalInfoForm.get('interviewDate')?.value;
    const time = this.generalInfoForm.get('interviewTime')?.value;
    if (date && time) {
      const [hours, minutes] = time.split(':').map(Number);
      const result = new Date(date);
      result.setHours(hours, minutes, 0, 0);
      return result;
    }
    return null;
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
      role: data.role || '',
      roleLevel: data.roleLevel.value || '',
      priority: data.priority || '',
      primarySkillset: data.primarySkillset || '',
      location: data.location || '',
      shiftStartTime: data.shiftStartTime || '',
      shiftEndTime: data.shiftEndTime || '',
      isActive: data.isActive || 'Y',
      agingDays: data.agingDays || '',
      demandStatus: data.demandStatus || 'Open',
      demandCreationDate: data.demandCreationDate || '',
      demandEndDate: data.demandEndDate || '',
      createdBy: data.createdBy || '',
      interviewDate: data.interviewDate || '',
      interviewTime: data.interviewTime || '',
    });
  }

  patchRoleAndJobDescriptionForm(data: any): void {
    this.roleAndJobDescriptionForm.patchValue({
      role: data.role || '',
      roleLevel: data.roleLevel || '',
      yoeMin: data.yoeMin || '',
      yoeMax: data.yoeMax || '',
      primarySkillset: data.primarySkillset || '',
      secondarySkillset: data.secondarySkillset || '',
      calibrationInput: data.calibrationInput || '',
      jobDescription: data.jobDescription || '',
    });
  }

  patchEyGdsContactForm(data: any): void {
    this.eyContactForm.patchValue({
      eyTaSpoc: data.eyTaSpoc || '',
      eyTaSpocEmail: data.eyTaSpocEmail || '',
      eyEvaluationSpoc: data.eyEvaluationSpoc || '',
      eyEvaluationSpocEmail: data.eyEvaluationSpocEmail || '',
      competency: data.competency || '',
      eyCompetencyHead: data.eyCompetencyHead || '',
      eyCompetencyHeadEmail: data.eyCompetencyHeadEmail || ''
    });
  }

  patchClientContactForm(data: any): void {
    this.clientContactForm.patchValue({
      clientEvaluationSpoc: data.clientEvaluationSpoc || '',
      clientEvaluationSpocEmail: data.clientEvaluationSpocEmail || '',
      clientCalibrationSpoc: data.clientCalibrationSpoc || '',
      clientCalibrationSpocEmail: data.clientCalibrationSpocEmail || '',
      clientHiringManager: data.clientHiringManager || '',
      clientHiringManagerEmail: data.clientHiringManagerEmail || ''
    });
  }

  /**
   * Submits the form data if all forms are valid.
   */
  onSubmit() {
    if (this.generalInfoForm.valid && this.roleAndJobDescriptionForm.valid
      && this.eyContactForm.valid && this.clientContactForm.valid) {
      const formValue = this.getCombinedFormData();
      this.formSubmit.emit(formValue);
    } else {
      // show validation errors
      this.generalInfoForm.markAllAsTouched();
      this.roleAndJobDescriptionForm.markAllAsTouched();
      this.eyContactForm.markAllAsTouched();
      this.clientContactForm.markAllAsTouched();
      console.error('Form is invalid');
    }
  }

  isFormValid(): boolean {
    return this.generalInfoForm.valid && this.roleAndJobDescriptionForm.valid
      && this.eyContactForm.valid && this.clientContactForm.valid;
  }


  /**
   * Combines all form data into a single Demand object.
   * @returns {Demand} The combined demand data.
   */
  getCombinedFormData(): Demand {
    return {
      ...this.getGeneralInfoData(),
      ...this.getRoleAndJobDescriptionData(),
      ...this.getEyGdsContactData(),
      ...this.getClientContactData(),
      isDemandActive: this.demand?.isDemandActive || 'Y',
      isDemandExpired: this.demand?.isDemandExpired || 'N',
      demandStatus: this.demand?.demandStatus || 'Open',
      demandCreationDate: this.demand?.demandCreationDate || new Date(),
      demandEndDate: this.demand?.demandEndDate || new Date(),
      id: this.demand?.id || ''
    } as Demand;
  }

  getGeneralInfoData(): any {
    const formValue = this.generalInfoForm.getRawValue();
    const interviewDateTime = this.getCombinedInterviewDateTime();
    return {
      ...formValue,
      shiftTime: `${this.demand?.shiftStartTime}-${this.demand?.shiftEndTime}`,
      interviewDateTime: interviewDateTime ? interviewDateTime.toISOString() : null // Add as ISO string
    };
  }

  getRoleAndJobDescriptionData(): any {
    const formValue = this.roleAndJobDescriptionForm.getRawValue();
    return {
      ...formValue,
      yoe: `${formValue.yoeMin}-${formValue.yoeMax}`
    };
  }
  onEyEvaluationSpocChange(selectedEmail: string) {
    const selected = this.evaluationSpocOptions.find(opt => opt.email === selectedEmail);
    if (selected) {
      this.eyContactForm.patchValue({
        eyEvaluationSpoc: selected.name,
        eyEvaluationSpocEmail: selected.email
      });
    }
  }
  onEyTaSpocChange(selectedEmail: string) {
    const selected = this.taSpocOptions.find(opt => opt.email === selectedEmail);
    if (selected) {
      this.eyContactForm.patchValue({
        eyTaSpoc: selected.name,
        eyTaSpocEmail: selected.email
      });
    }
  }
  onEyCompetencyHeadChange(selectedEmail: string) {
    const selected = this.competencyHeadOptions.find(opt => opt.email === selectedEmail);
    if (selected) {
      this.eyContactForm.patchValue({
        eyCompetencyHead: selected.name,
        eyCompetencyHeadEmail: selected.email
      });
    }
  }
  onClientEvaluationSpocChange(selectedEmail: string) {
    const selected = this.clientEvaluationSpocOptions.find(opt => opt.email === selectedEmail);
    if (selected) {
      this.clientContactForm.patchValue({
        clientEvaluationSpoc: selected.name,
        clientEvaluationSpocEmail: selected.email
      });
    }
  }
  onClientCalibrationSpocChange(selectedEmail: string) {
    const selected = this.clientCalibrationSpocOptions.find(opt => opt.email === selectedEmail);
    if (selected) {
      this.clientContactForm.patchValue({
        clientCalibrationSpoc: selected.name,
        clientCalibrationSpocEmail: selected.email
      });
    }
  }

  /**
   * Extracts EY GDS contact data from the form.
   * @returns {any} The EY GDS contact data.
   */
  getEyGdsContactData(): any {
    return {
      eyTaSpoc: this.eyContactForm.value.eyTaSpoc || '',
      eyTaSpocEmail: this.eyContactForm.value.eyTaSpocEmail || '',
      eyEvaluationSpoc: this.eyContactForm.value.eyEvaluationSpoc || '',
      eyEvaluationSpocEmail: this.eyContactForm.value.eyEvaluationSpocEmail || '',
      eyCompetencyHead: this.eyContactForm.value.eyCompetencyHead || '',
      eyCompetencyHeadEmail: this.eyContactForm.value.eyCompetencyHeadEmail || '',
      competency: this.eyContactForm.value.competency || ''
    };
  }

  /**
   * Extracts client contact data from the form.
   * @returns {any} The client contact data.
   */
  getClientContactData(): any {
    return {
      clientEvaluationSpoc: this.clientContactForm.value.clientEvaluationSpoc || '',
      clientEvaluationSpocEmail: this.clientContactForm.value.clientEvaluationSpocEmail || '',
      clientCalibrationSpoc: this.clientContactForm.value.clientCalibrationSpoc || '',
      clientCalibrationSpocEmail: this.clientContactForm.value.clientCalibrationSpocEmail || '',
      clientHiringManager: this.clientContactForm.value.clientHiringManager || '',
      clientHiringManagerEmail: this.clientContactForm.value.clientHiringManagerEmail || ''
    };
  }

  isDragOver = false;
  uploadedFileName: string | null = null;

  triggerFileInput() {
    const fileInput = document.getElementById('uploadJD') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = false;

    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      this.handleFile(file);
      event.dataTransfer.clearData();
    }
  }

  onJDFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.handleFile(input.files[0]);
    }
  }

  handleFile(file: File) {
    this.uploadedFileName = file.name;

    const allowedExtensions = ['txt', 'doc', 'docx'];
    const fileExtension = file.name.split('.').pop()?.toLowerCase();

    if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
      alert('Invalid file type! Please upload txt or Word files.');
      this.uploadedFileName = null;
      return;
    }

    if (fileExtension === 'txt') {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const fileContent = e.target.result;
        // Set content to your jobDescription form control
        this.roleAndJobDescriptionForm.patchValue({ jobDescription: fileContent });
      };
      reader.readAsText(file);
    } else {
      // For Word docs, you might want to upload file to backend or handle differently
      // Just keep the file for upload - you can add file upload logic here if needed
    }
  }

  clearUploadedFile(): void {
    this.uploadedFileName = null;
    this.roleAndJobDescriptionForm.patchValue({ jobDescription: '' });
    // Also clear file input element
    const fileInput = document.getElementById('uploadJD') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }
}
