import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBestScoresComponent } from './my-best-scores.component';

describe('MyBestScoresComponent', () => {
  let component: MyBestScoresComponent;
  let fixture: ComponentFixture<MyBestScoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyBestScoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyBestScoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
