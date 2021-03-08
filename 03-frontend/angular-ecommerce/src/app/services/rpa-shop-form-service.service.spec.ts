import { TestBed } from '@angular/core/testing';

import { RpaShopFormServiceService } from './rpa-shop-form-service.service';

describe('RpaShopFormServiceService', () => {
  let service: RpaShopFormServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RpaShopFormServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
