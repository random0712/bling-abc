import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbcCurveListComponent } from './abc-curve-list.component';

describe('AbcCurveListComponent', () => {
  let component: AbcCurveListComponent;
  let fixture: ComponentFixture<AbcCurveListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbcCurveListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbcCurveListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
