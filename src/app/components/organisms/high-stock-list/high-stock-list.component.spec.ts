import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighStockListComponent } from './high-stock-list.component';

describe('HighStockListComponent', () => {
  let component: HighStockListComponent;
  let fixture: ComponentFixture<HighStockListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HighStockListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HighStockListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
