import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/authentication/auth.service';
import { Login, User } from 'src/models/user.model';
import { JwtHelper } from 'src/services/jwt-helper.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  hide: boolean = true;
  log : Login = new Login();
  user: User = {
    userId: '',
    fullName: '',
    userName: '',
    password: '',
    userPhoto: '',
    userEmail: '',
    isAdmin: false,
    isDistributor: false,
    isAreaHead: false
  };

  constructor(private jwtHelper: JwtHelper, private authService: AuthService,
    private appComponent: AppComponent, private router: Router,
    private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    this.log.userName = this.loginForm.controls['userName'].getRawValue();
    this.log.password = this.loginForm.controls['password'].getRawValue();
    this.authService.login(this.log).subscribe({
      next: res => {      
        alert(res.message);
        if(res.message=='Successfully Login') {
          this.appComponent.token = res.token;
          this.jwtHelper.setToken(res.token);
          this.router.navigate(['/DashBoard']);
        }
      },
      error: () => alert('wrong username or password'),
    });
  }

}
