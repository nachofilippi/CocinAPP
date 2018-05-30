import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';


import { ListaRecetasServicios } from '../../app/servicios/lista-recetas';
import { Lista, ListaItem } from '../../app/clases/index';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'page-favoritos',
  templateUrl: 'favoritos.html'
})
export class FavoritosPage {


  constructor(private _listaRecetasServicios: ListaRecetasServicios,
    public navCtrl: NavController) {
  }
  verFavorito(lista, idx) {
    this.navCtrl.push(DetalleComponent, { lista, idx });
  }
}
