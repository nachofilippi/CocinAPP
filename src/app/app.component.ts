import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {AlertController} from 'ionic-angular';

// paginas
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { IngredientesPage } from '../pages/ingredientes/ingredientes.component';
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

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public offline: OfflineProvider, public alertCtrl: AlertController) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Inicio', component: HomePage },
      { title: 'Lista de Recetas', component: ListPage },
      { title: 'Ingredientes', component:IngredientesPage},
      { title: 'Favoritos', component: FavoritosPage}
    ];
    
    this.proximamente = [
        {title: 'Viandas', 'descripcion': "Proximamente podrás blablabla"},
        {title: 'Mi semana', 'descripcion': "Proximamente podrás blablabla"}
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

  abrirLogin(){
      this.nav.setRoot(LoginPage);
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
