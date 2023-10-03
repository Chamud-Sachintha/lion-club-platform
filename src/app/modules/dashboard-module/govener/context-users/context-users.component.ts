import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContextUser } from 'src/app/models/ContextUser/context-user';
import { UsersService } from 'src/app/shared/services/users/users.service';

@Component({
  selector: 'app-context-users',
  templateUrl: './context-users.component.html',
  styleUrls: ['./context-users.component.css']
})
export class ContextUsersComponent implements OnInit {

  contextUserModel = new ContextUser();
  registerContextUserForm!: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder, private userService: UsersService) {}

  ngOnInit(): void {
    this.initCreateContextUserForm();
  }

  onSubmitCreateContextUserForm() {
    const code = this.registerContextUserForm.controls['code'].value;
    const name = this.registerContextUserForm.controls['name'].value;
    const email = this.registerContextUserForm.controls['email'].value;

    if (code == "") {

    } else if (name == "") {

    } else if (email == "") {

    } else {
      this.contextUserModel.contextUserCode = code;
      this.contextUserModel.fullName = name;
      this.contextUserModel.email = email;

      this.contextUserModel.token = sessionStorage.getItem("authToken");
      this.contextUserModel.flag = sessionStorage.getItem("role");

      this.userService.createContextUser(this.contextUserModel).subscribe((resp: any) => {

        if (resp.code === 1) {
          console.log(resp)
        }
      }, (err) => {

      })
    }
  }

  initCreateContextUserForm() {
    this.registerContextUserForm = this.formBuilder.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', Validators.required]
    })
  }

}
