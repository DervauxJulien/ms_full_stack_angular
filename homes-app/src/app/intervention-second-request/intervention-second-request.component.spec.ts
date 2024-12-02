import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterventionSecondRequestComponent } from './intervention-second-request.component';

describe('InterventionSecondRequestComponent', () => {
  let component: InterventionSecondRequestComponent;
  let fixture: ComponentFixture<InterventionSecondRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [InterventionSecondRequestComponent]
    });
    fixture = TestBed.createComponent(InterventionSecondRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
