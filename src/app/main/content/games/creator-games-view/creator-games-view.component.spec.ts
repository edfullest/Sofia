import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatorGamesViewComponent } from './creator-games-view.component';

describe('CreatorGamesViewComponent', () => {
  let component: CreatorGamesViewComponent;
  let fixture: ComponentFixture<CreatorGamesViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatorGamesViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatorGamesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
