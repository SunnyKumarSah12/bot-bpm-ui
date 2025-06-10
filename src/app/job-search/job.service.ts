import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Job } from './job.model';

@Injectable({ providedIn: 'root' })
export class JobService {
  private allJobs: Job[] = [
    {
      id: 1,
      title: 'Senior Angular Developer',
      client: 'EY',
      location: 'Bangalore',
      roleLevel: 'Senior',
      skills: ['Angular', 'TypeScript'],
      workMode: 'WFH',
      shiftOptions: ['No'],
      yoeMin: 4,
      yoeMax: 6,
      jdSummary: 'Frontend Angular role for enterprise apps'
    },
    {
      id: 2,
      title: 'Java Backend Engineer',
      client: 'Infosys',
      location: 'Pune',
      roleLevel: 'Lead',
      skills: ['Java', 'Spring Boot'],
      workMode: 'Hybrid',
      shiftOptions: ['WeekendOnCall'],
      yoeMin: 5,
      yoeMax: 9,
      jdSummary: 'Backend development in microservices architecture'
    },
    {
      id: 3,
      title: 'Fullstack Developer',
      client: 'TCS',
      location: 'Hyderabad',
      roleLevel: 'Analyst',
      skills: ['React', 'Java', 'Spring Boot'],
      workMode: 'WFO',
      shiftOptions: ['Yes'],
      yoeMin: 2,
      yoeMax: 4,
      jdSummary: 'React frontend and Java backend role'
    },
    {
      id: 4,
      title: 'Python Developer',
      client: 'Wipro',
      location: 'Remote',
      roleLevel: 'Senior',
      skills: ['Python', 'Flask'],
      workMode: 'WFH',
      shiftOptions: ['No'],
      yoeMin: 3,
      yoeMax: 5,
      jdSummary: 'REST API developer in Python for data projects'
    }
  ];

  private jobsSubject = new BehaviorSubject<Job[]>(this.allJobs);
  jobs$ = this.jobsSubject.asObservable();

  filterJobs(criteria: any) {
    const filtered = this.allJobs.filter(job => {
      const matchesSkill = !criteria.skill || job.skills.some(skill => skill.toLowerCase().includes(criteria.skill.toLowerCase()));
      const matchesLocation = !criteria.location || job.location.toLowerCase().includes(criteria.location.toLowerCase());
      const matchesRole = !criteria.roleLevel || job.roleLevel === criteria.roleLevel;
      const matchesYOE = (!criteria.yoeMin || job.yoeMin >= criteria.yoeMin) &&
                         (!criteria.yoeMax || job.yoeMax <= criteria.yoeMax);
      const matchesWorkMode = !criteria.workMode || job.workMode === criteria.workMode;
      const matchesShift = !criteria.shiftOptions?.length || criteria.shiftOptions.every((opt: string) => job.shiftOptions.includes(opt));
      return matchesSkill && matchesLocation && matchesRole && matchesYOE && matchesWorkMode && matchesShift;
    });
    this.jobsSubject.next(filtered);
  }
}
