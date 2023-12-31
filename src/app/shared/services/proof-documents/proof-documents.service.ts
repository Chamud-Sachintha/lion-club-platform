import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProofDoc } from 'src/app/models/ProofDoc/proof-doc';
import { Request } from 'src/app/models/Request/request';
import { SearchParam } from 'src/app/models/SearchParam/search-param';
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

  getProofDocList(requestModel: Request) {
    const path = environment.apiRoot + "get-proof-doc-list";
    return this.http.post(path, requestModel);
  }

  updateDocument(proofDocumentModel: ProofDoc) {
    const path = environment.apiRoot + "update-document";
    return this.http.post(path, proofDocumentModel);
  }

  getDocumentInfoByCode(searchParamModel: SearchParam) {
    const path = environment.apiRoot + "get-doc-by-code";
    return this.http.post(path, searchParamModel);
  }
}
