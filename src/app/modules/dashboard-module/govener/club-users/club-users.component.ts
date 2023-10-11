import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Club } from 'src/app/models/Club/club';
import { ClubUser } from 'src/app/models/ClubUser/club-user';
import { ClubService } from 'src/app/shared/services/club/club.service';
import { UsersService } from 'src/app/shared/services/users/users.service';

@Component({
  selector: 'app-club-users',
  templateUrl: './club-users.component.html',
  styleUrls: ['./club-users.component.css']
})
export class ClubUsersComponent implements OnInit {

  clubMode = new Club();
  clubUserModel = new ClubUser();
  registerClubUserForm!: FormGroup;

  clubList: Club[] = [];

  constructor(private router: Router, private formBuilder: FormBuilder, private userServcie: UsersService
            , private clubService: ClubService) {}

  ngOnInit(): void {
    this.initCreateClubUsersForm();
    this.getClubList();
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

    } else if (name == "") {

    } else if (email == "") {

    } else if (clubCode == "") {

    } else {
      this.clubUserModel.clubUserCode = code;
      this.clubUserModel.fullName = name;
      this.clubUserModel.email = email;
      this.clubUserModel.clubCode = clubCode;

      this.clubUserModel.token = sessionStorage.getItem("authToken");
      this.clubUserModel.flag  = sessionStorage.getItem("role");

      this.userServcie.createClubUser(this.clubUserModel).subscribe((resp: any) => {

        if (resp.code === 1) {
          console.log(resp)
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

}
