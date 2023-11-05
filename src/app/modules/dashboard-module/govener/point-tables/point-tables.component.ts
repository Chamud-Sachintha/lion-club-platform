import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PointTemplate } from 'src/app/models/PointTemplate/point-template';
import { ValueList } from 'src/app/models/ValueList/value-list';
import { PointTemplateService } from 'src/app/shared/services/point-template/point-template.service';
import { ToastrService } from 'ngx-toastr';
import { SearchParam } from 'src/app/models/SearchParam/search-param';
import { Request } from 'src/app/models/Request/request';

@Component({
  selector: 'app-point-tables',
  templateUrl: './point-tables.component.html',
  styleUrls: ['./point-tables.component.css']
})
export class PointTablesComponent implements OnInit {

  public pointTableValueRowForm!: FormGroup;
  templateInfo = new PointTemplate();
  searchParamModel = new SearchParam();
  requestModel = new Request();
  pointTemplateList: PointTemplate[] = [];
  valueList!: FormArray;
  updatePointTemplateForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private pointTemplateService: PointTemplateService, private tostr: ToastrService) {}

  ngOnInit(): void {
    this.initAddPointTableValueRowForm();
    this.initUpdatePointTemplateForm();
    this.loadPointTemplateList();
  }

  onLoadPointTemplateInfo(templateName: string) {
    if (this.valueList) {
      this.valueList.clear()
    }
    this.searchParamModel.token = sessionStorage.getItem("authToken");
    this.searchParamModel.flag = sessionStorage.getItem("role");
    this.searchParamModel.pointTemplateCode = templateName;

    this.pointTemplateService.getTemplateObjByName(this.searchParamModel).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp))

      if (resp.code === 1) {
        this.updatePointTemplateForm.controls['templateName'].setValue(dataList.data[0].templateName);
        this.valueList = this.updatePointTemplateForm.get('valueList') as FormArray;
        
        dataList.data[0].valueList.forEach((eachValue: ValueList) => {
          let templateValueList = this.createValueArrayForm();
          templateValueList.controls['name'].setValue(eachValue.name);
          templateValueList.controls['value'].setValue(eachValue.value);

          this.valueList.push(templateValueList);
        })
      }
    })
  }

  onSubmitUpdatePointTemplateForm() {
    this.templateInfo.valueList = [];
    const templateName = this.updatePointTemplateForm.controls['templateName'].value;

    if (templateName == "") {

    } else {
      this.templateInfo.templateName = templateName;
      this.templateInfo.token = sessionStorage.getItem("authToken");
      this.templateInfo.flag = sessionStorage.getItem("role");
      this.updatePointTemplateForm.controls['valueList'].value.forEach((eachEl: ValueList) => {
        this.templateInfo.valueList.push(eachEl);
      });

      this.pointTemplateService.updatePointTemplateByCode(this.templateInfo).subscribe((resp: any) => {
        this.tostr.success("Update Point Template", "Point Template Updated Successfully");
        location.reload();
      }, (err) => {})
    }
  }

  loadPointTemplateList() {
    
    this.requestModel.token = sessionStorage.getItem("authToken");
    this.requestModel.flag = sessionStorage.getItem("role");

    this.pointTemplateService.getTemplateList(this.requestModel).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        dataList.data[0].forEach((eachTemplate: PointTemplate) => {
          eachTemplate.valueListJsonEncode = JSON.stringify(eachTemplate.valueList);
          console.log(eachTemplate)
          this.pointTemplateList.push(eachTemplate)
        })
      }
    })
  }

  onSubmitCreatePointTableForm() {
    this.templateInfo.valueList = [];
    const templateName = this.pointTableValueRowForm.controls['templateName'].value;

    if (templateName == "") {

    } else {
      this.templateInfo.templateName = templateName;
      this.templateInfo.token = sessionStorage.getItem("authToken");
      this.templateInfo.flag = sessionStorage.getItem("role");
      this.pointTableValueRowForm.controls['valueList'].value.forEach((eachEl: ValueList) => {
        this.templateInfo.valueList.push(eachEl);
      });

      this.pointTemplateService.addNewPointTemplate(this.templateInfo).subscribe((resp: any) => {
        this.tostr.success("Create Point Template", "Point Template Created Successfully");
        location.reload();
      }, (err) => {})
    }
  }

  addItem($event: any): void {
    this.valueList = this.pointTableValueRowForm.get('valueList') as FormArray;
    this.valueList.push(this.createValueArrayForm());

    $event.preventDefault();
  }

  removeFormControl(index: number) {
    this.valueList.removeAt(index); 
  }

  initAddPointTableValueRowForm() {
    this.pointTableValueRowForm = this.formBuilder.group({
      templateName: ['', Validators.required],
      valueList: this.formBuilder.array([])
    })
  }

  initUpdatePointTemplateForm() {
    this.updatePointTemplateForm = this.formBuilder.group({
      templateName: ['', Validators.required],
      valueList: this.formBuilder.array([])
    })
  }

  createValueArrayForm() {
    return this.formBuilder.group({
      'name': ['', Validators.required],
      'value': ['', Validators.required]
    })
  }
}
