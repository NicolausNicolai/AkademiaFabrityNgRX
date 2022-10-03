import { TestBed } from '@angular/core/testing';

import { ApplicationsRouterService } from './applications-router.service';

describe('ApplicationsRouterService', () => {
  let service: ApplicationsRouterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplicationsRouterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
