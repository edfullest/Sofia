import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewerGamesViewComponent } from './viewer-games-view.component';

describe('ViewerGamesViewComponent', () => {
  let component: ViewerGamesViewComponent;
  let fixture: ComponentFixture<ViewerGamesViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewerGamesViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewerGamesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
