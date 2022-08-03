import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { InitiativeList } from '@models/initiativeList';
import { InitiativeService } from '@services/initiative/initiative.service';
import { AuthService } from '@services/authentication/auth.service';
import { Status } from '@models/status';
import { Initiative } from '@models/initiative';

@Injectable()
export class MainResolver implements Resolve<Status> {
    pageNumber = 1;
    pageSize = 10;
    params: any = {};

    constructor(
        private authService: AuthService,
        private initiativeService: InitiativeService,
        private router: Router,
    ) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Status> {
        this.initiativeService.suggestionStatus = {} as Status;
        this.initiativeService.setGeneralData({} as Initiative);
        return of({} as Status);
    }
}
