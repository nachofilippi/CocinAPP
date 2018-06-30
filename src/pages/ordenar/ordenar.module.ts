import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrdenarPage } from './ordenar';

@NgModule({
  declarations: [
    OrdenarPage,
  ],
  imports: [
    IonicPageModule.forChild(OrdenarPage),
  ],
})
export class OrdenarPageModule {}
