import { TestBed } from '@angular/core/testing';

import { WeaknessService } from './weakness.service';

describe('WeaknessService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WeaknessService = TestBed.get(WeaknessService);
    expect(service).toBeTruthy();
  });
});
