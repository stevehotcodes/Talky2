import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalkiesComponent } from './talkies.component';

describe('TalkiesComponent', () => {
  let component: TalkiesComponent;
  let fixture: ComponentFixture<TalkiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TalkiesComponent]
    });
    fixture = TestBed.createComponent(TalkiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
