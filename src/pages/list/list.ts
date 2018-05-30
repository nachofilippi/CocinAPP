import {Component} from '@angular/core';

import {ListaRecetasServicios} from '../../app/servicios/lista-recetas';

import {NavController} from 'ionic-angular';
import {AgregarComponent} from '../agregar/agregar.component';
import {AlertController} from 'ionic-angular';
import {DetalleComponent} from '../detalle/detalle.component';

import {ListaItem} from '../../app/clases/index';
import {RestProvider} from '../../providers/rest/rest';



@Component({
    selector: 'page-list',
    templateUrl: 'list.html'
})
export class ListPage {
    statusDificultad: boolean = false;
    statusTiempo: boolean = false;
    dificultad: number = 1;
    tiempo: any = {lower: 10, upper: 120};
    recetas: any;
    enfermedades: any;
    filtros: boolean = false;

    onChange(ev: any) {
        console.log('Changed', ev);
    }

    constructor(private _listaRecetasServicios: ListaRecetasServicios,
        private navCtrl: NavController,
        public alertCtrl: AlertController,
        public rest: RestProvider
    ) {}

    ionViewWillEnter() {
        this.rest.getRecetas().subscribe(data => {this.recetas = data}, offline => {this.recetas = offline;});
        this.rest.getEnfermedades().subscribe(data => {this.enfermedades = data}, offline => {this.enfermedades = offline;});
    }

    irAgregar() {
        this.navCtrl.push(AgregarComponent)
    }

    showConfirm() {
        let confirm = this.alertCtrl.create({
            title: 'Crear nueva receta',
            message: 'Desea usted crear una nueva receta propia?',
            buttons: [
                {
                    text: 'Cancelar',
                    handler: () => {
                        console.log('Cancelar cliqueado');
                    }
                },
                {
                    text: 'Aceptar',
                    handler: () => {
                        this.irAgregar();
                        console.log('Aceptar cliqueado');
                    }
                }
            ]
        });
        confirm.present();
    }

    verDetalle(receta) {
        this.navCtrl.push(DetalleComponent, {receta});
    }

    actualizar(i: ListaItem) {
        i.completado = !i.completado;
        this._listaRecetasServicios.actualizarData();

        console.log(i.completado);
    }
    
}
