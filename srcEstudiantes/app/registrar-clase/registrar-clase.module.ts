import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrarClasePageRoutingModule } from './registrar-clase-routing.module';

import { RegistrarClasePage } from './registrar-clase.page';
import { QRCodeComponent } from 'angularx-qrcode';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrarClasePageRoutingModule,ReactiveFormsModule ,QRCodeComponent
  ],
  declarations: [RegistrarClasePage,]
})
export class RegistrarClasePageModule {}
