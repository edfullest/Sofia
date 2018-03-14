import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NRLandingPageComponent } from './non-registered.component';

describe('NRLandingPageComponent', () => {
  let component: NRLandingPageComponent;
  let fixture: ComponentFixture<NRLandingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NRLandingPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NRLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
