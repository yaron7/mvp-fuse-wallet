import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, switchMap, tap } from 'rxjs/operators';
import { AppService } from '../app.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TokenDetailsComponent } from '../token-details/token-details.component';
import { BalancePipe } from '../balance.pipe';

@Component({
  selector: 'mfw-tokens-list',
  template: `
  <div>
    <input class="form-control" type="text" [formControl]="account" [placeholder]="placeholder">
  </div>
  <div style="color: red" *ngIf="errorMessage; else elseBlock"> 
     <p> {{ errorMessage }}</p>
  </div>
  <ng-template #elseBlock>
      <ng-container  *ngFor="let token of tokens"> 
         <div class="card my-1 px-3" style="cursor: pointer" (click)="onGetToken(token)">
          <div class="d-flex justify-content-between">
              <div>
                  <p>{{ token.name }}</p>
                  <span>{{ token.type }} - {{ token.contractAddress }}</span>
              </div>
              <div>
                <p>{{ token.balance | balance:token.decimals | number:'1.0-6' }} {{ token.symbol }}</p>
              </div>
            </div>
         </div>
       </ng-container>
  </ng-template>
  `,
  providers: [BalancePipe]
})
export class TokensListComponent implements OnInit {

  account = new FormControl('');
  tokens: any
  errorMessage = ''
  placeholder = 'type account id here...'

  constructor(
    private appService: AppService,
    private modalService: NgbModal,
    private balancePipe: BalancePipe
  ) { }

  ngOnInit(): void {
    // click event will be instead of change input event  
    this.account.valueChanges.
      pipe(
        debounceTime(350),
        distinctUntilChanged(),
        filter(term => {
          this.errorMessage = ''
          this.tokens = []
          return term.trim()
        }),
        switchMap((term) => this.appService.getAccountTokenList(term))
      ).subscribe(({ message, result, status }: any) => {
        switch (status) {
          case '0': this.errorMessage = message
            break;
          case '1': this.tokens = result
            break;
        }
      })
  }

  onGetToken({ contractAddress, balance, decimals }: any) {
    this.appService.selectedTokenBalance = this.balancePipe.transform(balance, decimals)
    this.appService.getTokenByContract(contractAddress).subscribe(_ => this.openModal())
  }

  private openModal() {
    this.modalService.open(TokenDetailsComponent, {
      centered: true
    });
  }
}
