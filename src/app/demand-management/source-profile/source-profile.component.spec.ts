import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceProfileComponent } from './source-profile.component';

describe('SourceProfileComponent', () => {
  let component: SourceProfileComponent;
  let fixture: ComponentFixture<SourceProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SourceProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SourceProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
