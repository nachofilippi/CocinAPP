import { Component, OnInit } from '@angular/core';
import { Lista, ListaItem } from '../../app/clases/index';
import { AlertController, NavController } from 'ionic-angular';

import { ListaRecetasServicios } from '../../app/servicios/lista-recetas';


@Component({
  selector: 'app-agregar',
  templateUrl: 'agregar.component.html'
})
export class AgregarComponent implements OnInit {

  nombreLista: string = "";
  nombreItem: string = "";

  items: ListaItem[] = [];

  constructor(public alertCtrl: AlertController,
    public navCtrl: NavController,
    public _listaRecetas: ListaRecetasServicios
  ) { }

  ngOnInit() { }

  agregar() {
    if (this.nombreItem.length == 0) {
      return;
    }

    let item = new ListaItem();
    item.nombre = this.nombreItem;

    this.items.push(item);
    this.nombreItem = "";
  }

  borrarItem(idx: number) {
    this.items.splice(idx, 1);
  }

  agregarLista() {
    if (this.nombreLista.length == 0) {
      let alert = this.alertCtrl.create({
        title: 'Nombre de la lista',
        subTitle: 'El nombre de la lista es obligatorio.',
        buttons: ['OK']
      });
      alert.present();
      return;
    }

    let lista = new Lista ( this.nombreLista );
    lista.items = this.items;

    // this._listaRecetas.listas.push(lista);
    this._listaRecetas.agregarLista(lista);
    this.navCtrl.pop();



  }
}
