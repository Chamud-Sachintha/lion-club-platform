import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PointTemplate } from 'src/app/models/PointTemplate/point-template';
import { ValueList } from 'src/app/models/ValueList/value-list';
import { PointTemplateService } from 'src/app/shared/services/point-template/point-template.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-point-tables',
  templateUrl: './point-tables.component.html',
  styleUrls: ['./point-tables.component.css']
})
export class PointTablesComponent implements OnInit {

  public pointTableValueRowForm!: FormGroup;
  templateInfo = new PointTemplate();
  valueList!: FormArray;

  constructor(private formBuilder: FormBuilder, private pointTemplateService: PointTemplateService, private tostr: ToastrService) {}

  ngOnInit(): void {
    this.initAddPointTableValueRowForm();
  }

  onSubmitCreatePointTableForm() {
    this.templateInfo.valueList = [];
    const templateName = this.pointTableValueRowForm.controls['templateName'].value;
    console.log(templateName);
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

  createValueArrayForm() {
    return this.formBuilder.group({
      'name': ['', Validators.required],
      'value': ['', Validators.required]
    })
  }
}
