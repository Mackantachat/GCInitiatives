import { TestBed } from '@angular/core/testing';

import { PerformanceInactiveService } from './performance-inactives.service';

describe('PerformanceInactivesService', () => {
    let service: PerformanceInactiveService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(PerformanceInactiveService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
