import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ModalController, LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { IngredientesPage } from '../ingredientes/ingredientes.component'

/**
 * Generated class for the FiltrosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-filtros',
  templateUrl: 'filtros.html',
})
export class FiltrosPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl: AlertController,
    public rest: RestProvider,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public viewCtrl: ViewController) {
  }
  cantIngredientes: number = 0;
  enfermedades: any = [];
  ingredientes: any = [];
  categorias: any = [];
  drop: any = {};
  count: number = 0;
  dificultades: any = [
    { nombre: "Muy fácil", numero: 1 },
    { nombre: "Fácil", numero: 2 },
    { nombre: "Intermedio", numero: 3 },
    { nombre: "Difícil", numero: 4 },
    { nombre: "Muy difícil", numero: 5 },
  ];
  loading: any;
  filtros: any = { tiempo: { lower: 10, upper: 180 }, enfermedades: [], ingredientes: [], categorias: [], comensales: { lower: 1, upper: 15 } };

  ionViewDidLoad() {
    this.mostrarCargando();
    this.rest.getEnfermedades().subscribe(data => { this.enfermedades = data; this.dismissLoading(); }, offline => { this.enfermedades = offline; this.dismissLoading(); });
    this.rest.getIngredientes().subscribe(data => { this.ingredientes = data; this.dismissLoading(); }, offline => { this.ingredientes = offline; this.dismissLoading(); });
    this.rest.getCategoriasRecetas().subscribe(data => { this.categorias = data; this.dismissLoading(); }, offline => { this.categorias = offline; this.dismissLoading(); });
    if (localStorage.getItem("filtros")) {
      this.filtros = JSON.parse(localStorage.getItem("filtros"));
    }
    console.log(this.filtros);
  }

  ionViewWillEnter() {
    this.cantIngredientes = this.filtros.ingredientes.length;
  }

  mostrarCargando() {
    this.loading = this.loadingCtrl.create({
      content: 'Cargando recetas...'
    });

    this.loading.present();
  }

  dismissLoading() {
    this.count++;
    if (this.count === 3) {
      this.count = 0;
      this.cargarFiltros();
      this.loading.dismiss();
    }
  }

  seleccionarIngredientes() {
    let ingredientes = this.ingredientes;
    let modal = this.modalCtrl.create(IngredientesPage, { ingredientes }, { cssClass: 'filtros-modal' });
    modal.onDidDismiss(data => {
      if (data) {
        this.ingredientes = data;
        this.filtros.ingredientes = this.ingredientes.filter((ingrediente) => {
          return (ingrediente.elegido);
        });
        this.cantIngredientes = this.filtros.ingredientes.length;
      }
    });
    modal.present();
  }

  updateDrops() {
  }

  aceptar() {
    this.filtros.categorias = this.categorias.filter((element) => {
      return (element.checked);
    });
    this.filtros.enfermedades = this.enfermedades.filter((element) => {
      return (element.checked);
    });
    this.filtros.dificultades = this.dificultades.filter((element) => {
      return (element.checked);
    });
    localStorage.setItem("filtros", JSON.stringify(this.filtros));
    this.viewCtrl.dismiss();
  }

  borrarFiltros() {
    this.categorias.forEach(element => {
      element.checked = false;
    });
    this.enfermedades.forEach(element => {
      element.checked = false;
    });
    this.dificultades.forEach(element => {
      element.checked = false;
    });
    this.ingredientes.forEach(element => {
      element.elegido = false;
    });
    this.filtros.ingredientes = [];
    this.filtros.tiempo = { lower: 10, upper: 180 };
    this.filtros.comensales = { lower: 1, upper: 15 };
    this.cantIngredientes = 0;
  }

  cargarFiltros() {
    this.categorias.forEach(element => {
      if (this.filtros.categorias.map(function (e) { return e.nombre; }).indexOf(element.nombre) > -1)
        element.checked = true;
    });
    this.enfermedades.forEach(element => {
      if (this.filtros.enfermedades.map(function (e) { return e.nombre; }).indexOf(element.nombre) > -1)
        element.checked = true;
    });
    this.dificultades.forEach(element => {
      if (this.filtros.dificultades.map(function (e) { return e.nombre; }).indexOf(element.nombre) > -1)
        element.checked = true;
    });
    this.ingredientes.forEach(element => {
      if (this.filtros.ingredientes.map(function (e) { return e.nombre; }).indexOf(element.nombre) > -1)
        element.elegido = true;
    });
  }

  collapseAll() {
    this.drop.categoria = false;
    this.drop.dificultad = false;
    this.drop.tiempo = false;
    this.drop.apto = false;
    this.drop.ingredientes = false;
    this.drop.comensales = false;
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
