import { TestBed } from '@angular/core/testing';

import { BlingClientService } from './bling-client.service';

describe('BlingClientService', () => {
  let service: BlingClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlingClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
