import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChangePw } from 'src/app/models/ChangePw/change-pw';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-change-pw',
  templateUrl: './change-pw.component.html',
  styleUrls: ['./change-pw.component.css']
})
export class ChangePwComponent implements OnInit {

  changePwModel = new ChangePw();
  passwordChangeForm!: FormGroup;

  constructor (private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.initChangePasswordForm();
  }

  onSubmitChangePassword() {
    const password = this.passwordChangeForm.controls['password'].value;
    const confirmPassword = this.passwordChangeForm.controls['confirmPassword'].value;

    if (password == "") {

    } else if (confirmPassword == "") {

    } else {
      this.changePwModel.password = password;
      this.changePwModel.email = sessionStorage.getItem("email");
      this.changePwModel.secret = sessionStorage.getItem("secret");

      this.authService.changePassword(this.changePwModel).subscribe((resp: any) => {

        if (resp.code === 1) {
          this.router.navigate(['/auth'])
        }
      })
    }
  }

  initChangePasswordForm() {
    this.passwordChangeForm = this.formBuilder.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    })
  }

}
