import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'balance'
})
export class BalancePipe implements PipeTransform {

  transform(value: string, decimal: string): number {

    const power = parseFloat(decimal)
    const balance = parseFloat(value)
    
    if (balance && Number(power)) {
      return balance / Math.pow(10, power)
    }
    return balance;
  }

}
