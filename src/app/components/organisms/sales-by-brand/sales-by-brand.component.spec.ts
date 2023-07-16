import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesByBrandComponent } from './sales-by-brand.component';

describe('SalesByBrandComponent', () => {
  let component: SalesByBrandComponent;
  let fixture: ComponentFixture<SalesByBrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesByBrandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesByBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
