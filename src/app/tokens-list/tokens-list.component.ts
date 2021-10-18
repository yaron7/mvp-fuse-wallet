import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { of } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, switchMap, tap } from 'rxjs/operators';
import { AppService } from '../app.service';

@Component({
  selector: 'mfw-tokens-list',
  template: `
 
   <div>
     <label> Account Address:</label>
     <input type="text" [formControl]="account">
   </div>
   <div *ngIf="errorMessage; else elseBlock"> 
      <p> {{ errorMessage }}</p>
   </div>
  <ng-template #elseBlock>
      <ng-container  *ngFor="let token of tokens"> 
          <div class="row">
              <div>
                  <p>{{ token.name }}</p>
                  <span>{{ token.type }} - {{ token.contractAddress }}</span>
              </div>
              <div>
                <p>{{ token.balance | balance:token.decimals }} {{ token.symbol }}</p>
              </div>
           </div>
       </ng-container>
  </ng-template>
  `,
  styleUrls: ['./tokens-list.component.scss']
})
export class TokensListComponent implements OnInit {

  account = new FormControl('');
  tokens: any
  errorMessage = ''

  constructor(private appService: AppService) { }

  ngOnInit(): void {

    this.account.valueChanges.
      pipe(
        debounceTime(300),
        distinctUntilChanged(),
        filter(term => {
          this.errorMessage = ''
          this.tokens = []
          return term
        }),
        switchMap((address: string) => this.appService.getAccountTokenList(address))
      ).subscribe(
        ({ message, result, status }: any) => {
          switch (status) {
            case '0': this.errorMessage = message;
              break;
            case '1': this.tokens = result
              break;
          }
        }
      )
  }

}
