import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClubUser } from 'src/app/models/ClubUser/club-user';
import { UsersService } from 'src/app/shared/services/users/users.service';

@Component({
  selector: 'app-club-users',
  templateUrl: './club-users.component.html',
  styleUrls: ['./club-users.component.css']
})
export class ClubUsersComponent implements OnInit {

  clubUserModel = new ClubUser();
  registerClubUserForm!: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder, private userServcie: UsersService) {}

  ngOnInit(): void {
    this.initCreateClubUsersForm();
  }

  onSubmitCreateClubUserForm() {
    const code = this.registerClubUserForm.controls['code'].value;
    const name = this.registerClubUserForm.controls['name'].value;
    const email = this.registerClubUserForm.controls['email'].value;

    if (code == "") {

    } else if (name == "") {

    } else if (email == "") {

    } else {
      this.clubUserModel.clubUserCode = code;
      this.clubUserModel.fullName = name;
      this.clubUserModel.email = email;

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
      email: ['', Validators.required]
    })
  }

}
