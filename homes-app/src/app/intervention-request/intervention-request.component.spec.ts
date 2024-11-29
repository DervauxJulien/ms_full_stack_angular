import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterventionRequestComponent } from './intervention-request.component';

describe('InterventionRequestComponent', () => {
  let component: InterventionRequestComponent;
  let fixture: ComponentFixture<InterventionRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [InterventionRequestComponent]
    });
    fixture = TestBed.createComponent(InterventionRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
