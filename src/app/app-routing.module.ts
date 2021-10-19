import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TokensListComponent } from './tokens-list/tokens-list.component';

const routes: Routes = [
  { path: '', component: TokensListComponent },
  { path: '', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
