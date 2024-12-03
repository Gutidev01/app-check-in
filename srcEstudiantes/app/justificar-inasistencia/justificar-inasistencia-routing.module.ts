import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JustificarInasistenciaPage } from './justificar-inasistencia.page';

const routes: Routes = [
  {
    path: '',
    component: JustificarInasistenciaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JustificarInasistenciaPageRoutingModule {}
