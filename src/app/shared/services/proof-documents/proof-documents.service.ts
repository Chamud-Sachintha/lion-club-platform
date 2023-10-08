import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProofDoc } from 'src/app/models/ProofDoc/proof-doc';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProofDocumentsService {

  constructor(private http: HttpClient) { }

  addNewProofDocument(documentModel: ProofDoc) {
    const path = environment.apiRoot + "add-proof-doc";
    return this.http.post(path, documentModel);
  }
}
