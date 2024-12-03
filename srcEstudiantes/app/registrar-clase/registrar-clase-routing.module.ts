import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrarClasePage } from './registrar-clase.page';

const routes: Routes = [
  {
    path: '',
    component: RegistrarClasePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrarClasePageRoutingModule {}
