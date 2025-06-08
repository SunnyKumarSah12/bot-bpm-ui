import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-source-profile',
  templateUrl: './source-profile.component.html',
  styleUrls: ['./source-profile.component.css']
})
export class SourceProfileComponent {

  competency!: string;
  profiles: any[] = [];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.competency = this.route.snapshot.paramMap.get('competency')!;
    this.loadProfiles(this.competency);
  }

  loadProfiles(competency: string): void {
    // TODO: Call backend service here
    this.profiles = [
      { name: 'John Doe', experience: 5, skills: 'Java, Spring', source: 'Internal DB' },
      { name: 'Priya Sharma', experience: 3, skills: 'Angular, RxJS', source: 'Talent.com' },
      { name: 'Ravi Mehta', experience: 6, skills: 'React, Node', source: 'Naukri' }
    ];
  }
}
