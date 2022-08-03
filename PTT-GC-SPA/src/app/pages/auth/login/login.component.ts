import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '@services/authentication/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  error: string;

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  ngOnInit() {
  }

  Login() {
    this.authService.Login(this.loginForm.value).subscribe(response => {
      this.router.navigate(['']);
    }, error => {
        if (error.error.title) {
          this.error = 'Username or Password is incorrect.';
        }
    });
  }

}
