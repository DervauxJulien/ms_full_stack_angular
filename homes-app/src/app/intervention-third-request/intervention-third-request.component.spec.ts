import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterventionThirdRequestComponent } from './intervention-third-request.component';

describe('InterventionThirdRequestComponent', () => {
  let component: InterventionThirdRequestComponent;
  let fixture: ComponentFixture<InterventionThirdRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [InterventionThirdRequestComponent]
    });
    fixture = TestBed.createComponent(InterventionThirdRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
