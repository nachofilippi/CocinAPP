import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, ModalController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { ListaRecetasServicios } from '../../app/servicios/lista-recetas';
import {RestProvider} from '../../providers/rest/rest';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import {IngredientesPage} from '../ingredientes/ingredientes.component';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'app-agregar',
  templateUrl: 'agregar.component.html',
  styles: [`
    .ng-invalid.ng-touched:not(form){
      color:red;
    }  `]
})
export class AgregarComponent implements OnInit {

  receta: any={};
  recetaForm : FormGroup;
  categorias: any;
  ingredientes: any;
  ingredientesElegidos: any;
  item: any;
  cantidadItem: number;
  paso_nombre: string = '';
  paso_descripcion: string = '';

  constructor(public alertCtrl: AlertController,
    public navCtrl: NavController,
    public _listaRecetas: ListaRecetasServicios,
    public rest: RestProvider,
    private camera: Camera,
    private formBuilder: FormBuilder,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController
  ) {
    this.recetaForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      personas: ['', Validators.compose([Validators.required, Validators.min(1), Validators.max(15)])],
      tiempo: ['', Validators.compose([Validators.required, Validators.min(1), Validators.max(180)])],
      video: [''],
      categoria: ['', Validators.required],
      dificultad: [0, Validators.required]
    });
  }

  ngOnInit() {
      this.receta={};
      this.receta.ingredientes=[];
      this.receta.pasos=[];
      this.receta.imagenes=[];
      this.ingredientesElegidos=[];
      this.rest.getCategoriasRecetas().subscribe(data => {this.categorias = data}, offline => {this.categorias = offline;});
      this.rest.getIngredientes().subscribe(data => {this.ingredientes = data}, offline => {this.ingredientes = offline;});

    }

  agregar() {
    if (!this.cantidadItem || !this.item)
      return;
      let item: any;
      item={};
      item=this.ingredientes[this.item];
      item.cantidad = this.cantidadItem;
      this.ingredientesElegidos.push(item);
      this.ingredientes.splice (this.item,1);
      this.cantidadItem=null;
      this.item = null;
  }

  agregarPaso() {
    if (!this.paso_nombre || !this.paso_descripcion)
    return;
      this.receta.pasos.push({"nombre": this.paso_nombre, "descripcion": this.paso_descripcion});
      this.paso_nombre='';
      this.paso_descripcion='';
  }

  borrarPaso(i: number) {
      this.receta.pasos.splice(i, 1);
  }

  borrarImagen(i: number) {
      this.receta.imagenes.splice(i, 1);
  }

  borrarItem(i: number, id: number) {
    this.ingredientes.forEach(element => {
      if (element.id === id)
        element.elegido = false;
    });
    this.ingredientesElegidos.splice(i, 1);
    this.changeFocus();
  }

  postReceta() {
    this.ingredientesElegidos.forEach((value) => {
      if (value.cantidad && value.cantidad > 1)
        this.receta.ingredientes.push({ "ingrediente": value.id, "cantidad": Math.floor(value.cantidad) });
    });
    this.receta.nombre = this.recetaForm.value.nombre;
    this.receta.categoria = this.recetaForm.value.categoria;
    this.receta.dificultad = this.recetaForm.value.dificultad;
    this.receta.personas = this.recetaForm.value.personas;
    this.receta.tiempo = this.recetaForm.value.tiempo;
    this.receta.video = this.recetaForm.value.video;
    this.rest.postReceta(this.receta).subscribe(data => { }, offline => { });
    let toast = this.toastCtrl.create({
      message: "Tu receta creada correctamente! Muchas gracias por colaborar con CocinApp.",
      duration: 7000,
      position: 'bottom',
      showCloseButton: true,
      closeButtonText: "Cerrar"
    });
    toast.present();
    this.navCtrl.pop();
  }

  validar(){
    this.changeFocus();
    let array:any=[];
    array=this.ingredientesElegidos.filter(ing=> {
     return !ing.cantidad || ing.cantidad < 1;
    });
    return !array.length;
  }

  takePhoto(sourceType: number = 0) {
      //0 para galería - 1 para Cámara
      const options: CameraOptions = {
          quality: 50,
          destinationType: this.camera.DestinationType.DATA_URL,
          encodingType: this.camera.EncodingType.JPEG,
          mediaType: this.camera.MediaType.PICTURE,
          correctOrientation: true,
          sourceType: sourceType,
      }

      this.camera.getPicture(options).then((imageData) => {
          let base64Image = 'data:image/jpeg;base64,' + imageData;
          this.receta.imagenes.push(base64Image);
      }, (err) => {
          // Handle error
      });
  }

  seleccionarIngredientes() {
    let ingredientes = this.ingredientes;
    let modal = this.modalCtrl.create(IngredientesPage, { ingredientes }, { cssClass: 'filtros-modal' });
    modal.onDidDismiss(data => {
      if (data) {
        this.ingredientes = data;
        this.ingredientesElegidos = data.filter((ingrediente) => {
          return (ingrediente.elegido);
        });
        this.changeFocus();
      }
    });
    modal.present();
  }

  changeFocus(){
    this.ingredientesElegidos.forEach(element => {
      delete element.focus;
    });
    this.ingredientesElegidos.some(element => {
      if (!element.cantidad){
        element.focus=true;
        return true;
      }
    });
  }

  crearReceta() {
    let alert = this.alertCtrl.create({
      title: 'Crear receta "' + this.recetaForm.value.nombre + '"',
      message: '¿Estás seguro que deseás crear esta receta?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.postReceta();
          }
        }
      ]
    });
    alert.present();
  }
}
