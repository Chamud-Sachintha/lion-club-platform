import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from 'src/app/models/Auth/auth';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  authInfo = new Auth();
  userAuthForm!: FormGroup;

  constructor (private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.initUserAuthForm();
  }

  onSubmitUserAuthForm() {
    this.authInfo.username = this.userAuthForm.controls['userName'].value;
    this.authInfo.password = this.userAuthForm.controls['password'].value;
    this.authInfo.flag = this.userAuthForm.controls['flag'].value;

    this.authService.authenticateUser(this.authInfo).subscribe((resp: any) => {
      
      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        sessionStorage.setItem("authToken", dataList.token);
        sessionStorage.setItem("email", dataList.data[0].email);
        sessionStorage.setItem("role", dataList.data[0].userRole);

        this.router.navigate(['app']);
      } else {
        // have to implement ngx tast msg for invalid resp
      }
    })
  }

  initUserAuthForm() {
    this.userAuthForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      flag: ['', Validators.required]
    })
  }

}
