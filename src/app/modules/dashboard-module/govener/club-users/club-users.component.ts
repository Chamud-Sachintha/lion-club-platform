import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Club } from 'src/app/models/Club/club';
import { ClubUser } from 'src/app/models/ClubUser/club-user';
import { Request } from 'src/app/models/Request/request';
import { SearchParam } from 'src/app/models/SearchParam/search-param';
import { ClubService } from 'src/app/shared/services/club/club.service';
import { UsersService } from 'src/app/shared/services/users/users.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-club-users',
  templateUrl: './club-users.component.html',
  styleUrls: ['./club-users.component.css']
})
export class ClubUsersComponent implements OnInit {

  clubMode = new Club();
  clubUserModel = new ClubUser();
  requestModel = new Request();
  clubUserList: ClubUser[] = [];
  searchParamModel = new SearchParam();
  registerClubUserForm!: FormGroup;
  updateClubUserForm!: FormGroup;

  clubList: Club[] = [];

  constructor(private router: Router, private formBuilder: FormBuilder, private userServcie: UsersService
            , private clubService: ClubService, private tostr: ToastrService) {}

  ngOnInit(): void {
    this.initCreateClubUsersForm();
    this.initUpdateClubUserForm();
    this.getClubList();
    this.loadClubUsersList();
  }

  deleteClubUserByCode(clubUserCode: string) {
    this.searchParamModel.token = sessionStorage.getItem("authToken");
    this.searchParamModel.flag = sessionStorage.getItem("role");
    this.searchParamModel.clubUserCode = clubUserCode;

    this.userServcie.deleteClubUserByCode(this.searchParamModel).subscribe((resp: any) => {

      if (resp.code === 1) {
        this.tostr.success("Delete Club User", "Club User Delete ")
        location.reload();
      }
    })
  }

  onLoadClubUserInfo(clubUserCode: string) {
    this.searchParamModel.token = sessionStorage.getItem("authToken");
    this.searchParamModel.flag = sessionStorage.getItem("role");
    this.searchParamModel.clubUserCode  = clubUserCode;

    this.userServcie.getClubUserInfoByCode(this.searchParamModel).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        this.updateClubUserForm.controls['code'].setValue(dataList.data[0].code);
        this.updateClubUserForm.controls['name'].setValue(dataList.data[0].name);
        this.updateClubUserForm.controls['email'].setValue(dataList.data[0].email);
        this.updateClubUserForm.controls['clubCode'].setValue(dataList.data[0].clubCode);
      }
    })
  }

  onSubmitUpdateClubUserForm() {
    const code = this.updateClubUserForm.controls['code'].value;
    const name = this.updateClubUserForm.controls['name'].value;
    const email = this.updateClubUserForm.controls['email'].value;
    const clubCode = this.updateClubUserForm.controls['clubCode'].value;

    if (code == "") {
      this.tostr.error("Empty Feilds Found", "Please Enter Club User Code");
    } else if (name == "") {
      this.tostr.error("Empty Feilds Found", "Please Enter Name");
    } else if (email == "") {
      this.tostr.error("Empty Feilds Found", "Please Enter Email Address");
    } else if (clubCode == "") {
      this.tostr.error("Empty Feilds Found", "Please Enter Club Code");
    } else {
      this.clubUserModel.clubUserCode = code;
      this.clubUserModel.fullName = name;
      this.clubUserModel.email = email;
      this.clubUserModel.clubCode = clubCode;
      this.clubUserModel.token = sessionStorage.getItem("authToken");
      this.clubUserModel.flag = sessionStorage.getItem("role");

      this.userServcie.updateClubUserByCode(this.clubUserModel).subscribe((resp: any) => {

        if (resp.code === 1) {
          this.tostr.success("Update Club", "Club Update Successfully");
          location.reload();
        }
      })
    }
  } 

  loadClubUsersList() {
    this.requestModel.token = sessionStorage.getItem("authToken");
    this.requestModel.flag = sessionStorage.getItem("role");

    this.userServcie.getClubUsersList(this.requestModel).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        dataList.data[0].forEach((eachUser: ClubUser) => {
          this.clubUserList.push(eachUser);
        })
      }
    })
  }

  getClubList() {
    this.clubMode.token = sessionStorage.getItem("authToken");
    this.clubMode.flag = sessionStorage.getItem("role");

    this.clubService.getClubList(this.clubMode).subscribe((resp: any) => {
      const dataList = JSON.parse(JSON.stringify(resp))

      if (resp.code === 1) {
        dataList.data[0].forEach((eachClub: Club) => {
          this.clubList.push(eachClub)
        })
      }
    }, (err) => {})
  }

  onSubmitCreateClubUserForm() {
    const code = this.registerClubUserForm.controls['code'].value;
    const name = this.registerClubUserForm.controls['name'].value;
    const email = this.registerClubUserForm.controls['email'].value;
    const clubCode = this.registerClubUserForm.controls['clubCode'].value;

    if (code == "") {
      this.tostr.error("Empty Feilds Found", "Please Enter Club User Code");
    } else if (name == "") {
      this.tostr.error("Empty Feilds Found", "Please Enter Name");
    } else if (email == "") {
      this.tostr.error("Empty Feilds Found", "Please Enter Email Address");
    } else if (clubCode == "") {
      this.tostr.error("Empty Feilds Found", "Please Enter Club Code");
    } else {
      this.clubUserModel.clubUserCode = code;
      this.clubUserModel.fullName = name;
      this.clubUserModel.email = email;
      this.clubUserModel.clubCode = clubCode;

      this.clubUserModel.token = sessionStorage.getItem("authToken");
      this.clubUserModel.flag  = sessionStorage.getItem("role");

      this.userServcie.createClubUser(this.clubUserModel).subscribe((resp: any) => {

        if (resp.code === 1) {
          this.tostr.success("Create Club User", "Club User Create Successfully");
          location.reload();
        } else if (resp.code === 0) {
          this.tostr.error("Create Club User", resp.message);
        }
      }, (err) => {

      })
    }
  }

  initCreateClubUsersForm() {
    this.registerClubUserForm = this.formBuilder.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', Validators.required],
      clubCode: ['', Validators.required]
    })
  }

  initUpdateClubUserForm() {
    this.updateClubUserForm = this.formBuilder.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', Validators.required],
      clubCode: ['', Validators.required]
    })
  }

}
