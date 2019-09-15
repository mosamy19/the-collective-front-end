import { TestBed } from '@angular/core/testing';

import { SuperpowerService } from './superpower.service';

describe('SuperpowerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SuperpowerService = TestBed.get(SuperpowerService);
    expect(service).toBeTruthy();
  });
});
