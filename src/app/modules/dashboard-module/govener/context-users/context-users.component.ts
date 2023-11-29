import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContextUser } from 'src/app/models/ContextUser/context-user';
import { Request } from 'src/app/models/Request/request';
import { SearchParam } from 'src/app/models/SearchParam/search-param';
import { UsersService } from 'src/app/shared/services/users/users.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-context-users',
  templateUrl: './context-users.component.html',
  styleUrls: ['./context-users.component.css']
})
export class ContextUsersComponent implements OnInit {

  contextUserModel = new ContextUser();
  requestModel = new Request();
  contextUserList: ContextUser[] = [];
  searchParamModel = new SearchParam();
  registerContextUserForm!: FormGroup;
  updateContextUserForm!: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder, private userService: UsersService, private tostr: ToastrService
            , private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.initCreateContextUserForm();
    this.initUpdateContextUserForm();
    this.loadContextUserList();
  }

  deleteContextUser(contextUserCode: string) {
    this.searchParamModel.token = sessionStorage.getItem("authToken");
    this.searchParamModel.flag = sessionStorage.getItem("role");
    this.searchParamModel.contextUserCode = contextUserCode;

    this.userService.deleteContextUserByCode(this.searchParamModel).subscribe((resp: any) => {

      if (resp.code === 1) {
        this.tostr.success("Delete Context User", "Context User Delete Successsfully.");
        location.reload();
      } else {
        this.tostr.error("Delete Context User", resp.message);
      }
    })
  }

  onLoadContextUserInfo(contextUserCode: string) {
    this.searchParamModel.token = sessionStorage.getItem("authToken");
    this.searchParamModel.flag = sessionStorage.getItem("role");
    this.searchParamModel.contextUserCode = contextUserCode;

    this.userService.getContextUserInfoByCode(this.searchParamModel).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        this.updateContextUserForm.controls['code'].setValue(dataList.data[0].code);
        this.updateContextUserForm.controls['name'].setValue(dataList.data[0].name);
        this.updateContextUserForm.controls['email'].setValue(dataList.data[0].email);
      }
    })
  }

  onSubmitUpdateContextUserForm() {
    const code = this.updateContextUserForm.controls['code'].value;
    const name = this.updateContextUserForm.controls['name'].value;
    const email = this.updateContextUserForm.controls['email'].value;

    if (code == "") {
      this.tostr.error("Empty Feilds Found", "Please Enter Context User Code");
    } else if (name == "") {
      this.tostr.error("Empty Feilds Found", "Please Enter Name");
    } else if (email == "") {
      this.tostr.error("Empty Feilds Found", "Please Enter Email Address");
    } else {
      this.contextUserModel.contextUserCode = code;
      this.contextUserModel.fullName = name;
      this.contextUserModel.email = email;
      this.contextUserModel.token = sessionStorage.getItem("authToken");
      this.contextUserModel.flag = sessionStorage.getItem("role");

      this.userService.updateContextUserByCode(this.contextUserModel).subscribe((resp: any) => {

        if (resp.code === 1) {
          this.tostr.success("Update Context User", "Context User Update Successfully");
          location.reload();
        }
      })
    }
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
      this.tostr.error("Empty Feilds Found", "Please Enter Context User Code");
    } else if (name == "") {
      this.tostr.error("Empty Feilds Found", "Please Enter Name");
    } else if (email == "") {
      this.tostr.error("Empty Feilds Found", "Please Enter Email Address");
    } else {
      this.contextUserModel.contextUserCode = code;
      this.contextUserModel.fullName = name;
      this.contextUserModel.email = email;

      this.contextUserModel.token = sessionStorage.getItem("authToken");
      this.contextUserModel.flag = sessionStorage.getItem("role");

      this.userService.createContextUser(this.contextUserModel).subscribe((resp: any) => {

        this.spinner.show();
        if (resp.code === 1) {
          this.tostr.success("Create Context User", "Context User Created Successfully");
          this.spinner.hide();

          this.loadContextUserList();
        } else {
          this.tostr.error("Create Context User", resp.message);
          this.spinner.hide();
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

  initUpdateContextUserForm() {
    this.updateContextUserForm = this.formBuilder.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', Validators.required]
    })
  }

}
