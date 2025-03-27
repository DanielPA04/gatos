import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { serverURL, httpHeader } from '../environment/environment';
import { Observable } from 'rxjs';
import { ICatImg } from '../model/catImg.interface';

@Injectable({
  providedIn: 'root',
})
export class CatService {
  // TODO
  serverURL: string = serverURL + '/v1/images/search';

  constructor(private oHttp: HttpClient) {}

  getCatImg(
    page: number,
    limit: number,
    order: string,
    tieneRaza: number
  ): Observable<ICatImg[]> {
    let url = this.serverURL ;
    if (page >= 0) {
      url += '?page=' + page;
    }
    url += '&limit=' + limit;
    url += '&order=' + order;
    url += '&has_breeds=' + tieneRaza;

    return this.oHttp.get<ICatImg[]>(url, httpHeader);
  }

  getCatById(id:string):Observable<ICatImg[]>{
    let url = this.serverURL;
    url += "?breed_ids=" + id;

    return this.oHttp.get<ICatImg[]>(url, httpHeader);


  }
}
