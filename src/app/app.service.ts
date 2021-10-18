import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';

const { apiUrl } = environment

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }


  getAccountTokenList(addressHash: any) {
    return this.http.get(`${apiUrl}?module=account&action=tokenlist&address=${addressHash}`)
  }


}
