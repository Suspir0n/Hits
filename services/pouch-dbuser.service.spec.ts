import { TestBed } from '@angular/core/testing';

import { PouchDBUserService } from './pouch-dbuser.service';

describe('PouchDBUserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PouchDBUserService = TestBed.get(PouchDBUserService);
    expect(service).toBeTruthy();
  });
});
