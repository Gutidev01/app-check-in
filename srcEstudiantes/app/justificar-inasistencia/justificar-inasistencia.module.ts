import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JustificarInasistenciaPageRoutingModule } from './justificar-inasistencia-routing.module';

import { JustificarInasistenciaPage } from './justificar-inasistencia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,ReactiveFormsModule,
    JustificarInasistenciaPageRoutingModule
  ],
  declarations: [JustificarInasistenciaPage]
})
export class JustificarInasistenciaPageModule {}
