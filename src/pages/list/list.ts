import {Component} from '@angular/core';

import {NavController} from 'ionic-angular';
import {AgregarComponent} from '../agregar/agregar.component';
import {AlertController} from 'ionic-angular';
import {DetalleComponent} from '../detalle/detalle.component';

import {ListaItem} from '../../app/clases/index';
import {RestProvider} from '../../providers/rest/rest';
import {LoginProvider} from '../../providers/login/login';



@Component({
    selector: 'page-list',
    templateUrl: 'list.html'
})
export class ListPage {
    recetas: any;
    recetasSearch: any = [];
    enfermedades: any;
    filtros: any = { input: "", dificultad: 1, tiempo: { lower: 10, upper: 120 }, enfermedades:[] };

    constructor(
        private navCtrl: NavController,
        public alertCtrl: AlertController,
        public rest: RestProvider,
        private login: LoginProvider
    ) {}

    ionViewWillEnter() {
        this.rest.getRecetas().subscribe(data => { this.recetas = data; this.recetasSearch = data; this.cargarFavoritos();}, offline => {this.recetas = offline; this.cargarFavoritos();});
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
                    },
                    cssClass:'alert-button'
                },
                {
                    text: 'Aceptar',
                    handler: () => {
                        this.irAgregar();
                        console.log('Aceptar cliqueado');
                    },
                    cssClass: 'alert-button'
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

        console.log(i.completado);
    }

    cargarFavoritos() {
      this.login.checkLogin().then(
        () => {
          this.rest.getFavoritos().subscribe(data => this.join(data), offline => this.join(offline));
        }
      )
    }
    join(favoritos) {
        for (let i = 0; i < favoritos.length; i++) {
            for (let j = 0; j < this.recetas.length; j++) {
                if (favoritos[i].id == this.recetas[j].id)
                    this.recetas[j].favorito = true;
            }
        }
    }

  filtrar(){
    setTimeout(() => {
      this.recetasSearch = this.recetas;
      if (this.filtros.input && this.filtros.input.trim() != '') {
        this.recetasSearch = this.recetasSearch.filter((receta) => {
          return (receta.nombre.toLowerCase().indexOf(this.filtros.input.toLowerCase()) > -1);
        })
      }
      if (this.filtros.dificultad && this.filtros.dificultad > 1) {
        this.recetasSearch = this.recetasSearch.filter((receta) => {
          return (receta.dificultad <= this.filtros.dificultad);
        })
      }
      if (this.filtros.tiempo) {
        this.recetasSearch = this.recetasSearch.filter((receta) => {
          return (receta.tiempo <= this.filtros.tiempo.upper);
        })
      }
      if (this.filtros.enfermedades.length > 0) {
        this.filtros.enfermedades.forEach(enfermedad => {
          this.recetasSearch = this.recetasSearch.filter((receta) => {
            return (receta.apto_para.map(function (e) { return e.nombre; }).indexOf(enfermedad) > -1);
          })
        });
      }
    }, 100);
  }
}
