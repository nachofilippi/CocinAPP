import { Component, OnInit } from '@angular/core';

import { ListaRecetasServicios} from '../../app/servicios/lista-recetas';

import { NavController } from 'ionic-angular';
import { AgregarComponent} from '../agregar/agregar.component';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage implements OnInit {


  constructor(private _listaRecetasServicios: ListaRecetasServicios,
                private navCtrl: NavController) {}

      ngOnInit(){}

      irAgregar(){
          this.navCtrl.push(AgregarComponent)
      }

}
