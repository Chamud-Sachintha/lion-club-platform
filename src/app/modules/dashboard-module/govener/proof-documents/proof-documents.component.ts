import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProofDoc } from 'src/app/models/ProofDoc/proof-doc';
import { ProofDocumentsService } from 'src/app/shared/services/proof-documents/proof-documents.service';

@Component({
  selector: 'app-proof-documents',
  templateUrl: './proof-documents.component.html',
  styleUrls: ['./proof-documents.component.css']
})
export class ProofDocumentsComponent implements OnInit {

  documentModel = new ProofDoc();
  addProofDocumentForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private documentService: ProofDocumentsService) {}

  ngOnInit(): void {
    this.initCreateProofDocumentForm();
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
