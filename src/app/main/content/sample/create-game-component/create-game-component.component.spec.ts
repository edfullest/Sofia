import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGameComponentComponent } from './create-game-component.component';

describe('CreateGameComponentComponent', () => {
  let component: CreateGameComponentComponent;
  let fixture: ComponentFixture<CreateGameComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateGameComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateGameComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
