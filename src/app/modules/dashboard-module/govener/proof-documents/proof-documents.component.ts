import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProofDoc } from 'src/app/models/ProofDoc/proof-doc';
import { Request } from 'src/app/models/Request/request';
import { ProofDocumentsService } from 'src/app/shared/services/proof-documents/proof-documents.service';

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

  constructor(private formBuilder: FormBuilder, private documentService: ProofDocumentsService) {}

  ngOnInit(): void {
    this.initCreateProofDocumentForm();
    this.loadProofDocumentsList()
  }

  loadProofDocumentsList() {
    this.requestModel.token = sessionStorage.getItem("authToken");
    this.requestModel.flag = sessionStorage.getItem("role");

    this.documentService.getProofDocList(this.requestModel).subscribe((resp: any) => {

      const dataList = JSON.parse(JSON.stringify(resp));

      if (resp.code === 1) {
        dataList.data[0].forEach((eachDoc: ProofDoc) => {
          this.prroofDocumentsList.push(eachDoc);
        })
      }
    })
  }

  onSubmitCreateProofDocumentForm() {
    const code = this.addProofDocumentForm.controls['code'].value;
    const name = this.addProofDocumentForm.controls['name'].value;

    if (code == "") {

    } else if (name == "") {

    } else {
      this.documentModel.documentCode = code;
      this.documentModel.documentName = name;
      this.documentModel.token = sessionStorage.getItem("authToken");
      this.documentModel.flag = sessionStorage.getItem("role");

      this.documentService.addNewProofDocument(this.documentModel).subscribe((resp: any) => {

        if (resp.code === 1) {
          console.log(resp)
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

}
