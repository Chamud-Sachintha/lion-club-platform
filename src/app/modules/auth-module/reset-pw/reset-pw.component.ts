import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Request } from 'src/app/models/Request/request';
import { ForgotPwService } from 'src/app/shared/services/forgot-pw/forgot-pw.service';

@Component({
  selector: 'app-reset-pw',
  templateUrl: './reset-pw.component.html',
  styleUrls: ['./reset-pw.component.css']
})
export class ResetPwComponent implements OnInit {

  passwordResetForm!: FormGroup;
  requestParamModel = new Request();

  constructor(private formBuilder: FormBuilder, private router: Router, private forgotPwService: ForgotPwService  
            , private tostr: ToastrService, private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.initResetPasswordForm();
  }

  onSubmitChangePassword() {
    const authCode = this.passwordResetForm.controls['authCode'].value;
    const password = this.passwordResetForm.controls['password'].value;
    const confPassword = this.passwordResetForm.controls['confPassword'].value;

    if (authCode == "") {
      this.tostr.error("Empty Feilds Found", "Auth Code is required.");
    } else if (password == "") {
      this.tostr.error("Empty Feilds Found", "Password is required.");
    } else if (confPassword == "") {
      this.tostr.error("Empty Feilds Found", "Confirm Password is required.");
    } else if (password !== confPassword) {
      this.tostr.error("Empty Feilds Found", "Passwords are not matched..");
    } else {
      this.requestParamModel.authCode = authCode;
      this.requestParamModel.password = password;
      this.requestParamModel.email = sessionStorage.getItem("email");

      this.forgotPwService.resetPw(this.requestParamModel).subscribe((resp: any) => {

        if (resp.code === 1) {
          this.tostr.success("Reset Password", "Password Reset is Successfully.");
          this.router.navigate(['auth/login'])
        } else {
          this.tostr.error("Password Reset", resp.message);
        }
      })
    }
  }

  initResetPasswordForm() {
    this.passwordResetForm = this.formBuilder.group({
      authCode: ['', Validators.required],
      password: ['', Validators.required],
      confPassword: ['', Validators.required]
    })
  }

}
