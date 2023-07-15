import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestSellersListComponent } from './best-sellers-list.component';

describe('BestSellersListComponent', () => {
  let component: BestSellersListComponent;
  let fixture: ComponentFixture<BestSellersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BestSellersListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BestSellersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
