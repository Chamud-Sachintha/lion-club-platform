import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProofDoc } from 'src/app/models/ProofDoc/proof-doc';
import { Request } from 'src/app/models/Request/request';
import { SearchParam } from 'src/app/models/SearchParam/search-param';
import { ProofDocumentsService } from 'src/app/shared/services/proof-documents/proof-documents.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-proof-documents',
  templateUrl: './proof-documents.component.html',
  styleUrls: ['./proof-documents.component.css']
})
export class ProofDocumentsComponent implements OnInit {

  documentModel = new ProofDoc();
  requestModel = new Request();
  prroofDocumentsList: ProofDoc[] = [];
  addProofDocumentForm!: FormGroup;
  updateProofDocumntForm!: FormGroup;
  searchParamModel = new SearchParam();

  constructor(private formBuilder: FormBuilder, private documentService: ProofDocumentsService, private tostr: ToastrService) {}

  ngOnInit(): void {
    this.initCreateProofDocumentForm();
    this.initUpdateDocumentForm();
    this.loadProofDocumentsList()
  }

  onLoadDocumentInfo(documentCode: string) {
    this.searchParamModel.token = sessionStorage.getItem("authToken");
    this.searchParamModel.flag = sessionStorage.getItem("role");
    this.searchParamModel.documentCode = documentCode;

    this.documentService.getDocumentInfoByCode(this.searchParamModel).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        this.updateProofDocumntForm.controls['code'].setValue(dataList.data[0].documentCode);
        this.updateProofDocumntForm.controls['name'].setValue(this.documentModel.documentName = dataList.data[0].documentName);
      }
    })
  }

  onSubmitUpdateDocumentForm() {
    const documentCode = this.updateProofDocumntForm.controls['code'].value;
    const documentName = this.updateProofDocumntForm.controls['name'].value;

    if (documentCode == "") {
      this.tostr.error("Empty Feilds Found", "Please Enter Document Code");
    } else if (documentName == "") {
      this.tostr.error("Empty Feilds Found", "Please Enter Document Name");
    } else {
      this.documentModel.token = sessionStorage.getItem("authToken");
      this.documentModel.flag = sessionStorage.getItem("role");
      this.documentModel.documentCode = documentCode;
      this.documentModel.documentName = documentName;

      this.documentService.updateDocument(this.documentModel).subscribe((resp: any) => {

        if (resp.code === 1) {
          this.tostr.success("Update Document", "Document Update Successfully");
          location.reload();
        }
      })
    }
  }

  loadProofDocumentsList() {
    this.requestModel.token = sessionStorage.getItem("authToken");
    this.requestModel.flag = sessionStorage.getItem("role");

    this.documentService.getProofDocList(this.requestModel).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        dataList.data[0].forEach((eachDoc: ProofDoc) => {
          const formatedText = eachDoc.documentName.substring(0, 50) + " " + "...";
          eachDoc.documentName = formatedText;-

          this.prroofDocumentsList.push(eachDoc);
        })
      }
    })
  }

  onSubmitCreateProofDocumentForm() {
    const code = this.addProofDocumentForm.controls['code'].value;
    const name = this.addProofDocumentForm.controls['name'].value;

    if (code == "") {
      this.tostr.error("Empty Feilds Found", "Please Enter Document Code");
    } else if (name == "") {
      this.tostr.error("Empty Feilds Found", "Please Enter Document Name");
    } else {
      this.documentModel.documentCode = code;
      this.documentModel.documentName = name;
      this.documentModel.token = sessionStorage.getItem("authToken");
      this.documentModel.flag = sessionStorage.getItem("role");

      this.documentService.addNewProofDocument(this.documentModel).subscribe((resp: any) => {

        if (resp.code === 1) {
          this.tostr.success("Create Document", "Document Created Successfully");
          location.reload();
        }
      }, (err) => {})
    }
  }

  initCreateProofDocumentForm() {
    this.addProofDocumentForm = this.formBuilder.group({
      code: ['', Validators.required],
      name: ['', Validators.required]
    })
  }

  initUpdateDocumentForm() {
    this.updateProofDocumntForm = this.formBuilder.group({
      code: ['', Validators.required],
      name: ['', Validators.required]
    })

    this.updateProofDocumntForm.controls['code'].disable();
  }

}
