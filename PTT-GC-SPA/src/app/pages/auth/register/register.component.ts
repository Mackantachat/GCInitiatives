import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '@services/authentication/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  error: string;
  decodeToken: any;

  registerForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  ngOnInit() {
  }

  Register() {
    this.authService.Register(this.registerForm.value).subscribe(response => {
      Swal.fire('Success!', 'Create User Successfully', 'success');
      this.router.navigate(['/login']);
    }, error => {
        if (error.error) {
          this.error = 'Username already exists';
        }
    });
  }

}
