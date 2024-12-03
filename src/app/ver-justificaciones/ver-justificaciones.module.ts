import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerJustificacionesPageRoutingModule } from './ver-justificaciones-routing.module';

import { VerJustificacionesPage } from './ver-justificaciones.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerJustificacionesPageRoutingModule
  ],
  declarations: [VerJustificacionesPage]
})
export class VerJustificacionesPageModule {}
