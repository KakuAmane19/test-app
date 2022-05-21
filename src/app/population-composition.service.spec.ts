import { TestBed } from '@angular/core/testing';

import { PopulationCompositionService } from './population-composition.service';

describe('PopulationCompositionService', () => {
  let service: PopulationCompositionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PopulationCompositionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
