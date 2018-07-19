import { TestBed, inject } from '@angular/core/testing';

import { CakeService } from './cake.service';

describe('CakeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CakeService]
    });
  });

  it('should be created', inject([CakeService], (service: CakeService) => {
    expect(service).toBeTruthy();
  }));
});
