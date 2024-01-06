import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent implements OnInit{
  loginForm!: FormGroup;

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) {

  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]]
    });
  }

  onSignIn() {
    this.authService.signin(this.loginForm.value.email, this.loginForm.value.password).subscribe((response) => {
      if (response.user_id) {
        localStorage.setItem('applifyUser', response.user_id);
        this.router.navigate(["/"]);
      } else {
        //throw error
      }
    });
    
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }

}
