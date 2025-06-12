import { Injectable } from '@angular/core';
import { Demand } from '../../demand-management/demand.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Profile } from '../profile.model';

@Injectable({
  providedIn: 'root'
})
export class SkillSearchService {

  constructor() { }

  
  private mockDemands: Demand[] = [
    {
      id: 1,
      clientName: 'EY',
      role: 'Angular Developer',
      roleLevel: 'Senior',
      primarySkillset: 'Angular, TypeScript',
      yoeMin: 4,
      yoeMax: 7,
      location: 'Bangalore'
    },
    {
      id: 2,
      clientName: 'EY',
      role: 'Java Developer',
      roleLevel: 'Analyst',
      primarySkillset: 'Java, Spring Boot',
      yoeMin: 2,
      yoeMax: 5,
      location: 'Hyderabad'
    }
  ];

  getDemandById(id: string): Observable<Demand | null> {
    const demand = this.mockDemands.find(d => d.id === +id) || null;
    return of(demand);
  }

    private allProfiles: Profile[] = [
    {
      id: 'P001',
      name: 'John Doe',
      skill: 'Angular',
      skillSet: ['Angular', 'TypeScript'],
      secondarySkillSet: 'HTML, CSS',
      location: 'Bangalore',
      experience: 4,
      yoeMin: 4,
      yoeMax: 7,
      role: 'Frontend Developer',
      roleLevel: 'Senior',
      primarySkillSet: 'Angular',
      availability: 'Immediate',
      rating: 4.5,
      email: 'john.doe@example.com',
      phone: '1234567890',
      noticePeriod: 'Immediate',
      currentCompany: 'ABC Corp',
      readyToRelocate: true,
      sourcedFrom: 'LinkedIn',
      createdBy: 'admin',
      createdDate: new Date(),
      updatedBy: 'admin',
      updatedDate: new Date(),
      profileStatus: 'Active',
      remarks: '',
      profileStatusReason: '',
      interviewStatus: '',
      interviewStatusReason: '',
      isActive: 'Y'
    },
    {
      id: 'P002',
      name: 'Jane Smith',
      skill: 'Java',
      skillSet: ['Java', 'Spring Boot'],
      secondarySkillSet: 'Hibernate',
      location: 'Hyderabad',
      experience: 6,
      yoeMin: 2,
      yoeMax: 5,
      role: 'Backend Developer',
      roleLevel: 'Analyst',
      primarySkillSet: 'Java',
      availability: '15 Days',
      rating: 4.2,
      email: 'jane.smith@example.com',
      phone: '9876543210',
      noticePeriod: '15 Days',
      currentCompany: 'XYZ Ltd',
      readyToRelocate: false,
      sourcedFrom: 'Referral',
      createdBy: 'admin',
      createdDate: new Date(),
      updatedBy: 'admin',
      updatedDate: new Date(),
      profileStatus: 'Active',
      remarks: '',
      profileStatusReason: '',
      interviewStatus: '',
      interviewStatusReason: '',
      isActive: 'Y'
    },
    // Add more mock profiles here...
  ];

  getFilteredProfiles(filters: any): Observable<Profile[]> {
    // Simple mock filter logic
    const result =  this.allProfiles.filter(p =>
      (!filters.skill || filters.skill.length === 0 || filters.skill.some((s: string) => p.skill.includes(s))) &&
      (!filters.role || p.role.toLowerCase().includes(filters.role.toLowerCase())) &&
      (!filters.roleLevel || p.roleLevel?.toLowerCase().includes(filters.roleLevel.toLowerCase())) &&
      (!filters.location || p.location.toLowerCase().includes(filters.location.toLowerCase())) &&
      (!filters.yoeMin || p.experience >= filters.yoeMin) &&
      (!filters.yoeMax || p.experience <= filters.yoeMax)
    );
    return of(result);
  }

  getAllActiveProfiles(): Observable<Profile[]> {
    return of(this.allProfiles.filter(p => p.isActive));
  }
}


// private filteredProfilesSubject = new BehaviorSubject<Profile[]>(this.allProfiles.filter(p => p.isActive));
//   filteredProfiles$ = this.filteredProfilesSubject.asObservable();

//   filterProfiles(filters: any): void {
//     const hasAnyFilter = Object.values(filters).some(val => !!val && val.length > 0);
//     let filtered = this.allProfiles.filter(p => p.isActive);

//     if (hasAnyFilter) {
//       filtered = filtered.filter(p => {
//         return (!filters.skill || filters.skill.length === 0 || filters.skill.some((s: string) => p.skill.includes(s))) &&
//                (!filters.role || p.role.toLowerCase().includes(filters.role.toLowerCase())) &&
//                (!filters.roleLevel || p.roleLevel?.toLowerCase().includes(filters.roleLevel.toLowerCase())) &&
//                (!filters.location || p.location.toLowerCase().includes(filters.location.toLowerCase())) &&
//                (!filters.yoeMin || p.experience >= filters.yoeMin) &&
//                (!filters.yoeMax || p.experience <= filters.yoeMax);
//       });
//     }

//     this.filteredProfilesSubject.next(filtered);
//   }

//   resetFilters() {
//     this.filteredProfilesSubject.next(this.allProfiles.filter(p => p.isActive));
//   }