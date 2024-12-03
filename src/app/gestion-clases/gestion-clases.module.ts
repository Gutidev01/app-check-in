import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GestionClasesPageRoutingModule } from './gestion-clases-routing.module';

import { GestionClasesPage } from './gestion-clases.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GestionClasesPageRoutingModule
  ],
  declarations: [GestionClasesPage]
})
export class GestionClasesPageModule {}
