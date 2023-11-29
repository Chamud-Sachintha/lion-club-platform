import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Evaluvator } from 'src/app/models/Evaluvator/evaluvator';
import { Request } from 'src/app/models/Request/request';
import { SearchParam } from 'src/app/models/SearchParam/search-param';
import { UsersService } from 'src/app/shared/services/users/users.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-evaluators',
  templateUrl: './evaluators.component.html',
  styleUrls: ['./evaluators.component.css']
})
export class EvaluatorsComponent implements OnInit {

  evaluvatorModel = new Evaluvator();
  requestModel = new Request();
  evaluvatorList: Evaluvator[] = [];
  searchParamModel = new SearchParam();
  registerEvaluatorForm!: FormGroup;
  updateEvaluvatorForm!: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder, private userService: UsersService
            , private tostr: ToastrService
            , private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.initCreateEvaluatorForm();
    this.initUpdateEvaluvatorForm();
    this.loadEvaluvatorsList();
  }

  deleteUserByCode(eveluvatorCode: string) {
    this.searchParamModel.token = sessionStorage.getItem("authToken");
    this.searchParamModel.flag = sessionStorage.getItem("role");
    this.searchParamModel.evaluvatorCode = eveluvatorCode;

    this.userService.deleteEveluvatorByCode(this.searchParamModel).subscribe((resp: any) => {

      if (resp.code === 1) {
        this.tostr.success("Delete Eveluvator", "Eveluvator Delete Successfully.");
        location.reload();
      } else {
        this.tostr.error("Delete Eveluvator", resp.message);
      }
    })
  }

  onLoadEvaluvatorInfo(userCode: string) {
    this.searchParamModel.token = sessionStorage.getItem("authToken");
    this.searchParamModel.flag = sessionStorage.getItem("role");
    this.searchParamModel.evaluvatorCode = userCode;

    this.userService.getEvaluvatorInfoByCode(this.searchParamModel).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        this.updateEvaluvatorForm.controls['code'].setValue(dataList.data[0].code);
        this.updateEvaluvatorForm.controls['name'].setValue(dataList.data[0].name);
        this.updateEvaluvatorForm.controls['email'].setValue(dataList.data[0].email);
      }
    })
  }

  onSubmitUpdateEvaluvatorForm() {
    const code = this.updateEvaluvatorForm.controls['code'].value;
    const name = this.updateEvaluvatorForm.controls['name'].value;
    const email = this.updateEvaluvatorForm.controls['email'].value;

    if (code == "") { 
      this.tostr.error("Empty Feilds Found", "Please Enter Evaluvator Code");
    } else if (name == "") {
      this.tostr.error("Empty Feilds Found", "Please Enter Name");
    } else if (email == "") {
      this.tostr.error("Empty Feilds Found", "Please Enter Email Address");
    } else {
      this.evaluvatorModel.evaluatorCode = code;
      this.evaluvatorModel.fullName = name;
      this.evaluvatorModel.email = email;
      this.evaluvatorModel.token = sessionStorage.getItem("authToken");
      this.evaluvatorModel.flag = sessionStorage.getItem("role");

      this.userService.updateEvaluvatorByCode(this.evaluvatorModel).subscribe((resp: any) => {

        if (resp.code === 1) {
          this.tostr.success("Update Evaluvator", "Evaluvator Update Successfully");
          location.reload();
        }
      })
    }
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
      this.tostr.error("Empty Feilds Found", "Please Enter Evaluvator Code");
    } else if (name == "") {
      this.tostr.error("Empty Feilds Found", "Please Enter Name");
    } else if (email == "") {
      this.tostr.error("Empty Feilds Found", "Please Enter Email Address");
    } else {
      this.evaluvatorModel.evaluatorCode = code;
      this.evaluvatorModel.fullName = name;
      this.evaluvatorModel.email = email;

      this.evaluvatorModel.token = sessionStorage.getItem("authToken");
      this.evaluvatorModel.flag = sessionStorage.getItem("role");

      this.spinner.show();
      this.userService.createEvaluator(this.evaluvatorModel).subscribe((resp: any) => {

        if (resp.code === 1) {
          this.tostr.success("Create Evaluvator", "Evaluvator Create Successfully");
          this.spinner.hide();
          
          this.loadEvaluvatorsList();
        } else {
          this.tostr.error("Create Evaluvator", resp.message);
          this.spinner.hide();
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

  initUpdateEvaluvatorForm() {
    this.updateEvaluvatorForm = this.formBuilder.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', Validators.required]
    })
  }

}
