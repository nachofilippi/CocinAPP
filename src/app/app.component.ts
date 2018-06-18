import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {AlertController} from 'ionic-angular';
import {LoginProvider} from '../providers/login/login';

// paginas
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import {OfflineProvider} from '../providers/rest/offline';
import { FavoritosPage } from '../pages/favoritos/favoritos';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;
  proximamente: Array<{title: string, descripcion: string}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public offline: OfflineProvider, public alertCtrl: AlertController, public login: LoginProvider) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Inicio', component: HomePage },
      { title: 'Lista de Recetas', component: ListPage },
    ];

    this.proximamente = [
        {title: 'Viandas', descripcion: "Dedicado para aquellas personas que almuerzan en su trabajo, <b>CocinApp</b> te permitirá tener a tu disposición comidas de fácil y rápida preparación, para que puedas llevar a la oficina."},
        {title: 'Mi semana', descripcion: "Próximamente, <b>CocinApp</b> te traerá una nueva opción que te permitirá planificar las comidas de tu semana y te indicará qué ingredientes debes comprar para que puedas hacer todas las compras de una sola vez!"}
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.offline.init();

    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  abrirFavoritos() {
    this.login.checkLogin().then((usr) => this.nav.setRoot(FavoritosPage), () => this.solicitarFavoritos());
  }
  solicitarFavoritos() {
    this.login.solicitarLogin().then((usr) => this.nav.setRoot(FavoritosPage));
  }

  abrirLogin(){
      this.login.checkLogin().then((usr) => this.nav.setRoot(LoginPage, {usr}), () => this.solicitarLogin());
  }
  solicitarLogin(){
      this.login.solicitarLogin().then(usr => this.nav.setRoot(LoginPage, {usr}));
  }

  alertProximamente(i) {
      let alert = this.alertCtrl.create({
          title: this.proximamente[i].title,
          subTitle: this.proximamente[i].descripcion,
          buttons: ['OK']
      });
      alert.present();

  }

}
