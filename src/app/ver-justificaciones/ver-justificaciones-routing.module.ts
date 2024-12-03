import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerJustificacionesPage } from './ver-justificaciones.page';

const routes: Routes = [
  {
    path: '',
    component: VerJustificacionesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerJustificacionesPageRoutingModule {}
