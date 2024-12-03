import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GestionClasesPage } from './gestion-clases.page';

const routes: Routes = [
  {
    path: '',
    component: GestionClasesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestionClasesPageRoutingModule {}
