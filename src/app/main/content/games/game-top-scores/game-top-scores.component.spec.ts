import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameTopScoresComponent } from './game-top-scores.component';

describe('GameTopScoresComponent', () => {
  let component: GameTopScoresComponent;
  let fixture: ComponentFixture<GameTopScoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameTopScoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameTopScoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
