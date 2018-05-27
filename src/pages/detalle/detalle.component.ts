import { Component, OnInit } from '@angular/core';
import { Lista, ListaItem } from '../../app/clases/index';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ListaRecetasServicios } from '../../app/servicios/lista-recetas';


@Component({
  selector: 'app-detalle',
  templateUrl: 'detalle.component.html'
})
export class DetalleComponent implements OnInit {
  idx: number;
  lista: Lista;
  stars: any;
  video: boolean = false;
  ingredientes: boolean = false;
  favorito: boolean;
  i: ListaItem;




  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public _listaRecetasServicios: ListaRecetasServicios) {
    this.idx = this.navParams.get("idx");
    this.lista = this.navParams.get("lista");


  }

  clickStart(num) {

    for (var i = 0; i < this.stars.length; i++) {
      if (i <= num)
        this.stars[i].click = true;
      else
        this.stars[i].click = false;

    }

  }

  borrarLista() {
    let confirm = this.alertCtrl.create({
      title: 'Borrar lista',
      message: 'Esta seguro que usted desea borrar la lista?',
      buttons: ['Cancelar',
        {
          text: 'Eliminar',
          handler: () => {
            this._listaRecetasServicios.eliminarLista(this.idx);
            console.log('Eliminar');
            this.navCtrl.pop();
          }
        }
      ]
    });
    confirm.present();
  }

  ngOnInit() {
    this.stars = [];
    this.stars.push({ "click": false });
    this.stars.push({ "click": false });
    this.stars.push({ "click": false });
    this.stars.push({ "click": false });
    this.stars.push({ "click": false });
  }

  agregarFavorito() {
    let confirm = this.alertCtrl.create({
      title: 'Agregar favorito',
      message: 'Esta seguro que usted desea agregar la receta a su lista de favoritos?',
      buttons: ['Cancelar',
        {
          text: 'Agregar',
          handler: () => {
            this.lista.favorito = !this.lista.favorito;
            this._listaRecetasServicios.actualizarData();
            console.log(this.lista.favorito);
            this.navCtrl.pop();
          }
        }
      ]
    });
    confirm.present();
  }

  eliminarFavorito() {
    let confirm = this.alertCtrl.create({
      title: 'Eliminar favorito',
      message: 'Esta seguro que usted desea eliminar la receta a su lista de favoritos?',
      buttons: ['Cancelar',
        {
          text: 'Eliminar',
          handler: () => {
            this.lista.favorito = !this.lista.favorito;
            this._listaRecetasServicios.actualizarData();
            console.log(this.lista.favorito);
            this.navCtrl.pop();
          }
        }
      ]
    });
    confirm.present();
  }

}
