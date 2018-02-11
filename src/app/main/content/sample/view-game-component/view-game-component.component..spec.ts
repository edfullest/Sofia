import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewGameComponentComponent } from './view-game-component.component';

describe('ViewGameComponentComponent', () => {
  let component: ViewGameComponentComponent;
  let fixture: ComponentFixture<ViewGameComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewGameComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewGameComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
