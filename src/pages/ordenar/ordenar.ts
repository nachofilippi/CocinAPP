import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the OrdenarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ordenar',
  templateUrl: 'ordenar.html',
})
export class OrdenarPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.seleccion= this.navParams.get("ordenActual");
  }

  criterios: any = [
    { clave: 0, valor: "A-Z" }, { clave: 1, valor: "Z-A" },
    { clave: 2, valor: "Dificultad: Mayor a menor" }, { clave: 3, valor: "Dificultad: Menor a mayor" },
    { clave: 4, valor: "Estrellas: Mayor a menor" }, { clave: 5, valor: "Estrellas: Menor a mayor" },
    { clave: 6, valor: "Tiempo: Mayor a menor" }, { clave: 7, valor: "Tiempo: Menor a mayor" }
  ];
  seleccion: number = 0;

  dismiss(i: number) {
    this.viewCtrl.dismiss(i);
  }
}
