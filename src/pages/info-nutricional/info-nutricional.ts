import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the InfoNutricionalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-info-nutricional',
  templateUrl: 'info-nutricional.html',
})
export class InfoNutricionalPage {

  info_nutricional: any = {};
  datos: any = [
    {label:"Valor energético", atr:"calorias", unidad:"kcal"},
    {label:"Calcio", atr:"calcio", unidad:"mg"},
    {label:"Carbohidratos", atr:"carbohidratos", unidad:"g"},
    {label:"Colesterol", atr:"colesterol", unidad:"mg"},
    {label:"Fibras", atr:"fibras", unidad:"g"},
    {label:"Grasas totales", atr:"grasas_totales", unidad:"g"},
    {label:"Hierro", atr:"hierro", unidad:"mg"},
    {label:"Magnesio", atr:"magnesio", unidad:"mg"},
    {label:"Potasio", atr:"potasio", unidad:"mg"},
    {label:"Proteínas", atr:"proteinas", unidad:"g"},
    {label:"Sodio", atr:"sodio", unidad:"mg"},
    {label:"Zinc", atr:"zinc", unidad:"mg"},
  ];
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.info_nutricional = this.navParams.get("info_nutricional");
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
