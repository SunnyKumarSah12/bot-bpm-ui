import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

export interface Demand {
  id: number;
  clientName?: string;
  accountName?: string;
  divisionName?: string;
  subdivisionName?: string;
  location?: string;
  priority?: string;
  recruiterName?: string;
  recruiterEmail?: string;
  demandStatus?: string;
  createdBy?: string;
  shiftEndTime?: string;
  shiftStartTime?: string;
  shiftTime?: string;
  interviewDateTime?: string; // Optional field for interview date and time
  interviewDate?: Date; // Optional field for interview date
  interviewTime?: string; // Optional field for interview time, can be an array of strings
  demandCreationDate?: Date;
  demandEndDate?: Date;
  isDemandActive?: string;
  isDemandExpired?: string;
  agingPeriod?: number;

  role?: string;
  roleLevel?: string;
  yoe?: string;
  yoeMin?: number;
  yoeMax?: number;
  primarySkillset?: string;
  secondarySkillset?: string;
  jobDescription?: string;
  calibrationInput?: string;

  eyTaSpoc?: string;
  eyTaSpocEmail?: string;
  eyEvaluationSpoc?: string;
  eyEvaluationSpocEmail?: string;
  competency?: string;
  eyCompetencyHead?: string;
  eyCompetencyHeadEmail?: string;


  clientHiringManager?: string;
  clientHiringManagerEmail?: string;
  clientCalibrationSpoc?: string;
  clientCalibrationSpocEmail?: string;
  clientEvaluationSpoc?: string;
  clientEvaluationSpocEmail?: string;

}

@Injectable({ providedIn: 'root' })
export class DemandService {
  private demandSubject = new BehaviorSubject<Demand[]>([
    {
      id: 1,
      clientName: 'Client A',
      accountName: 'Development',
      divisionName: 'Project X',
      subdivisionName: '',
      role: 'Frontend Developer',
      roleLevel: '',
      yoe: '3-5',
      yoeMin: 3,
      yoeMax: 5,
      agingPeriod: 90,
      primarySkillset: 'Angular, JavaScript',
      jobDescription: 'Developing frontend components',
      calibrationInput: '',
      demandCreationDate: new Date('2024-12-01'),
      demandEndDate: new Date('2025-01-30'),
      isDemandActive: 'Y',
      isDemandExpired: 'N',
      eyTaSpoc: '',
      eyEvaluationSpoc: '',
      competency: '',
      eyCompetencyHead: '',
      clientEvaluationSpoc: '',
      clientCalibrationSpoc: '',
      clientHiringManager: '',
      clientHiringManagerEmail: '',
      location: 'New York',
      priority: 'High',
      recruiterName: '',
      recruiterEmail: '',
      demandStatus: 'Open',
      createdBy: 'user',
      shiftEndTime: '',
      shiftStartTime: '',
      shiftTime: ''
    },
    {
      id: 2,
      clientName: 'Client B',
      accountName: 'Analytics',
      divisionName: 'Project Y',
      subdivisionName: '',
      role: 'Data Engineer',
      roleLevel: '',
      yoe: '3-5',
      yoeMin: 3,
      yoeMax: 5,
      agingPeriod: 60,
      primarySkillset: 'Python, SQL',
      jobDescription: 'Build data pipelines',
      calibrationInput: '',
      demandCreationDate: new Date('2024-12-10'),
      demandEndDate: new Date('2025-02-15'),
      isDemandActive: 'Y',
      isDemandExpired: 'N',
      eyTaSpoc: '',
      eyEvaluationSpoc: '',
      competency: 'Python',
      eyCompetencyHead: '',
      clientEvaluationSpoc: '',
      clientCalibrationSpoc: '',
      clientHiringManager: '',
      clientHiringManagerEmail: '',
      location: 'Chicago',
      priority: 'Medium',
      recruiterName: '',
      recruiterEmail: '',
      demandStatus: 'Open',
      createdBy: 'user',
      shiftEndTime: '',
      shiftStartTime: '',
      shiftTime: ''
    }
  ]);

  demands$ = this.demandSubject.asObservable();


  // Edit Component
  private selectedDemandSubject = new BehaviorSubject<Demand | null>(null);
  selectedDemand$ = this.selectedDemandSubject.asObservable();

  setSelectedDemand(demand: Demand | null) {
    this.selectedDemandSubject.next(demand);
  }

  getSelectedDemand(): Demand | null {
    return this.selectedDemandSubject.value;
  }

  getAllDemands(): Observable<Demand[]> {
    return of(this.demandSubject.value);
  }

  createDemand(newDemand: Demand): void {
    const updatedDemand: Demand = {
      ...newDemand,
      id: this.demandSubject.value.length + 1,
    };
    const updatedList = [...this.demandSubject.value, updatedDemand];
    this.demandSubject.next(updatedList);
    console.log('Created Demand:', updatedDemand);
  }

