import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Request } from 'src/app/models/Request/request';
import { ForgotPwService } from 'src/app/shared/services/forgot-pw/forgot-pw.service';

@Component({
  selector: 'app-forgot-pw',
  templateUrl: './forgot-pw.component.html',
  styleUrls: ['./forgot-pw.component.css']
})
export class ForgotPwComponent implements OnInit {

  forgotPwForm!: FormGroup;
  requestModel = new Request();

  constructor(private formBuilder: FormBuilder, private router: Router, private forgotPwService: ForgotPwService
            , private tostr: ToastrService, private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.initForgotPwForm();
  }

  onSubmitAddForgotPwLogForm() {
    const emailAddress = this.forgotPwForm.controls['emailAddress'].value;
    const role = this.forgotPwForm.controls['role'].value;

    if (emailAddress == "") {

    } else if (role == "") {

    } else {
      this.requestModel.email = emailAddress;
      this.requestModel.flag = role;

      this.spinner.show();
      this.forgotPwService.addForgotPwLog(this.requestModel).subscribe((resp: any) => {

        if (resp.code === 1) {
          this.tostr.success("Forgot Password", "Auth Code Sent Sucessfully.");
          sessionStorage.setItem("email", emailAddress);
          this.router.navigate(['auth/reset-pw'])
        } else {
          this.tostr.error("Forgot Passwprd", resp.message);
        }

        this.spinner.hide();
      })
    }
  }

  initForgotPwForm() {
    this.forgotPwForm = this.formBuilder.group({
      emailAddress: ['', Validators.required],
      role: ['', Validators.required]
    })
  }

}
