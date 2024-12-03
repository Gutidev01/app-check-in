import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CapturaQrPage } from './captura-qr.page';

const routes: Routes = [
  {
    path: '',
    component: CapturaQrPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CapturaQrPageRoutingModule {}
