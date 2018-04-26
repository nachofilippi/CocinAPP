import { Component, OnInit } from '@angular/core';
import { Lista } from '../../app/clases/index';
import { NavController, NavParams} from 'ionic-angular';
import {AlertController} from 'ionic-angular';
import {ListaRecetasServicios}  from '../../app/servicios/lista-recetas';


@Component({
  selector: 'app-detalle',
  templateUrl: 'detalle.component.html'
})
export class DetalleComponent implements OnInit {
    idx:number;
    lista:Lista;


  constructor(public navCtrl:NavController,public navParams:NavParams, public alertCtrl:AlertController, public _listaRecetasServicios:ListaRecetasServicios) {
      this.idx =this.navParams.get("idx");
      this.lista=this.navParams.get("lista");

  }

  borrarLista(){
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

  ngOnInit() { }

}
