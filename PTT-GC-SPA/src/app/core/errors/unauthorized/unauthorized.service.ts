import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { SwalTool } from '@tools/swal.tools';
import { AuthService } from '@services/authentication/auth.service';
import { MsalService } from '@azure/msal-angular';

@Injectable({
  providedIn: 'root'
})
export class UnauthorizedService {

  constructor(
    private router: Router,
    private swalTool: SwalTool,
    private authService: AuthService,
    private msalService: MsalService,
  ) { }

  error(error) {
    if (error instanceof HttpErrorResponse) {
      if (error.status === 401 || 500) {
        // this.msalService.logout();
        // this.authService.Logout();
        setTimeout(() => {
          // this.swalTool.saveError();
          this.router.navigate(['']);
        }, 1500);
      }
    }
  }

  errorAuthen(error) {
    if (error instanceof HttpErrorResponse) {
      if (error.status === 401 || 500) {
        this.msalService.logout();
        // this.authService.Logout();
        setTimeout(() => {
          // this.swalTool.saveError();
          this.router.navigate(['']);
        }, 1500);
      }
    }
  }
}
