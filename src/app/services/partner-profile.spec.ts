import { TestBed } from '@angular/core/testing';

import { PartnerProfile } from './partner-profile';

describe('PartnerProfile', () => {
  let service: PartnerProfile;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PartnerProfile);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
