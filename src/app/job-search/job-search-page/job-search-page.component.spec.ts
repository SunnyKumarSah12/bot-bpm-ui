import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobSearchPageComponent } from './job-search-page.component';

describe('JobSearchPageComponent', () => {
  let component: JobSearchPageComponent;
  let fixture: ComponentFixture<JobSearchPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobSearchPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JobSearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
