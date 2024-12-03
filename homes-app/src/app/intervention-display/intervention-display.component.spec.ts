import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterventionDisplayComponent } from './intervention-display.component';

describe('InterventionDisplayComponent', () => {
  let component: InterventionDisplayComponent;
  let fixture: ComponentFixture<InterventionDisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [InterventionDisplayComponent]
    });
    fixture = TestBed.createComponent(InterventionDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
