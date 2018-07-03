import { Component } from '@angular/core';
import { LoginProvider } from '../../providers/login/login';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home'


@Component({
  selector: 'app-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  logueado: boolean = false;
  usuario: any = {};

  constructor(private login: LoginProvider, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    this.usuario = this.navParams.get("usr");
  }

  logout() {
    let alert = this.alertCtrl.create({
      title: 'Cierre de sesión',
      message: '¿Estás seguro que querés cerrar la sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.login.logout().then(() => this.navCtrl.setPages([{ page: HomePage }]), () => { });
          }
        }
      ]
    });
    alert.present();
  }
}
