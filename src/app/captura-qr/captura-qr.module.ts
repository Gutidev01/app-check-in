import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CapturaQrPageRoutingModule } from './captura-qr-routing.module';

import { CapturaQrPage } from './captura-qr.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CapturaQrPageRoutingModule
  ],
  declarations: [CapturaQrPage]
})
export class CapturaQrPageModule {}