  createBulkDemands(template: Demand, count: number): void {
    const currentDemands = this.demandSubject.value;
    const nextId = currentDemands.length > 0 ? Math.max(...currentDemands.map(d => d.id)) + 1 : 1;

    const newDemands: Demand[] = Array.from({ length: count }, (_, i) => ({
      ...template,
      id: nextId + i,
    }));

    const updatedList = [...currentDemands, ...newDemands];
    this.demandSubject.next(updatedList);
    console.log(`Created ${count} bulk demands.`);
  }

  updateDemand(updatedDemand: Demand) {
    const updated = this.demandSubject.value.map(d => d.id === updatedDemand.id ? updatedDemand : d);
    this.demandSubject.next(updated);
  }

  deleteDemand(id: number) {
    const updated = this.demandSubject.value.filter(d => d.id !== id);
    this.demandSubject.next(updated);
  }

  getDemandById(id: number): Demand | undefined {
    return this.demandSubject.value.find(d => d.id === id);
  }

  getEyTaSpocOptions(): Observable<{ name: string; email: string }[]> {
    return of([
      { name: 'EyTaSpocA', email: 'eytaspoc.a@example.com' },
      { name: 'EyTaSpocB', email: 'eytaspoc.b@example.com' },
      { name: 'EyTaSpocC', email: 'eytaspoc.c@example.com' },
    ]);
  }

  getEyCompetencyHeads(): Observable<{ name: string; email: string }[]> {
    return of([
      { name: 'CompetencyA', email: 'eycompetency.a@example.com' },
      { name: 'CompetencyB', email: 'eycompetency.b@example.com' },
      { name: 'CompetencyC', email: 'eycompetency.c@example.com' },
    ]);
  }

  getEyEvaluationSpocOptions(): Observable<{ name: string; email: string }[]> {
    return of([
      { name: 'EvaluationSpocA', email: 'eyevaluationspoc.a@example.com' },
      { name: 'EvaluationSpocB', email: 'eyevaluationspoc.b@example.com' },
    ]);
  }

  getClientHiringManagers(): Observable<{ name: string; email: string }[]> {
    return of([
      { name: 'ClientHiringManager A', email: 'clienthiringmanager.a@example.com' },
      { name: 'ClientHiringManager B', email: 'clienthiringmanager.b@example.com' },
    ]);
  }

  getClientEvaluationSpocOptions(): Observable<{ name: string; email: string }[]> {
    return of([
      { name: 'ClientEvaluationSpocA', email: 'clientevaluationspoc.a@example.com' },
      { name: 'ClientEvaluationSpocB', email: 'clientevaluationspoc.b@example.com' },
    ]);
  }

  getClientCalibrationSpocOptions(): Observable<{ name: string; email: string }[]> {
    return of([
      { name: 'ClientCalibrationSpocA', email: 'clientcalibrationspoc.a@example.com' },
      { name: 'ClientCalibrationSpocB', email: 'clientcalibrationspoc.b@example.com' },
    ]);
  }

  CLIENT_LABEL_MAPS: { [key: string]: ClientLabelMap } = {
    DTCC: {
      clientName: 'DTCC',
      accountName: 'IT Tower',
      divisionName: 'Sub IT Tower',
      subdivisionName: 'Sub Division',
      clientHiringManager: 'DTCC Hiring Manager',
      clientHiringManagerEmail: 'DTCC Hiring Manager Email',
      clientCalibrationSpoc: 'DTCC Calibration Spoc',
      clientCalibrationSpocEmail: 'DTCC Calibration Spoc Email',
      clientEvaluationSpoc: 'DTCC Evaluation Spoc',
      clientEvaluationSpocEmail: 'DTCC Evaluation Spoc Email',
    },
    Default: {
      clientName: 'Client',
      accountName: 'Account',
      divisionName: 'Division',
      subdivisionName: 'Sub Division',
      clientHiringManager: 'Client Hiring Manager',
      clientHiringManagerEmail: 'Client Hiring Manager Email',
      clientCalibrationSpoc: 'Client Calibration Spoc',
      clientCalibrationSpocEmail: 'Client Calibration Spoc Email',
      clientEvaluationSpoc: 'Client Evaluation Spoc',
      clientEvaluationSpocEmail: 'Client Evaluation Spoc Email',
    }
  };

  getLabelsForClient(clientName: string): ClientLabelMap {
    return this.CLIENT_LABEL_MAPS[clientName] || this.CLIENT_LABEL_MAPS['Default'];
  }

  

}

interface ClientLabelMap {
  clientName: string;
  accountName: string;
  divisionName: string;
  subdivisionName: string;
  clientHiringManager: string;
  clientHiringManagerEmail: string;
  clientCalibrationSpoc: string;
  clientCalibrationSpocEmail: string;
  clientEvaluationSpoc: string;
  clientEvaluationSpocEmail: string;
}
