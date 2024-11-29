import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterventionFirstRequestComponent } from './intervention-first-request.component';

describe('InterventionFirstRequestComponent', () => {
  let component: InterventionFirstRequestComponent;
  let fixture: ComponentFixture<InterventionFirstRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [InterventionFirstRequestComponent]
    });
    fixture = TestBed.createComponent(InterventionFirstRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
