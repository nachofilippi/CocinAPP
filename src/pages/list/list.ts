import { Component } from '@angular/core';

import { NavController, ModalController, LoadingController } from 'ionic-angular';
import { AgregarComponent } from '../agregar/agregar.component';
import { AlertController } from 'ionic-angular';
import { DetalleComponent } from '../detalle/detalle.component';

import { RestProvider } from '../../providers/rest/rest';
import { LoginProvider } from '../../providers/login/login';
import { FiltrosPage } from '../filtros/filtros';
import { OrdenarPage } from '../ordenar/ordenar';


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
  count: number = 0;
  dificultades: any = [
    { nombre: "", numero: 0 },
    { nombre: "Muy fácil", numero: 1 },
    { nombre: "Fácil", numero: 2 },
    { nombre: "Intermedio", numero: 3 },
    { nombre: "Difícil", numero: 4 },
    { nombre: "Muy difícil", numero: 5 },
  ];
  loading: any;
  filtros: any = {};
  refresher: any = null;
  ordenActual:number =0;

  constructor(
    private navCtrl: NavController,
    public alertCtrl: AlertController,
    public rest: RestProvider,
    private login: LoginProvider,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController
  ) { }

  ionViewDidLoad() {
    this.mostrarCargando();
    this.rest.getRecetas().subscribe(data => { this.recetas = data; this.recetasSearch = data; this.cargarFavoritos(); }, offline => { this.recetas = offline; this.recetasSearch = offline; this.cargarFavoritos(); });
    this.rest.getEnfermedades().subscribe(data => { this.enfermedades = data; this.dismissLoading(); }, offline => { this.enfermedades = offline; this.dismissLoading(); });
    this.rest.getIngredientes().subscribe(data => { this.ingredientes = data; this.dismissLoading(); }, offline => { this.ingredientes = offline; this.dismissLoading(); });
    this.rest.getCategoriasRecetas().subscribe(data => { this.categorias = data; this.dismissLoading(); }, offline => { this.categorias = offline; this.dismissLoading(); });
  }

  ionViewWillEnter() {
    if (localStorage.getItem("filtros")) {
      this.filtros = JSON.parse(localStorage.getItem("filtros"));
    }
  }

  mostrarCargando() {
    this.loading = this.loadingCtrl.create({
      content: 'Cargando recetas...'
    });

    this.loading.present();
  }

  dismissLoading() {
    this.count++;
    if (this.count === 4) {
      this.count = 0;
      this.filtrar();
      this.ordenar(this.ordenActual);
      this.loading.dismiss();
      if (this.refresher)
        this.refresher.complete();
      this.refresher = null;
    }
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
          cssClass: 'alert-button'
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
    this.navCtrl.push(DetalleComponent, { receta });
  }

  cargarFavoritos() {
    this.login.checkLogin().then(
      () => {
        this.rest.getFavoritos().subscribe(data => this.join(data), offline => this.join(offline));
        this.dismissLoading();
      }, () => { this.dismissLoading(); }
    )
  }
  join(favoritos) {
    for (let i = 0; i < favoritos.length; i++) {
      for (let j = 0; j < this.recetas.length; j++) {
        if (favoritos[i].id == this.recetas[j].id)
          this.recetas[j].favorito = true;
      }
    }
    this.recetasSearch = this.recetas;
  }

  filtrar() {
    setTimeout(() => {
      this.recetasSearch = this.recetas;
      if (this.filtros.input && this.filtros.input.trim() != '') {
        this.recetasSearch = this.recetasSearch.filter((receta) => {
          return (receta.nombre.toLowerCase().indexOf(this.filtros.input.toLowerCase()) > -1);
        })
      }
      if (this.filtros.categorias.length > 0) {
        this.recetasSearch = this.recetasSearch.filter((receta) => {
          return (this.filtros.categorias.map(function (e) { return e.nombre; }).indexOf(receta.categoria.nombre) > -1);
        })
      }
      if (this.filtros.dificultades.length > 0) {
        this.recetasSearch = this.recetasSearch.filter((receta) => {
          return (this.filtros.dificultades.map(function (e) { return e.numero; }).indexOf(receta.dificultad) > -1);
        })
      }
      if (this.filtros.tiempo) {
        this.recetasSearch = this.recetasSearch.filter((receta) => {
          return (receta.tiempo <= this.filtros.tiempo.upper && receta.tiempo >= this.filtros.tiempo.lower);
        })
      }
      if (this.filtros.comensales) {
        this.recetasSearch = this.recetasSearch.filter((receta) => {
          return (receta.personas <= this.filtros.comensales.upper && receta.personas >= this.filtros.comensales.lower);
        })
      }
      if (this.filtros.enfermedades.length > 0) {
        this.filtros.enfermedades.forEach(enfermedad => {
          this.recetasSearch = this.recetasSearch.filter((receta) => {
            return (receta.apto_para.map(function (e) { return e.nombre; }).indexOf(enfermedad.nombre) > -1);
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

  verFiltros() {
    let filtrosModal = this.modalCtrl.create(FiltrosPage, {}, { cssClass: 'filtros-modal' });

    filtrosModal.onDidDismiss(() => {
      if (localStorage.getItem("filtros")) {
        this.filtros = JSON.parse(localStorage.getItem("filtros"));
      }
      this.filtrar();
    });
    filtrosModal.present();
  }

  verOrden() {
    let ordenActual= this.ordenActual;
    let ordenModal = this.modalCtrl.create(OrdenarPage, {ordenActual}, { cssClass: 'info-nutricional-modal' });

    ordenModal.onDidDismiss((i) => {
      if (i > -1)
        this.ordenar(i);
    });
    ordenModal.present();
  }

  ordenar(i: number) {
    i= +i;
    this.ordenActual=i;
    switch (i) {
      case 0: {
        this.sortArray(this.recetas, 'nombre', "ASC");
        this.sortArray(this.recetasSearch, 'nombre', "ASC");
        break;
      }
      case 1: {
        this.sortArray(this.recetas, 'nombre', "DESC");
        this.sortArray(this.recetasSearch, 'nombre', "DESC");
        break;
      }
      case 2: {
        this.sortArray(this.recetas, 'dificultad', "DESC");
        this.sortArray(this.recetasSearch, 'dificultad', "DESC");
        break;
      }
      case 3: {
        this.sortArray(this.recetas, 'dificultad', "ASC");
        this.sortArray(this.recetasSearch, 'dificultad', "ASC");
        break;
      }
      case 4: {
        this.sortArray(this.recetas, 'puntuaciones', "DESC");
        this.sortArray(this.recetasSearch, 'puntuaciones', "DESC");
        break;
      }
      case 5: {
        this.sortArray(this.recetas, 'puntos', "ASC");
        this.sortArray(this.recetasSearch, 'puntos', "ASC");
        break;
      }
      case 6: {
        this.sortArray(this.recetas, 'tiempo', "DESC");
        this.sortArray(this.recetasSearch, 'tiempo', "DESC");
        break;
      }
      case 7: {
        this.sortArray(this.recetas, 'tiempo', "ASC");
        this.sortArray(this.recetasSearch, 'tiempo', "ASC");
        break;
      }
      default: {
        break;
      }
    }
  }

  sortArray(array, propiedad: string, order: "ASC" | "DESC"): void {
    let i: number = (order === "ASC" ? 1 : -1);
    array.sort((a, b) => {
      if (a[propiedad] < b[propiedad])
        return -1 * i;
      if (a[propiedad] > b[propiedad])
        return 1 * i;
      return 0;
    });
  }

  doRefresh(refresher) {
    this.count=0;
    this.refresher= refresher;
    this.mostrarCargando();
    this.rest.getRecetas().subscribe(data => { this.recetas = data; this.recetasSearch = data; this.cargarFavoritos(); }, offline => { this.recetas = offline; this.recetasSearch = offline; this.cargarFavoritos(); });
    this.rest.getEnfermedades().subscribe(data => { this.enfermedades = data; this.dismissLoading(); }, offline => { this.enfermedades = offline; this.dismissLoading(); });
    this.rest.getIngredientes().subscribe(data => { this.ingredientes = data; this.dismissLoading(); }, offline => { this.ingredientes = offline; this.dismissLoading(); });
    this.rest.getCategoriasRecetas().subscribe(data => { this.categorias = data; this.dismissLoading(); }, offline => { this.categorias = offline; this.dismissLoading(); });
  }
}
