import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetGridItemComponent } from './widget-grid-item.component';

describe('WidgetGridItemComponent', () => {
  let component: WidgetGridItemComponent;
  let fixture: ComponentFixture<WidgetGridItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WidgetGridItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetGridItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
