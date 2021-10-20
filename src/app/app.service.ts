import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { BehaviorSubject, of } from 'rxjs';

const { apiUrl } = environment

@Injectable({
  providedIn: 'root'
})
export class AppService {

  selectedTokenBalance: any

  private _contractToken$ = new BehaviorSubject<any>(null)
  get contractToken$() { return this._contractToken$ }

  constructor(private http: HttpClient) { }

  getAccountTokenList(addressHash: string) {
    return this.http.get(`${apiUrl}?module=account&action=tokenlist&address=${addressHash}`)
      .pipe(
        tap(({ message, result, status }: any) => console.log('TOKEN LIST: ', result)),
      )
  }

  getTokenByContract(contractAddressHash: string) {
    return this.http.get(`${apiUrl}?module=token&action=getToken&contractaddress=${contractAddressHash}`)
      .pipe(
        tap(({ message, result, status }: any) => {
          console.log('TOKEN: ', result)
          this._contractToken$.next(result)
        })
      )
  }

  getAccounts() {
    return this.http.get(`${apiUrl}?module=account&action=listaccounts`)
      .pipe(
        map(({ result }: any) => result)
      )
  }
}
