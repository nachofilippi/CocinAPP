import {Component} from '@angular/core';

import {NavController, ModalController} from 'ionic-angular';
import {AgregarComponent} from '../agregar/agregar.component';
import {AlertController} from 'ionic-angular';
import {DetalleComponent} from '../detalle/detalle.component';

import {RestProvider} from '../../providers/rest/rest';
import {LoginProvider} from '../../providers/login/login';
import { IngredientesPage } from '../ingredientes/ingredientes.component';



@Component({
    selector: 'page-list',
    templateUrl: 'list.html'
})
export class ListPage {
    recetas: any;
    recetasSearch: any = [];
    enfermedades: any;
    ingredientes: any;
    categorias: any = [];
    dificultades: any = [
      { nombre: "", numero: 0 },
      { nombre: "Muy fácil", numero: 1 },
      { nombre: "Fácil", numero: 2 },
      { nombre: "Intermedio", numero: 3 },
      { nombre: "Difícil", numero: 4 },
      { nombre: "Muy difícil", numero: 5 },
    ];
    filtros: any = { input: "", tiempo: { lower: 10, upper: 120 }, enfermedades:[], ingredientes:[] };

    constructor(
        private navCtrl: NavController,
        public alertCtrl: AlertController,
        public rest: RestProvider,
        private login: LoginProvider,
        public modalCtrl: ModalController
    ) {}

    ionViewWillEnter() {
        this.rest.getRecetas().subscribe(data => { this.recetas = data; this.recetasSearch = data; this.cargarFavoritos();}, offline => {this.recetas = offline; this.cargarFavoritos();});
        this.rest.getEnfermedades().subscribe(data => {this.enfermedades = data}, offline => {this.enfermedades = offline;});
        this.rest.getIngredientes().subscribe(data => {this.ingredientes = data}, offline => {this.ingredientes = offline;});
        this.rest.getCategoriasRecetas().subscribe(data => { this.categorias = data }, offline => { this.categorias = offline; });
    }

    irAgregar() {
        this.navCtrl.push(AgregarComponent);
    }

    showConfirm() {
        let confirm = this.alertCtrl.create({
            title: 'Crear nueva receta',
            message: '¿Querés crear una nueva receta?',
            buttons: [
                {
                    text: 'Cancelar',
                    cssClass:'alert-button'
                },
                {
                    text: 'Sí',
                    handler: () => {
                        this.irAgregar();
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

    cargarFavoritos() {
      this.login.checkLogin().then(
        () => {
          this.rest.getFavoritos().subscribe(data => this.join(data), offline => this.join(offline));
        },()=>{}
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
      if (this.filtros.categoria) {
        this.recetasSearch = this.recetasSearch.filter((receta) => {
          return (receta.categoria.nombre === this.filtros.categoria);
        })
      }
      if (this.filtros.dificultad && this.filtros.dificultad > 0) {
        this.recetasSearch = this.recetasSearch.filter((receta) => {
          return (receta.dificultad <= this.filtros.dificultad && receta.dificultad >= this.filtros.dificultad);
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
      if (this.filtros.ingredientes.length > 0) {
        this.filtros.ingredientes.forEach(ingrediente => {
          this.recetasSearch = this.recetasSearch.filter((receta) => {
            return (receta.ingredientes.map(function (e) { return e.ingrediente.id; }).indexOf(ingrediente.id) > -1);
          })
        });
      }
    }, 100);
  }

  seleccionarIngredientes() {
    let ingredientes = this.ingredientes;
    let modal = this.modalCtrl.create(IngredientesPage, { ingredientes }, { cssClass: 'info-nutricional-modal' });
    modal.onDidDismiss(data => {
      if (data) {
        this.ingredientes = data;
        this.filtros.ingredientes = this.ingredientes.filter((ingrediente) => {
          return (ingrediente.elegido);
        });
        this.filtrar();
      }
    });
    modal.present();
  }
}
