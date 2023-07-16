import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockByBrandComponent } from './stock-by-brand.component';

describe('StockByBrandComponent', () => {
  let component: StockByBrandComponent;
  let fixture: ComponentFixture<StockByBrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockByBrandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockByBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
