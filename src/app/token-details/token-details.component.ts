import { Component, Inject, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'mfw-token-details',
  template: `
  
   <div class="card p-2" *ngIf="token.value as token">
     <div>
        Contract Address: {{ token.contractAddress  }}
     </div>
     <div>
        Token Name: {{ token.name  }}
     </div>
     <div>
        Total Supply: {{ token.totalSupply  }}
     </div>
     <div>
        Type: {{ token.type  }}
     </div>
     <div>
        User Hold Percentage: {{ percentageHold }}
     </div>
  </div>
  `
})
export class TokenDetailsComponent implements OnInit {

  token: any
  percentageHold: any

  constructor(
    private appService: AppService
  ) {
    this.token = this.appService.contractToken$
  }

  ngOnInit(): void {
    this.calculateHoldPercentage()
  }

  private calculateHoldPercentage() {
    const { selectedTokenBalance } = this.appService
    const totalSupply = parseInt(this.token.value.totalSupply)

    if (selectedTokenBalance && totalSupply) {

      const amountHold = selectedTokenBalance / this.token.value.totalSupply
      const [_, exponent] = amountHold.toString().split('-')

      if (exponent) {
        this.percentageHold = amountHold.toFixed(parseInt(exponent)) + '%'
      } else {
        this.percentageHold = amountHold + '%'
      }
    }

  }

}
