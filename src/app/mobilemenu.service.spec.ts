import { TestBed } from '@angular/core/testing';

import { MobilemenuService } from './mobilemenu.service';

describe('MobilemenuService', () => {
  let service: MobilemenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MobilemenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
