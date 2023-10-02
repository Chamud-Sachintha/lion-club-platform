import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/shared/services/users/users.service';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms'; 
import { ChairPerson } from 'src/app/models/ChairPerson/chair-person';

@Component({
  selector: 'app-chairpersons',
  templateUrl: './chairpersons.component.html',
  styleUrls: ['./chairpersons.component.css']
})
export class ChairpersonsComponent implements OnInit {

  chairPersonModel = new ChairPerson();
  regionChairPersonForm!: FormGroup;
  zonalChairPersonForm!: FormGroup;

  constructor(private router: Router, private userService: UsersService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initCreateRegionChairPersonForm();
    this.initCreateZonalChairPersonsForm();
  }

  onSubmitCreateZonalChairPerson() {
    const code = this.zonalChairPersonForm.controls['code'].value;
    const name = this.zonalChairPersonForm.controls['name'].value;
    const email = this.zonalChairPersonForm.controls['email'].value;

    if (code == "") {

    } else if (name == "") {

    } else if (email == "") {

    } else {
      this.chairPersonModel.zonalChairpersonCode = code;
      this.chairPersonModel.fullName = name;
      this.chairPersonModel.email = email;

      this.chairPersonModel.token = sessionStorage.getItem("authToken");
      this.chairPersonModel.flag = sessionStorage.getItem("role");
    }
  }

  initCreateZonalChairPersonsForm() {
    this.regionChairPersonForm = this.formBuilder.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', Validators.required]
    })
  }

  onSubmitCreateRegionChairPerson() {

    const code = this.regionChairPersonForm.controls['code'].value;
    const name = this.regionChairPersonForm.controls['name'].value;
    const email = this.regionChairPersonForm.controls['email'].value;

    if (code == "") {

    } else if (name == "") {

    } else if (email == "") {

    } else {
      this.chairPersonModel.reChairPersonCode = code;
      this.chairPersonModel.fullName = name;
      this.chairPersonModel.email = email;

      this.chairPersonModel.token = sessionStorage.getItem("authToken");
      this.chairPersonModel.flag = sessionStorage.getItem("role");

      this.userService.createRegionChairPerson(this.chairPersonModel).subscribe((resp: any) => {
        if (resp.code === 1) {
          console.log(resp)
        }
      }, (err) => {

      })
    }
  }

  initCreateRegionChairPersonForm() {
    this.regionChairPersonForm = this.formBuilder.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', Validators.required]
    })
  }

}
