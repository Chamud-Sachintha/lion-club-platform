import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContextUser } from 'src/app/models/ContextUser/context-user';
import { Request } from 'src/app/models/Request/request';
import { UsersService } from 'src/app/shared/services/users/users.service';

@Component({
  selector: 'app-context-users',
  templateUrl: './context-users.component.html',
  styleUrls: ['./context-users.component.css']
})
export class ContextUsersComponent implements OnInit {

  contextUserModel = new ContextUser();
  requestModel = new Request();
  contextUserList: ContextUser[] = [];
  registerContextUserForm!: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder, private userService: UsersService) {}

  ngOnInit(): void {
    this.initCreateContextUserForm();
    this.loadContextUserList();
  }

  loadContextUserList() {
    this.requestModel.token = sessionStorage.getItem("authToken");
    this.requestModel.flag  = sessionStorage.getItem("role");

    this.userService.getContextUserList(this.requestModel).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        dataList.data[0].forEach((eachUser: ContextUser) => {
          this.contextUserList.push(eachUser);
        })
      }
    })
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
