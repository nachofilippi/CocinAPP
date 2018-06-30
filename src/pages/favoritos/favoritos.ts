import {NavController, LoadingController} from 'ionic-angular';
import {Component} from '@angular/core';
import {RestProvider} from '../../providers/rest/rest';
import { DetalleComponent } from '../detalle/detalle.component';
import { ListPage } from '../list/list';

@Component({
    selector: 'page-favoritos',
    templateUrl: 'favoritos.html'
})
export class FavoritosPage {

    favoritos: any = [];
    loading: any;

    ionViewDidEnter(){
        this.mostrarCargando();
        this.rest.getFavoritos().subscribe(data => {this.favoritos = data; this.dismissLoading();}, offline => {this.favoritos = offline; this.dismissLoading();});
    }

    mostrarCargando() {
      this.loading = this.loadingCtrl.create({
        content: 'Cargando favoritos...'
      });

      this.loading.present();
    }

    dismissLoading() {
      this.loading.dismiss();
    }

    constructor(public navCtrl: NavController, public rest: RestProvider, public loadingCtrl: LoadingController) {

    }

    verFavorito(receta) {
        receta.favorito = true;
        this.navCtrl.push(DetalleComponent, {receta});
    }

    verRecetas(){
      this.navCtrl.push(ListPage);
    }
}
