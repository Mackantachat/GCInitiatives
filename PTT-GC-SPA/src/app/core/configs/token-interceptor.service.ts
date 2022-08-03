import { AuthService } from '@services/authentication/auth.service';
import { Injectable, Injector } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class TokenInterceptorService {

  constructor(private injector: Injector) { }

  intercept(req, next) {
    const authService = this.injector.get(AuthService);
    const tokenReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authService.getToken()}`
      }
    });
    return next.handle(tokenReq);
  }
}
