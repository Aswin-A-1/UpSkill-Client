import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaininstructorDashboardComponent } from './maininstructor-dashboard.component';

describe('MaininstructorDashboardComponent', () => {
  let component: MaininstructorDashboardComponent;
  let fixture: ComponentFixture<MaininstructorDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MaininstructorDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MaininstructorDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
