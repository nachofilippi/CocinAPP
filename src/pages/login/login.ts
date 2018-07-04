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
    switch (this.usuario.email) {
      case 'grupo_okfkqtr_mascotas@tfbnw.net': {
        this.usuario.foto = 'https://www.sura.com/blogs/images1/tener-mascotas-bueno-salud-mental-emocional.jpg';
        break;
      }
      case 'grupo_mnpwchq_paquetes@tfbnw.net': {
        this.usuario.foto = 'http://spainbox.com/wp-content/uploads/2013/05/enviar-paquetes-internacionales.jpg';
        break;
      }
      case 'grupo_zetwthb_modelos@tfbnw.net': {
        this.usuario.foto = 'http://modoeficaz.com/wp-content/uploads/2015/07/My-Pictours-comparador-de-fotografos.jpg';
        break;
      }
      case 'alicia_efoxfev_mogliani@tfbnw.net': {
        this.usuario.foto = 'https://www.webcampus.uade.edu.ar/Fotos/7/ID_79077.jpg';
        break;
      }
      case 'nahuel.lopez.1997@gmail.com': {
        break;
      }
      default: {
        this.usuario.foto = '././assets/imgs/fork.png';
        break;
      }
    }
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
