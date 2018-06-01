import {NavController} from 'ionic-angular';
import {Component, OnInit} from '@angular/core';
import {RestProvider} from '../../providers/rest/rest';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
    selector: 'page-favoritos',
    templateUrl: 'favoritos.html'
})
export class FavoritosPage implements OnInit {

    favoritos: any = [];

    ngOnInit(): void {
        this.rest.getFavoritos().subscribe(data => this.favoritos = data, offline => this.favoritos = offline);
    }

    constructor(public navCtrl: NavController, public rest: RestProvider) {

    }

    verFavorito(receta) {
        this.navCtrl.push(DetalleComponent, {receta});
    }
}
