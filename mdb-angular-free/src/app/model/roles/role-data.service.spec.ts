import { TestBed, inject } from '@angular/core/testing';

import { RoleDataService } from './role-data.service';

describe('RoleDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoleDataService]
    });
  });

  it('should be created', inject([RoleDataService], (service: RoleDataService) => {
    expect(service).toBeTruthy();
  }));
});
