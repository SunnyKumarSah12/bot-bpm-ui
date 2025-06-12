import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Profile } from '../profile.model';

@Component({
  selector: 'app-profile-table',
  templateUrl: './profile-table.component.html',
  styleUrls: ['./profile-table.component.css']
})
export class ProfileTableComponent implements OnInit {
  @Input() profiles: Profile[] = [];

  displayedColumns: string[] = ['name', 'skill', 'location', 'experience', 'role', 'availability', 'rating'];
  dataSource: MatTableDataSource<Profile> = new MatTableDataSource(); 

  ngOnInit(): void {
    this.dataSource.data = this.profiles;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['profiles']) {
      this.dataSource.data = this.profiles || [];
    }
  }

}
