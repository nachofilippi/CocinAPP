import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import { Clipboard } from '@ionic-native/clipboard';

/**
 * Generated class for the CopiarMailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-copiar-mail',
  templateUrl: 'copiar-mail.html',
})
export class CopiarMailPage {

  items: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private clipboard: Clipboard, private toastCtrl: ToastController) {

    this.items.push({ 'nombre': 'Grupo Mascotas', 'email': 'grupo_okfkqtr_mascotas@tfbnw.net' });
    this.items.push({ 'nombre': 'Grupo Paquetes', 'email': 'grupo_mnpwchq_paquetes@tfbnw.net' });
    this.items.push({ 'nombre': 'Grupo Modelos', 'email': 'grupo_zetwthb_modelos@tfbnw.net' });
    this.items.push({ 'nombre': 'Alicia Mogliani', 'email': 'alicia_efoxfev_mogliani@tfbnw.net' });
  }

  click(email: string) {
    this.clipboard.copy(email);
    this.navCtrl.pop();
    let toast = this.toastCtrl.create({
      message: 'Mail copiado: '+ email,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

}
