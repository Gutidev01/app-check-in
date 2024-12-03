import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MisAsignaturasPageRoutingModule } from './mis-asignaturas-routing.module';

import { MisAsignaturasPage } from './mis-asignaturas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MisAsignaturasPageRoutingModule
  ],
  declarations: [MisAsignaturasPage]
})
export class MisAsignaturasPageModule {}
