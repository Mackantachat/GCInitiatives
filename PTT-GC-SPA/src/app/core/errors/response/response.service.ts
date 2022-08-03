import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { SwalTool } from '@tools/swal.tools';

@Injectable({
  providedIn: 'root'
})
export class ResponseService {

  constructor(
    private router: Router,
    private swalTool: SwalTool
  ) { }

  error(error) {
    if (error instanceof HttpErrorResponse) {
      if (error.status === 500) {
        setTimeout(() => {
          this.swalTool.saveError();
          this.router.navigate(['']);
        }, 1500);
      }
    }
  }
}
