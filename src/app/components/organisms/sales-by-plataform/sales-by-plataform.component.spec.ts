import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesByPlatformComponent } from './sales-by-plataform.component';

describe('SalesByPlataformComponent', () => {
  let component: SalesByPlatformComponent;
  let fixture: ComponentFixture<SalesByPlatformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesByPlatformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesByPlatformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
