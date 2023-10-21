import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Evaluvator } from 'src/app/models/Evaluvator/evaluvator';
import { Request } from 'src/app/models/Request/request';
import { UsersService } from 'src/app/shared/services/users/users.service';

@Component({
  selector: 'app-evaluators',
  templateUrl: './evaluators.component.html',
  styleUrls: ['./evaluators.component.css']
})
export class EvaluatorsComponent implements OnInit {

  evaluvatorModel = new Evaluvator();
  requestModel = new Request();
  evaluvatorList: Evaluvator[] = [];
  registerEvaluatorForm!: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder, private userService: UsersService) {}

  ngOnInit(): void {
    this.initCreateEvaluatorForm();
    this.loadEvaluvatorsList();
  }

  loadEvaluvatorsList() {
    this.requestModel.token = sessionStorage.getItem("authToken");
    this.requestModel.flag = sessionStorage.getItem("role");

    this.userService.getEvaluvatorsList(this.requestModel).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        dataList.data[0].forEach((eachUser: Evaluvator) => {
          this.evaluvatorList.push(eachUser);
        })
      }
    })
  }

  onSubmitRegisterEvaluatorsForm() {
    const code = this.registerEvaluatorForm.controls['code'].value;
    const name = this.registerEvaluatorForm.controls['name'].value;
    const email = this.registerEvaluatorForm.controls['email'].value;

    if (code == "") {

    } else if (name == "") {

    } else if (email == "") {

    } else {
      this.evaluvatorModel.evaluatorCode = code;
      this.evaluvatorModel.fullName = name;
      this.evaluvatorModel.email = email;

      this.evaluvatorModel.token = sessionStorage.getItem("authToken");
      this.evaluvatorModel.flag = sessionStorage.getItem("role");

      this.userService.createEvaluator(this.evaluvatorModel).subscribe((resp: any) => {

        if (resp.code === 1) {
          console.log(resp)
        }
      }, (err) => {

      })
    }
  }

  initCreateEvaluatorForm() {
    this.registerEvaluatorForm = this.formBuilder.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', Validators.required]
    })
  }

}
