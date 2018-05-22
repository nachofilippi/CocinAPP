import {Component, OnInit} from '@angular/core';

import {ListaRecetasServicios} from '../../app/servicios/lista-recetas';

import {NavController} from 'ionic-angular';
import {AgregarComponent} from '../agregar/agregar.component';
import {AlertController} from 'ionic-angular';
import {DetalleComponent} from '../detalle/detalle.component';

import {Lista, ListaItem} from '../../app/clases/index';
import {RestProvider} from '../../providers/rest/rest';



@Component({
    selector: 'page-list',
    templateUrl: 'list.html'
})
export class ListPage implements OnInit {
    recetas: any;
    idx: number;

    constructor(private _listaRecetasServicios: ListaRecetasServicios,
        private navCtrl: NavController,
        public alertCtrl: AlertController,
        public rest: RestProvider
    ) {}

    ngOnInit() {
        this.rest.getRecetas().subscribe(data => {this.recetas = data}, Error => {console.log(Error)});
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

    verDetalle(lista, idx) {
        this.navCtrl.push(DetalleComponent, {lista, idx});
    }

    actualizar(i: ListaItem) {
        i.completado = !i.completado;
        this._listaRecetasServicios.actualizarData();

        console.log(i.completado);
    }


}
